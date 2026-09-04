import crypto from "crypto";
import type { SupabaseClient } from "@supabase/supabase-js";

export interface RazorpayPaymentEntity {
  id: string;
  entity: string;
  amount: number;
  currency: string;
  status: string;
  order_id: string;
  email?: string;
  contact?: string;
  error_code?: string | null;
  error_description?: string | null;
  error_reason?: string | null;
  created_at?: number;
}

export interface RazorpayWebhookEvent {
  entity: string;
  account_id?: string;
  event: string;
  contains?: string[];
  payload: {
    payment?: {
      entity: RazorpayPaymentEntity;
    };
    order?: {
      entity: {
        id: string;
        amount: number;
        status: string;
      };
    };
  };
  created_at?: number;
}

export interface ReconcileResult {
  success: boolean;
  event: string;
  paymentId?: string;
  orderId?: string;
  status?: string;
  message: string;
  alreadyReconciled?: boolean;
}

/**
 * Validates the Razorpay webhook HMAC-SHA256 signature against the raw request body.
 * Uses crypto.timingSafeEqual to prevent side-channel timing attacks.
 */
export function verifyWebhookSignature(
  rawBody: string,
  signature: string | null | undefined,
  secret: string,
): boolean {
  if (!rawBody || !signature || !secret) {
    return false;
  }

  const expectedSignature = crypto.createHmac("sha256", secret).update(rawBody).digest("hex");

  if (expectedSignature.length !== signature.length) {
    return false;
  }

  return crypto.timingSafeEqual(
    Buffer.from(expectedSignature, "utf-8"),
    Buffer.from(signature, "utf-8"),
  );
}

/**
 * Reconciles payment events (payment.captured, payment.failed) directly in the database.
 * Protects against users closing the browser before client verification finishes.
 */
export async function reconcileWebhookEvent(
  event: RazorpayWebhookEvent,
  dbClient: SupabaseClient,
): Promise<ReconcileResult> {
  const eventType = event.event;
  const payment = event.payload?.payment?.entity;

  if (!payment || !payment.order_id || !payment.id) {
    return {
      success: false,
      event: eventType,
      message: "Webhook event does not contain payment and order entities",
    };
  }

  const razorpayOrderId = payment.order_id;
  const razorpayPaymentId = payment.id;

  // 1. Fetch the corresponding order row in the database
  const { data: dbOrder, error: orderFetchError } = await dbClient
    .from("orders")
    .select("id, user_id, order_number, status, payment_status, total_amount")
    .eq("razorpay_order_id", razorpayOrderId)
    .maybeSingle();

  if (orderFetchError) {
    console.error(`[Webhook] Error fetching order ${razorpayOrderId}:`, orderFetchError.message);
    throw new Error(`Database error querying order: ${orderFetchError.message}`);
  }

  if (!dbOrder) {
    console.warn(
      `[Webhook] No order found in database matching razorpay_order_id: ${razorpayOrderId}`,
    );
    return {
      success: false,
      event: eventType,
      paymentId: razorpayPaymentId,
      orderId: razorpayOrderId,
      message: `No matching order found for razorpay_order_id ${razorpayOrderId}`,
    };
  }

  // 2. Handle 'payment.captured'
  if (eventType === "payment.captured") {
    // Idempotency: Check if already paid
    if (dbOrder.payment_status === "paid") {
      // Ensure payment record exists or is recorded
      await dbClient.from("payments").upsert(
        {
          order_id: dbOrder.id,
          user_id: dbOrder.user_id,
          amount: payment.amount,
          currency: payment.currency || "INR",
          provider: "razorpay",
          status: "completed",
          razorpay_order_id: razorpayOrderId,
          razorpay_payment_id: razorpayPaymentId,
          raw_event: event,
        },
        { onConflict: "razorpay_payment_id" },
      );

      return {
        success: true,
        event: eventType,
        paymentId: razorpayPaymentId,
        orderId: dbOrder.id,
        status: "already_paid",
        alreadyReconciled: true,
        message: `Order ${dbOrder.order_number} was already marked as paid`,
      };
    }

    // Reconcile order to paid & processing
    const { error: updateError } = await dbClient
      .from("orders")
      .update({
        status: "processing",
        payment_status: "paid",
        updated_at: new Date().toISOString(),
      })
      .eq("id", dbOrder.id);

    if (updateError) {
      console.error(
        `[Webhook] Failed to update order status for ${dbOrder.id}:`,
        updateError.message,
      );
      throw new Error(`Failed to update order: ${updateError.message}`);
    }

    // Upsert payment record
    const { error: paymentError } = await dbClient.from("payments").upsert(
      {
        order_id: dbOrder.id,
        user_id: dbOrder.user_id,
        amount: payment.amount,
        currency: payment.currency || "INR",
        provider: "razorpay",
        status: "completed",
        razorpay_order_id: razorpayOrderId,
        razorpay_payment_id: razorpayPaymentId,
        raw_event: event,
      },
      { onConflict: "razorpay_payment_id" },
    );

    if (paymentError) {
      console.error(
        `[Webhook] Failed to upsert payment for order ${dbOrder.id}:`,
        paymentError.message,
      );
      throw new Error(`Failed to record payment: ${paymentError.message}`);
    }

    console.info(
      `[Webhook] Successfully reconciled order ${dbOrder.order_number} to PAID via webhook`,
    );
    return {
      success: true,
      event: eventType,
      paymentId: razorpayPaymentId,
      orderId: dbOrder.id,
      status: "paid",
      message: `Order ${dbOrder.order_number} successfully reconciled to paid`,
    };
  }

  // 3. Handle 'payment.failed'
  if (eventType === "payment.failed") {
    // If the order is already paid, do NOT downgrade it (a previous attempt may have failed before a successful retry)
    if (dbOrder.payment_status === "paid") {
      console.info(
        `[Webhook] Ignoring payment.failed for already paid order ${dbOrder.order_number}`,
      );
      return {
        success: true,
        event: eventType,
        paymentId: razorpayPaymentId,
        orderId: dbOrder.id,
        status: "ignored_already_paid",
        message: `Order ${dbOrder.order_number} is already paid; failed attempt logged without downgrading`,
      };
    }

    // Mark order as payment failed
    await dbClient
      .from("orders")
      .update({
        status: "payment_failed",
        payment_status: "failed",
        updated_at: new Date().toISOString(),
      })
      .eq("id", dbOrder.id);

    // Record failed payment attempt
    await dbClient.from("payments").upsert(
      {
        order_id: dbOrder.id,
        user_id: dbOrder.user_id,
        amount: payment.amount,
        currency: payment.currency || "INR",
        provider: "razorpay",
        status: "failed",
        razorpay_order_id: razorpayOrderId,
        razorpay_payment_id: razorpayPaymentId,
        raw_event: event,
      },
      { onConflict: "razorpay_payment_id" },
    );

    console.info(`[Webhook] Order ${dbOrder.order_number} marked as payment_failed`);
    return {
      success: true,
      event: eventType,
      paymentId: razorpayPaymentId,
      orderId: dbOrder.id,
      status: "failed",
      message: `Order ${dbOrder.order_number} marked as payment_failed`,
    };
  }

  return {
    success: true,
    event: eventType,
    paymentId: razorpayPaymentId,
    orderId: dbOrder.id,
    status: "unhandled_event",
    message: `Event '${eventType}' received and logged`,
  };
}

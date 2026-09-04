import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { calculateAuthoritativeOrderPricing } from "@/lib/products";
import { assertRateLimit, getClientIp } from "@/lib/rate-limiter";
import Razorpay from "razorpay";
import crypto from "crypto";
import { z } from "zod";

export const CheckoutItemSchema = z
  .object({
    id: z.string().trim().min(1, "Product ID is required").max(64),
    name: z.string().trim().max(200).optional(),
    origin: z.string().trim().max(100).optional(),
    img: z.string().trim().max(2000).optional(),
    price: z.number().nonnegative().max(1000000).optional(), // Client-submitted price is strictly ignored in calculations
    qty: z.number().int().positive("Quantity must be greater than 0").max(1000),
  })
  .strict();

export const CheckoutFormSchema = z
  .object({
    firstName: z
      .string()
      .trim()
      .min(2, "First name must be at least 2 characters")
      .max(50, "First name must be under 50 characters")
      .regex(/^[a-zA-Z\s'-]+$/, "First name can only contain letters"),
    lastName: z
      .string()
      .trim()
      .min(1, "Last name is required")
      .max(50, "Last name must be under 50 characters")
      .regex(/^[a-zA-Z\s'-]+$/, "Last name can only contain letters"),
    email: z.string().trim().email("Please enter a valid email address").max(255),
    phone: z
      .string()
      .trim()
      .max(20)
      .refine((val) => {
        const cleaned = val.replace(/[\s\-()]/g, "");
        return /^(?:\+91|91|0)?[6-9]\d{9}$/.test(cleaned);
      }, "Please enter a valid 10-digit Indian mobile number"),
    address: z
      .string()
      .trim()
      .min(5, "Address must be at least 5 characters")
      .max(200, "Address is too long"),
    city: z
      .string()
      .trim()
      .min(2, "City must be at least 2 characters")
      .max(50, "City is too long")
      .regex(/^[a-zA-Z\s.-]+$/, "City can only contain letters"),
    state: z
      .string()
      .trim()
      .min(2, "State must be at least 2 characters")
      .max(50, "State is too long")
      .regex(/^[a-zA-Z\s.-]+$/, "State can only contain letters"),
    postalCode: z
      .string()
      .trim()
      .refine((val) => {
        const cleaned = val.replace(/\s/g, "");
        return /^[1-9][0-9]{5}$/.test(cleaned);
      }, "Postal code must be a valid 6-digit Indian PIN code"),
    country: z.string().trim().max(100).optional().default("India"),
  })
  .strict();

export type CheckoutItemPayload = z.infer<typeof CheckoutItemSchema>;
export type CheckoutFormPayload = z.infer<typeof CheckoutFormSchema>;

/**
 * Recomputes and verifies the HMAC-SHA256 signature using timing-safe comparison.
 */
export function verifyRazorpaySignature(
  razorpayOrderId: string,
  razorpayPaymentId: string,
  razorpaySignature: string,
  secret: string,
): boolean {
  if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature || !secret) {
    return false;
  }

  const payload = `${razorpayOrderId}|${razorpayPaymentId}`;
  const expectedSignature = crypto.createHmac("sha256", secret).update(payload).digest("hex");

  if (expectedSignature.length !== razorpaySignature.length) {
    return false;
  }

  return crypto.timingSafeEqual(
    Buffer.from(expectedSignature, "utf-8"),
    Buffer.from(razorpaySignature, "utf-8"),
  );
}

export const createRazorpayOrder = createServerFn({ method: "POST" })
  .validator((data: unknown) =>
    z
      .object({
        items: z.array(CheckoutItemSchema).min(1, "Cart cannot be empty").max(50),
        form: CheckoutFormSchema,
      })
      .strict()
      .parse(data),
  )
  .middleware([requireSupabaseAuth])
  .handler(async ({ data, context }) => {
    const { items, form } = data;
    const { user } = context;

    // Rate Limiting: Max 6 order creations per minute per user & IP to prevent order-spam abuse
    const request = getRequest();
    const ip = getClientIp(request);

    assertRateLimit({
      key: `order:create:user:${user.id}`,
      limit: 6,
      windowMs: 60_000,
      errorMessage:
        "Too many checkout attempts. Please wait a minute before creating another order.",
    });

    assertRateLimit({
      key: `order:create:ip:${ip}`,
      limit: 6,
      windowMs: 60_000,
      errorMessage: "Too many checkout attempts from this network. Please wait a minute.",
    });

    // Authoritative server-side pricing recalculation from DB / catalog.
    // Client-submitted line item prices, subtotals, or shipping fees are strictly ignored.
    const calculation = await calculateAuthoritativeOrderPricing(items, context.supabase);

    // Initialize Razorpay
    const keyId = process.env.VITE_RAZORPAY_KEY_ID || "";
    const keySecret = process.env.RAZORPAY_KEY_SECRET || "";

    if (!keyId || !keySecret) {
      throw new Error("Payment gateway configuration error: Razorpay keys are not configured.");
    }

    if (!keyId.startsWith("rzp_test_") && !keyId.startsWith("rzp_live_")) {
      throw new Error("Payment gateway configuration error: Invalid Razorpay Key ID format.");
    }

    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    // Create Razorpay order using authoritative server amount
    const options = {
      amount: calculation.amountInPaise, // amount in smallest currency unit (paise)
      currency: "INR" as const,
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    if (!order || !order.id) {
      throw new Error("Failed to create Razorpay order");
    }

    // Prefer supabaseAdmin (service_role) to execute the DB operations
    let dbClient = context.supabase;
    const { getServerEnv, supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const serviceRoleKey = getServerEnv("SUPABASE_SERVICE_ROLE_KEY");
    if (serviceRoleKey) {
      try {
        dbClient = supabaseAdmin as typeof context.supabase;
      } catch (err) {
        console.warn("Could not load supabaseAdmin, falling back to context client:", err);
      }
    }

    // Initialize the pending order in database linked strictly to this authenticated user
    const orderNumber = `ORD-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;

    const { data: dbOrder, error: orderError } = await dbClient
      .from("orders")
      .insert({
        user_id: user.id,
        order_number: orderNumber,
        status: "pending",
        payment_status: "unpaid",
        currency: "INR",
        subtotal_amount: Math.round(calculation.subtotal * 100),
        shipping_amount: Math.round(calculation.shipping * 100),
        total_amount: calculation.amountInPaise,
        razorpay_order_id: order.id,
        customer_email: form.email,
        customer_name: (form.firstName + " " + form.lastName).trim(),
        customer_phone: form.phone,
        shipping_address_line1: form.address,
        shipping_city: form.city,
        shipping_state: form.state,
        shipping_postal_code: form.postalCode,
        shipping_country: form.country || "India",
      })
      .select()
      .single();

    if (!orderError && dbOrder) {
      // Insert initial order items
      const orderItems = calculation.items.map((verifiedItem) => {
        const clientItem = items.find((i) => i.id === verifiedItem.id);
        return {
          order_id: dbOrder.id,
          product_id: verifiedItem.id,
          name: verifiedItem.name,
          origin: verifiedItem.origin,
          image_url: clientItem?.img,
          unit_amount: Math.round(verifiedItem.price * 100),
          quantity: verifiedItem.qty,
          line_total: Math.round(verifiedItem.lineTotal * 100),
        };
      });

      await dbClient.from("order_items").insert(orderItems);
    }

    return {
      razorpayOrderId: order.id,
      amount: options.amount,
      currency: options.currency,
    };
  });

export const verifyRazorpayPayment = createServerFn({ method: "POST" })
  .validator((data: unknown) =>
    z
      .object({
        razorpay_payment_id: z.string().trim().min(1, "Missing payment ID").max(100),
        razorpay_order_id: z.string().trim().min(1, "Missing Razorpay order ID").max(100),
        razorpay_signature: z.string().trim().min(1, "Missing payment signature").max(256),
        items: z.array(CheckoutItemSchema).min(1, "Cart cannot be empty").max(50),
        form: CheckoutFormSchema,
      })
      .strict()
      .parse(data),
  )
  .middleware([requireSupabaseAuth])
  .handler(async ({ data, context }) => {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature, items, form } = data;
    const { user } = context;

    // (1) Recompute HMAC-SHA256 signature using RAZORPAY_KEY_SECRET and timingSafeEqual
    const secret = process.env.RAZORPAY_KEY_SECRET;
    if (!secret) {
      throw new Error("Server configuration error: RAZORPAY_KEY_SECRET is missing");
    }

    const isSignatureValid = verifyRazorpaySignature(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      secret,
    );

    if (!isSignatureValid) {
      const { logSecurityEvent } = await import("@/lib/logger");
      const request = getRequest();
      const ip = getClientIp(request);

      logSecurityEvent("WARN", {
        event: "PAYMENT_SIGNATURE_VERIFICATION_FAILED",
        message: "Client payment signature verification failed",
        userId: user.id,
        ip,
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
        statusCode: 400,
      });

      throw new Error("Invalid payment signature");
    }

    // Prefer supabaseAdmin (service_role) to execute the privileged payment/order mutation
    let dbClient = context.supabase;
    const { getServerEnv, supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const serviceRoleKey = getServerEnv("SUPABASE_SERVICE_ROLE_KEY");
    if (serviceRoleKey) {
      try {
        dbClient = supabaseAdmin as typeof context.supabase;
      } catch (err) {
        console.warn("Could not load supabaseAdmin, falling back to context client:", err);
      }
    }

    // (3) IDEMPOTENCY CHECK 1: Check if this payment ID was already recorded
    const { data: existingPayment } = await dbClient
      .from("payments")
      .select("id, order_id, user_id, status")
      .eq("razorpay_payment_id", razorpay_payment_id)
      .maybeSingle();

    if (existingPayment) {
      // Payment was already verified and recorded! Return existing order without creating duplicates
      if (existingPayment.order_id) {
        const { data: paidOrder } = await dbClient
          .from("orders")
          .select("id, order_number, user_id")
          .eq("id", existingPayment.order_id)
          .single();

        if (paidOrder && paidOrder.user_id !== user.id) {
          const { logSecurityEvent } = await import("@/lib/logger");
          const request = getRequest();
          const ip = getClientIp(request);

          logSecurityEvent("WARN", {
            event: "CHECKOUT_UNAUTHORIZED_OWNERSHIP",
            message: "User attempted to claim an already processed order belonging to another user",
            userId: user.id,
            ip,
            orderId: existingPayment.order_id,
            paymentId: razorpay_payment_id,
            statusCode: 403,
          });

          throw new Error("Unauthorized: Order does not belong to the current authenticated user");
        }

        return {
          success: true,
          dbOrderId: paidOrder?.id || existingPayment.order_id,
          orderNumber: paidOrder?.order_number || "",
          alreadyProcessed: true,
        };
      }

      if (existingPayment.user_id && existingPayment.user_id !== user.id) {
        throw new Error("Unauthorized: Payment does not belong to the current authenticated user");
      }

      return {
        success: true,
        dbOrderId: "",
        orderNumber: "",
        alreadyProcessed: true,
      };
    }

    // (2) USER OWNERSHIP CHECK: Check the Razorpay order_id against the order row this user owns
    const { data: dbOrder, error: orderFetchError } = await dbClient
      .from("orders")
      .select("id, order_number, user_id, payment_status, status, total_amount")
      .eq("razorpay_order_id", razorpay_order_id)
      .maybeSingle();

    if (dbOrder) {
      // STRICT OWNERSHIP CHECK: Ensure the order row belongs to the authenticated caller
      if (dbOrder.user_id !== user.id) {
        const { logSecurityEvent } = await import("@/lib/logger");
        const request = getRequest();
        const ip = getClientIp(request);

        logSecurityEvent("WARN", {
          event: "CHECKOUT_UNAUTHORIZED_OWNERSHIP",
          message: "User attempted to verify an order belonging to another user",
          userId: user.id,
          ip,
          orderId: razorpay_order_id,
          paymentId: razorpay_payment_id,
          statusCode: 403,
        });

        throw new Error("Unauthorized: Order does not belong to the current authenticated user");
      }

      // (3) IDEMPOTENCY CHECK 2: If order is already paid, do not duplicate
      if (dbOrder.payment_status === "paid") {
        return {
          success: true,
          dbOrderId: dbOrder.id,
          orderNumber: dbOrder.order_number,
          alreadyProcessed: true,
        };
      }
    }

    // Authoritatively recalculate order items & totals on the server
    const calculation = await calculateAuthoritativeOrderPricing(items, context.supabase);

    let activeOrderId: string;
    let orderNumber: string;

    if (!dbOrder) {
      // Fallback: If order wasn't pre-created in createRazorpayOrder, create it now for this user
      orderNumber = `ORD-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;

      const { data: newOrder, error: orderError } = await dbClient
        .from("orders")
        .insert({
          user_id: user.id,
          order_number: orderNumber,
          status: "processing",
          payment_status: "paid",
          currency: "INR",
          subtotal_amount: Math.round(calculation.subtotal * 100),
          shipping_amount: Math.round(calculation.shipping * 100),
          total_amount: calculation.amountInPaise,
          razorpay_order_id: razorpay_order_id,
          customer_email: form.email,
          customer_name: (form.firstName + " " + form.lastName).trim(),
          customer_phone: form.phone,
          shipping_address_line1: form.address,
          shipping_city: form.city,
          shipping_state: form.state,
          shipping_postal_code: form.postalCode,
          shipping_country: form.country || "India",
        })
        .select()
        .single();

      if (orderError) {
        console.error("[Checkout] Failed to create order row during verification:", orderError);
        throw new Error(
          "Payment verification failed. Please contact support if your account was debited.",
        );
      }
      activeOrderId = newOrder.id;

      // Insert order items using authoritative unit amounts and names
      const orderItems = calculation.items.map((verifiedItem) => {
        const clientItem = items.find((i) => i.id === verifiedItem.id);
        return {
          order_id: newOrder.id,
          product_id: verifiedItem.id,
          name: verifiedItem.name,
          origin: verifiedItem.origin,
          image_url: clientItem?.img,
          unit_amount: Math.round(verifiedItem.price * 100),
          quantity: verifiedItem.qty,
          line_total: Math.round(verifiedItem.lineTotal * 100),
        };
      });

      const { error: itemsError } = await dbClient.from("order_items").insert(orderItems);
      if (itemsError) {
        console.error("[Checkout] Failed to insert order items during verification:", itemsError);
        throw new Error(
          "Payment verification failed. Please contact support if your account was debited.",
        );
      }
    } else {
      activeOrderId = dbOrder.id;
      orderNumber = dbOrder.order_number;
      // Update existing order status to paid / processing
      const { error: updateError } = await dbClient
        .from("orders")
        .update({
          status: "processing",
          payment_status: "paid",
          updated_at: new Date().toISOString(),
        })
        .eq("id", activeOrderId);

      if (updateError) {
        console.error("[Checkout] Failed to update order status during verification:", updateError);
        throw new Error(
          "Payment verification failed. Please contact support if your account was debited.",
        );
      }
    }

    // (3) IDEMPOTENCY: Check if payment record exists before inserting
    const { data: existingPaymentRecord } = await dbClient
      .from("payments")
      .select("id")
      .eq("razorpay_payment_id", razorpay_payment_id)
      .maybeSingle();

    if (!existingPaymentRecord) {
      const { error: paymentError } = await dbClient.from("payments").insert({
        order_id: activeOrderId,
        user_id: user.id,
        amount: calculation.amountInPaise,
        currency: "INR",
        provider: "razorpay",
        status: "completed",
        razorpay_order_id: razorpay_order_id,
        razorpay_payment_id: razorpay_payment_id,
        razorpay_signature: razorpay_signature,
      });

      if (paymentError) {
        console.error("[Checkout] Failed to record payment entry:", paymentError);
        throw new Error(
          "Payment verification failed. Please contact support if your account was debited.",
        );
      }
    }

    return {
      success: true,
      dbOrderId: activeOrderId,
      orderNumber: orderNumber || "",
    };
  });

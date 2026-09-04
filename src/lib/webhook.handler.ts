import {
  verifyWebhookSignature,
  reconcileWebhookEvent,
  type RazorpayWebhookEvent,
} from "./webhook.service";
import type { SupabaseClient } from "@supabase/supabase-js";

export async function handleRazorpayWebhookRequest(request: Request): Promise<Response> {
  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  // 1. Extract signature header
  const signature = request.headers.get("x-razorpay-signature");
  if (!signature) {
    return new Response(JSON.stringify({ error: "Missing x-razorpay-signature header" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // 2. Secret: Use dedicated RAZORPAY_WEBHOOK_SECRET, falling back to RAZORPAY_KEY_SECRET
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET || process.env.RAZORPAY_KEY_SECRET;

  if (!webhookSecret) {
    console.error("[Webhook] Missing RAZORPAY_WEBHOOK_SECRET or RAZORPAY_KEY_SECRET");
    return new Response(JSON.stringify({ error: "Webhook secret is not configured on server" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  // 3. Read raw request text body
  const rawBody = await request.text();

  // 4. Verify HMAC-SHA256 signature
  const isValid = verifyWebhookSignature(rawBody, signature, webhookSecret);
  if (!isValid) {
    const { logSecurityEvent } = await import("./logger");
    const { getClientIp } = await import("./rate-limiter");
    const ip = getClientIp(request);

    logSecurityEvent("WARN", {
      event: "WEBHOOK_SIGNATURE_VERIFICATION_FAILED",
      message: "Razorpay webhook HMAC signature verification failed",
      ip,
      statusCode: 401,
      details: { signatureLength: signature.length },
    });

    return new Response(JSON.stringify({ error: "Invalid signature" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  // 5. Parse JSON payload
  let event: RazorpayWebhookEvent;
  try {
    event = JSON.parse(rawBody);
  } catch {
    return new Response(JSON.stringify({ error: "Malformed JSON body" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // 6. Get privileged Supabase client (service_role)
  let dbClient: SupabaseClient | undefined;
  try {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    dbClient = supabaseAdmin as unknown as SupabaseClient;
  } catch (err) {
    console.error("[Webhook] Could not load supabaseAdmin:", err);
  }

  if (!dbClient) {
    return new Response(JSON.stringify({ error: "Database service_role client unavailable" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  // 7. Reconcile order & payment in database
  try {
    const result = await reconcileWebhookEvent(event, dbClient);
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: unknown) {
    console.error("[Webhook] Reconciliation failed:", err);
    return new Response(
      JSON.stringify({
        error: "Reconciliation failed",
        message: err instanceof Error ? err.message : String(err),
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}

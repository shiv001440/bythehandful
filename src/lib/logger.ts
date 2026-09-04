/**
 * Structured Security & Early-Warning Audit Logger
 *
 * Emits standardized, machine-readable JSON logs for log aggregation and anomaly detection
 * (Datadog, Better Stack, Axiom, CloudWatch, Vercel/Nitro logs).
 */

export type SecurityEventType =
  | "PAYMENT_SIGNATURE_VERIFICATION_FAILED"
  | "WEBHOOK_SIGNATURE_VERIFICATION_FAILED"
  | "ADMIN_AUTH_FAILED"
  | "CHECKOUT_RATE_LIMIT_EXCEEDED"
  | "CHECKOUT_UNAUTHORIZED_OWNERSHIP"
  | "CHECKOUT_ORDER_CREATION_FAILED"
  | "CHECKOUT_PAYMENT_VERIFICATION_FAILED"
  | "AUTH_RATE_LIMIT_EXCEEDED";

export interface StructuredSecurityLog {
  event: SecurityEventType;
  message: string;
  ip?: string;
  userId?: string;
  orderId?: string;
  paymentId?: string;
  statusCode: number;
  details?: Record<string, unknown>;
  error?: unknown;
}

export function logSecurityEvent(level: "WARN" | "ERROR", payload: StructuredSecurityLog): void {
  const entry = {
    timestamp: new Date().toISOString(),
    level,
    category: "SECURITY_AUDIT",
    ...payload,
    error:
      payload.error instanceof Error
        ? payload.error.message
        : payload.error
          ? String(payload.error)
          : undefined,
  };

  const serialized = JSON.stringify(entry);
  if (level === "ERROR") {
    console.error(serialized);
  } else {
    console.warn(serialized);
  }
}

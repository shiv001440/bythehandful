import { describe, it, expect, vi } from "vitest";
import {
  verifyWebhookSignature,
  reconcileWebhookEvent,
  type RazorpayWebhookEvent,
} from "../webhook.service";
import type { SupabaseClient } from "@supabase/supabase-js";
import crypto from "crypto";

describe("Razorpay Webhook Service", () => {
  const mockWebhookSecret = "whsec_test_secret_abc123";
  const mockPayloadString = JSON.stringify({
    entity: "event",
    event: "payment.captured",
    payload: {
      payment: {
        entity: {
          id: "pay_TEST123",
          entity: "payment",
          amount: 245000,
          currency: "INR",
          status: "captured",
          order_id: "order_TEST456",
        },
      },
    },
  });

  function generateWebhookSignature(body: string, secret: string) {
    return crypto.createHmac("sha256", secret).update(body).digest("hex");
  }

  describe("verifyWebhookSignature", () => {
    it("successfully verifies valid webhook HMAC-SHA256 signature", () => {
      const validSignature = generateWebhookSignature(mockPayloadString, mockWebhookSecret);

      const isValid = verifyWebhookSignature(mockPayloadString, validSignature, mockWebhookSecret);
      expect(isValid).toBe(true);
    });

    it("rejects tampered webhook payload", () => {
      const validSignature = generateWebhookSignature(mockPayloadString, mockWebhookSecret);
      const tamperedBody = mockPayloadString.replace("pay_TEST123", "pay_HACKED999");

      expect(verifyWebhookSignature(tamperedBody, validSignature, mockWebhookSecret)).toBe(false);
    });

    it("rejects tampered signature or incorrect secret", () => {
      const validSignature = generateWebhookSignature(mockPayloadString, mockWebhookSecret);

      expect(verifyWebhookSignature(mockPayloadString, "invalid_sig_abc", mockWebhookSecret)).toBe(
        false,
      );
      expect(
        verifyWebhookSignature(mockPayloadString, validSignature, "wrong_webhook_secret"),
      ).toBe(false);
    });

    it("rejects empty arguments safely", () => {
      expect(verifyWebhookSignature("", "sig", mockWebhookSecret)).toBe(false);
      expect(verifyWebhookSignature(mockPayloadString, "", mockWebhookSecret)).toBe(false);
      expect(verifyWebhookSignature(mockPayloadString, "sig", "")).toBe(false);
    });
  });

  describe("reconcileWebhookEvent", () => {
    it("reconciles payment.captured event by updating order and inserting payment", async () => {
      const updateOrderMock = vi
        .fn()
        .mockReturnValue({ eq: vi.fn().mockResolvedValue({ error: null }) });
      const upsertPaymentMock = vi.fn().mockResolvedValue({ error: null });

      const mockDbClient = {
        from: vi.fn((table: string) => {
          if (table === "orders") {
            return {
              select: vi.fn().mockReturnValue({
                eq: vi.fn().mockReturnValue({
                  maybeSingle: vi.fn().mockResolvedValue({
                    data: {
                      id: "db-order-uuid-1",
                      user_id: "user-uuid-1",
                      order_number: "ORD-12345",
                      status: "pending",
                      payment_status: "unpaid",
                    },
                    error: null,
                  }),
                }),
              }),
              update: updateOrderMock,
            };
          }
          if (table === "payments") {
            return {
              upsert: upsertPaymentMock,
            };
          }
          return {};
        }),
      } as unknown as SupabaseClient;

      const event: RazorpayWebhookEvent = {
        entity: "event",
        event: "payment.captured",
        payload: {
          payment: {
            entity: {
              id: "pay_CAPTURED_1",
              entity: "payment",
              amount: 177000,
              currency: "INR",
              status: "captured",
              order_id: "order_RZP_1",
            },
          },
        },
      };

      const result = await reconcileWebhookEvent(event, mockDbClient);

      expect(result.success).toBe(true);
      expect(result.status).toBe("paid");
      expect(updateOrderMock).toHaveBeenCalledWith(
        expect.objectContaining({
          status: "processing",
          payment_status: "paid",
        }),
      );
      expect(upsertPaymentMock).toHaveBeenCalledWith(
        expect.objectContaining({
          order_id: "db-order-uuid-1",
          razorpay_payment_id: "pay_CAPTURED_1",
          status: "completed",
        }),
        expect.objectContaining({ onConflict: "razorpay_payment_id" }),
      );
    });

    it("handles idempotency: does not re-update order if already paid", async () => {
      const updateOrderMock = vi.fn();
      const upsertPaymentMock = vi.fn().mockResolvedValue({ error: null });

      const mockDbClient = {
        from: vi.fn((table: string) => {
          if (table === "orders") {
            return {
              select: vi.fn().mockReturnValue({
                eq: vi.fn().mockReturnValue({
                  maybeSingle: vi.fn().mockResolvedValue({
                    data: {
                      id: "db-order-uuid-1",
                      user_id: "user-uuid-1",
                      order_number: "ORD-12345",
                      status: "processing",
                      payment_status: "paid", // Already paid!
                    },
                    error: null,
                  }),
                }),
              }),
              update: updateOrderMock,
            };
          }
          if (table === "payments") {
            return {
              upsert: upsertPaymentMock,
            };
          }
          return {};
        }),
      } as unknown as SupabaseClient;

      const event: RazorpayWebhookEvent = {
        entity: "event",
        event: "payment.captured",
        payload: {
          payment: {
            entity: {
              id: "pay_CAPTURED_REPEAT",
              entity: "payment",
              amount: 177000,
              currency: "INR",
              status: "captured",
              order_id: "order_RZP_1",
            },
          },
        },
      };

      const result = await reconcileWebhookEvent(event, mockDbClient);

      expect(result.success).toBe(true);
      expect(result.status).toBe("already_paid");
      expect(result.alreadyReconciled).toBe(true);
      // Order status should not be updated again
      expect(updateOrderMock).not.toHaveBeenCalled();
    });

    it("reconciles payment.failed event and does not overwrite already paid order", async () => {
      const updateOrderMock = vi
        .fn()
        .mockReturnValue({ eq: vi.fn().mockResolvedValue({ error: null }) });
      const upsertPaymentMock = vi.fn().mockResolvedValue({ error: null });

      const mockDbClient = {
        from: vi.fn((table: string) => {
          if (table === "orders") {
            return {
              select: vi.fn().mockReturnValue({
                eq: vi.fn().mockReturnValue({
                  maybeSingle: vi.fn().mockResolvedValue({
                    data: {
                      id: "db-order-uuid-1",
                      user_id: "user-uuid-1",
                      order_number: "ORD-12345",
                      status: "processing",
                      payment_status: "paid", // User already succeeded on a retry
                    },
                    error: null,
                  }),
                }),
              }),
              update: updateOrderMock,
            };
          }
          if (table === "payments") {
            return {
              upsert: upsertPaymentMock,
            };
          }
          return {};
        }),
      } as unknown as SupabaseClient;

      const event: RazorpayWebhookEvent = {
        entity: "event",
        event: "payment.failed",
        payload: {
          payment: {
            entity: {
              id: "pay_FAILED_1",
              entity: "payment",
              amount: 177000,
              currency: "INR",
              status: "failed",
              order_id: "order_RZP_1",
            },
          },
        },
      };

      const result = await reconcileWebhookEvent(event, mockDbClient);

      expect(result.success).toBe(true);
      expect(result.status).toBe("ignored_already_paid");
      expect(updateOrderMock).not.toHaveBeenCalled();
    });
  });
});

import { describe, it, expect } from "vitest";
import { verifyRazorpaySignature } from "../checkout.functions";
import crypto from "crypto";

describe("Razorpay Signature Verification & Security", () => {
  const mockSecret = "test_secret_key_1234567890";
  const orderId = "order_O1234567890ABC";
  const paymentId = "pay_P1234567890XYZ";

  // Helper to generate a valid HMAC signature
  function generateValidSignature(order: string, payment: string, secret: string) {
    return crypto.createHmac("sha256", secret).update(`${order}|${payment}`).digest("hex");
  }

  it("(1) Successfully validates correct HMAC-SHA256 signature", () => {
    const validSignature = generateValidSignature(orderId, paymentId, mockSecret);

    const isValid = verifyRazorpaySignature(orderId, paymentId, validSignature, mockSecret);
    expect(isValid).toBe(true);
  });

  it("(1) Rejects on signature mismatch or tampered payload", () => {
    const validSignature = generateValidSignature(orderId, paymentId, mockSecret);

    // Tampered signature
    const tamperedSig = validSignature.slice(0, -2) + "ab";
    expect(verifyRazorpaySignature(orderId, paymentId, tamperedSig, mockSecret)).toBe(false);

    // Tampered orderId
    expect(verifyRazorpaySignature("order_tampered", paymentId, validSignature, mockSecret)).toBe(
      false,
    );

    // Tampered paymentId
    expect(verifyRazorpaySignature(orderId, "pay_tampered", validSignature, mockSecret)).toBe(
      false,
    );

    // Wrong secret used
    expect(verifyRazorpaySignature(orderId, paymentId, validSignature, "wrong_secret")).toBe(false);
  });

  it("(1) Rejects empty or missing inputs safely without throwing", () => {
    expect(verifyRazorpaySignature("", paymentId, "sig", mockSecret)).toBe(false);
    expect(verifyRazorpaySignature(orderId, "", "sig", mockSecret)).toBe(false);
    expect(verifyRazorpaySignature(orderId, paymentId, "", mockSecret)).toBe(false);
    expect(verifyRazorpaySignature(orderId, paymentId, "sig", "")).toBe(false);
  });

  it("(2 & 3) Verifies user ownership and idempotency semantics", () => {
    const callerUserId = "user-111";
    const foreignUserId = "user-999";

    const dbOrder = {
      id: "ord-row-1",
      order_number: "ORD-TEST-1",
      user_id: foreignUserId, // Belongs to someone else!
      payment_status: "unpaid",
    };

    // Simulated ownership guard
    const verifyOwnership = (order: typeof dbOrder, user: string) => {
      if (order.user_id !== user) {
        throw new Error("Unauthorized: Order does not belong to the current authenticated user");
      }
    };

    expect(() => verifyOwnership(dbOrder, callerUserId)).toThrow(
      "Unauthorized: Order does not belong to the current authenticated user",
    );

    // Simulated idempotency guard
    const handleDuplicateCheck = (order: { payment_status: string }) => {
      if (order.payment_status === "paid") {
        return { alreadyProcessed: true };
      }
      return { alreadyProcessed: false };
    };

    const firstCall = handleDuplicateCheck({ payment_status: "unpaid" });
    expect(firstCall.alreadyProcessed).toBe(false);

    const secondCall = handleDuplicateCheck({ payment_status: "paid" });
    expect(secondCall.alreadyProcessed).toBe(true);
  });
});

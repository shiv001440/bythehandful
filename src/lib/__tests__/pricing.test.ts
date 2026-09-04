import { describe, it, expect } from "vitest";
import {
  calculateAuthoritativeOrderPricing,
  AUTHORITATIVE_PRODUCTS,
  STANDARD_SHIPPING_FEE,
} from "../products";

describe("Authoritative Pricing Engine", () => {
  it("calculates accurate order totals using authoritative catalog prices", async () => {
    // 1 Kaju (880) + 2 Badam (780 * 2 = 1560) = Subtotal 2440 + Shipping 10 = Total 2450
    const cart = [
      { id: "kaju", qty: 1 },
      { id: "badam", qty: 2 },
    ];

    const result = await calculateAuthoritativeOrderPricing(cart);

    expect(result.subtotal).toBe(2440);
    expect(result.shipping).toBe(STANDARD_SHIPPING_FEE);
    expect(result.total).toBe(2450);
    expect(result.amountInPaise).toBe(245000);
    expect(result.items[0].price).toBe(AUTHORITATIVE_PRODUCTS.kaju.price);
    expect(result.items[1].price).toBe(AUTHORITATIVE_PRODUCTS.badam.price);
  });

  it("SILENTLY IGNORES modified client-side prices and uses server prices", async () => {
    // Attacker modifies client cart payload to set price: 1 (instead of 880)
    // and price: 0.50 (instead of 1140 for pista)
    const tamperedCart = [
      { id: "kaju", qty: 2, price: 1 }, // Attempting to pay ₹2 for ₹1,760 worth of Kaju
      { id: "pista", qty: 1, price: 0.5 }, // Attempting to pay ₹0.50 for ₹1,140 worth of Pista
    ];

    const result = await calculateAuthoritativeOrderPricing(tamperedCart);

    // Authoritative check:
    // Kaju: 880 * 2 = 1760
    // Pista: 1140 * 1 = 1140
    // Subtotal: 1760 + 1140 = 2900
    // Shipping: 10
    // Total: 2910
    expect(result.subtotal).toBe(2900);
    expect(result.total).toBe(2910);
    expect(result.amountInPaise).toBe(291000);

    // Confirm that the line items output authoritative prices, not the tampered ones
    const kajuItem = result.items.find((i) => i.id === "kaju");
    expect(kajuItem?.price).toBe(880);
    expect(kajuItem?.lineTotal).toBe(1760);

    const pistaItem = result.items.find((i) => i.id === "pista");
    expect(pistaItem?.price).toBe(1140);
    expect(pistaItem?.lineTotal).toBe(1140);
  });

  it("calculates correct pricing for luxury gift hampers", async () => {
    const hamperCart = [
      { id: "royal-amethyst-casket", qty: 1, price: 10 }, // Real price 3450
      { id: "gulab-filigree-casket", qty: 1, price: 20 }, // Real price 3850
    ];

    const result = await calculateAuthoritativeOrderPricing(hamperCart);

    expect(result.subtotal).toBe(3450 + 3850);
    expect(result.total).toBe(3450 + 3850 + STANDARD_SHIPPING_FEE);
    expect(result.amountInPaise).toBe((3450 + 3850 + STANDARD_SHIPPING_FEE) * 100);
  });

  it("rejects non-existent product IDs", async () => {
    const maliciousCart = [{ id: "unregistered-dry-fruit", qty: 1, price: 100 }];

    await expect(calculateAuthoritativeOrderPricing(maliciousCart)).rejects.toThrow(
      "Product 'unregistered-dry-fruit' does not exist in the authoritative catalog.",
    );
  });

  it("rejects empty cart and invalid quantities", async () => {
    await expect(calculateAuthoritativeOrderPricing([])).rejects.toThrow("Cart cannot be empty");
    await expect(calculateAuthoritativeOrderPricing([{ id: "kaju", qty: 0 }])).rejects.toThrow(
      "Invalid quantity for product kaju",
    );
    await expect(calculateAuthoritativeOrderPricing([{ id: "kaju", qty: -3 }])).rejects.toThrow(
      "Invalid quantity for product kaju",
    );
  });
});

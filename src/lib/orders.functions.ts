import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";

const ListMyOrdersSchema = z.object({}).strict().optional();

export const listMyOrders = createServerFn({ method: "POST" })
  .validator((data?: unknown) => ListMyOrdersSchema.parse(data || {}))
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("orders")
      .select(
        "id, order_number, status, payment_status, currency, subtotal_amount, shipping_amount, total_amount, created_at, shipping_address_line1, shipping_city, shipping_state, shipping_postal_code, shipping_country, order_items(id, product_id, name, origin, image_url, unit_amount, quantity, line_total)",
      )
      .order("created_at", { ascending: false })
      .limit(50);

    if (error) {
      console.error("[Orders] Failed to fetch user orders:", error);
      throw new Error("Failed to load your orders. Please try again later.");
    }
    return data ?? [];
  });

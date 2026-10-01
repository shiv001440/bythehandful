import { createServerFn } from "@tanstack/react-start";
import { supabaseAdmin } from "../integrations/supabase/client.server";

export const getCatalogPrices = createServerFn({ method: "GET" })
  .handler(async () => {
    try {
      const { data, error } = await supabaseAdmin
        .from("products" as any)
        .select("id, price, price_250g, price_500g");

      if (error) {
        console.error("Error fetching catalog prices:", error);
        return [];
      }
      return data || [];
    } catch (e) {
      console.error("Error in getCatalogPrices:", e);
      return [];
    }
  });

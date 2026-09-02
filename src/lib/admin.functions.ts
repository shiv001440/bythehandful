import { createServerFn } from "@tanstack/react-start";
import { requireAdminAuth, requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export const listAllOrders = createServerFn({ method: "POST" })
  .middleware([requireAdminAuth])
  .validator((data?: { page?: number; pageSize?: number; status?: string }) => data || {})
  .handler(async ({ data, context }) => {
    const page = Math.max(1, data?.page || 1);
    const pageSize = data?.pageSize || 20;
    const status = data?.status && data.status !== "all" ? data.status : null;

    let query = context.supabase
      .from("orders")
      .select(
        "id, order_number, status, payment_status, currency, subtotal_amount, shipping_amount, total_amount, created_at, customer_name, customer_email, customer_phone, shipping_city, shipping_state, order_items(id, name, origin, image_url, unit_amount, quantity, line_total)",
        { count: "exact" },
      );

    if (status) {
      query = query.eq("status", status);
    }

    // Always sort latest orders first (with or without filter)
    query = query.order("created_at", { ascending: false });

    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    const { data: orders, error, count } = await query.range(from, to);

    if (error) throw new Error(error.message);

    const total = count ?? 0;
    const totalPages = Math.ceil(total / pageSize) || 1;

    return {
      orders: orders ?? [],
      total,
      page,
      pageSize,
      totalPages,
    };
  });

export const updateOrderStatus = createServerFn({ method: "POST" })
  .middleware([requireAdminAuth])
  .validator((data: { orderId: string; status: string }) => data)
  .handler(async ({ data, context }) => {
    const { orderId, status } = data;
    const { error } = await context.supabase.from("orders").update({ status }).eq("id", orderId);

    if (error) throw new Error(error.message);
    return { success: true };
  });

export const checkIsAdmin = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const { data: profile, error } = await supabase
      .from("profiles")
      .select("is_admin")
      .eq("id", userId)
      .single();

    if (error || !profile) return { isAdmin: false };
    return { isAdmin: !!profile.is_admin };
  });

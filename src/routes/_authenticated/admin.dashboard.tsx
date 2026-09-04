import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { listAllOrders, updateOrderStatus } from "@/lib/admin.functions";
import { getProductImage } from "@/lib/product-images";
import {
  ChevronLeft,
  ChevronRight,
  Filter,
  Eye,
  Package,
  MapPin,
  User,
  Mail,
  Phone,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/_authenticated/admin/dashboard")({
  head: () => ({
    meta: [{ title: "Admin Dashboard — By the Handful" }],
  }),
  component: AdminDashboard,
});

function fmt(paise: number) {
  return `₹${(paise / 100).toLocaleString("en-IN")}`;
}

const ORDER_STATUS_FILTERS = [
  { label: "All Orders", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Processing", value: "processing" },
  { label: "Shipped", value: "shipped" },
  { label: "Delivered", value: "delivered" },
  { label: "Cancelled", value: "cancelled" },
] as const;

const ORDER_STATUSES = ["pending", "processing", "shipped", "delivered", "cancelled"] as const;

type AdminOrderItem = {
  id: string;
  product_id?: string | null;
  name: string;
  origin?: string | null;
  image_url?: string | null;
  unit_amount: number;
  quantity: number;
  line_total: number;
};

type AdminOrder = {
  id: string;
  order_number: string;
  status: string;
  payment_status: string;
  currency?: string | null;
  subtotal_amount: number;
  shipping_amount: number;
  total_amount: number;
  created_at: string;
  customer_name?: string | null;
  customer_email?: string | null;
  customer_phone?: string | null;
  shipping_address_line1?: string | null;
  shipping_city?: string | null;
  shipping_state?: string | null;
  shipping_postal_code?: string | null;
  shipping_country?: string | null;
  razorpay_order_id?: string | null;
  order_items?: AdminOrderItem[];
};

function AdminDashboard() {
  const queryClient = useQueryClient();
  const fetchAllOrders = useServerFn(listAllOrders);
  const updateStatusFn = useServerFn(updateOrderStatus);

  const [page, setPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(null);
  const pageSize = 20;

  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ["admin", "orders", { page, status: selectedStatus }],
    queryFn: () => fetchAllOrders({ data: { page, pageSize, status: selectedStatus } }),
    placeholderData: keepPreviousData,
  });

  const orders = (data?.orders ?? []) as unknown as AdminOrder[];
  const totalOrders = data?.total ?? 0;
  const totalPages = data?.totalPages ?? 1;

  const updateMutation = useMutation({
    mutationFn: async ({ orderId, status }: { orderId: string; status: string }) => {
      return await updateStatusFn({ data: { orderId, status } });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "orders"] });
    },
  });

  const handleStatusFilterChange = (status: string) => {
    setSelectedStatus(status);
    setPage(1); // Reset to first page whenever filter changes
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-amber/40 selection:text-ink">
      <Navbar />
      <main className="flex-1 px-6 md:px-12 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <p className="text-[10px] tracking-[0.3em] uppercase text-foreground/50 font-bold">
                Management Console
              </p>
              <h1 className="mt-1 font-serif text-3xl md:text-5xl italic leading-tight">
                Order Dashboard
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-xs uppercase tracking-[0.2em] font-semibold border border-primary/30 px-3.5 py-1.5 bg-primary/5 text-primary">
                Administrator Access
              </div>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-black/10 pb-4">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              <div className="flex items-center gap-1.5 text-xs text-foreground/50 mr-2 uppercase tracking-wider font-semibold">
                <Filter className="size-3.5" />
                <span>Filter:</span>
              </div>
              {ORDER_STATUS_FILTERS.map((f) => {
                const isActive = selectedStatus === f.value;
                return (
                  <button
                    key={f.value}
                    onClick={() => handleStatusFilterChange(f.value)}
                    className={`px-3 py-1.5 text-[11px] tracking-[0.18em] uppercase font-semibold transition whitespace-nowrap cursor-pointer ${
                      isActive
                        ? "bg-foreground text-background"
                        : "bg-transparent text-foreground/70 hover:bg-black/5 hover:text-foreground border border-black/10"
                    }`}
                  >
                    {f.label}
                  </button>
                );
              })}
            </div>

            <div className="text-xs text-foreground/60 tracking-wider">
              {totalOrders > 0 ? (
                <>
                  Showing{" "}
                  <span className="font-semibold text-foreground">
                    {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, totalOrders)}
                  </span>{" "}
                  of <span className="font-semibold text-foreground">{totalOrders}</span> orders
                  (Latest first)
                </>
              ) : (
                <span>0 orders found</span>
              )}
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="my-6 p-4 border border-red-500/30 bg-red-50 text-red-700 text-sm">
              Access Denied or Error: {error instanceof Error ? error.message : String(error)}
            </div>
          )}

          {/* Orders Table */}
          {isLoading ? (
            <div className="mt-8 flex flex-col gap-4 animate-pulse">
              <div className="h-12 bg-black/5 w-full" />
              <div className="h-12 bg-black/5 w-full" />
              <div className="h-12 bg-black/5 w-full" />
              <div className="h-12 bg-black/5 w-full" />
              <div className="h-12 bg-black/5 w-full" />
            </div>
          ) : (
            <div className="border border-black/10 overflow-hidden bg-background shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm whitespace-nowrap">
                  <thead className="bg-black/5 uppercase text-[10px] tracking-[0.2em] font-semibold text-foreground/70 border-b border-black/10">
                    <tr>
                      <th className="px-5 py-3.5">Order</th>
                      <th className="px-5 py-3.5">Date & Time</th>
                      <th className="px-5 py-3.5">Customer</th>
                      <th className="px-5 py-3.5">Contact</th>
                      <th className="px-5 py-3.5">Items</th>
                      <th className="px-5 py-3.5">Total</th>
                      <th className="px-5 py-3.5">Payment</th>
                      <th className="px-5 py-3.5">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/5">
                    {orders.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="px-6 py-16 text-center text-foreground/50">
                          <p className="font-serif text-xl italic text-foreground/70">
                            No orders found
                          </p>
                          <p className="mt-1 text-xs text-foreground/50">
                            {selectedStatus === "all"
                              ? "There are currently no orders in the system."
                              : `No orders matching status "${selectedStatus}".`}
                          </p>
                        </td>
                      </tr>
                    ) : (
                      orders.map((order) => (
                        <tr key={order.id} className="hover:bg-black/[0.02] transition-colors">
                          <td className="px-5 py-4 font-mono text-xs font-semibold">
                            {order.order_number}
                          </td>
                          <td className="px-5 py-4 text-xs text-foreground/60">
                            <div>
                              {new Date(order.created_at).toLocaleDateString("en-IN", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </div>
                            <div className="text-[10px] text-foreground/40 font-mono">
                              {new Date(order.created_at).toLocaleTimeString("en-IN", {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </div>
                          </td>
                          <td className="px-5 py-4">
                            <div className="font-medium text-foreground">
                              {order.customer_name || "Guest Customer"}
                            </div>
                            <div className="text-[11px] text-foreground/50 truncate max-w-[180px]">
                              {[order.shipping_city, order.shipping_state]
                                .filter(Boolean)
                                .join(", ") || "No address"}
                            </div>
                          </td>
                          <td className="px-5 py-4 text-xs text-foreground/65">
                            <div>{order.customer_email || "—"}</div>
                            <div className="text-[11px] font-mono text-foreground/50">
                              {order.customer_phone || "—"}
                            </div>
                          </td>
                          <td className="px-5 py-4 text-xs">
                            <button
                              type="button"
                              onClick={() => setSelectedOrder(order)}
                              className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-black/15 bg-black/[0.03] hover:bg-primary/10 hover:border-primary/40 text-foreground text-[11px] font-medium transition cursor-pointer group"
                              title="Click to view ordered items and details"
                            >
                              <Package className="size-3 text-foreground/50 group-hover:text-primary transition-colors" />
                              <span>
                                {order.order_items?.length || 0} item
                                {(order.order_items?.length || 0) === 1 ? "" : "s"}
                              </span>
                              <Eye className="size-3 text-foreground/40 group-hover:text-primary transition-colors ml-0.5" />
                            </button>
                          </td>
                          <td className="px-5 py-4 font-serif text-base font-semibold">
                            {fmt(order.total_amount)}
                          </td>
                          <td className="px-5 py-4">
                            <span
                              className={`inline-flex items-center px-2.5 py-1 text-[10px] uppercase tracking-wider font-bold ${
                                order.payment_status === "paid"
                                  ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                                  : order.payment_status === "failed"
                                    ? "bg-red-50 text-red-800 border border-red-200"
                                    : "bg-amber-50 text-amber-800 border border-amber-200"
                              }`}
                            >
                              {order.payment_status}
                            </span>
                          </td>
                          <td className="px-5 py-4">
                            <select
                              className="bg-background border border-black/15 px-2.5 py-1 text-xs uppercase tracking-wider font-medium outline-none focus:border-primary transition cursor-pointer hover:border-black/30"
                              value={order.status}
                              disabled={updateMutation.isPending}
                              onChange={(e) => {
                                const newStatus = e.target.value;
                                if (
                                  window.confirm(
                                    `Update order ${order.order_number} to "${newStatus.toUpperCase()}"?`,
                                  )
                                ) {
                                  updateMutation.mutate({
                                    orderId: order.id,
                                    status: newStatus,
                                  });
                                }
                              }}
                            >
                              {ORDER_STATUSES.map((s) => (
                                <option key={s} value={s}>
                                  {s.toUpperCase()}
                                </option>
                              ))}
                            </select>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 border-t border-black/10 bg-black/[0.01]">
                  <div className="text-xs text-foreground/60 tracking-wider">
                    Page <span className="font-semibold text-foreground">{page}</span> of{" "}
                    <span className="font-semibold text-foreground">{totalPages}</span> (20 orders /
                    page)
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page <= 1 || isFetching}
                      className="flex items-center gap-1 px-3.5 py-1.5 border border-black/15 text-xs font-semibold uppercase tracking-wider hover:bg-black/5 disabled:opacity-40 disabled:cursor-not-allowed transition"
                    >
                      <ChevronLeft className="size-3.5" />
                      <span>Previous</span>
                    </button>

                    {/* Page Numbers */}
                    <div className="hidden sm:flex items-center gap-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1)
                        .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
                        .reduce<(number | string)[]>((acc, p, idx, arr) => {
                          if (idx > 0 && p - (arr[idx - 1] as number) > 1) {
                            acc.push("...");
                          }
                          acc.push(p);
                          return acc;
                        }, [])
                        .map((p, idx) =>
                          typeof p === "string" ? (
                            <span
                              key={`ellipsis-${idx}`}
                              className="px-1 text-xs text-foreground/40"
                            >
                              …
                            </span>
                          ) : (
                            <button
                              key={p}
                              onClick={() => setPage(p)}
                              disabled={isFetching}
                              className={`size-8 text-xs font-semibold tracking-wider transition ${
                                page === p
                                  ? "bg-foreground text-background font-bold"
                                  : "hover:bg-black/5 text-foreground/70 border border-black/10"
                              }`}
                            >
                              {p}
                            </button>
                          ),
                        )}
                    </div>

                    <button
                      onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                      disabled={page >= totalPages || isFetching}
                      className="flex items-center gap-1 px-3.5 py-1.5 border border-black/15 text-xs font-semibold uppercase tracking-wider hover:bg-black/5 disabled:opacity-40 disabled:cursor-not-allowed transition"
                    >
                      <span>Next</span>
                      <ChevronRight className="size-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Order Details Dialog */}
      <Dialog
        open={Boolean(selectedOrder)}
        onOpenChange={(isOpen) => {
          if (!isOpen) setSelectedOrder(null);
        }}
      >
        <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col p-0 overflow-hidden bg-background text-foreground border border-black/15 shadow-2xl rounded-none sm:rounded-none">
          {selectedOrder && (
            <>
              {/* Header */}
              <div className="p-6 border-b border-black/10 bg-black/[0.02]">
                <div className="flex items-start justify-between gap-4 pr-6">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] tracking-[0.25em] uppercase text-foreground/50 font-bold">
                        Order Details
                      </span>
                      <span
                        className={`inline-flex items-center px-2 py-0.5 text-[9px] uppercase tracking-wider font-bold ${
                          selectedOrder.payment_status === "paid"
                            ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                            : selectedOrder.payment_status === "failed"
                              ? "bg-red-50 text-red-800 border border-red-200"
                              : "bg-amber-50 text-amber-800 border border-amber-200"
                        }`}
                      >
                        {selectedOrder.payment_status}
                      </span>
                    </div>
                    <DialogTitle className="font-serif text-2xl md:text-3xl italic tracking-tight">
                      {selectedOrder.order_number}
                    </DialogTitle>
                    <DialogDescription className="text-xs text-foreground/60 mt-1">
                      Placed on{" "}
                      {new Date(selectedOrder.created_at).toLocaleDateString("en-IN", {
                        weekday: "short",
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </DialogDescription>
                  </div>

                  {/* Status update directly in modal */}
                  <div className="flex flex-col items-end gap-1.5">
                    <label className="text-[10px] tracking-[0.2em] uppercase text-foreground/50 font-semibold">
                      Status
                    </label>
                    <select
                      className="bg-background border border-black/20 px-2.5 py-1 text-xs uppercase tracking-wider font-semibold outline-none focus:border-primary transition cursor-pointer hover:border-black/40"
                      value={selectedOrder.status}
                      disabled={updateMutation.isPending}
                      onChange={(e) => {
                        const newStatus = e.target.value;
                        if (
                          window.confirm(
                            `Update order ${selectedOrder.order_number} to "${newStatus.toUpperCase()}"?`,
                          )
                        ) {
                          updateMutation.mutate({
                            orderId: selectedOrder.id,
                            status: newStatus,
                          });
                          setSelectedOrder((prev) =>
                            prev ? { ...prev, status: newStatus } : null,
                          );
                        }
                      }}
                    >
                      {ORDER_STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s.toUpperCase()}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Scrollable Body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Customer & Shipping Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 border border-black/10 bg-black/[0.01]">
                  <div>
                    <p className="text-[10px] tracking-[0.2em] uppercase font-bold text-foreground/50 mb-2 flex items-center gap-1.5">
                      <User className="size-3.5" /> Customer Info
                    </p>
                    <p className="font-medium text-sm text-foreground">
                      {selectedOrder.customer_name || "Guest Customer"}
                    </p>
                    <p className="text-xs text-foreground/70 mt-0.5 flex items-center gap-1.5">
                      <Mail className="size-3 text-foreground/40" />
                      {selectedOrder.customer_email || "No email"}
                    </p>
                    <p className="text-xs text-foreground/70 mt-0.5 flex items-center gap-1.5 font-mono">
                      <Phone className="size-3 text-foreground/40" />
                      {selectedOrder.customer_phone || "No phone"}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] tracking-[0.2em] uppercase font-bold text-foreground/50 mb-2 flex items-center gap-1.5">
                      <MapPin className="size-3.5" /> Shipping Address
                    </p>
                    <div className="text-xs text-foreground/85 leading-relaxed">
                      {selectedOrder.shipping_address_line1 && (
                        <div>{selectedOrder.shipping_address_line1}</div>
                      )}
                      <div>
                        {[
                          selectedOrder.shipping_city,
                          selectedOrder.shipping_state,
                          selectedOrder.shipping_postal_code,
                        ]
                          .filter(Boolean)
                          .join(", ")}
                      </div>
                      {selectedOrder.shipping_country && (
                        <div>{selectedOrder.shipping_country}</div>
                      )}
                      {!selectedOrder.shipping_address_line1 &&
                        !selectedOrder.shipping_city &&
                        !selectedOrder.shipping_state && (
                          <div className="text-foreground/45 italic">No shipping address recorded</div>
                        )}
                    </div>
                    {selectedOrder.razorpay_order_id && (
                      <p className="text-[10px] text-foreground/45 mt-2 font-mono truncate">
                        Razorpay: {selectedOrder.razorpay_order_id}
                      </p>
                    )}
                  </div>
                </div>

                {/* Items Section */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-[10px] tracking-[0.2em] uppercase font-bold text-foreground/50 flex items-center gap-1.5">
                      <Package className="size-3.5" /> Ordered Items (
                      {selectedOrder.order_items?.length || 0})
                    </p>
                    <span className="text-xs text-foreground/60">
                      Total Units:{" "}
                      {selectedOrder.order_items?.reduce((sum, item) => sum + item.quantity, 0) ||
                        0}
                    </span>
                  </div>

                  {!selectedOrder.order_items || selectedOrder.order_items.length === 0 ? (
                    <div className="p-6 text-center border border-dashed border-black/15 text-foreground/50 text-xs italic">
                      No line items recorded for this order.
                    </div>
                  ) : (
                    <div className="border border-black/10 divide-y divide-black/5">
                      {selectedOrder.order_items.map((item) => {
                        const itemImg = getProductImage(
                          item.product_id,
                          item.image_url,
                          item.name,
                        );
                        return (
                          <div
                            key={item.id}
                            className="p-3.5 flex items-center gap-4 hover:bg-black/[0.01] transition-colors"
                          >
                            <img
                              src={itemImg}
                              alt={item.name}
                              className="size-14 object-cover border border-black/10 shrink-0 bg-secondary"
                              onError={(e) => {
                                e.currentTarget.onerror = null;
                                e.currentTarget.src = getProductImage("kaju");
                              }}
                            />
                            <div className="flex-1 min-w-0">
                              <p className="font-serif text-base text-foreground truncate">
                                {item.name}
                              </p>
                              {item.origin && (
                                <p className="text-[10px] tracking-[0.15em] uppercase text-foreground/50 truncate mt-0.5">
                                  {item.origin}
                                </p>
                              )}
                              <div className="flex items-center gap-3 mt-1 text-xs text-foreground/60">
                                <span className="inline-flex items-center px-2 py-0.5 bg-black/5 text-[11px] font-medium">
                                  Qty: {item.quantity}
                                </span>
                                <span>Unit: {fmt(item.unit_amount)}</span>
                              </div>
                            </div>
                            <div className="text-right shrink-0">
                              <p className="font-serif text-base font-semibold">
                                {fmt(item.line_total)}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Pricing Summary */}
                <div className="border-t border-black/10 pt-4 space-y-1.5 text-xs">
                  <div className="flex justify-between text-foreground/60">
                    <span>Subtotal</span>
                    <span>{fmt(selectedOrder.subtotal_amount || selectedOrder.total_amount)}</span>
                  </div>
                  {selectedOrder.shipping_amount > 0 && (
                    <div className="flex justify-between text-foreground/60">
                      <span>Shipping Fee</span>
                      <span>{fmt(selectedOrder.shipping_amount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-baseline pt-2 border-t border-black/5 font-serif text-lg font-semibold text-foreground">
                    <span>Total Amount</span>
                    <span className="text-xl italic">{fmt(selectedOrder.total_amount)}</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
      <Footer />
    </div>
  );
}

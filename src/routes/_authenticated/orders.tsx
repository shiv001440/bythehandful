import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useEffect } from "react";
import { listMyOrders } from "@/lib/orders.functions";
import { useCart } from "@/lib/cart";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

import { getProductImage } from "@/lib/product-images";

export const Route = createFileRoute("/_authenticated/orders")({
  head: () => ({
    meta: [
      { title: "Your orders — By the Handful" },
      {
        name: "description",
        content: "Track your By the Handful orders, payment status and shipping details.",
      },
      { property: "og:title", content: "Your orders — By the Handful" },
      {
        property: "og:description",
        content: "Track your By the Handful orders, payment status and shipping details.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  validateSearch: (search: Record<string, unknown>): { paid?: string } => ({
    paid: typeof search["paid"] === "string" ? search["paid"] : undefined,
  }),
  component: OrdersPage,
});

function fmt(paise: number) {
  return `₹${(paise / 100).toLocaleString("en-IN")}`;
}

function OrdersPage() {
  const { paid } = Route.useSearch();
  const { clear } = useCart();
  const fetchOrders = useServerFn(listMyOrders);
  const { data, isLoading, error } = useQuery({
    queryKey: ["orders"],
    queryFn: () => fetchOrders(),
  });

  useEffect(() => {
    if (paid) clear();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paid]);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-amber/40 selection:text-ink">
      <Navbar />
      <main className="px-6 md:px-12 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="mt-4 md:mt-8 font-serif text-4xl md:text-5xl italic leading-tight">
            Your orders
          </h1>

          {paid && (
            <div className="mt-6 border border-primary/30 bg-primary/5 px-5 py-4">
              <p className="font-serif text-xl italic">Thank you — payment received.</p>
              <p className="text-sm text-foreground/65 mt-1">
                Order {paid} is confirmed. Status updates appear below.
              </p>
            </div>
          )}

          {isLoading && <p className="mt-10 text-sm text-foreground/60">Loading your orders…</p>}
          {error && <p className="mt-10 text-sm text-primary">Could not load your orders.</p>}

          {data && data.length === 0 && (
            <p className="mt-10 text-sm text-foreground/60">
              No orders yet.{" "}
              <Link to="/" className="border-b border-ink/30">
                Browse the pantry →
              </Link>
            </p>
          )}

          <div className="mt-10 space-y-8">
            {data?.map((o) => {
              const subtotal =
                o.subtotal_amount ||
                o.order_items?.reduce((sum, it) => sum + it.line_total, 0) ||
                o.total_amount;
              const shipping = o.shipping_amount ?? Math.max(0, o.total_amount - subtotal);
              const totalItemsCount =
                o.order_items?.reduce((sum, it) => sum + it.quantity, 0) ||
                o.order_items?.length ||
                0;

              return (
                <article
                  key={o.id}
                  className="border border-black/10 bg-background p-6 md:p-8 shadow-2xs"
                >
                  {/* Top Bar */}
                  <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-black/10 pb-4">
                    <div>
                      <span className="text-[10px] tracking-[0.25em] uppercase text-foreground/50 font-bold block">
                        Order Number
                      </span>
                      <p className="font-mono text-sm font-semibold tracking-wider text-foreground">
                        {o.order_number}
                      </p>
                    </div>
                    <div className="flex items-center gap-4 text-right">
                      <div>
                        <span className="text-[10px] tracking-[0.25em] uppercase text-foreground/50 block">
                          Date Placed
                        </span>
                        <span className="text-xs text-foreground/70 font-medium">
                          {new Date(o.created_at).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                      <div className="pl-4 border-l border-black/10">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 text-[10px] uppercase tracking-wider font-bold ${
                            o.payment_status === "paid"
                              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                              : o.payment_status === "failed"
                                ? "bg-red-50 text-red-800 border border-red-200"
                                : "bg-amber-50 text-amber-800 border border-amber-200"
                          }`}
                        >
                          {o.payment_status === "paid"
                            ? "Paid"
                            : o.payment_status === "failed"
                              ? "Failed"
                              : "Pending"}{" "}
                          · {o.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Line Items List */}
                  <div className="py-2">
                    <p className="text-[10px] tracking-[0.2em] uppercase text-foreground/50 font-bold pt-3 pb-1">
                      Ordered Items ({totalItemsCount} {totalItemsCount === 1 ? "unit" : "units"})
                    </p>
                    <ul className="divide-y divide-black/5">
                      {o.order_items?.map((i) => {
                        const itemImg = getProductImage(i.product_id, i.image_url, i.name);
                        return (
                          <li key={i.id} className="py-3.5 flex items-center gap-4">
                            <img
                              src={itemImg}
                              alt={i.name}
                              className="size-14 object-cover border border-black/10 shrink-0 bg-secondary"
                              onError={(e) => {
                                e.currentTarget.onerror = null;
                                e.currentTarget.src = getProductImage("kaju");
                              }}
                            />
                            <div className="flex-1 min-w-0">
                              <p className="font-serif text-base truncate text-foreground">
                                {i.name}
                              </p>
                              {i.origin && (
                                <p className="text-[10px] tracking-[0.15em] uppercase text-foreground/50 truncate mt-0.5">
                                  {i.origin}
                                </p>
                              )}
                              <p className="text-xs text-foreground/60 mt-1">
                                <span className="font-medium text-foreground">
                                  Qty: {i.quantity}
                                </span>
                                {i.unit_amount > 0 && (
                                  <span className="text-foreground/45 ml-2">
                                    ({fmt(i.unit_amount)} each)
                                  </span>
                                )}
                              </p>
                            </div>
                            <span className="text-sm font-serif font-semibold shrink-0">
                              {fmt(i.line_total)}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  {/* Bottom: Delivery Address & Full Price Breakup */}
                  <div className="mt-4 pt-4 border-t border-black/10 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                    {/* Shipping Address */}
                    <div className="text-xs text-foreground/70">
                      {o.shipping_address_line1 || o.shipping_city || o.shipping_state ? (
                        <>
                          <p className="text-[10px] tracking-[0.2em] uppercase font-bold text-foreground/50 mb-1.5">
                            Delivery Address
                          </p>
                          <p className="leading-relaxed">
                            {o.shipping_address_line1 && (
                              <span>
                                {o.shipping_address_line1}
                                <br />
                              </span>
                            )}
                            {[o.shipping_city, o.shipping_state, o.shipping_postal_code]
                              .filter(Boolean)
                              .join(", ")}
                            {o.shipping_country && <span>, {o.shipping_country}</span>}
                          </p>
                        </>
                      ) : (
                        <div />
                      )}
                    </div>

                    {/* Price Breakup */}
                    <div className="bg-black/[0.02] border border-black/5 p-4 space-y-2 text-xs">
                      <p className="text-[10px] tracking-[0.2em] uppercase font-bold text-foreground/50 mb-2">
                        Price Breakup
                      </p>
                      <div className="flex justify-between text-foreground/70">
                        <span>Items Subtotal</span>
                        <span>{fmt(subtotal)}</span>
                      </div>
                      <div className="flex justify-between text-foreground/70">
                        <span>Delivery / Shipping</span>
                        <span>{shipping > 0 ? fmt(shipping) : "Free"}</span>
                      </div>
                      <div className="pt-2 border-t border-black/10 flex justify-between items-baseline font-semibold text-foreground">
                        <span className="text-xs uppercase tracking-wider">Total Amount</span>
                        <span className="font-serif text-xl italic">{fmt(o.total_amount)}</span>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

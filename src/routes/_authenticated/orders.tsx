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

          <div className="mt-10 space-y-6">
            {data?.map((o) => (
              <article key={o.id} className="border border-black/10 p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div>
                    <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/50">
                      {o.order_number}
                    </p>
                    <p className="font-serif text-2xl italic">{fmt(o.total_amount)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/50">
                      {new Date(o.created_at).toLocaleDateString("en-IN")}
                    </p>
                    <p className="text-[11px] tracking-[0.2em] uppercase font-semibold">
                      {o.payment_status === "paid"
                        ? "Paid"
                        : o.payment_status === "failed"
                          ? "Payment failed"
                          : "Awaiting payment"}{" "}
                      · {o.status}
                    </p>
                  </div>
                </div>
                <ul className="mt-5 divide-y divide-black/5">
                  {o.order_items?.map((i) => {
                    const itemImg = getProductImage(i.product_id, i.image_url, i.name);
                    return (
                      <li key={i.id} className="py-3 flex items-center gap-3">
                        <img
                          src={itemImg}
                          alt={i.name}
                          className="size-12 object-cover border border-black/5 shrink-0"
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = getProductImage("kaju");
                          }}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-serif text-base truncate">{i.name}</p>
                          <p className="text-[10px] tracking-[0.18em] uppercase text-foreground/50">
                            Qty {i.quantity}
                          </p>
                        </div>
                        <span className="text-sm">{fmt(i.line_total)}</span>
                      </li>
                    );
                  })}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

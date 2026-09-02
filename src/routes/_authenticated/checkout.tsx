import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { createRazorpayOrder, verifyRazorpayPayment } from "@/lib/checkout.functions";
import { useRazorpay, type RazorpayOrderOptions } from "react-razorpay";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/_authenticated/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — By The Handful" },
      {
        name: "description",
        content: "Complete your order with secure checkout.",
      },
    ],
  }),
  component: Checkout,
});

function Checkout() {
  const { items, subtotal, clear } = useCart();
  const navigate = useNavigate();
  const { Razorpay, isLoading: isRazorpayLoading, error: razorpayError } = useRazorpay();
  const [isProcessing, setIsProcessing] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      alert("Your cart is empty");
      return;
    }

    if (!Razorpay) {
      alert("Payment gateway is still loading. Please try again in a few seconds.");
      return;
    }

    setIsProcessing(true);

    try {
      // 1. Create order on backend
      const res = await createRazorpayOrder({ data: { items, form } });

      const options: RazorpayOrderOptions = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || "",
        amount: res.amount,
        currency: res.currency as RazorpayOrderOptions["currency"],
        name: "By The Handful",
        description: "Order Payment",
        order_id: res.razorpayOrderId,
        handler: async (response: {
          razorpay_payment_id: string;
          razorpay_order_id: string;
          razorpay_signature: string;
        }) => {
          try {
            // 2. Verify payment & create order on backend
            await verifyRazorpayPayment({
              data: {
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                items,
                form,
              },
            });
            clear();
            navigate({ to: "/orders", search: { paid: res.razorpayOrderId } });
          } catch (err: unknown) {
            alert(
              "Payment verification failed: " + (err instanceof Error ? err.message : String(err)),
            );
          }
        },
        prefill: {
          name: `${form.firstName} ${form.lastName}`.trim(),
          email: form.email,
          contact: form.phone,
        },
        theme: {
          color: "#1c1917",
        },
      };

      const rzp = new Razorpay(options);
      rzp.on("payment.failed", function (response: { error?: { description?: string } }) {
        alert("Payment Failed: " + (response.error?.description || "Unknown error"));
      });
      rzp.open();
    } catch (err: unknown) {
      alert("Failed to initiate checkout: " + (err instanceof Error ? err.message : String(err)));
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-amber/40 selection:text-ink">
      <Navbar />
      <main className="flex-1 px-6 md:px-12 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="mt-4 md:mt-8 font-serif text-4xl md:text-5xl italic leading-tight mb-10">
            Checkout
          </h1>

          {items.length === 0 ? (
            <div className="py-16 text-center border border-black/10 rounded-sm">
              <p className="font-serif text-2xl italic text-foreground/70">Your pouch is empty</p>
              <p className="mt-2 text-sm text-foreground/50">
                Add some heirloom harvests before proceeding to checkout.
              </p>
              <div className="mt-6">
                <Link
                  to="/"
                  className="inline-block px-6 py-3 bg-foreground text-background text-xs tracking-[0.2em] uppercase font-medium hover:bg-foreground/90 transition"
                >
                  Explore The Harvest
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-12 gap-10 lg:gap-12">
              <div className="md:col-span-7">
                <h2 className="font-serif text-2xl italic mb-6">Shipping Details</h2>
                <form id="checkout-form" onSubmit={handleCheckout} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider mb-1.5 text-foreground/60">
                        First Name
                      </label>
                      <input
                        required
                        name="firstName"
                        value={form.firstName}
                        onChange={handleChange}
                        className="w-full bg-transparent border border-black/15 px-4 py-2.5 text-sm outline-none focus:border-primary transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider mb-1.5 text-foreground/60">
                        Last Name
                      </label>
                      <input
                        required
                        name="lastName"
                        value={form.lastName}
                        onChange={handleChange}
                        className="w-full bg-transparent border border-black/15 px-4 py-2.5 text-sm outline-none focus:border-primary transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider mb-1.5 text-foreground/60">
                      Email
                    </label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full bg-transparent border border-black/15 px-4 py-2.5 text-sm outline-none focus:border-primary transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider mb-1.5 text-foreground/60">
                      Phone
                    </label>
                    <input
                      required
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+91"
                      className="w-full bg-transparent border border-black/15 px-4 py-2.5 text-sm outline-none focus:border-primary transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider mb-1.5 text-foreground/60">
                      Shipping Address
                    </label>
                    <input
                      required
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      placeholder="Street address, apartment, suite"
                      className="w-full bg-transparent border border-black/15 px-4 py-2.5 text-sm outline-none focus:border-primary transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider mb-1.5 text-foreground/60">
                        City
                      </label>
                      <input
                        required
                        name="city"
                        value={form.city}
                        onChange={handleChange}
                        className="w-full bg-transparent border border-black/15 px-4 py-2.5 text-sm outline-none focus:border-primary transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider mb-1.5 text-foreground/60">
                        State
                      </label>
                      <input
                        required
                        name="state"
                        value={form.state}
                        onChange={handleChange}
                        className="w-full bg-transparent border border-black/15 px-4 py-2.5 text-sm outline-none focus:border-primary transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider mb-1.5 text-foreground/60">
                        Postal Code
                      </label>
                      <input
                        required
                        name="postalCode"
                        value={form.postalCode}
                        onChange={handleChange}
                        className="w-full bg-transparent border border-black/15 px-4 py-2.5 text-sm outline-none focus:border-primary transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider mb-1.5 text-foreground/60">
                        Country
                      </label>
                      <input
                        readOnly
                        value="India"
                        className="w-full bg-black/5 border border-black/10 px-4 py-2.5 text-sm outline-none text-foreground/60 cursor-not-allowed"
                      />
                    </div>
                  </div>
                </form>
              </div>

              <div className="md:col-span-5">
                <div className="border border-black/10 p-6 md:p-8 bg-secondary/30 sticky top-24">
                  <h2 className="font-serif text-2xl italic mb-6">Order Summary</h2>

                  <div className="space-y-4 mb-6 divide-y divide-black/5">
                    {items.map((item) => (
                      <div key={item.id} className="pt-3 first:pt-0 flex justify-between text-sm">
                        <span className="text-foreground/80">
                          {item.name}{" "}
                          <span className="text-foreground/50 text-xs">× {item.qty}</span>
                        </span>
                        <span className="font-medium">
                          ₹{(item.price * item.qty).toLocaleString("en-IN")}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-black/10 pt-4 space-y-2.5 text-sm">
                    <div className="flex justify-between">
                      <span className="text-foreground/70">Subtotal</span>
                      <span>₹{subtotal.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-foreground/70">Shipping</span>
                      <span>₹10</span>
                    </div>
                    <div className="flex justify-between text-base font-semibold mt-4 pt-4 border-t border-black/10">
                      <span>Total</span>
                      <span>₹{(subtotal + 10).toLocaleString("en-IN")}</span>
                    </div>
                  </div>

                  {razorpayError && (
                    <p className="mt-3 text-xs text-primary">
                      Notice: Payment library failed to initialize ({razorpayError}).
                    </p>
                  )}

                  <button
                    form="checkout-form"
                    disabled={items.length === 0 || isProcessing || isRazorpayLoading}
                    className="w-full mt-6 py-4 bg-foreground text-background text-xs tracking-[0.2em] uppercase font-semibold disabled:opacity-50 hover:bg-foreground/90 transition shadow-sm"
                  >
                    {isProcessing
                      ? "Processing…"
                      : isRazorpayLoading
                        ? "Loading Payment…"
                        : "Pay with Razorpay"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

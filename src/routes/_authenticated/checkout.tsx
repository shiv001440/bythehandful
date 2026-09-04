import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { createRazorpayOrder, verifyRazorpayPayment } from "@/lib/checkout.functions";
import { useRazorpay, type RazorpayOrderOptions } from "react-razorpay";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { cn } from "@/lib/utils";

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

type FormField =
  "firstName" | "lastName" | "email" | "phone" | "address" | "city" | "state" | "postalCode";

function validateField(name: FormField, value: string): string {
  const trimmed = value.trim();

  switch (name) {
    case "firstName":
      if (!trimmed) return "First name is required";
      if (trimmed.length < 2) return "First name must be at least 2 characters";
      if (!/^[a-zA-Z\s'-]+$/.test(trimmed)) return "First name can only contain letters";
      return "";

    case "lastName":
      if (!trimmed) return "Last name is required";
      if (!/^[a-zA-Z\s'-]+$/.test(trimmed)) return "Last name can only contain letters";
      return "";

    case "email":
      if (!trimmed) return "Email address is required";
      if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(trimmed)) {
        return "Please enter a valid email address";
      }
      return "";

    case "phone": {
      if (!trimmed) return "Phone number is required";
      const cleaned = trimmed.replace(/[\s\-()]/g, "");
      // Indian mobile numbers: optional +91, 91, or 0 followed by 10 digits starting with 6, 7, 8, or 9
      if (!/^(?:\+91|91|0)?[6-9]\d{9}$/.test(cleaned)) {
        return "Enter a valid 10-digit mobile number (e.g. 9876543210)";
      }
      return "";
    }

    case "address":
      if (!trimmed) return "Shipping address is required";
      if (trimmed.length < 5) return "Please enter a complete address (at least 5 characters)";
      return "";

    case "city":
      if (!trimmed) return "City is required";
      if (trimmed.length < 2) return "City must be at least 2 characters";
      if (!/^[a-zA-Z\s.-]+$/.test(trimmed)) return "City can only contain letters";
      return "";

    case "state":
      if (!trimmed) return "State is required";
      if (trimmed.length < 2) return "State must be at least 2 characters";
      if (!/^[a-zA-Z\s.-]+$/.test(trimmed)) return "State can only contain letters";
      return "";

    case "postalCode": {
      if (!trimmed) return "Postal code is required";
      const cleaned = trimmed.replace(/\s/g, "");
      if (!/^[1-9][0-9]{5}$/.test(cleaned)) {
        return "Enter a valid 6-digit PIN code (e.g. 110001)";
      }
      return "";
    }

    default:
      return "";
  }
}

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

  const [errors, setErrors] = useState<Partial<Record<FormField, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<FormField, boolean>>>({});

  const validateAll = (): { isValid: boolean; errors: Partial<Record<FormField, string>> } => {
    const newErrors: Partial<Record<FormField, string>> = {};
    const fields: FormField[] = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "address",
      "city",
      "state",
      "postalCode",
    ];

    for (const field of fields) {
      const error = validateField(field, form[field]);
      if (error) {
        newErrors[field] = error;
      }
    }

    return {
      isValid: Object.keys(newErrors).length === 0,
      errors: newErrors,
    };
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name as FormField;
    let value = e.target.value;

    // Field-specific input restrictions
    if (name === "postalCode") {
      value = value.replace(/\D/g, "").slice(0, 6);
    } else if (name === "phone") {
      value = value.replace(/[^0-9+\s-]/g, "").slice(0, 15);
    }

    setForm((prev) => ({ ...prev, [name]: value }));

    // Re-validate dynamically if the field was already touched or currently has an error
    if (touched[name] || errors[name]) {
      const fieldError = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: fieldError }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const name = e.target.name as FormField;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const fieldError = validateField(name, form[name]);
    setErrors((prev) => ({ ...prev, [name]: fieldError }));
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();

    if (items.length === 0) {
      alert("Your cart is empty");
      return;
    }

    // Validate all fields
    const { isValid, errors: validationErrors } = validateAll();
    if (!isValid) {
      setErrors(validationErrors);
      setTouched({
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        address: true,
        city: true,
        state: true,
        postalCode: true,
      });

      // Scroll and focus first invalid field
      const firstInvalidField = Object.keys(validationErrors)[0];
      if (typeof document !== "undefined") {
        const el = document.querySelector<HTMLInputElement>(`[name="${firstInvalidField}"]`);
        if (el) {
          el.focus();
          el.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }
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
                <form id="checkout-form" onSubmit={handleCheckout} noValidate className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider mb-1.5 text-foreground/60">
                        First Name <span className="text-destructive">*</span>
                      </label>
                      <input
                        name="firstName"
                        value={form.firstName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="John"
                        className={cn(
                          "w-full bg-transparent border px-4 py-2.5 text-sm outline-none transition-colors",
                          errors.firstName && touched.firstName
                            ? "border-destructive/80 focus:border-destructive bg-destructive/5"
                            : "border-black/15 focus:border-primary",
                        )}
                      />
                      {errors.firstName && touched.firstName && (
                        <p className="text-[11px] text-destructive mt-1 font-medium">
                          {errors.firstName}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider mb-1.5 text-foreground/60">
                        Last Name <span className="text-destructive">*</span>
                      </label>
                      <input
                        name="lastName"
                        value={form.lastName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Doe"
                        className={cn(
                          "w-full bg-transparent border px-4 py-2.5 text-sm outline-none transition-colors",
                          errors.lastName && touched.lastName
                            ? "border-destructive/80 focus:border-destructive bg-destructive/5"
                            : "border-black/15 focus:border-primary",
                        )}
                      />
                      {errors.lastName && touched.lastName && (
                        <p className="text-[11px] text-destructive mt-1 font-medium">
                          {errors.lastName}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider mb-1.5 text-foreground/60">
                      Email Address <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="john.doe@example.com"
                      className={cn(
                        "w-full bg-transparent border px-4 py-2.5 text-sm outline-none transition-colors",
                        errors.email && touched.email
                          ? "border-destructive/80 focus:border-destructive bg-destructive/5"
                          : "border-black/15 focus:border-primary",
                      )}
                    />
                    {errors.email && touched.email && (
                      <p className="text-[11px] text-destructive mt-1 font-medium">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider mb-1.5 text-foreground/60">
                      Phone Number <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="e.g. 98765 43210"
                      className={cn(
                        "w-full bg-transparent border px-4 py-2.5 text-sm outline-none transition-colors",
                        errors.phone && touched.phone
                          ? "border-destructive/80 focus:border-destructive bg-destructive/5"
                          : "border-black/15 focus:border-primary",
                      )}
                    />
                    {errors.phone && touched.phone ? (
                      <p className="text-[11px] text-destructive mt-1 font-medium">
                        {errors.phone}
                      </p>
                    ) : (
                      <p className="text-[11px] text-foreground/40 mt-1">
                        10-digit Indian mobile number
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider mb-1.5 text-foreground/60">
                      Shipping Address <span className="text-destructive">*</span>
                    </label>
                    <input
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Street address, flat / apartment number, area"
                      className={cn(
                        "w-full bg-transparent border px-4 py-2.5 text-sm outline-none transition-colors",
                        errors.address && touched.address
                          ? "border-destructive/80 focus:border-destructive bg-destructive/5"
                          : "border-black/15 focus:border-primary",
                      )}
                    />
                    {errors.address && touched.address && (
                      <p className="text-[11px] text-destructive mt-1 font-medium">
                        {errors.address}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider mb-1.5 text-foreground/60">
                        City <span className="text-destructive">*</span>
                      </label>
                      <input
                        name="city"
                        value={form.city}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="e.g. Mumbai"
                        className={cn(
                          "w-full bg-transparent border px-4 py-2.5 text-sm outline-none transition-colors",
                          errors.city && touched.city
                            ? "border-destructive/80 focus:border-destructive bg-destructive/5"
                            : "border-black/15 focus:border-primary",
                        )}
                      />
                      {errors.city && touched.city && (
                        <p className="text-[11px] text-destructive mt-1 font-medium">
                          {errors.city}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider mb-1.5 text-foreground/60">
                        State <span className="text-destructive">*</span>
                      </label>
                      <input
                        name="state"
                        value={form.state}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="e.g. Maharashtra"
                        className={cn(
                          "w-full bg-transparent border px-4 py-2.5 text-sm outline-none transition-colors",
                          errors.state && touched.state
                            ? "border-destructive/80 focus:border-destructive bg-destructive/5"
                            : "border-black/15 focus:border-primary",
                        )}
                      />
                      {errors.state && touched.state && (
                        <p className="text-[11px] text-destructive mt-1 font-medium">
                          {errors.state}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider mb-1.5 text-foreground/60">
                        Postal Code (PIN) <span className="text-destructive">*</span>
                      </label>
                      <input
                        name="postalCode"
                        value={form.postalCode}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="e.g. 400001"
                        maxLength={6}
                        className={cn(
                          "w-full bg-transparent border px-4 py-2.5 text-sm outline-none transition-colors",
                          errors.postalCode && touched.postalCode
                            ? "border-destructive/80 focus:border-destructive bg-destructive/5"
                            : "border-black/15 focus:border-primary",
                        )}
                      />
                      {errors.postalCode && touched.postalCode && (
                        <p className="text-[11px] text-destructive mt-1 font-medium">
                          {errors.postalCode}
                        </p>
                      )}
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

import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import Razorpay from "razorpay";
import crypto from "crypto";

export type CheckoutItemPayload = {
  id: string;
  name: string;
  origin?: string;
  img?: string;
  price: number;
  qty: number;
};

export type CheckoutFormPayload = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country?: string;
};

export const createRazorpayOrder = createServerFn({ method: "POST" })
  .validator((data: { items: CheckoutItemPayload[]; form: CheckoutFormPayload }) => data)
  .middleware([requireSupabaseAuth])
  .handler(async ({ data }) => {
    const { items } = data;

    // Calculate totals
    const subtotal = items.reduce((acc, item) => acc + item.price * item.qty, 0);
    const shipping = 10; // Fixed shipping for now
    const total = subtotal + shipping;

    // Initialize Razorpay
    const razorpay = new Razorpay({
      key_id: process.env.VITE_RAZORPAY_KEY_ID || "",
      key_secret: process.env.RAZORPAY_KEY_SECRET || "",
    });

    // Create Razorpay order
    const options = {
      amount: Math.round(total * 100), // amount in smallest currency unit (paise)
      currency: "INR" as const,
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    if (!order || !order.id) {
      throw new Error("Failed to create Razorpay order");
    }

    return {
      razorpayOrderId: order.id,
      amount: options.amount,
      currency: options.currency,
    };
  });

export const verifyRazorpayPayment = createServerFn({ method: "POST" })
  .validator(
    (data: {
      razorpay_payment_id: string;
      razorpay_order_id: string;
      razorpay_signature: string;
      items: CheckoutItemPayload[];
      form: CheckoutFormPayload;
    }) => data,
  )
  .middleware([requireSupabaseAuth])
  .handler(async ({ data, context }) => {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature, items, form } = data;
    const { supabase, user } = context;

    const secret = process.env.RAZORPAY_KEY_SECRET || "";

    const generated_signature = crypto
      .createHmac("sha256", secret)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generated_signature !== razorpay_signature) {
      throw new Error("Invalid payment signature");
    }

    // Calculate totals
    const subtotal = items.reduce((acc, item) => acc + item.price * item.qty, 0);
    const shipping = 10;
    const total = subtotal + shipping;
    const orderNumber = `ORD-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;

    // Create order in DB (only after payment is verified)
    const { data: dbOrder, error: orderError } = await supabase
      .from("orders")
      .insert({
        user_id: user.id,
        order_number: orderNumber,
        status: "processing",
        payment_status: "paid",
        currency: "INR",
        subtotal_amount: Math.round(subtotal * 100),
        shipping_amount: Math.round(shipping * 100),
        total_amount: Math.round(total * 100),
        razorpay_order_id: razorpay_order_id,
        customer_email: form.email,
        customer_name: (form.firstName + " " + form.lastName).trim(),
        customer_phone: form.phone,
        shipping_address_line1: form.address,
        shipping_city: form.city,
        shipping_state: form.state,
        shipping_postal_code: form.postalCode,
        shipping_country: form.country || "India",
      })
      .select()
      .single();

    if (orderError) throw new Error(orderError.message);

    // Insert order items
    const orderItems = items.map((item: CheckoutItemPayload) => ({
      order_id: dbOrder.id,
      product_id: item.id,
      name: item.name,
      origin: item.origin,
      image_url: item.img,
      unit_amount: Math.round(item.price * 100),
      quantity: item.qty,
      line_total: Math.round(item.price * item.qty * 100),
    }));

    const { error: itemsError } = await supabase.from("order_items").insert(orderItems);
    if (itemsError) throw new Error(itemsError.message);

    // Create payment record
    const { error: paymentError } = await supabase.from("payments").insert({
      order_id: dbOrder.id,
      user_id: user.id,
      amount: Math.round(total * 100),
      currency: "INR",
      provider: "razorpay",
      status: "completed",
      razorpay_order_id: razorpay_order_id,
      razorpay_payment_id: razorpay_payment_id,
      razorpay_signature: razorpay_signature,
    });

    if (paymentError) throw new Error(paymentError.message);

    return { success: true, dbOrderId: dbOrder.id, orderNumber };
  });

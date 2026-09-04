-- Migration: Enforce payment and order idempotency constraints
-- Guarantees at the database level that duplicate orders, payments, or order items cannot be created

-- 1. Ensure unique index on orders.razorpay_order_id
CREATE UNIQUE INDEX IF NOT EXISTS idx_orders_razorpay_order_id ON public.orders (razorpay_order_id)
  WHERE razorpay_order_id IS NOT NULL;

-- 2. Ensure unique index on payments.razorpay_payment_id
CREATE UNIQUE INDEX IF NOT EXISTS idx_payments_razorpay_payment_id ON public.payments (razorpay_payment_id)
  WHERE razorpay_payment_id IS NOT NULL;

-- 3. Prevent duplicate order items for the same order and product
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'unique_order_items_order_product'
  ) THEN
    ALTER TABLE public.order_items ADD CONSTRAINT unique_order_items_order_product UNIQUE (order_id, product_id);
  END IF;
END $$;

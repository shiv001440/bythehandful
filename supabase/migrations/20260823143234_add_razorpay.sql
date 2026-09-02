-- Drop PayPal columns
ALTER TABLE public.orders DROP COLUMN IF EXISTS paypal_order_id;
ALTER TABLE public.payments DROP COLUMN IF EXISTS paypal_order_id;

-- Add Razorpay columns
ALTER TABLE public.orders ADD COLUMN razorpay_order_id text UNIQUE;
ALTER TABLE public.payments ADD COLUMN razorpay_order_id text UNIQUE;
ALTER TABLE public.payments ADD COLUMN razorpay_payment_id text UNIQUE;
ALTER TABLE public.payments ADD COLUMN razorpay_signature text;

-- Update the default provider for payments table
ALTER TABLE public.payments ALTER COLUMN provider SET DEFAULT 'razorpay';

ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS paypal_order_id text UNIQUE;
ALTER TABLE public.payments ADD COLUMN IF NOT EXISTS paypal_order_id text UNIQUE;

-- Add INSERT policy for orders
CREATE POLICY "Users can insert their own orders"
  ON public.orders FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- Add INSERT policy for order items
CREATE POLICY "Users can insert items of their own orders"
  ON public.order_items FOR INSERT TO authenticated WITH CHECK (
    EXISTS (SELECT 1 FROM public.orders o WHERE o.id = order_id AND o.user_id = auth.uid())
  );

-- Add INSERT policy and permissions for payments table
GRANT INSERT ON public.payments TO authenticated;

CREATE POLICY "Users can insert payments for their own orders"
  ON public.payments FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

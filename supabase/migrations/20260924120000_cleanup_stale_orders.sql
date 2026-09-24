-- Enable the pg_cron extension if it's not already available
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Create the cleanup function
CREATE OR REPLACE FUNCTION public.cleanup_stale_orders()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- First, delete associated payments for these orders to avoid orphans
  DELETE FROM public.payments 
  WHERE order_id IN (
    SELECT id FROM public.orders 
    WHERE (status = 'pending' OR status = 'payment_failed')
      AND created_at < NOW() - INTERVAL '12 hours'
  );

  -- Then delete the orders (order_items will be deleted automatically due to ON DELETE CASCADE)
  DELETE FROM public.orders 
  WHERE (status = 'pending' OR status = 'payment_failed')
    AND created_at < NOW() - INTERVAL '12 hours';
END;
$$;

-- Unschedule it first to ensure idempotency if this migration runs multiple times
SELECT cron.unschedule('cleanup-stale-orders');

-- Schedule the cleanup function to run every hour
SELECT cron.schedule('cleanup-stale-orders', '0 * * * *', 'SELECT public.cleanup_stale_orders()');

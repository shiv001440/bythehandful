-- Migration: Lockdown orders, order_items, and payments tables
-- Ensures regular authenticated users cannot UPDATE/DELETE payments,
-- cannot DELETE orders or order_items, and cannot tamper with status/payment_status.

-- 1. Revoke dangerous permissions from public / authenticated / anon roles
REVOKE UPDATE, DELETE ON public.payments FROM authenticated, anon, public;
REVOKE UPDATE, DELETE ON public.order_items FROM authenticated, anon, public;
REVOKE DELETE ON public.orders FROM authenticated, anon, public;
REVOKE UPDATE ON public.orders FROM anon, public;

-- 2. Ensure RLS is strictly enabled on all transaction tables
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- 3. Function & Trigger: Enforce that status and payment_status cannot be spoofed by client
CREATE OR REPLACE FUNCTION public.enforce_order_status_protection()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  is_admin_user boolean;
  is_service_role boolean;
BEGIN
  -- Check if caller is service_role (bypasses via backend supabaseAdmin)
  is_service_role := (COALESCE(auth.role(), '') = 'service_role' OR current_user = 'postgres');

  -- Check if caller is an admin
  is_admin_user := public.is_admin();

  -- If executed via service_role, allow full mutations
  IF is_service_role THEN
    RETURN NEW;
  END IF;

  -- Enforce restrictions on regular authenticated/client users:
  IF TG_OP = 'INSERT' THEN
    -- A regular client creating an order cannot pre-mark it as 'paid' or 'processing'
    IF NOT is_admin_user THEN
      IF NEW.payment_status IS DISTINCT FROM 'unpaid' OR NEW.status IS DISTINCT FROM 'pending' THEN
        RAISE EXCEPTION 'Regular users cannot set payment_status or status on order creation. Must be set by server functions.';
      END IF;
    END IF;
  ELSIF TG_OP = 'UPDATE' THEN
    -- Regular users cannot update orders at all
    IF NOT is_admin_user THEN
      RAISE EXCEPTION 'Regular authenticated users cannot update order records.';
    END IF;

    -- Admins can update fulfillment status, but payment_status can only be modified by backend service_role
    IF NEW.payment_status IS DISTINCT FROM OLD.payment_status THEN
      RAISE EXCEPTION 'payment_status on orders can only be mutated by server functions using service_role.';
    END IF;
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_enforce_order_status_protection ON public.orders;

CREATE TRIGGER trg_enforce_order_status_protection
  BEFORE INSERT OR UPDATE ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION public.enforce_order_status_protection();

-- 4. Function & Trigger: Enforce that payments rows are immutable for clients
CREATE OR REPLACE FUNCTION public.enforce_payments_immutable()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Block any non-service_role caller from updating or deleting payment records
  IF COALESCE(auth.role(), '') <> 'service_role' AND current_user <> 'postgres' THEN
    RAISE EXCEPTION 'Payment records are immutable and cannot be updated or deleted by clients.';
  END IF;
  RETURN OLD;
END;
$$;

DROP TRIGGER IF EXISTS trg_enforce_payments_immutable ON public.payments;

CREATE TRIGGER trg_enforce_payments_immutable
  BEFORE UPDATE OR DELETE ON public.payments
  FOR EACH ROW
  EXECUTE FUNCTION public.enforce_payments_immutable();

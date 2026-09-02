import { Link, useNavigate } from "@tanstack/react-router";
import { useCart } from "@/lib/cart";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";

export function Navbar() {
  const { count, setOpen } = useCart();
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const checkAdminStatus = async (userId?: string) => {
    if (!userId) {
      setIsAdmin(false);
      return;
    }
    try {
      const { data } = await supabase.from("profiles").select("is_admin").eq("id", userId).single();
      setIsAdmin(!!data?.is_admin);
    } catch {
      setIsAdmin(false);
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      checkAdminStatus(data.session?.user?.id);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      checkAdminStatus(session?.user?.id);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAdmin(false);
    navigate({ to: "/" });
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/90 backdrop-blur-md border-b border-black/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
        <Link to="/" className="font-serif text-2xl italic tracking-tight">
          By the Handful
        </Link>
        <div className="hidden md:flex items-center gap-8 text-[11px] tracking-[0.25em] uppercase font-semibold text-foreground/70">
          <Link to="/" hash="harvest" className="hover:text-primary transition">
            Pantry
          </Link>
          <Link to="/" hash="hampers" className="hover:text-primary transition">
            Hampers
          </Link>
          <Link to="/" hash="story" className="hover:text-primary transition">
            Process
          </Link>
          <Link to="/" hash="about" className="hover:text-primary transition">
            Heritage
          </Link>
          <Link to="/" hash="advisor" className="hover:text-primary transition">
            Advisor
          </Link>
          <Link to="/" hash="notes" className="hover:text-primary transition">
            Notes
          </Link>
          <Link to="/orders" className="hover:text-primary transition">
            Orders
          </Link>
        </div>
        <div className="flex items-center gap-4 md:gap-6">
          {isAdmin && (
            <Link
              to="/admin/dashboard"
              className="text-[10px] tracking-[0.2em] uppercase font-bold text-primary border border-primary/40 px-3 py-1.5 hover:bg-primary hover:text-white transition"
            >
              Admin Dashboard
            </Link>
          )}
          {session ? (
            <button
              onClick={handleLogout}
              className="text-[10px] tracking-[0.25em] uppercase font-semibold text-foreground/70 hover:text-primary transition"
            >
              Sign Out
            </button>
          ) : (
            <Link
              to="/auth"
              className="text-[10px] tracking-[0.25em] uppercase font-semibold text-foreground/70 hover:text-primary transition"
            >
              Sign In
            </Link>
          )}
          <button
            onClick={() => setOpen(true)}
            aria-label="Open pouch"
            className="flex items-center gap-2 pl-3 pr-4 py-2 bg-ink text-background rounded-none hover:bg-primary transition active:scale-[0.98]"
          >
            <span className="text-[10px] tracking-[0.3em] uppercase font-bold">Pouch</span>
            <span className="w-px h-3 bg-background/30" />
            <span className="font-serif italic text-base leading-none">
              {String(count).padStart(2, "0")}
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
}

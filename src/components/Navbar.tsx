import { Link, useNavigate } from "@tanstack/react-router";
import { useCart } from "@/lib/cart";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";
import logoImg from "@/assets/logo.png";

// ─── Dry-fruit categories ────────────────────────────────────────────────────
const DRY_FRUIT_CATS = [
  { id: "cat-almonds",           title: "Almonds" },
  { id: "cat-flavoured-almonds", title: "Flavoured Almonds" },
  { id: "cat-pistachio",         title: "Pistachio" },
  { id: "cat-cashews",           title: "Cashew Nut" },
  { id: "cat-raisins",           title: "Raisins" },
  { id: "cat-walnuts",           title: "Walnut" },
  { id: "cat-dried-fruits",      title: "Dried Fruits" },
  { id: "cat-exotic-nuts",       title: "Exotic Nuts" },
  { id: "cat-seeds",             title: "Seeds" },
  { id: "cat-special",           title: "Special" },
];

// ─── Desktop hover dropdown ───────────────────────────────────────────────────
function NavDropdown({ label, children }: { label: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1 text-[11px] tracking-[0.22em] uppercase font-semibold text-foreground/70 hover:text-primary transition-colors duration-200"
      >
        {label}
        <svg className={`w-2.5 h-2.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`} viewBox="0 0 10 6" fill="none">
          <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && <div className="absolute top-full left-0 right-0 h-3 z-40" />}

      <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-3 bg-background/98 backdrop-blur-xl border border-black/8 shadow-elegant z-50 transition-all duration-200 origin-top ${open ? "opacity-100 scale-y-100 pointer-events-auto" : "opacity-0 scale-y-95 pointer-events-none"}`}>
        <div className="absolute -top-[5px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-background border-l border-t border-black/8 rotate-45" />
        <div className="relative py-2">{children}</div>
      </div>
    </div>
  );
}

function DropItem({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) {
  return (
    <a href={href} onClick={onClick} className="flex items-center gap-2 px-5 py-2 text-[10px] tracking-[0.22em] uppercase font-semibold text-foreground/65 hover:text-primary hover:bg-primary/5 transition-colors duration-150 whitespace-nowrap">
      <span className="w-1 h-1 rounded-full bg-current opacity-40 flex-shrink-0" />
      {children}
    </a>
  );
}

// ─── Mobile accordion section ─────────────────────────────────────────────────
function MobileSection({ label, children }: { label: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-primary/10">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between py-4 px-6 text-[11px] tracking-[0.28em] uppercase font-semibold text-foreground/80"
      >
        {label}
        <svg className={`w-3 h-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`} viewBox="0 0 10 6" fill="none">
          <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="pb-3 pl-4">{children}</div>
      </div>
    </div>
  );
}

function MobileLink({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="flex items-center gap-3 px-6 py-3 text-[10px] tracking-[0.25em] uppercase font-semibold text-foreground/65 hover:text-primary transition-colors"
    >
      <span className="w-1 h-1 rounded-full bg-primary opacity-60" />
      {children}
    </a>
  );
}

// ─── Main Navbar ─────────────────────────────────────────────────────────────
export function Navbar() {
  const { count, setOpen } = useCart();
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const checkAdminStatus = async (userId?: string) => {
    if (!userId) { setIsAdmin(false); return; }
    try {
      const { data } = await supabase.from("profiles").select("is_admin").eq("id", userId).single();
      setIsAdmin(!!data?.is_admin);
    } catch { setIsAdmin(false); }
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      checkAdminStatus(data.session?.user?.id);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      checkAdminStatus(session?.user?.id);
    });
    return () => subscription.unsubscribe();
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAdmin(false);
    setMobileOpen(false);
    navigate({ to: "/" });
  };

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <nav className="relative sticky top-0 z-50 w-full bg-background/95 backdrop-blur-md border-b border-primary/15">
        {/* Gold shimmer rule */}
        <div className="absolute bottom-0 inset-x-0 h-px gold-rule" />

        <div className="w-full px-6 md:px-10 h-16 grid grid-cols-[auto_1fr_auto] items-center gap-4">

          {/* ── LEFT: Burger (mobile) + Logo (desktop) ── */}
          <div className="flex items-center gap-3">
            {/* Burger — mobile only */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-[5px] shrink-0"
            >
              <span className={`block h-px w-5 bg-foreground transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-[6px]" : ""}`} />
              <span className={`block h-px w-5 bg-foreground transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
              <span className={`block h-px w-5 bg-foreground transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-[6px]" : ""}`} />
            </button>

            {/* Logo — desktop only (left-aligned) */}
            <Link to="/" aria-label="By the Handful — Home" className="hidden md:block" onClick={closeMobile}>
              <img src={logoImg} alt="By the Handful" className="h-12 w-auto object-contain" />
            </Link>
          </div>

          {/* Logo — mobile only, absolutely centred */}
          <Link
            to="/"
            aria-label="By the Handful — Home"
            className="md:hidden absolute left-1/2 -translate-x-1/2"
            onClick={closeMobile}
          >
            <img src={logoImg} alt="By the Handful" className="h-12 w-auto object-contain" />
          </Link>

          {/* ── CENTER: Desktop nav ── */}
          <div className="hidden md:flex items-center justify-center gap-7 text-[11px] tracking-[0.22em] uppercase font-semibold text-foreground/70">
            <Link to="/" className="hover:text-primary transition-colors duration-200">Home</Link>
            <a href="/#about" className="hover:text-primary transition-colors duration-200">About Us</a>

            <NavDropdown label="Hampers">
              <div className="min-w-[200px]">
                <DropItem href="/collections/hampers-luxury">Luxury Hampers</DropItem>
                <DropItem href="/collections/hampers-corporate">Corporate Hampers</DropItem>
              </div>
            </NavDropdown>

            <NavDropdown label="Dry Fruits">
              <div className="min-w-[200px]">
                {DRY_FRUIT_CATS.map((cat) => (
                  <DropItem key={cat.id} href={`/collections/${cat.id}`}>{cat.title}</DropItem>
                ))}
              </div>
            </NavDropdown>

            <Link to="/orders" className="hover:text-primary transition-colors duration-200">Orders</Link>
          </div>

          {/* ── RIGHT: Actions ── */}
          <div className="flex items-center gap-3 md:gap-5 justify-end">
            {isAdmin && (
              <Link to="/admin/dashboard" className="hidden md:inline-flex text-[9px] tracking-[0.2em] uppercase font-bold text-primary border border-primary/40 px-3 py-1.5 hover:bg-primary hover:text-white transition">
                Admin
              </Link>
            )}

            {session ? (
              <button onClick={handleLogout} className="hidden md:inline-flex text-[10px] tracking-[0.25em] uppercase font-semibold text-foreground/70 hover:text-primary transition">
                Sign Out
              </button>
            ) : (
              <Link to="/auth" className="hidden md:inline-flex text-[10px] tracking-[0.25em] uppercase font-semibold text-foreground/70 hover:text-primary transition">
                Sign In
              </Link>
            )}

            {/* Pouch */}
            <button
              onClick={() => setOpen(true)}
              aria-label="Open pouch"
              className="flex items-center gap-2 pl-3 pr-4 py-2 bg-primary text-primary-foreground hover:bg-amber transition-colors duration-200 active:scale-[0.98]"
            >
              <span className="text-[10px] tracking-[0.3em] uppercase font-bold">Pouch</span>
              <span className="w-px h-3 bg-primary-foreground/30" />
              <span className="font-serif italic text-base leading-none">{String(count).padStart(2, "0")}</span>
            </button>

          </div>

        </div>
      </nav>

      {/* ── Mobile drawer backdrop ── */}
      <div
        className={`fixed inset-0 z-40 bg-ink/40 backdrop-blur-sm transition-opacity duration-300 md:hidden ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={closeMobile}
      />

      {/* ── Mobile drawer panel ── */}
      <div className={`fixed top-16 left-0 bottom-0 z-40 w-[min(320px,100vw)] bg-background border-r border-primary/15 shadow-elegant flex flex-col transition-transform duration-300 ease-in-out md:hidden ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}>

        {/* Gold rule at top */}
        <div className="h-px gold-rule flex-shrink-0" />

        {/* Scrollable nav content */}
        <div className="flex-1 overflow-y-auto py-2">

          {/* Direct links */}
          <div className="border-b border-primary/10">
            <MobileLink href="/" onClick={closeMobile}>Home</MobileLink>
            <MobileLink href="/#about" onClick={closeMobile}>About Us</MobileLink>
          </div>

          {/* Hampers accordion */}
          <MobileSection label="Hampers">
            <MobileLink href="/collections/hampers-luxury" onClick={closeMobile}>Luxury Hampers</MobileLink>
            <MobileLink href="/collections/hampers-corporate" onClick={closeMobile}>Corporate Hampers</MobileLink>
          </MobileSection>

          {/* Dry Fruits accordion */}
          <MobileSection label="Dry Fruits">
            {DRY_FRUIT_CATS.map((cat) => (
              <MobileLink key={cat.id} href={`/collections/${cat.id}`} onClick={closeMobile}>
                {cat.title}
              </MobileLink>
            ))}
          </MobileSection>

          {/* More direct links */}
          <div className="border-b border-primary/10">
            <MobileLink href="/orders" onClick={closeMobile}>Orders</MobileLink>
          </div>

        </div>

        {/* ── Bottom auth strip ── */}
        <div className="flex-shrink-0 border-t border-primary/15 px-6 py-5 space-y-3">
          {isAdmin && (
            <Link
              to="/admin/dashboard"
              onClick={closeMobile}
              className="block text-center text-[9px] tracking-[0.25em] uppercase font-bold text-primary border border-primary/40 py-2 hover:bg-primary hover:text-white transition"
            >
              Admin Dashboard
            </Link>
          )}
          {session ? (
            <button
              onClick={handleLogout}
              className="block w-full text-center text-[10px] tracking-[0.25em] uppercase font-semibold text-foreground/60 hover:text-primary transition py-2"
            >
              Sign Out
            </button>
          ) : (
            <Link
              to="/auth"
              onClick={closeMobile}
              className="block text-center text-[10px] tracking-[0.25em] uppercase font-semibold text-foreground/60 hover:text-primary transition py-2"
            >
              Sign In
            </Link>
          )}
          <p className="text-center text-[8px] tracking-[0.3em] uppercase text-foreground/30 font-semibold pt-1">
            By the Handful · Est. 1923
          </p>
        </div>

      </div>
    </>
  );
}

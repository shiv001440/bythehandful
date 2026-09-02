import { createFileRoute, Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — By the Handful" },
      {
        name: "description",
        content: "Sign in or create an account to checkout and track your By the Handful orders.",
      },
      { property: "og:title", content: "Sign in — By the Handful" },
      {
        property: "og:description",
        content: "Sign in or create an account to checkout and track your By the Handful orders.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  validateSearch: (search: Record<string, unknown>): { next?: string } => ({
    next: typeof search["next"] === "string" ? search["next"] : undefined,
  }),
  component: AuthPage,
});

function safeNext(next?: string) {
  if (!next) return "/";
  return next.startsWith("/") && !next.startsWith("//") ? next : "/";
}

function AuthPage() {
  const { next } = useSearch({ from: "/auth" });
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: safeNext(next) });
    });
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) navigate({ to: safeNext(next) });
    });
    return () => sub.subscription.unsubscribe();
  }, [navigate, next]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    setMessage("");
    try {
      // Client-side hash to prevent raw password from appearing in Network tab
      const encoder = new TextEncoder();
      const data = encoder.encode(password);
      const hashBuffer = await crypto.subtle.digest("SHA-256", data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashedPassword = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");

      if (mode === "signup") {
        const { data, error: err } = await supabase.auth.signUp({
          email,
          password: hashedPassword,
          options: {
            emailRedirectTo: window.location.origin + safeNext(next),
            data: { full_name: fullName },
          },
        });
        if (err) throw err;
        if (!data.session) setMessage("Check your email to confirm your account, then sign in.");
      } else {
        const { error: err } = await supabase.auth.signInWithPassword({
          email,
          password: hashedPassword,
        });
        if (err) throw err;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setBusy(false);
    }
  };

  const google = async () => {
    setError("");
    const { error: resultError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin + safeNext(next),
      },
    });

    if (resultError) {
      setError("Google sign-in failed. Please try again.");
      return;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-16">
        <div className="w-full max-w-md">
          <h1 className="font-serif text-4xl italic leading-tight">
            {mode === "signin" ? "Welcome back." : "Create your account."}
          </h1>
          <p className="mt-2 text-sm text-foreground/60">
            An account keeps your orders, payments and shipping details in one place.
          </p>

          <button
            onClick={google}
            className="mt-8 w-full py-3.5 border border-ink/20 text-[11px] tracking-[0.25em] uppercase font-semibold hover:bg-ink hover:text-background transition"
          >
            Continue with Google
          </button>

          <div className="my-6 flex items-center gap-4 text-[10px] tracking-[0.25em] uppercase text-foreground/40">
            <span className="h-px flex-1 bg-black/10" /> or{" "}
            <span className="h-px flex-1 bg-black/10" />
          </div>

          <form onSubmit={submit} className="space-y-4">
            {mode === "signup" && (
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Full name"
                maxLength={120}
                required
                className="w-full px-4 py-3 border border-black/10 bg-transparent text-sm outline-none focus:border-primary"
              />
            )}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              maxLength={255}
              required
              className="w-full px-4 py-3 border border-black/10 bg-transparent text-sm outline-none focus:border-primary"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              minLength={6}
              maxLength={72}
              required
              className="w-full px-4 py-3 border border-black/10 bg-transparent text-sm outline-none focus:border-primary"
            />
            {error && <p className="text-sm text-primary">{error}</p>}
            {message && <p className="text-sm text-foreground/70">{message}</p>}
            <button
              type="submit"
              disabled={busy}
              className="w-full py-3.5 bg-ink text-background text-[11px] tracking-[0.25em] uppercase font-semibold hover:bg-primary transition disabled:opacity-60"
            >
              {busy ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
            </button>
          </form>

          <button
            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
            className="mt-6 text-[11px] tracking-[0.2em] uppercase text-foreground/60 hover:text-primary transition"
          >
            {mode === "signin" ? "New here? Create an account" : "Already have an account? Sign in"}
          </button>
        </div>
      </main>
    </div>
  );
}

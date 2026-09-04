import { createFileRoute, useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { serverSignIn, serverSignUp, serverResetPassword } from "@/lib/auth.functions";

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
  const [mode, setMode] = useState<"signin" | "signup" | "reset" | "update-password">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Check if arriving from a recovery email link via URL fragment/params
    const hasRecoveryHash =
      typeof window !== "undefined" &&
      (window.location.hash.includes("type=recovery") ||
        window.location.search.includes("type=recovery"));

    if (hasRecoveryHash) {
      setMode("update-password");
    } else {
      supabase.auth.getSession().then(({ data }) => {
        if (data.session && mode !== "update-password") {
          navigate({ to: safeNext(next) });
        }
      });
    }

    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY") {
        setMode("update-password");
      } else if (event === "SIGNED_IN" && session) {
        if (mode !== "update-password") {
          navigate({ to: safeNext(next) });
        }
      }
    });

    return () => sub.subscription.unsubscribe();
  }, [navigate, next, mode]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    setMessage("");

    try {
      if (mode === "reset") {
        const res = await serverResetPassword({
          data: {
            email,
            redirectTo: window.location.origin + "/auth",
          },
        });
        setMessage(res.message);
        return;
      }

      // Client-side hash to prevent raw password from appearing in Network tab
      const encoder = new TextEncoder();
      const data = encoder.encode(password);
      const hashBuffer = await crypto.subtle.digest("SHA-256", data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashedPassword = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");

      if (mode === "update-password") {
        if (password !== confirmPassword) {
          setError("Passwords do not match. Please try again.");
          return;
        }

        const { error: updateError } = await supabase.auth.updateUser({
          password: hashedPassword,
        });

        if (updateError) {
          throw new Error(updateError.message);
        }

        setMessage("Your password has been updated successfully! Redirecting…");
        setTimeout(() => {
          navigate({ to: safeNext(next) });
        }, 1500);
        return;
      }

      if (mode === "signup") {
        const res = await serverSignUp({
          data: {
            email,
            password: hashedPassword,
            fullName: fullName || undefined,
            emailRedirectTo: window.location.origin + safeNext(next),
          },
        });

        if (res.userAlreadyExists) {
          setError("An account with this email is already registered. Please sign in below.");
          setMode("signin");
          return;
        }

        if (res.session) {
          await supabase.auth.setSession(res.session);
          navigate({ to: safeNext(next) });
        } else if (res.requiresConfirmation) {
          setMessage("Check your email to confirm your account, then sign in.");
        }
      } else {
        const res = await serverSignIn({
          data: {
            email,
            password: hashedPassword,
          },
        });

        if (res.session) {
          await supabase.auth.setSession(res.session);
          navigate({ to: safeNext(next) });
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-16">
        <div className="w-full max-w-md">
          <h1 className="font-serif text-4xl italic leading-tight">
            {mode === "signin"
              ? "Welcome back."
              : mode === "signup"
                ? "Create your account."
                : mode === "update-password"
                  ? "Set new password."
                  : "Reset password."}
          </h1>
          <p className="mt-2 text-sm text-foreground/60">
            {mode === "reset"
              ? "Enter your email address and we will send you a link to reset your password."
              : mode === "update-password"
                ? "Enter and confirm your new password below."
                : "An account keeps your orders, payments and shipping details in one place."}
          </p>

          <form onSubmit={submit} className="space-y-4 mt-8">
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

            {mode !== "update-password" && (
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                maxLength={255}
                required
                className="w-full px-4 py-3 border border-black/10 bg-transparent text-sm outline-none focus:border-primary"
              />
            )}

            {mode !== "reset" && (
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={mode === "update-password" ? "New password" : "Password"}
                minLength={6}
                maxLength={72}
                required
                className="w-full px-4 py-3 border border-black/10 bg-transparent text-sm outline-none focus:border-primary"
              />
            )}

            {mode === "update-password" && (
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                minLength={6}
                maxLength={72}
                required
                className="w-full px-4 py-3 border border-black/10 bg-transparent text-sm outline-none focus:border-primary"
              />
            )}

            {error && <p className="text-sm text-primary">{error}</p>}
            {message && <p className="text-sm text-foreground/70">{message}</p>}

            <button
              type="submit"
              disabled={busy}
              className="w-full py-3.5 bg-ink text-background text-[11px] tracking-[0.25em] uppercase font-semibold hover:bg-primary transition disabled:opacity-60 cursor-pointer"
            >
              {busy
                ? "Please wait…"
                : mode === "signin"
                  ? "Sign in"
                  : mode === "signup"
                    ? "Create account"
                    : mode === "update-password"
                      ? "Update password"
                      : "Send reset link"}
            </button>
          </form>

          <div className="mt-6 flex flex-col gap-2">
            {mode === "signin" && (
              <>
                <button
                  type="button"
                  onClick={() => {
                    setMode("reset");
                    setError("");
                    setMessage("");
                  }}
                  className="text-left text-[11px] tracking-[0.2em] uppercase text-foreground/60 hover:text-primary transition cursor-pointer"
                >
                  Forgot password? Reset it
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMode("signup");
                    setError("");
                    setMessage("");
                  }}
                  className="text-left text-[11px] tracking-[0.2em] uppercase text-foreground/60 hover:text-primary transition cursor-pointer"
                >
                  New here? Create an account
                </button>
              </>
            )}

            {mode === "signup" && (
              <button
                type="button"
                onClick={() => {
                  setMode("signin");
                  setError("");
                  setMessage("");
                }}
                className="text-left text-[11px] tracking-[0.2em] uppercase text-foreground/60 hover:text-primary transition cursor-pointer"
              >
                Already have an account? Sign in
              </button>
            )}

            {(mode === "reset" || mode === "update-password") && (
              <button
                type="button"
                onClick={() => {
                  setMode("signin");
                  setError("");
                  setMessage("");
                }}
                className="text-left text-[11px] tracking-[0.2em] uppercase text-foreground/60 hover:text-primary transition cursor-pointer"
              >
                Back to sign in
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

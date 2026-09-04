import "./server-polyfill";
import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";
import { assertRateLimit, getClientIp } from "./rate-limiter";

function getServerSupabaseClient() {
  const url = process.env["SUPABASE_URL"] || process.env["VITE_SUPABASE_URL"];
  const key =
    process.env["SUPABASE_PUBLISHABLE_KEY"] || process.env["VITE_SUPABASE_PUBLISHABLE_KEY"];

  if (!url || !key) {
    throw new Error("Supabase environment configuration is missing on server");
  }

  return createClient<Database>(url, key, {
    auth: {
      storage: undefined,
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

// ---------------------------------------------------------------------------
// Rate-Limited Sign In
// ---------------------------------------------------------------------------
const SignInSchema = z
  .object({
    email: z.string().trim().email("Invalid email format").max(255),
    password: z.string().min(1, "Password is required").max(128),
  })
  .strict();

export const serverSignIn = createServerFn({ method: "POST" })
  .validator((data: unknown) => SignInSchema.parse(data))
  .handler(async ({ data }) => {
    const request = getRequest();
    const ip = getClientIp(request);
    const normalizedEmail = data.email.toLowerCase();

    // Rate limiting:
    // 1. IP scope: Max 5 attempts per 60 seconds
    assertRateLimit({
      key: `auth:signin:ip:${ip}`,
      limit: 5,
      windowMs: 60_000,
      errorMessage: "Too many sign-in attempts from this network. Please wait a minute.",
    });

    // 2. Target Account scope: Max 5 attempts per 60 seconds to stop targeted credential stuffing
    assertRateLimit({
      key: `auth:signin:email:${normalizedEmail}`,
      limit: 5,
      windowMs: 60_000,
      errorMessage: "Too many sign-in attempts for this account. Please wait a minute.",
    });

    const supabase = getServerSupabaseClient();
    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email: normalizedEmail,
      password: data.password,
    });

    if (error) {
      console.error("[Auth] Sign in failed:", error.message);
      throw new Error(error.message);
    }

    return {
      session: authData.session,
      user: authData.user,
    };
  });

// ---------------------------------------------------------------------------
// Rate-Limited Sign Up
// ---------------------------------------------------------------------------
const SignUpSchema = z
  .object({
    email: z.string().trim().email("Invalid email format").max(255),
    password: z.string().min(6, "Password must be at least 6 characters").max(128),
    fullName: z.string().trim().max(120).optional(),
    emailRedirectTo: z.string().url().max(1000).optional(),
  })
  .strict();

export const serverSignUp = createServerFn({ method: "POST" })
  .validator((data: unknown) => SignUpSchema.parse(data))
  .handler(async ({ data }) => {
    const request = getRequest();
    const ip = getClientIp(request);
    const normalizedEmail = data.email.toLowerCase();

    // Rate limiting: Max 5 account registrations per 60 seconds per IP
    assertRateLimit({
      key: `auth:signup:ip:${ip}`,
      limit: 5,
      windowMs: 60_000,
      errorMessage: "Too many account registrations from this network. Please wait a minute.",
    });

    const supabase = getServerSupabaseClient();
    const { data: authData, error } = await supabase.auth.signUp({
      email: normalizedEmail,
      password: data.password,
      options: {
        emailRedirectTo: data.emailRedirectTo,
        data: data.fullName ? { full_name: data.fullName } : undefined,
      },
    });

    if (error) {
      console.error("[Auth] Sign up failed:", error.message);
      throw new Error(error.message);
    }

    // In Supabase Auth, when a user is already registered and email confirmation is on,
    // signUp returns a user object with an empty identities array: identities = []
    const alreadyRegistered = Boolean(
      authData.user &&
      Array.isArray(authData.user.identities) &&
      authData.user.identities.length === 0,
    );

    if (alreadyRegistered) {
      return {
        session: null,
        user: null,
        userAlreadyExists: true,
        requiresConfirmation: false,
      };
    }

    return {
      session: authData.session,
      user: authData.user,
      userAlreadyExists: false,
      requiresConfirmation: !authData.session,
    };
  });

// ---------------------------------------------------------------------------
// Rate-Limited Password Reset Request
// ---------------------------------------------------------------------------
const ResetPasswordSchema = z
  .object({
    email: z.string().trim().email("Invalid email format").max(255),
    redirectTo: z.string().url().max(1000).optional(),
  })
  .strict();

export const serverResetPassword = createServerFn({ method: "POST" })
  .validator((data: unknown) => ResetPasswordSchema.parse(data))
  .handler(async ({ data }) => {
    const request = getRequest();
    const ip = getClientIp(request);
    const normalizedEmail = data.email.toLowerCase();

    // Rate limiting:
    // 1. IP scope: Max 3 password reset requests per 5 minutes
    assertRateLimit({
      key: `auth:reset:ip:${ip}`,
      limit: 3,
      windowMs: 300_000,
      errorMessage: "Too many password reset requests from this network. Please wait 5 minutes.",
    });

    // 2. Email scope: Max 3 password reset requests per 5 minutes
    assertRateLimit({
      key: `auth:reset:email:${normalizedEmail}`,
      limit: 3,
      windowMs: 300_000,
      errorMessage: "Too many password reset requests for this email. Please wait 5 minutes.",
    });

    const supabase = getServerSupabaseClient();
    const { error } = await supabase.auth.resetPasswordForEmail(normalizedEmail, {
      redirectTo: data.redirectTo,
    });

    if (error) {
      console.error("[Auth] Reset password request failed:", error.message);
    }

    // Always return clean generic success message to prevent user enumeration
    return {
      success: true,
      message: "If an account exists with this email, a password reset link has been sent.",
    };
  });

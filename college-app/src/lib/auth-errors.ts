import type { AuthError } from "@supabase/supabase-js";

function isAuthError(error: unknown): error is AuthError {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as AuthError).message === "string"
  );
}

/** Maps Supabase auth errors to user-facing copy with fix hints where possible. */
export function formatAuthError(error: unknown): string {
  if (!isAuthError(error)) {
    return error instanceof Error ? error.message : "Something went wrong. Please try again.";
  }

  const message = error.message.toLowerCase();
  const code = error.code?.toLowerCase() ?? "";

  if (
    message.includes("redirect") &&
    (message.includes("mismatch") || message.includes("not allowed"))
  ) {
    return (
      "Redirect URL mismatch. In Supabase → Authentication → URL configuration, add " +
      "http://localhost:3000/auth/callback (and http://127.0.0.1:3000/auth/callback if you use that). " +
      "In Google Cloud, the only redirect URI should be " +
      "https://YOUR_PROJECT_REF.supabase.co/auth/v1/callback — not localhost. " +
      "Set NEXT_PUBLIC_SITE_URL in .env.local to match how you open the app."
    );
  }

  if (
    message.includes("provider is not enabled") ||
    (code === "validation_failed" && message.includes("unsupported provider"))
  ) {
    return (
      "Google sign-in is not enabled for this Supabase project. In the Supabase dashboard, open " +
      "Authentication → Providers → Google, turn it on, and paste your Google OAuth Client ID and Secret. " +
      "See MONOREPO.md for the full Google Cloud setup."
    );
  }

  if (
    message.includes("invalid api key") ||
    message.includes("invalid jwt")
  ) {
    return formatAuthCallbackError("invalid_api_key")!;
  }

  if (message.includes("invalid login credentials")) {
    return "Invalid email or password.";
  }

  if (message.includes("email not confirmed")) {
    return "Please confirm your email before signing in (check your inbox).";
  }

  return error.message;
}

export function formatAuthCallbackError(code: string | null): string | null {
  switch (code) {
    case "invalid_api_key":
      return (
        "Invalid Supabase API key. In Supabase → Project Settings → API, copy the current " +
        "anon or publishable key into NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local, then restart npm run dev."
      );
    case "auth_callback_failed":
      return "Sign-in could not be completed. Try again or use email and password.";
    case "provider_disabled":
      return formatAuthError({
        message: "Unsupported provider: provider is not enabled",
        code: "validation_failed",
      } as AuthError);
    default:
      return code ? `Sign-in error: ${code.replace(/_/g, " ")}` : null;
  }
}

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
    message.includes("provider is not enabled") ||
    (code === "validation_failed" && message.includes("unsupported provider"))
  ) {
    return (
      "Google sign-in is not enabled for this Supabase project. In the Supabase dashboard, open " +
      "Authentication → Providers → Google, turn it on, and paste your Google OAuth Client ID and Secret. " +
      "See MONOREPO.md for the full Google Cloud setup."
    );
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

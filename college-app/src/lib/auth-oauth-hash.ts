/** Supabase OAuth errors often arrive in the URL hash on redirect (not query). */
export function parseOAuthHashParams(): URLSearchParams | null {
  if (typeof window === "undefined") return null;
  const hash = window.location.hash;
  if (!hash || hash.length <= 1) return null;
  return new URLSearchParams(hash.startsWith("#") ? hash.slice(1) : hash);
}

export function formatOAuthHashError(params: URLSearchParams): string | null {
  const error = params.get("error");
  const errorCode = params.get("error_code") ?? "";
  const rawDescription = params.get("error_description") ?? "";
  let description = rawDescription;
  try {
    description = decodeURIComponent(rawDescription);
    if (description.includes("%")) {
      description = decodeURIComponent(description);
    }
  } catch {
    description = rawDescription;
  }

  const combined = `${error ?? ""} ${errorCode} ${description}`.toLowerCase();

  if (combined.includes("unable to exchange external code")) {
    return (
      "Google sign-in failed while Supabase exchanged the code with Google. " +
      "In Supabase → Authentication → Providers → Google, the Client ID and Client Secret must match " +
      "the same Web OAuth client in Google Cloud (Credentials). If unsure, create a new Client Secret in " +
      "Google Cloud, paste it into Supabase, save, wait a minute, then try again. " +
      "Your .env NEXT_PUBLIC_GOOGLE_CLIENT_ID is not used — only the Supabase dashboard values matter."
    );
  }

  if (error === "server_error" || errorCode === "unexpected_failure") {
    return (
      `Google sign-in failed (${errorCode || error || "server_error"}). ${description || "Check Supabase Google provider Client ID and Secret."}`
    );
  }

  if (error) {
    return description || `Sign-in error: ${error.replace(/_/g, " ")}`;
  }

  return null;
}

export function clearOAuthHashFromUrl(): void {
  if (typeof window === "undefined") return;
  if (!window.location.hash) return;
  const url = `${window.location.pathname}${window.location.search}`;
  window.history.replaceState(null, "", url);
}

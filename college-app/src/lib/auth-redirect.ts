/**
 * OAuth callback URL must match Supabase → Authentication → URL configuration
 * (Redirect URLs) exactly — use NEXT_PUBLIC_SITE_URL so it stays stable even
 * if you open the app via 127.0.0.1 vs localhost.
 */
export function getAuthCallbackUrl(): string {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    (typeof window !== "undefined"
      ? window.location.origin
      : "http://localhost:3000");

  return `${base}/auth/callback`;
}

/** Whitelist these in Supabase Redirect URLs (see MONOREPO.md). */
export const SUPABASE_REDIRECT_URLS_TO_ALLOW = [
  "http://localhost:3000/auth/callback",
  "http://127.0.0.1:3000/auth/callback",
] as const;

/** Add this exact URI in Google Cloud → OAuth client → Authorized redirect URIs. */
export function getSupabaseGoogleRedirectUri(projectRef: string): string {
  return `https://${projectRef}.supabase.co/auth/v1/callback`;
}

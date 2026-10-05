import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";
  const authError = searchParams.get("error");
  const errorDescription = searchParams.get("error_description");

  if (authError) {
    const isProviderDisabled =
      errorDescription?.toLowerCase().includes("provider is not enabled") ||
      errorDescription?.toLowerCase().includes("unsupported provider");
    const errorCode = isProviderDisabled ? "provider_disabled" : authError;
    return NextResponse.redirect(
      `${origin}/login?error=${encodeURIComponent(errorCode)}`
    );
  }

  if (!code) {
    return NextResponse.redirect(`${origin}/login?error=auth_callback_failed`);
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error("[auth/callback] exchangeCodeForSession:", error.message);
      const isInvalidKey =
        error.message.toLowerCase().includes("invalid api key") ||
        error.message.toLowerCase().includes("invalid jwt");
      const errorParam = isInvalidKey ? "invalid_api_key" : "auth_callback_failed";
      return NextResponse.redirect(
        `${origin}/login?error=${encodeURIComponent(errorParam)}`
      );
    }

    return NextResponse.redirect(`${origin}${next}`);
  } catch (err) {
    console.error("[auth/callback] unexpected error:", err);
    return NextResponse.redirect(`${origin}/login?error=auth_callback_failed`);
  }
}

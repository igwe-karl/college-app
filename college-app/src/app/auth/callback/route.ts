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

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth_callback_failed`);
}

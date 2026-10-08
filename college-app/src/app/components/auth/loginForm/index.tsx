"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginInput } from "@college/shared";
import { Sparkles } from "lucide-react";

import { Input } from "@/app/components/input";
import { Button } from "@/app/components/button";
import { createClient } from "@/lib/supabase/client";
import { formatAuthCallbackError, formatAuthError } from "@/lib/auth-errors";
import { isGoogleAuthEnabled } from "@/lib/auth-config";
import { getAuthCallbackUrl } from "@/lib/auth-redirect";
import {
  clearOAuthHashFromUrl,
  formatOAuthHashError,
  parseOAuthHashParams,
} from "@/lib/auth-oauth-hash";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const googleEnabled = isGoogleAuthEnabled();
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const hashParams = parseOAuthHashParams();
    if (hashParams?.get("error")) {
      const hashError = formatOAuthHashError(hashParams);
      if (hashError) setErrorMessage(hashError);
      clearOAuthHashFromUrl();
      return;
    }

    const callbackError = formatAuthCallbackError(searchParams.get("error"));
    if (callbackError) {
      setErrorMessage(callbackError);
    }
  }, [searchParams]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginInput) => {
    setErrorMessage(null);
    try {
      setIsSigningIn(true);
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });
      if (error) throw error;
      router.push("/campus");
      router.refresh();
    } catch (error) {
      console.error("Login failed:", error);
      setErrorMessage(formatAuthError(error));
    } finally {
      setIsSigningIn(false);
    }
  };

  const onGoogleSignIn = async () => {
    if (!googleEnabled) {
      setErrorMessage(
        "Google sign-in is turned off in this environment. Set NEXT_PUBLIC_GOOGLE_AUTH_ENABLED=true in .env.local after enabling Google in Supabase."
      );
      return;
    }

    setErrorMessage(null);
    setIsSigningIn(true);
    try {
      const supabase = createClient();
      const redirectTo = getAuthCallbackUrl();
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo,
          queryParams: {
            prompt: "select_account",
          },
        },
      });
      if (error) throw error;
      if (data?.url) {
        window.location.assign(data.url);
        return;
      }
      throw new Error("Could not start Google sign-in.");
    } catch (error) {
      console.error("Google login failed:", error);
      setErrorMessage(formatAuthError(error));
      setIsSigningIn(false);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="hidden lg:flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-500/10 to-indigo-500/10 px-3 py-2 text-sm text-violet-800 dark:text-violet-200">
        <Sparkles className="h-4 w-4 shrink-0 text-violet-600" />
        <span>Events, news, and your campus profile in one place.</span>
      </div>

      <h1 className="text-2xl font-bold lg:hidden">Sign in</h1>

      {errorMessage && (
        <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {errorMessage}
        </p>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          type="email"
          placeholder="Email"
          className="border-violet-100 focus-visible:ring-violet-400"
          {...register("email")}
          error={errors.email?.message}
        />

        <Input
          type="password"
          placeholder="Password"
          className="border-violet-100 focus-visible:ring-violet-400"
          {...register("password")}
          error={errors.password?.message}
        />

        <Button
          type="submit"
          disabled={isSigningIn}
          className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white border-0"
        >
          {isSigningIn ? "Signing in..." : "Sign In"}
        </Button>

        <div className="relative py-1">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white dark:bg-slate-900 px-2 text-muted-foreground">
              or
            </span>
          </div>
        </div>

        {googleEnabled ? (
          <Button
            type="button"
            onClick={onGoogleSignIn}
            variant="outline"
            disabled={isSigningIn}
            className="w-full border-violet-200 hover:bg-violet-50 dark:border-violet-800 dark:hover:bg-violet-950"
          >
            Sign in with Google
          </Button>
        ) : (
          <p className="text-xs text-muted-foreground text-center">
            Google sign-in appears after you enable the Google provider in
            Supabase and set{" "}
            <code className="text-xs">NEXT_PUBLIC_GOOGLE_AUTH_ENABLED=true</code>{" "}
            in <code className="text-xs">.env.local</code>.
          </p>
        )}
      </form>

      <p className="text-center text-sm text-muted-foreground lg:hidden">
        New here?{" "}
        <Link href="/register" className="font-semibold text-violet-600">
          Register
        </Link>
      </p>
    </div>
  );
}

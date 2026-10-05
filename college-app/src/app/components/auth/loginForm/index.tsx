"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginInput } from "@college/shared";

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
      router.push("/");
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
    <div className="flex flex-col gap-4 max-w-sm mx-auto">
      <h1 className="text-2xl font-bold text-center">Login</h1>

      {errorMessage && (
        <p className="text-sm text-destructive text-center">{errorMessage}</p>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="w-full md:w-80">
          <Input
            type="email"
            placeholder="Email"
            {...register("email")}
            error={errors.email?.message}
          />
        </div>

        <div className="w-full md:w-80">
          <Input
            type="password"
            placeholder="Password"
            {...register("password")}
            error={errors.password?.message}
          />
        </div>

        <Button type="submit" disabled={isSigningIn}>
          {isSigningIn ? "Signing in..." : "Sign In"}
        </Button>

        {googleEnabled ? (
          <Button
            type="button"
            onClick={onGoogleSignIn}
            variant="outline"
            disabled={isSigningIn}
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
    </div>
  );
}

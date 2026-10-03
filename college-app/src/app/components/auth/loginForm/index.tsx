"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginInput } from "@college/shared";

import { Input } from "@/app/components/input";
import { Button } from "@/app/components/button";
import { createClient } from "@/lib/supabase/client";

export default function LoginForm() {
  const router = useRouter();
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
      setErrorMessage(
        error instanceof Error ? error.message : "Login failed"
      );
    } finally {
      setIsSigningIn(false);
    }
  };

  const onGoogleSignIn = async () => {
    setErrorMessage(null);
    setIsSigningIn(true);
    try {
      const supabase = createClient();
      const redirectTo = `${window.location.origin}/auth/callback`;
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo },
      });
      if (error) throw error;
    } catch (error) {
      console.error("Google login failed:", error);
      setErrorMessage(
        error instanceof Error ? error.message : "Google login failed"
      );
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

        <Button type="button" onClick={onGoogleSignIn} variant="outline">
          Sign in with Google
        </Button>
      </form>
    </div>
  );
}

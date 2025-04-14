"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Input } from "@/app/components/input";
import { Button } from "@/app/components/button";
import { useAuth } from "@/app/context/authContext";
import {
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
} from "@/app/firebase/auth";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function LoginForm() {
  const router = useRouter();
  const { userLoggedIn } = useAuth();
  const [isSigningIn, setIsSigningIn] = useState(false);

  type LoginFormValues = z.infer<typeof loginSchema>;

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  console.log("getValues", getValues());
  const onSubmit = async (values: LoginFormValues) => {
    console.log("values", values);
    try {
      setIsSigningIn(true);
      await doSignInWithEmailAndPassword(values.email, values.password);
      router.push("/");
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsSigningIn(false);
    }
  };
  console.log("errors", errors);

  const onGoogleSignIn = async () => {
    setIsSigningIn(true);
    try {
      const { user } = await doSignInWithGoogle();
  
      // Optionally log the user info
      console.log("Google user:", user);
  
      // Optionally show toast success message
      // toast({ title: "Login successful", variant: "success" });
  
      router.push("/");
    } catch (error) {
      console.error("Google login failed:", error);
      // toast({ title: "Google login failed", variant: "destructive" });
    } finally {
      setIsSigningIn(false); // always reset
    }
  };

  return (
    <div className="flex flex-col gap-4 max-w-sm mx-auto">
      <h1 className="text-2xl font-bold text-center">Login</h1>

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

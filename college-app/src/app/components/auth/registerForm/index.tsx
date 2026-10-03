"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterInput } from "@college/shared";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Input } from "@/app/components/input";
import { createClient } from "@/lib/supabase/client";

export default function RegisterPage() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      displayName: "",
    },
  });

  const onSubmit = async (values: RegisterInput) => {
    setErrorMessage(null);
    try {
      setIsRegistering(true);
      const supabase = createClient();
      const { error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            display_name: values.displayName,
          },
        },
      });
      if (error) throw error;
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Registration failed:", error);
      setErrorMessage(
        error instanceof Error ? error.message : "Registration failed"
      );
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <div className="w-full mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Register</h2>

      {errorMessage && (
        <p className="text-sm text-destructive mb-4">{errorMessage}</p>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 mt-10 w-full md:w-1/2"
      >
        <div className="w-full md:w-80">
          <Input
            type="text"
            placeholder="Display name"
            {...register("displayName")}
            error={errors.displayName?.message}
          />
        </div>

        <div className="w-full md:w-80">
          <Input
            type="email"
            placeholder="Email Address"
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
        <div className="w-full md:w-80">
          <Button type="submit" className="w-full">
            {isRegistering ? "Registering..." : "Register"}
          </Button>
        </div>
      </form>
    </div>
  );
}

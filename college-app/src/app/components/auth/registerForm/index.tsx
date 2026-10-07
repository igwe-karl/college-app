"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterInput } from "@college/shared";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Input } from "@/app/components/input";
import { Textarea } from "@/components/ui/textarea";
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
      university: "",
      major: "",
      yearLevel: "",
      phone: "",
      bio: "",
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
            university: values.university,
            major: values.major,
            year_level: values.yearLevel,
            phone: values.phone,
            bio: values.bio ?? "",
          },
        },
      });
      if (error) throw error;
      router.push("/campus");
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
    <div className="w-full mx-auto max-w-lg">
      <h2 className="text-2xl font-semibold mb-2">Create your account</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Account details and profile information for Campus Hub.
      </p>

      {errorMessage && (
        <p className="text-sm text-destructive mb-4">{errorMessage}</p>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <fieldset className="space-y-4 rounded-lg border border-border p-4">
          <legend className="px-1 text-sm font-semibold">Account</legend>
          <Input
            type="email"
            placeholder="Email address"
            {...register("email")}
            error={errors.email?.message}
          />
          <Input
            type="password"
            placeholder="Password (min 8 characters)"
            {...register("password")}
            error={errors.password?.message}
          />
        </fieldset>

        <fieldset className="space-y-4 rounded-lg border border-border p-4">
          <legend className="px-1 text-sm font-semibold">Profile information</legend>
          <Input
            type="text"
            placeholder="Display name"
            {...register("displayName")}
            error={errors.displayName?.message}
          />
          <Input
            type="text"
            placeholder="University / college"
            {...register("university")}
            error={errors.university?.message}
          />
          <Input
            type="text"
            placeholder="Major or program"
            {...register("major")}
            error={errors.major?.message}
          />
          <Input
            type="text"
            placeholder="Year level (e.g. 200 Level)"
            {...register("yearLevel")}
            error={errors.yearLevel?.message}
          />
          <Input
            type="tel"
            placeholder="Phone number"
            {...register("phone")}
            error={errors.phone?.message}
          />
          <div>
            <Textarea
              placeholder="Short bio (optional)"
              className="min-h-[80px]"
              {...register("bio")}
            />
            {errors.bio && (
              <p className="text-sm text-destructive mt-1">{errors.bio.message}</p>
            )}
          </div>
        </fieldset>

        <Button type="submit" className="w-full" disabled={isRegistering}>
          {isRegistering ? "Creating account…" : "Register"}
        </Button>
      </form>
    </div>
  );
}

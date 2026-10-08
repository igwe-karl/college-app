"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterInput } from "@college/shared";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Input } from "@/app/components/input";
import { Textarea } from "@/components/ui/textarea";
import { createClient } from "@/lib/supabase/client";
import { BadgeCheck, School } from "lucide-react";
import { cn } from "@/lib/utils";

export default function RegisterPage() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    watch,
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
      isRep: false,
    },
  });

  const isRep = watch("isRep");
  const university = watch("university");

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
            is_rep: values.isRep,
            rep_university: values.isRep ? values.university : null,
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
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-1 lg:hidden">Create your account</h2>
      <p className="text-sm text-muted-foreground mb-5 lg:hidden">
        Profile details for Campus Hub.
      </p>

      {errorMessage && (
        <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive mb-4">
          {errorMessage}
        </p>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <fieldset className="space-y-3 rounded-xl border border-orange-100 bg-gradient-to-br from-orange-50/50 to-pink-50/30 p-4 dark:border-orange-900/40 dark:from-orange-950/20 dark:to-pink-950/10">
          <legend className="px-1 text-sm font-semibold text-orange-800 dark:text-orange-200">
            Account
          </legend>
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

        <fieldset className="space-y-3 rounded-xl border border-violet-100 bg-gradient-to-br from-violet-50/50 to-sky-50/30 p-4 dark:border-violet-900/40 dark:from-violet-950/20 dark:to-sky-950/10">
          <legend className="px-1 text-sm font-semibold text-violet-800 dark:text-violet-200">
            Profile & school
          </legend>
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
              className="min-h-[72px]"
              {...register("bio")}
            />
            {errors.bio && (
              <p className="text-sm text-destructive mt-1">{errors.bio.message}</p>
            )}
          </div>
        </fieldset>

        <div className="rounded-xl border border-emerald-200 bg-gradient-to-r from-emerald-50 to-teal-50 p-4 dark:border-emerald-900/50 dark:from-emerald-950/30 dark:to-teal-950/20">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <p className="flex items-center gap-2 text-sm font-semibold text-emerald-900 dark:text-emerald-100">
                <BadgeCheck className="h-4 w-4" />
                Campus representative
              </p>
              <p className="text-xs text-emerald-800/80 dark:text-emerald-200/80">
                Turn on if you represent your school on Campus Hub. Your rep tag
                is linked to the university above.
              </p>
            </div>
            <Controller
              name="isRep"
              control={control}
              render={({ field }) => (
                <button
                  type="button"
                  role="switch"
                  aria-checked={field.value}
                  aria-label="Campus representative"
                  onClick={() => field.onChange(!field.value)}
                  className={cn(
                    "relative inline-flex h-7 w-12 shrink-0 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2",
                    field.value ? "bg-emerald-500" : "bg-slate-300 dark:bg-slate-600"
                  )}
                >
                  <span
                    className={cn(
                      "pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow transition-transform mt-0.5",
                      field.value ? "translate-x-5 ml-0.5" : "translate-x-0.5"
                    )}
                  />
                </button>
              )}
            />
          </div>
          {isRep && (
            <p className="mt-3 flex items-center gap-2 rounded-lg bg-white/70 px-3 py-2 text-xs font-medium text-emerald-900 dark:bg-slate-900/60 dark:text-emerald-100">
              <School className="h-3.5 w-3.5 shrink-0" />
              Rep for:{" "}
              <span className="truncate">
                {university?.trim() ? university : "Enter your university above"}
              </span>
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-orange-500 via-pink-500 to-violet-600 hover:opacity-95 text-white border-0"
          disabled={isRegistering}
        >
          {isRegistering ? "Creating account…" : "Create account"}
        </Button>
      </form>
    </div>
  );
}

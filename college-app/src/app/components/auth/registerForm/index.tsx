"use client";

import { doCreateUserWithEmailAndPassword } from "@/app/firebase/auth";
import { useState } from "react";
import { useFormik } from "formik";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Input } from "@/app/components/input";

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export default function RegisterPage() {
  const [isRegistering, setIsRegistering] = useState(false);
  const router = useRouter();
  type RegisterFormValues = z.infer<typeof registerSchema>;
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: RegisterFormValues) => {
    console.log("values", values);
    try {
      setIsRegistering(true);
      await doCreateUserWithEmailAndPassword(values.email, values.password);
      router.push("/");
      setIsRegistering(false);
    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <div className="w-full mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Register</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 mt-10 w-full md:w-1/2"
      >
        {/* <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full border px-4 py-2 rounded"
          required
        /> */}

        <div className="w-full md:w-80">
          <Input
            type="email"
            placeholder="Email Address"
            {...register("email")}
            required
            error={errors.email?.message}
          />
        </div>

        <div className="w-full md:w-80">
          <Input
            type="password"
            placeholder="Password"
            {...register("password")}
            required
            error={errors.password?.message}
          />
        </div>
        <div className="w-full md:w-80">
          <Button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            {isRegistering ? "Registering..." : "Register"}
          </Button>
        </div>
      </form>
    </div>
  );
}

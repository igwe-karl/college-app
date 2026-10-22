import Link from "next/link";
import RegisterForm from "../components/auth/registerForm";
import { AuthPageShell } from "../components/auth/auth-page-shell";

export default function Register() {
  return (
    <AuthPageShell
      accent="register"
      title="Join Campus Hub"
      subtitle="Create your account, pick your school, and connect with your campus."
      footer={
        <>
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-orange-600 hover:text-orange-700 dark:text-orange-400"
          >
            Sign in
          </Link>
        </>
      }
    >
      <RegisterForm />
    </AuthPageShell>
  );
}

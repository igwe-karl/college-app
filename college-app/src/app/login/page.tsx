import Link from "next/link";
import { Suspense } from "react";
import Login from "../components/auth/loginForm";
import { AuthPageShell } from "../components/auth/auth-page-shell";

function LoginFallback() {
  return (
    <AuthPageShell
      accent="login"
      title="Welcome back"
      subtitle="Sign in to your campus feed, events, and profile."
    >
      <p className="text-center text-muted-foreground">Loading…</p>
    </AuthPageShell>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginFallback />}>
      <AuthPageShell
        accent="login"
        title="Welcome back"
        subtitle="Sign in to your campus feed, events, and profile."
        footer={
          <>
            New here?{" "}
            <Link
              href="/register"
              className="font-semibold text-violet-600 hover:text-violet-700 dark:text-violet-400"
            >
              Create an account
            </Link>
          </>
        }
      >
        <Login />
      </AuthPageShell>
    </Suspense>
  );
}

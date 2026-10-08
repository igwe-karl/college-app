import { Suspense } from "react";
import Login from "../components/auth/loginForm";

function LoginFallback() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <p className="text-muted-foreground">Loading…</p>
    </main>
  );
}

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Suspense fallback={<LoginFallback />}>
        <Login />
      </Suspense>
    </main>
  );
}

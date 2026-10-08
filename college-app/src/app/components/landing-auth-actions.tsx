"use client";

import Link from "next/link";
import { useAuth } from "@/app/context/authContext";
import { Button } from "@/components/ui/button";

export function LandingAuthActions() {
  const { userLoggedIn, loading } = useAuth();

  if (loading) {
    return <div className="h-10 w-32" />;
  }

  if (userLoggedIn) {
    return (
      <Button asChild className="bg-gradient-to-r from-orange-500 to-violet-600">
        <Link href="/campus">Go to Campus Hub</Link>
      </Button>
    );
  }

  return (
    <div className="flex gap-2">
      <Button variant="ghost" asChild>
        <Link href="/login">Sign in</Link>
      </Button>
      <Button asChild className="bg-gradient-to-r from-orange-500 to-violet-600 hover:opacity-90">
        <Link href="/register">Get started</Link>
      </Button>
    </div>
  );
}

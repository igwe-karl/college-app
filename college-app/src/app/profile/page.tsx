"use client";

import { useAuth } from "@/app/context/authContext";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  const { currentUser, userLoggedIn, signOut } = useAuth();
console.log(currentUser && userLoggedIn && "user logged in");
  if (!userLoggedIn || !currentUser) {
    return (
      <div className="mx-auto max-w-md space-y-4 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
        <p className="text-muted-foreground">
          Sign in to view your profile and campus activity.
        </p>
        <Button asChild>
          <Link href="/login">Sign in</Link>
        </Button>
      </div>
    );
  }

  const displayName =
    currentUser.user_metadata?.display_name ??
    currentUser.user_metadata?.full_name ??
    "—";

  return (
    <div className="mx-auto max-w-md space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
      <dl className="space-y-3 rounded-lg border border-border bg-card p-6">
        <div>
          <dt className="text-sm text-muted-foreground">Name</dt>
          <dd className="font-medium">{displayName}</dd>
        </div>
        <div>
          <dt className="text-sm text-muted-foreground">Email</dt>
          <dd className="font-medium">{currentUser.email ?? "—"}</dd>
        </div>
      </dl>
      <Button variant="outline" onClick={() => signOut()}>
        Sign out
      </Button>
    </div>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { Pencil, User } from "lucide-react";
import { useAuth } from "@/app/context/authContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { profileDummy } from "@/lib/profile-dummy-data";
import { cn } from "@/lib/utils";

export default function ProfilePage() {
  const { currentUser, userLoggedIn, signOut } = useAuth();

  if (!userLoggedIn || !currentUser) {
    return (
      <div className="mx-auto max-w-md space-y-4 text-center py-12">
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

  const meta = currentUser.user_metadata;
  const displayName =
    meta?.display_name ?? meta?.full_name ?? profileDummy.displayName;

  const avatarSrc =
    currentUser.user_metadata?.avatar_url ??
    currentUser.user_metadata?.picture ??
    profileDummy.avatarImage;

  return (
    <div className="mx-auto max-w-3xl space-y-8 pb-10">
      {/* Section 1 — Cover, avatar, edit */}
      <section className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
        <div className="relative h-40 sm:h-52 w-full">
          <Image
            src={profileDummy.coverImage}
            alt="Profile cover"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 768px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>

        <div className="relative px-6 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 -mt-14 sm:-mt-16">
            <div className="relative h-28 w-28 shrink-0 rounded-full border-4 border-card bg-muted overflow-hidden shadow-md">
              {avatarSrc ? (
                <Image
                  src={avatarSrc}
                  alt={displayName}
                  fill
                  className="object-cover"
                  sizes="112px"
                />
              ) : (
                <span className="flex h-full w-full items-center justify-center text-muted-foreground">
                  <User className="h-10 w-10" />
                </span>
              )}
            </div>
            <Button variant="outline" className="sm:mb-1 w-full sm:w-auto" type="button">
              <Pencil className="h-4 w-4" />
              Edit profile
            </Button>
          </div>

          <div className="mt-4 space-y-1">
            <h1 className="text-2xl font-bold tracking-tight">{displayName}</h1>
            <p className="text-muted-foreground">{profileDummy.handle}</p>
          </div>
        </div>
      </section>

      {/* Section 2 — About & profile information */}
      <section className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>About</CardTitle>
            <CardDescription>A short intro for your campus community</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed text-foreground/90">
              {profileDummy.about}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Profile information</CardTitle>
            <CardDescription>Details visible on your campus profile</CardDescription>
          </CardHeader>
          <CardContent>
            <dl className="space-y-3 text-sm">
              <InfoRow label="Email" value={currentUser.email ?? "—"} />
              <InfoRow
                label="University"
                value={meta?.university ?? profileDummy.info.university}
              />
              <InfoRow label="Major" value={meta?.major ?? profileDummy.info.major} />
              <InfoRow
                label="Year"
                value={meta?.year_level ?? profileDummy.info.year}
              />
              <InfoRow label="Location" value={profileDummy.info.location} />
              <InfoRow label="Phone" value={meta?.phone ?? profileDummy.info.phone} />
              <InfoRow label="Member since" value={profileDummy.info.memberSince} />
            </dl>
          </CardContent>
        </Card>
      </section>

      {/* Section 3 — Subscriptions & purchases */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle>Subscriptions & purchases</CardTitle>
            <CardDescription>
              Your campus plans and one-time purchases
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {profileDummy.subscriptions.map((sub) => (
              <div
                key={sub.id}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-lg border border-border p-4"
              >
                <div className="space-y-1">
                  <p className="font-medium">{sub.name}</p>
                  <p className="text-sm text-muted-foreground">{sub.description}</p>
                  <p className="text-sm font-medium text-primary">{sub.price}</p>
                </div>
                <div className="flex flex-col items-start sm:items-end gap-2">
                  <span
                    className={cn(
                      "text-xs font-semibold uppercase tracking-wide px-2 py-1 rounded-full",
                      sub.status === "active"
                        ? "bg-primary/15 text-primary"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {sub.status}
                  </span>
                  <span className="text-xs text-muted-foreground">{sub.renewsOn}</span>
                  {sub.status === "active" && (
                    <Button variant="ghost" size="sm" type="button">
                      Manage
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <div className="flex justify-center pt-2">
        <Button variant="outline" onClick={() => signOut()}>
          Sign out
        </Button>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-border/60 pb-3 last:border-0 last:pb-0">
      <dt className="text-muted-foreground shrink-0">{label}</dt>
      <dd className="font-medium text-right">{value}</dd>
    </div>
  );
}

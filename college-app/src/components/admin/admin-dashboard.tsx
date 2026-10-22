"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { BadgeCheck, Check, Clapperboard, Shield, X } from "lucide-react";
import { useAuth } from "@/app/context/authContext";
import { useCurrentProfile } from "@/hooks/use-current-profile";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type ProfileLite = { id: string; display_name: string | null };

type RepRequestRow = {
  id: string;
  user_id: string;
  university: string;
  status: "pending" | "approved" | "rejected";
  created_at: string;
  display_name: string | null;
};

type MediaRow = {
  id: string;
  title: string;
  description: string | null;
  file_url: string;
  mime_type: string | null;
  status: "pending" | "approved" | "rejected";
  created_at: string;
  uploader_id: string;
  display_name: string | null;
};

export function AdminDashboard() {
  const { userLoggedIn } = useAuth();
  const { isAdmin, loading } = useCurrentProfile();
  const [tab, setTab] = useState<"reps" | "media">("reps");
  const [repRequests, setRepRequests] = useState<RepRequestRow[]>([]);
  const [media, setMedia] = useState<MediaRow[]>([]);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    const supabase = createClient();
    const [{ data: reps }, { data: uploads }] = await Promise.all([
      supabase
        .from("rep_requests")
        .select("id, user_id, university, status, created_at")
        .order("created_at", { ascending: false }),
      supabase
        .from("media_uploads")
        .select(
          "id, title, description, file_url, mime_type, status, created_at, uploader_id"
        )
        .order("created_at", { ascending: false }),
    ]);

    const userIds = Array.from(
      new Set([
        ...(reps ?? []).map((r) => r.user_id),
        ...(uploads ?? []).map((u) => u.uploader_id),
      ])
    );
    const { data: people } = userIds.length
      ? await supabase
          .from("profiles")
          .select("id, display_name")
          .in("id", userIds)
      : { data: [] as ProfileLite[] };
    const names = new Map((people ?? []).map((p) => [p.id, p.display_name]));

    setRepRequests(
      (reps ?? []).map((r) => ({
        ...r,
        display_name: names.get(r.user_id) ?? null,
      }))
    );
    setMedia(
      (uploads ?? []).map((u) => ({
        ...u,
        display_name: names.get(u.uploader_id) ?? null,
      }))
    );
  }, []);

  useEffect(() => {
    if (isAdmin) load();
  }, [isAdmin, load]);

  const reviewRep = async (id: string, status: "approved" | "rejected") => {
    setBusyId(id);
    setError(null);
    const supabase = createClient();
    const { error: updateError } = await supabase
      .from("rep_requests")
      .update({ status })
      .eq("id", id);
    if (updateError) setError(updateError.message);
    await load();
    setBusyId(null);
  };

  const reviewMedia = async (id: string, status: "approved" | "rejected") => {
    setBusyId(id);
    setError(null);
    const supabase = createClient();
    const { error: updateError } = await supabase
      .from("media_uploads")
      .update({ status })
      .eq("id", id);
    if (updateError) setError(updateError.message);
    await load();
    setBusyId(null);
  };

  if (loading) {
    return <p className="py-12 text-center text-muted-foreground">Loading…</p>;
  }

  if (!userLoggedIn || !isAdmin) {
    return (
      <div className="mx-auto max-w-md space-y-4 py-12 text-center">
        <Shield className="mx-auto h-10 w-10 text-muted-foreground" />
        <h1 className="text-2xl font-bold">Admin only</h1>
        <p className="text-muted-foreground">
          You need an admin account to review campus reps and media uploads.
        </p>
        <Button asChild>
          <Link href="/campus">Back to campus</Link>
        </Button>
      </div>
    );
  }

  const pendingReps = repRequests.filter((r) => r.status === "pending");
  const pendingMedia = media.filter((m) => m.status === "pending");

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-violet-900 to-indigo-800 p-6 text-white">
        <p className="flex items-center gap-2 text-sm font-medium text-white/80">
          <Shield className="h-4 w-4" />
          Campus Hub control
        </p>
        <h1 className="mt-1 text-3xl font-extrabold">Admin review</h1>
        <p className="mt-2 max-w-xl text-sm text-white/80">
          Approve or reject campus representative requests and user media
          uploads before they go live.
        </p>
        <div className="mt-4 flex flex-wrap gap-3 text-sm">
          <span className="rounded-full bg-white/15 px-3 py-1">
            {pendingReps.length} pending reps
          </span>
          <span className="rounded-full bg-white/15 px-3 py-1">
            {pendingMedia.length} pending media
          </span>
        </div>
      </div>

      <div className="flex gap-2">
        <Button
          type="button"
          variant={tab === "reps" ? "default" : "outline"}
          onClick={() => setTab("reps")}
        >
          <BadgeCheck className="h-4 w-4" />
          Rep requests
        </Button>
        <Button
          type="button"
          variant={tab === "media" ? "default" : "outline"}
          onClick={() => setTab("media")}
        >
          <Clapperboard className="h-4 w-4" />
          Media uploads
        </Button>
      </div>

      {error && (
        <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {error}
        </p>
      )}

      {tab === "reps" ? (
        <div className="space-y-3">
          {repRequests.length === 0 && (
            <p className="rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground">
              No representative requests yet.
            </p>
          )}
          {repRequests.map((request) => (
            <article
              key={request.id}
              className="flex flex-col gap-4 rounded-xl border border-border bg-card p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-semibold">
                  {request.display_name ?? "Student"}
                </p>
                <p className="text-sm text-muted-foreground">
                  Wants to represent {request.university}
                </p>
                <StatusBadge status={request.status} />
              </div>
              {request.status === "pending" && (
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    disabled={busyId === request.id}
                    onClick={() => reviewRep(request.id, "approved")}
                  >
                    <Check className="h-4 w-4" />
                    Approve
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    disabled={busyId === request.id}
                    onClick={() => reviewRep(request.id, "rejected")}
                  >
                    <X className="h-4 w-4" />
                    Reject
                  </Button>
                </div>
              )}
            </article>
          ))}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {media.length === 0 && (
            <p className="col-span-full rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground">
              No media uploads yet.
            </p>
          )}
          {media.map((item) => (
            <article
              key={item.id}
              className="overflow-hidden rounded-xl border border-border bg-card"
            >
              <Preview fileUrl={item.file_url} mimeType={item.mime_type} title={item.title} />
              <div className="space-y-2 p-4">
                <div className="flex items-start justify-between gap-2">
                  <h2 className="font-semibold">{item.title}</h2>
                  <StatusBadge status={item.status} />
                </div>
                <p className="text-sm text-muted-foreground">
                  {item.description || "No description"}
                </p>
                <p className="text-xs text-muted-foreground">
                  By {item.display_name ?? "student"}
                </p>
                {item.status === "pending" && (
                  <div className="flex gap-2 pt-1">
                    <Button
                      size="sm"
                      disabled={busyId === item.id}
                      onClick={() => reviewMedia(item.id, "approved")}
                    >
                      <Check className="h-4 w-4" />
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      disabled={busyId === item.id}
                      onClick={() => reviewMedia(item.id, "rejected")}
                    >
                      <X className="h-4 w-4" />
                      Reject
                    </Button>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: "pending" | "approved" | "rejected" }) {
  return (
    <Badge
      className={cn(
        "mt-2 capitalize",
        status === "pending" && "bg-amber-100 text-amber-800 hover:bg-amber-100",
        status === "approved" && "bg-emerald-100 text-emerald-800 hover:bg-emerald-100",
        status === "rejected" && "bg-rose-100 text-rose-800 hover:bg-rose-100"
      )}
    >
      {status}
    </Badge>
  );
}

function Preview({
  fileUrl,
  mimeType,
  title,
}: {
  fileUrl: string;
  mimeType: string | null;
  title: string;
}) {
  if (mimeType?.startsWith("video/")) {
    return (
      <video src={fileUrl} controls className="h-48 w-full bg-black object-contain" />
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={fileUrl} alt={title} className="h-48 w-full object-cover bg-muted" />
  );
}

"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Clapperboard, Upload } from "lucide-react";
import { useAuth } from "@/app/context/authContext";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type MediaItem = {
  id: string;
  title: string;
  description: string | null;
  file_url: string;
  mime_type: string | null;
  status: "pending" | "approved" | "rejected";
  created_at: string;
  uploader_id: string;
};

export default function EntertainmentPage() {
  const { currentUser, userLoggedIn } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [items, setItems] = useState<MediaItem[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const load = useCallback(async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from("media_uploads")
      .select(
        "id, title, description, file_url, mime_type, status, created_at, uploader_id"
      )
      .order("created_at", { ascending: false });
    setItems((data as MediaItem[]) ?? []);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!currentUser || !file || !title.trim()) return;
    setSubmitting(true);
    setError(null);
    setNotice(null);

    try {
      const supabase = createClient();
      const ext = file.name.split(".").pop() ?? "bin";
      const path = `${currentUser.id}/${crypto.randomUUID()}.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from("media-uploads")
        .upload(path, file, { contentType: file.type, upsert: false });
      if (uploadError) throw uploadError;

      const { data: publicUrl } = supabase.storage
        .from("media-uploads")
        .getPublicUrl(path);

      const { error: insertError } = await supabase.from("media_uploads").insert({
        uploader_id: currentUser.id,
        title: title.trim(),
        description: description.trim() || null,
        file_url: publicUrl.publicUrl,
        storage_path: path,
        mime_type: file.type,
        status: "pending",
      });
      if (insertError) throw insertError;

      setTitle("");
      setDescription("");
      setFile(null);
      setNotice("Uploaded. An admin will approve it before it appears in the gallery.");
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setSubmitting(false);
    }
  };

  const approved = items.filter((item) => item.status === "approved");
  const mine = items.filter(
    (item) => currentUser && item.uploader_id === currentUser.id
  );

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <section className="rounded-2xl bg-gradient-to-r from-orange-500 via-pink-500 to-violet-600 p-6 text-white">
        <p className="flex items-center gap-2 text-sm font-medium text-white/90">
          <Clapperboard className="h-4 w-4" />
          Campus media
        </p>
        <h1 className="mt-1 text-3xl font-extrabold">Share photos and clips</h1>
        <p className="mt-2 max-w-xl text-sm text-white/90">
          Uploads are reviewed by Campus Hub admins. Approved posts show in the
          public gallery below.
        </p>
      </section>

      {userLoggedIn && currentUser ? (
        <form
          onSubmit={onSubmit}
          className="space-y-4 rounded-2xl border border-border bg-card p-5 shadow-sm"
        >
          <h2 className="flex items-center gap-2 font-semibold">
            <Upload className="h-4 w-4" />
            Submit for review
          </h2>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            required
          />
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description (optional)"
          />
          <input
            type="file"
            accept="image/*,video/*"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            className="block w-full text-sm"
          />
          {error && <p className="text-sm text-destructive">{error}</p>}
          {notice && <p className="text-sm text-emerald-700">{notice}</p>}
          <Button type="submit" disabled={submitting || !file || !title.trim()}>
            {submitting ? "Uploading…" : "Submit upload"}
          </Button>
        </form>
      ) : (
        <div className="rounded-xl border border-dashed p-6 text-center">
          <p className="text-sm text-muted-foreground">Sign in to submit media.</p>
          <Button asChild className="mt-3">
            <Link href="/login">Sign in</Link>
          </Button>
        </div>
      )}

      {mine.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-lg font-bold">Your submissions</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {mine.map((item) => (
              <article key={item.id} className="rounded-xl border border-border p-3">
                <p className="font-medium">{item.title}</p>
                <StatusPill status={item.status} />
              </article>
            ))}
          </div>
        </section>
      )}

      <section className="space-y-3">
        <h2 className="text-lg font-bold">Approved gallery</h2>
        {approved.length === 0 ? (
          <p className="rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground">
            Nothing approved yet. Check back after an admin reviews uploads.
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {approved.map((item) => (
              <article
                key={item.id}
                className="overflow-hidden rounded-xl border border-border bg-card"
              >
                {item.mime_type?.startsWith("video/") ? (
                  <video
                    src={item.file_url}
                    controls
                    className="h-44 w-full bg-black object-contain"
                  />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.file_url}
                    alt={item.title}
                    className="h-44 w-full object-cover"
                  />
                )}
                <div className="p-3">
                  <p className="font-semibold">{item.title}</p>
                  {item.description && (
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function StatusPill({ status }: { status: MediaItem["status"] }) {
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

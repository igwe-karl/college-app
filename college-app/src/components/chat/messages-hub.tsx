"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  BadgeCheck,
  MessageCircle,
  School,
  Search,
  Send,
  Users,
} from "lucide-react";
import { useAuth } from "@/app/context/authContext";
import { useCurrentProfile } from "@/hooks/use-current-profile";
import { createClient } from "@/lib/supabase/client";
import type {
  ChatConversation,
  ChatMessage,
  DirectoryProfile,
} from "@/lib/chat-types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type ConversationRow = ChatConversation & {
  lastMessage?: string;
  lastAt?: string;
  peer?: DirectoryProfile | null;
};

export function MessagesHub() {
  const { currentUser, userLoggedIn } = useAuth();
  const { profile } = useCurrentProfile();
  const [query, setQuery] = useState("");
  const [directory, setDirectory] = useState<DirectoryProfile[]>([]);
  const [conversations, setConversations] = useState<ConversationRow[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const loadDirectory = useCallback(async () => {
    if (!currentUser) return;
    const supabase = createClient();
    const { data } = await supabase
      .from("profiles")
      .select("id, display_name, avatar_url, university, is_rep")
      .neq("id", currentUser.id)
      .order("is_rep", { ascending: false })
      .limit(80);
    setDirectory((data as DirectoryProfile[]) ?? []);
  }, [currentUser]);

  const loadConversations = useCallback(async () => {
    if (!currentUser) return;
    const supabase = createClient();
    const { data: convos } = await supabase
      .from("conversations")
      .select("id, type, university, created_at")
      .order("created_at", { ascending: false });

    const rows = (convos as ChatConversation[]) ?? [];
    const ids = rows.map((c) => c.id);
    const { data: latest } = ids.length
      ? await supabase
          .from("messages")
          .select("conversation_id, body, created_at")
          .in("conversation_id", ids)
          .order("created_at", { ascending: false })
      : { data: [] as { conversation_id: string; body: string; created_at: string }[] };

    const { data: parts } = ids.length
      ? await supabase
          .from("conversation_participants")
          .select("conversation_id, user_id")
          .in("conversation_id", ids)
      : { data: [] as { conversation_id: string; user_id: string }[] };

    const peerIds = Array.from(
      new Set(
        (parts ?? [])
          .filter((p) => p.user_id !== currentUser.id)
          .map((p) => p.user_id)
      )
    );
    const { data: peers } = peerIds.length
      ? await supabase
          .from("profiles")
          .select("id, display_name, avatar_url, university, is_rep")
          .in("id", peerIds)
      : { data: [] as DirectoryProfile[] };

    const peerMap = new Map((peers ?? []).map((p) => [p.id, p]));
    const lastMap = new Map<string, { body: string; created_at: string }>();
    for (const msg of latest ?? []) {
      if (!lastMap.has(msg.conversation_id)) {
        lastMap.set(msg.conversation_id, {
          body: msg.body,
          created_at: msg.created_at,
        });
      }
    }

    const enriched: ConversationRow[] = rows.map((c) => {
      const peerId = (parts ?? []).find(
        (p) => p.conversation_id === c.id && p.user_id !== currentUser.id
      )?.user_id;
      const last = lastMap.get(c.id);
      return {
        ...c,
        peer: peerId ? peerMap.get(peerId) ?? null : null,
        lastMessage: last?.body,
        lastAt: last?.created_at ?? c.created_at,
      };
    });

    enriched.sort(
      (a, b) => new Date(b.lastAt ?? 0).getTime() - new Date(a.lastAt ?? 0).getTime()
    );
    setConversations(enriched);
  }, [currentUser]);

  const joinSchoolChat = useCallback(async () => {
    if (!profile?.university) return;
    const supabase = createClient();
    const { data, error: rpcError } = await supabase.rpc(
      "get_or_create_school_conversation"
    );
    if (rpcError) {
      setError(rpcError.message);
      return;
    }
    if (typeof data === "string") {
      setActiveId(data);
      await loadConversations();
    }
  }, [loadConversations, profile?.university]);

  useEffect(() => {
    if (!userLoggedIn) return;
    loadDirectory();
    loadConversations();
    joinSchoolChat();
  }, [userLoggedIn, loadDirectory, loadConversations, joinSchoolChat]);

  useEffect(() => {
    if (!activeId) {
      setMessages([]);
      return;
    }
    const supabase = createClient();
    let cancelled = false;

    supabase
      .from("messages")
      .select("id, conversation_id, sender_id, body, created_at")
      .eq("conversation_id", activeId)
      .order("created_at", { ascending: true })
      .limit(200)
      .then(({ data }) => {
        if (!cancelled) setMessages((data as ChatMessage[]) ?? []);
      });

    const channel = supabase
      .channel(`messages:${activeId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `conversation_id=eq.${activeId}`,
        },
        (payload) => {
          const row = payload.new as ChatMessage;
          setMessages((prev) =>
            prev.some((m) => m.id === row.id) ? prev : [...prev, row]
          );
        }
      )
      .subscribe();

    return () => {
      cancelled = true;
      supabase.removeChannel(channel);
    };
  }, [activeId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  const openDirect = async (userId: string) => {
    setError(null);
    const supabase = createClient();
    const { data, error: rpcError } = await supabase.rpc(
      "get_or_create_direct_conversation",
      { other_user_id: userId }
    );
    if (rpcError) {
      setError(rpcError.message);
      return;
    }
    if (typeof data === "string") {
      setActiveId(data);
      await loadConversations();
    }
  };

  const sendMessage = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!currentUser || !activeId || !draft.trim()) return;
    setSending(true);
    setError(null);
    const supabase = createClient();
    const { error: insertError } = await supabase.from("messages").insert({
      conversation_id: activeId,
      sender_id: currentUser.id,
      body: draft.trim(),
    });
    if (insertError) setError(insertError.message);
    else setDraft("");
    setSending(false);
    await loadConversations();
  };

  const filteredDirectory = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return directory.slice(0, 12);
    return directory.filter((p) => {
      const name = (p.display_name ?? "").toLowerCase();
      const uni = (p.university ?? "").toLowerCase();
      return name.includes(q) || uni.includes(q);
    });
  }, [directory, query]);

  const active = conversations.find((c) => c.id === activeId);
  const senderNames = useMemo(() => {
    const map = new Map<string, DirectoryProfile>();
    directory.forEach((p) => map.set(p.id, p));
    conversations.forEach((c) => {
      if (c.peer) map.set(c.peer.id, c.peer);
    });
    return map;
  }, [conversations, directory]);

  if (!userLoggedIn || !currentUser) {
    return (
      <div className="mx-auto max-w-md space-y-4 py-12 text-center">
        <h1 className="text-2xl font-bold">Messages</h1>
        <p className="text-muted-foreground">
          Sign in to chat with classmates and campus reps.
        </p>
        <Button asChild>
          <Link href="/login">Sign in</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid min-h-[calc(100vh-8rem)] overflow-hidden rounded-2xl border border-border bg-card shadow-sm lg:grid-cols-[20rem_1fr]">
      <aside className="flex flex-col border-b border-border lg:border-b-0 lg:border-r">
        <div className="space-y-3 border-b border-border p-4">
          <div className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-violet-600" />
            <h1 className="text-lg font-bold">Messages</h1>
          </div>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Find students or reps"
              className="pl-9"
            />
          </div>
          {profile?.university ? (
            <button
              type="button"
              onClick={joinSchoolChat}
              className="flex w-full items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-violet-600 px-3 py-2 text-left text-sm font-semibold text-white"
            >
              <School className="h-4 w-4" />
              {profile.university} lounge
            </button>
          ) : (
            <p className="text-xs text-muted-foreground">
              Add a university on your profile to join your school lounge.
            </p>
          )}
        </div>

        <div className="flex-1 overflow-y-auto p-2">
          {query.trim() ? (
            <div className="space-y-1">
              <p className="px-2 py-1 text-xs font-semibold uppercase text-muted-foreground">
                People
              </p>
              {filteredDirectory.map((person) => (
                <button
                  key={person.id}
                  type="button"
                  onClick={() => openDirect(person.id)}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left hover:bg-muted"
                >
                  <PersonAvatar name={person.display_name} />
                  <span className="min-w-0">
                    <span className="flex items-center gap-1 truncate text-sm font-medium">
                      {person.display_name ?? "Student"}
                      {person.is_rep && (
                        <BadgeCheck className="h-3.5 w-3.5 text-emerald-600" />
                      )}
                    </span>
                    <span className="block truncate text-xs text-muted-foreground">
                      {person.university ?? "Campus"}
                    </span>
                  </span>
                </button>
              ))}
              {filteredDirectory.length === 0 && (
                <p className="px-3 py-6 text-center text-sm text-muted-foreground">
                  No matching students.
                </p>
              )}
            </div>
          ) : (
            <div className="space-y-1">
              {conversations.map((convo) => {
                const title =
                  convo.type === "school"
                    ? `${convo.university} lounge`
                    : convo.peer?.display_name ?? "Direct message";
                return (
                  <button
                    key={convo.id}
                    type="button"
                    onClick={() => setActiveId(convo.id)}
                    className={cn(
                      "flex w-full items-start gap-3 rounded-xl px-3 py-2 text-left",
                      activeId === convo.id ? "bg-violet-50 dark:bg-violet-950/40" : "hover:bg-muted"
                    )}
                  >
                    {convo.type === "school" ? (
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-100 text-orange-700">
                        <Users className="h-4 w-4" />
                      </span>
                    ) : (
                      <PersonAvatar name={convo.peer?.display_name} />
                    )}
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-1 truncate text-sm font-semibold">
                        {title}
                        {convo.peer?.is_rep && (
                          <BadgeCheck className="h-3.5 w-3.5 text-emerald-600" />
                        )}
                      </span>
                      <span className="block truncate text-xs text-muted-foreground">
                        {convo.lastMessage ?? "No messages yet"}
                      </span>
                    </span>
                  </button>
                );
              })}
              {conversations.length === 0 && (
                <p className="px-3 py-8 text-center text-sm text-muted-foreground">
                  Start a chat with a classmate or campus rep.
                </p>
              )}
            </div>
          )}
        </div>
      </aside>

      <section className="flex min-h-[28rem] flex-col">
        {activeId ? (
          <>
            <header className="flex items-center gap-3 border-b border-border px-4 py-3">
              {active?.type === "school" ? (
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-orange-700">
                  <School className="h-5 w-5" />
                </span>
              ) : (
                <PersonAvatar name={active?.peer?.display_name} />
              )}
              <div>
                <p className="font-semibold">
                  {active?.type === "school"
                    ? `${active.university} lounge`
                    : active?.peer?.display_name ?? "Chat"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {active?.type === "school"
                    ? "Everyone at this school can read and write here. Reps are marked."
                    : active?.peer?.is_rep
                      ? `Campus rep · ${active.peer.university ?? "School"}`
                      : active?.peer?.university ?? "Direct message"}
                </p>
              </div>
            </header>

            <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((message) => {
                const mine = message.sender_id === currentUser.id;
                const sender = senderNames.get(message.sender_id);
                return (
                  <div
                    key={message.id}
                    className={cn("flex", mine ? "justify-end" : "justify-start")}
                  >
                    <div
                      className={cn(
                        "max-w-[80%] rounded-2xl px-3 py-2 text-sm shadow-sm",
                        mine
                          ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white"
                          : "bg-muted"
                      )}
                    >
                      {!mine && (
                        <p className="mb-0.5 flex items-center gap-1 text-[11px] font-semibold opacity-80">
                          {sender?.display_name ?? "Student"}
                          {sender?.is_rep && (
                            <BadgeCheck className="h-3 w-3 text-emerald-500" />
                          )}
                        </p>
                      )}
                      <p className="whitespace-pre-wrap break-words">{message.body}</p>
                    </div>
                  </div>
                );
              })}
              <div ref={bottomRef} />
            </div>

            {error && (
              <p className="px-4 text-sm text-destructive">{error}</p>
            )}

            <form
              onSubmit={sendMessage}
              className="flex gap-2 border-t border-border p-3"
            >
              <Input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Write a message…"
                maxLength={4000}
              />
              <Button type="submit" disabled={sending || !draft.trim()}>
                <Send className="h-4 w-4" />
                Send
              </Button>
            </form>
          </>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center gap-2 p-8 text-center text-muted-foreground">
            <MessageCircle className="h-10 w-10 text-violet-400" />
            <p className="font-medium text-foreground">Pick a conversation</p>
            <p className="max-w-sm text-sm">
              Message students one-to-one, or use your school lounge to reach
              campus reps and classmates.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

function PersonAvatar({ name }: { name?: string | null }) {
  const letter = (name ?? "S").trim().charAt(0).toUpperCase();
  return (
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-violet-100 text-sm font-bold text-violet-800">
      {letter}
    </span>
  );
}

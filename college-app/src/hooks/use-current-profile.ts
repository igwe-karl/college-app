"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/app/context/authContext";
import { createClient } from "@/lib/supabase/client";

export type CurrentProfile = {
  id: string;
  display_name: string | null;
  avatar_url: string | null;
  university: string | null;
  major: string | null;
  year_level: string | null;
  phone: string | null;
  bio: string | null;
  is_rep: boolean;
  role: "student" | "admin";
};

export function useCurrentProfile() {
  const { currentUser } = useAuth();
  const [profile, setProfile] = useState<CurrentProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) {
      setProfile(null);
      setLoading(false);
      return;
    }

    let cancelled = false;
    const supabase = createClient();

    supabase
      .from("profiles")
      .select(
        "id, display_name, avatar_url, university, major, year_level, phone, bio, is_rep, role"
      )
      .eq("id", currentUser.id)
      .maybeSingle()
      .then(({ data }) => {
        if (!cancelled) {
          setProfile((data as CurrentProfile | null) ?? null);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [currentUser]);

  return {
    profile,
    loading,
    isAdmin: profile?.role === "admin",
    isRep: Boolean(profile?.is_rep),
  };
}

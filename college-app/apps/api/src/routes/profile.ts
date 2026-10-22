import { Hono } from "hono";
import { createAdminClient } from "../lib/supabase.js";
import { requireAuth, type AuthVariables } from "../middleware/auth.js";

type Variables = AuthVariables;

const profile = new Hono<{ Variables: Variables }>();

profile.get("/me", requireAuth, async (c) => {
  const userId = c.get("userId");
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("profiles")
    .select("id, display_name, avatar_url, created_at")
    .eq("id", userId)
    .single();

  if (error) {
    return c.json({ error: error.message }, 500);
  }

  return c.json({ data });
});

export default profile;

import { Hono } from "hono";
import { newsPostSchema } from "@college/shared";
import { createAdminClient } from "../lib/supabase.js";
import { requireAuth, type AuthVariables } from "../middleware/auth.js";

type Variables = AuthVariables;

const news = new Hono<{ Variables: Variables }>();

news.get("/", async (c) => {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("news_posts")
    .select("id, title, body, author_id, published_at")
    .order("published_at", { ascending: false })
    .limit(50);

  if (error) {
    return c.json({ error: error.message }, 500);
  }

  return c.json({ data });
});

news.post("/", requireAuth, async (c) => {
  const body = await c.req.json();
  const parsed = newsPostSchema.safeParse(body);

  if (!parsed.success) {
    return c.json({ error: parsed.error.flatten() }, 400);
  }

  const userId = c.get("userId");
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("news_posts")
    .insert({
      title: parsed.data.title,
      body: parsed.data.body ?? null,
      author_id: userId,
    })
    .select()
    .single();

  if (error) {
    return c.json({ error: error.message }, 500);
  }

  return c.json({ data }, 201);
});

export default news;

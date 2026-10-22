import { Hono } from "hono";
import { eventSchema } from "@college/shared";
import { createAdminClient } from "../lib/supabase.js";
import { requireAuth, type AuthVariables } from "../middleware/auth.js";

type Variables = AuthVariables;

const events = new Hono<{ Variables: Variables }>();

events.get("/", async (c) => {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("campus_events")
    .select("*")
    .order("event_date", { ascending: false });

  if (error) {
    return c.json({ error: error.message }, 500);
  }

  return c.json({ data });
});

events.post("/", requireAuth, async (c) => {
  const body = await c.req.json();
  const parsed = eventSchema.safeParse(body);

  if (!parsed.success) {
    return c.json({ error: parsed.error.flatten() }, 400);
  }

  const userId = c.get("userId");
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("campus_events")
    .insert({
      title: parsed.data.title,
      description: parsed.data.description ?? null,
      event_date: parsed.data.event_date,
      event_time: parsed.data.event_time ?? null,
      location: parsed.data.location ?? null,
      category: parsed.data.category,
      organizer_id: userId,
    })
    .select()
    .single();

  if (error) {
    return c.json({ error: error.message }, 500);
  }

  return c.json({ data }, 201);
});

export default events;

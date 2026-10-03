import type { Context, Next } from "hono";
import { createUserClient } from "../lib/supabase.js";

export type AuthVariables = {
  userId: string;
  accessToken: string;
};

export async function requireAuth(c: Context, next: Next) {
  const header = c.req.header("Authorization");
  const token = header?.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  const supabase = createUserClient(token);
  const { data, error } = await supabase.auth.getUser(token);

  if (error || !data.user) {
    return c.json({ error: "Invalid or expired token" }, 401);
  }

  c.set("userId", data.user.id);
  c.set("accessToken", token);
  await next();
}

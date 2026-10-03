import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import news from "./routes/news.js";
import profile from "./routes/profile.js";

const app = new Hono();

const webOrigin = process.env.WEB_ORIGIN ?? "http://localhost:3000";

app.use(
  "*",
  cors({
    origin: webOrigin,
    allowHeaders: ["Content-Type", "Authorization"],
  })
);

app.get("/", (c) =>
  c.json({
    ok: true,
    service: "@college/api",
    endpoints: {
      health: "GET /health",
      news: "GET /api/news, POST /api/news (auth)",
      profile: "GET /api/profile/me (auth)",
    },
  })
);

app.get("/health", (c) => c.json({ ok: true }));

app.notFound((c) =>
  c.json(
    {
      error: "Not found",
      hint: "Try GET /health or GET /api/news",
    },
    404
  )
);

app.route("/api/news", news);
app.route("/api/profile", profile);

const port = Number(process.env.PORT ?? 4000);

serve({ fetch: app.fetch, port }, () => {
  console.log(`API listening on http://localhost:${port}`);
});

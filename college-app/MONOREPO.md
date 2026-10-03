# College Road Trip — Monorepo

This repository is an **npm workspaces** monorepo:

| Package | Path | Description |
|---------|------|-------------|
| **web** | `.` (root) | Next.js frontend |
| **@college/api** | `apps/api` | Hono REST API backed by Supabase |
| **@college/shared** | `packages/shared` | Shared Zod schemas and TypeScript types |
| **@college/supabase** | `packages/supabase` | Supabase client helpers and DB types |

Database migrations live in `supabase/migrations/`.

## Prerequisites

- **Node.js 20+** (required by `@supabase/supabase-js`; use `nvm use` — see `.nvmrc`)
- A [Supabase](https://supabase.com) project

## Setup

1. Copy environment variables:

   ```bash
   cp .env.example .env.local
   cp .env.example apps/api/.env
   ```

   Fill in values from **Supabase → Project Settings → API**.

2. Apply database migrations (choose one):

   - **Supabase CLI (local):** `npx supabase start` then `npx supabase db reset`
   - **Hosted project:** paste `supabase/migrations/20260303120000_init.sql` into the SQL editor, or run `npx supabase db push` after `supabase link`.

3. In Supabase **Authentication → URL configuration**, set:

   - Site URL: `http://localhost:3000`
   - Redirect URLs: `http://localhost:3000/auth/callback`

4. Enable **Email** under Authentication → Providers.

5. **Google sign-in (optional)** — fixes `Unsupported provider: provider is not enabled`:

   1. [Google Cloud Console](https://console.cloud.google.com/) → APIs & Services → **Credentials** → Create **OAuth client ID** (Web application).
   2. **Authorized redirect URIs** — add exactly (replace `YOUR_PROJECT_REF`):
      ```text
      https://YOUR_PROJECT_REF.supabase.co/auth/v1/callback
      ```
   3. Supabase → **Authentication → Providers → Google** → Enable, paste **Client ID** and **Client Secret**.
   4. Supabase → **Authentication → URL configuration** — ensure redirect URLs include:
      ```text
      http://localhost:3000/auth/callback
      ```
   5. In `.env.local` set:
      ```bash
      NEXT_PUBLIC_GOOGLE_AUTH_ENABLED=true
      ```
   6. Restart `npm run dev`.

6. Install dependencies from the repo root (Node 20+):

   ```bash
   nvm use
   npm install
   ```

## Development

```bash
# Frontend (port 3000) — login/register talk to Supabase directly, not :4000
npm run dev

# REST API (port 4000) — news/profile routes; run in a second terminal
npm run dev:api
```

Verify the API: open [http://localhost:4000/health](http://localhost:4000/health) (should return `{"ok":true}`).  
A **404 on `http://localhost:4000/` alone** used to mean no root route; **`GET /` now returns API info**. If you still see 404, the API process is probably not running — start it with `npm run dev:api`.

**Login, register, and Google OAuth do not use `localhost:4000`.** They use your Supabase project URL from `NEXT_PUBLIC_SUPABASE_*` in `.env.local`. A broken API does not block auth unless you call `apiFetch` yourself.

## API endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/health` | No | Health check |
| GET | `/api/news` | No | List news posts |
| POST | `/api/news` | Bearer JWT | Create a news post |
| GET | `/api/profile/me` | Bearer JWT | Current user profile row |

Pass the Supabase access token from the web session:

```ts
const { session } = useAuth();
await apiFetch("/api/news", {
  method: "POST",
  token: session?.access_token,
  body: JSON.stringify({ title: "Hello" }),
});
```

## Auth (Supabase)

Firebase has been replaced with **Supabase Auth** in the web app:

- Email/password sign-up and sign-in
- Google OAuth via `/auth/callback`
- Session refresh via `src/middleware.ts`

Legacy Firebase files under `src/app/firebase/` are unused and can be removed once you confirm migration.

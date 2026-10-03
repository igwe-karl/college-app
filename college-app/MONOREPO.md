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

- Node.js 18+
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

4. Enable **Email** and (optional) **Google** providers under Authentication → Providers.

5. Install dependencies from the repo root:

   ```bash
   npm install
   ```

## Development

```bash
# Frontend only (port 3000)
npm run dev

# API only (port 4000)
npm run dev:api
```

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

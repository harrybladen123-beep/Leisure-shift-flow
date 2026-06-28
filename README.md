# ShiftFlow

Workforce management platform for the leisure industry. Built with Next.js 15, Prisma, PostgreSQL (Supabase), and Clerk.

## Getting started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env` and fill in the values (see [Environment variables](#environment-variables) below).

3. Apply the database schema:
   ```bash
   npx prisma migrate dev
   ```

4. Start the dev server:
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

## Environment variables

| Variable | Description |
| --- | --- |
| `DATABASE_URL` | Postgres connection string (Supabase direct connection) |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk publishable key |
| `CLERK_SECRET_KEY` | Clerk secret key |
| `CLERK_WEBHOOK_SIGNING_SECRET` | Signing secret for the `/api/webhooks/clerk` endpoint (Clerk dashboard → Webhooks) |
| `NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL` | Set to `/dashboard` so sign-in lands on the role router |
| `NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL` | Set to `/dashboard` so sign-up lands on the role router |

### Clerk webhook setup

User records are synced from Clerk into Postgres via a webhook. In the Clerk dashboard, add an endpoint pointing at `https://<your-host>/api/webhooks/clerk`, subscribed to `user.created`, `user.updated`, and `user.deleted`, then copy its signing secret into `CLERK_WEBHOOK_SIGNING_SECRET`. For local development this requires a tunnel (e.g. ngrok) since Clerk needs a publicly reachable URL.

### Roles and portals

New users default to the `EMPLOYEE` role and land on `/employee` after signing in. Promote a user to `ADMINISTRATOR` or `MANAGER` via Prisma Studio (`npx prisma studio`) to access `/admin` or `/manager`.

## Tech stack

- **Frontend**: Next.js 15 (App Router), React, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API routes
- **Database**: PostgreSQL via Supabase, accessed with Prisma
- **Auth**: Clerk

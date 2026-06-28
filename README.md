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

## Tech stack

- **Frontend**: Next.js 15 (App Router), React, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API routes
- **Database**: PostgreSQL via Supabase, accessed with Prisma
- **Auth**: Clerk

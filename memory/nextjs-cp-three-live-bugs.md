---
name: nextjs-cp-three-live-bugs
description: "Three bugs that all shipped green and only appeared on the live site — prefetched logout, pooler concurrency deadlock, and a module-load DB throw that breaks CI. Check these on any Next CP."
metadata: 
  node_type: memory
  type: reference
  originSessionId: f0e4bb54-a414-412d-b769-affa62fcad7c
  modified: 2026-08-19T20:54:58.914Z
---

Found building the Bulldog Water CP, 2026-08-19. Every one passed typecheck,
lint and `next build`, and every one was only visible against the deployed
site. Check all three on any Next.js control panel in this fleet.

**1. `<Link href="/admin/logout">` signs people out by itself.** Next prefetches
links in the viewport, so the browser fetched the logout URL the moment the
admin header rendered, and the route destroyed the session. Symptom: login
looks like it works — the action's own redirect renders an authenticated page
from the in-request session — and then the very next click bounces to the login
screen. It cost hours because it does NOT reproduce against curl or Playwright's
HTTP client: those never prefetch, so the whole flow passes there. **Anything
that changes state must be a POST**, never reachable by GET. The same trap sat
on the 2FA screen's "Sign out" link, which would have logged people out while
they read the code off their phone.

**2. More concurrent queries than pool connections deadlocks Supabase's
transaction pooler.** `/admin/analytics` fired 10 aggregations through
`Promise.all` on a postgres.js pool of `max: 4` and returned **504 on every
load**, while each query ran in milliseconds. Measured on that database: 8
concurrent on a pool of 1 hangs forever, 10 on a pool of 4 hangs, 8 on a pool
of 10 is 299ms, 8 sequential on a pool of 4 is 660ms. Do NOT fix it by raising
`max` — that hides it until real traffic, when many serverless instances each
hold a fat pool against one shared pooler. Make DB reads sequential; on an
admin page the few hundred ms is free.

**3. Building the DB client at module load turns a missing env var into a
failed BUILD.** `next build` evaluates every route module to collect page data,
so `postgres(connectionString())` at import time died with "Failed to collect
configuration for /api/err" wherever `DATABASE_URL` isn't set — i.e. GitHub
Actions CI and every preview deploy, which never get production-scoped env.
That would have turned every Dependabot PR on the repo red. Connect lazily
(a Proxy around drizzle works and keeps `db.select(...)` reading the same), and
prove it by building with `.env.local` moved aside.

Two smaller traps from the same session:

- **`. ./.env.local` in bash silently aborts** on an unquoted value containing
  shell metacharacters — here `LEAD_FROM=Bulldog Water <website@…>`, where `<`
  reads as a redirect. Sourcing stops at that line, so every variable BELOW it
  is empty and the failure looks like "the deploy ignored my env". Next's own
  dotenv parser is fine with it, so production never showed the problem. Quote
  values, or parse the file in Node rather than sourcing it.
- **Don't copy `MASTER_PUBLIC_KEY` from another repo's local `.env.local`.**
  bulldogsecurityservice.com's copy matched neither the active nor the retired
  master key — that file had drifted while its Vercel env stayed correct. The
  portal pull failed with a bare 401. Take it from `master_signing_keys` where
  `status='active'`. Related: [[bulldog-water-control-panel]].

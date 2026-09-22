---
name: govsprint-analytics
description: "govsprint.app had no analytics at all — the beacon, tables and master endpoints that now feed its fleet card"
metadata: 
  node_type: memory
  type: project
  originSessionId: f0e4bb54-a414-412d-b769-affa62fcad7c
  modified: 2026-08-19T23:20:32.330Z
---

Built 2026-08-19, after Russell asked "govsprint.app has no stats?". It had
none: no `page_views` table, no beacon, nothing counting. Its zero on the fleet
board was **honest**, which is a different problem from Utilities Plus and
Pixel Monsters, whose numbers existed but the portal could not read them. See
[[portal-traffic-tile-analytics-mode]] for that distinction — flipping
`analytics_mode` here would only have made the portal lie more confidently.

**What exists now** (migration `0009_page_views.sql` — 0008 was taken upstream
by their error capture, mid-build):
- `page_views`, `analytics_events`, `web_vitals`; RLS on, no grants to anon.
  This app never uses the anon key in a browser — sessions are iron-session and
  Postgres is reached as the SERVICE ROLE (see `lib/db.ts`) — so the tables
  need no public grants at all.
- `/api/pv` — one beacon endpoint for views, events, vitals and time-on-page,
  with bots dropped via isbot. Without that filter the graph is mostly
  crawlers, which is worse than no graph.
- `components/Beacon.tsx` — cookie-free, rotating per-tab id in
  sessionStorage. **It deliberately does not measure `/app`, `/account`,
  `/admin`, `/invite` or `/reset`**: that is a customer's private pipeline of
  bids and the paths alone would leak what they are working on. Verified live —
  a visit to `/app` produces no row.
- `/api/master/{health,users,errors,analytics}` + public `/api/health`.

**`analytics_snapshot()` returns the entire canonical payload as one jsonb in a
single round trip.** Not neatness: more concurrent queries than the client pool
has connections deadlocks Supabase's transaction pooler, which is what had
Bulldog Water's analytics page returning 504 on every load the same day
([[nextjs-cp-three-live-bugs]]).

**The trap worth remembering:** upstream added `error_events` while this was
being written, using its own column names — `source` not `module`, `at` not
`occurred_at`, and no `level` at all. The errors endpoint was first written
against the fleet's usual names; it compiled, it would have deployed, and it
would have failed on the first pull. Always read the live
`information_schema.columns` for a table another commit owns rather than
assuming the fleet convention. Level is now reported as `"error"` because
nothing records severity and inventing one would put an unmeasured "warn" on
the board.

Verified live end to end: three real visits recorded with device, country,
session and time-on-page; `/app` not counted; all four master endpoints 401 to
anonymous callers and 200 to the portal's own signed pull; the fleet card reads
3 views / 1 session / 3 signups. Conversions are signups (`users` created in
the window), which is the conversion that matters for this product.

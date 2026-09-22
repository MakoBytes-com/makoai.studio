---
name: portal-traffic-tile-analytics-mode
description: Why fleet cards show 0 page views — clients.analytics_mode picks between pulling from the site and a central beacon almost nothing feeds
metadata: 
  node_type: memory
  type: project
  originSessionId: f0e4bb54-a414-412d-b769-affa62fcad7c
  modified: 2026-08-19T21:15:36.283Z
---

Russell, 2026-08-19, looking at the fleet board: "I see no trafic on these
meeters??" on Utilities Plus and Pixel Monsters. Both had real traffic. The
tile was not measuring them.

**`clients.analytics_mode` is the switch.** It is `'endpoint'` or `'central'`
(CHECK constraint, default `'endpoint'`):

- **endpoint** — the fleet-refresh cron signs a token and pulls
  `/api/master/analytics` from the site itself, then caches it in
  `client_kpi_cache` under `kpi_key='analytics'`.
- **central** — the portal instead DERIVES the tile from its own
  `fleet_page_views` table (`lib/fleet/centralAnalytics.ts`), keyed by
  `clients.slug`, and **overwrites** whatever the pull produced. The cached
  row carries `source: 'central'`, which is how to tell them apart.

**The trap:** only 4 sites have ever posted to that central beacon
(makoai-studio, makoanswer-com, localaibox-com, makopulse-com). 15 sites were
set to `central`, so the other 11 rendered a flat zero line no matter how busy
they were. Utilities Plus was showing 0 while its own database held 1,047 views
and 844 sessions for the same 30 days.

**Fixing one site:** give it `/api/master/*`, register a `client_endpoints`
row, redeploy so the env applies, prove the pull returns 200 — and only then
flip `analytics_mode` to `'endpoint'`. Flipping first just swaps one zero for
another. Verified this way for Utilities Plus (1,047 views / 839 sessions) and
Pixel Monsters (97 / 30 — its endpoints were already built and live, and were
returning 401 only because the connection env vars had never been set).

**Two different causes of a zero, and they need different fixes:**
1. *Data exists, portal can't see it* — the site collects page views into its
   own DB but is on `central` with no beacon. Wiring job. (Utilities Plus,
   Pixel Monsters.)
2. *Nothing is collecting at all* — the site has no `page_views` table.
   GovSprint is this: its zero is honest, and it needs a beacon built before
   any wiring matters. Do not "fix" it by flipping the mode.

Still reading zero as of that date: Axys Corp and Davis Investigation Services
(`central`, no beacon); GovSprint, NautiDawgs and the portal's own card (no
collection at all). **Woodlands Family Psychiatry also reads zero — leave it
alone, it is MSP-only and excluded from live-site work.** Related:
[[bulldog-water-control-panel]], [[nextjs-cp-three-live-bugs]],
[[fleet-vs-portal-coverage]].

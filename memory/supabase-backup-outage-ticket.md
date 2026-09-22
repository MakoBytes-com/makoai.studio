---
name: supabase-backup-outage-ticket
description: "Ready-to-send Supabase support ticket: daily backups silently stopped on 3 ACTIVE_HEALTHY Pro projects (Aug 2/3/4 2026), all prior backups COMPLETED, siblings unaffected. Evidence gathered 2026-08-05."
metadata: 
  node_type: memory
  type: reference
  originSessionId: b166a300-b77d-4289-bd06-387937068267
  modified: 2026-08-05T20:24:45.092Z
---

# Supabase support ticket — daily backups stopped on three projects

Written 2026-08-05 so this is a paste-and-send, not a research task. Submit at
**https://supabase.com/dashboard/support/new** (org: Mako Logics,
`grfmpihjnzfspngyndzo`, plan: Pro). Sending needs Russell — Supabase support has
no API — but nothing else about it does.

**Mitigated on our side already**: the portal now exports every client database
nightly ([[spend-spike-2026-08-and-bulldog-captcha]] §6), so this is a "why did
your scheduler stop" question, not an emergency.

---

**Subject:** Daily backups silently stopped on 3 Pro projects — all ACTIVE_HEALTHY, no failed backups

Hello,

Three projects in our organisation (`grfmpihjnzfspngyndzo`, Pro plan) stopped
receiving daily physical backups on three different days. All three are
`ACTIVE_HEALTHY` and serving production traffic.

| project | ref | last backup | backups listed |
|---|---|---|---|
| makoanswer | `miceoeefertjnplqlrdk` | 2026-08-02T05:17:55Z | 5 |
| makopulse | `tjknmpbrgyexxjcjwmhb` | 2026-08-03T06:27:23Z | 5 |
| toppaws | `jpsbigotktzqlpdwrali` | 2026-08-04T07:14:52Z | 6 |

For contrast, in the same organisation and region (`us-east-1`), these are
still backing up daily:

| project | ref | last backup |
|---|---|---|
| bulldog-cp | `xfzktotopkedgnhukzzd` | 2026-08-05T09:04:00Z |
| bishopbend | `wvrlpyvafyewuotcivpt` | ~5h old at time of writing |
| aaaawning | `upyzwqonkrmdsphjxdod` | ~6h old at time of writing |

What we have already checked:

1. **Every backup that exists reports `status: "COMPLETED"`.** There are no
   failed or partial backups in `GET /v1/projects/{ref}/database/backups` — the
   daily cadence was perfectly regular (same time each day, ~05:17 / 06:27 /
   07:14 UTC respectively) and then simply produced nothing further.
2. **Project status is `ACTIVE_HEALTHY`** on all three, confirmed via
   `GET /v1/projects/{ref}`. None is paused.
3. **The organisation is on the Pro plan**, confirmed via
   `GET /v1/organizations/{id}` (`"plan":"pro"`), so daily backups with 7-day
   retention should apply.
4. `pitr_enabled: false`, `walg_enabled: true` on both a stale project and a
   healthy one — identical, so that is not the differentiator.
5. The three affected projects were created in June 2026; the healthy ones in
   May 2026. That is the only correlation we can see from the API.

Questions:

1. Why did the daily backup schedule stop for these three projects, given the
   plan entitles them to it and no backup failed?
2. Is there anything we need to change on our side to resume it, or can you
   re-enable the schedule?
3. Can the missed days (2026-08-02 onward for makoanswer) be recovered, or is
   that data now outside any restore point you hold?
4. Is there an API field we can poll that would have told us the schedule had
   stopped? `GET .../database/backups` looks healthy right up until the point
   the backups simply cease, which meant we only noticed by measuring the age
   of the newest entry ourselves.

Thanks,
Russell Sailors — Mako Logics LLC

---

## If Supabase says "that's expected"

Then the remaining question is whether Pro daily backups are guaranteed at all
for these projects, which changes whether the portal's own nightly export is a
belt-and-braces measure or the *primary* backup. If it becomes primary, the
250k-row cap in `lib/export-clients.ts` needs revisiting — a capped table is an
arbitrary subset, not a restorable snapshot.

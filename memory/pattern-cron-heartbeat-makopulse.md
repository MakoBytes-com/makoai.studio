---
name: pattern-cron-heartbeat-makopulse
description: "Fleet convention (2026-07-30): every Vercel cron pings a MakoPulse heartbeat so a schedule that silently stops firing announces itself. Where to place the ping, the two-success-paths trap, and why MakoPulse rather than an outside tool."
metadata: 
  node_type: memory
  type: project
  originSessionId: 5803045f-c6c3-4e0c-b192-abcb8dcb1763
  modified: 2026-07-30T12:46:20.715Z
---

**The gap this closes:** a cron route logs its own failures, but a schedule that
simply **stops firing** produces no log, no error and no alert. It just goes
quiet — and quiet reads as healthy. Proven twice in this fleet: the portal's
`daily-digest` ran blind for days (July), and makologics' `gsc-health` header
records the Search Console connection dying **undetected for three weeks**.

## Why MakoPulse, not UptimeRobot / GitHub Actions

Russell, 2026-07-30: **"We own makopulse why do we need to use outside tools?"**
He was right. MakoPulse already has the whole architecture:

- `prober/` on **Fly.io**, always-on, 2 regions (iad US + ams EU) — off-Vercel.
- `worker/` = Cloudflare Worker `makopulse-watchdog`, cron `*/2` — watches
  MakoPulse itself, so "quiet because everything is down" still pages.
- `heartbeats` table + `GET|POST /api/heartbeat/<token>`; down-detection lives in
  `/api/cron/check` (every 3 min) and alerts past `period + grace`.
- Mako Logics org is **Pro**: 50 monitors, 30s min interval, browser checks,
  5 status pages. Free capacity — do not reach for a paid third party.

Don't pay GitHub Actions for uptime either: it bills a **full minute per job**
for a few-second curl, and throttles scheduled runs to ~13/day regardless of the
cron you write. See [[github-actions-spend-2026-07]].

## The implementation

`pingHeartbeat(envVar)` helper per repo (`lib/heartbeat.ts` or `src/lib/`):
fire-and-forget POST, `AbortSignal.timeout(5000)`, **never throws**, and
**no-ops when the env var is unset**.

Two rules that matter:

1. **One env var per cron**, never a shared URL — otherwise one dead job is
   masked by a sibling still checking in. Naming: `MAKOPULSE_HB_<JOB>`
   (single-cron repos just use `MAKOPULSE_HEARTBEAT_URL`).
2. **Production-only env var.** Not preview, not `.env.local`. A preview deploy
   or local run pinging the heartbeat would spoof a check-in and mask a dead
   production cron.

## Where to place the ping — decide by what the route already reports

- **On SUCCESS only** — when the cron's own failure would otherwise look
  healthy. Used for `error-alerts` (it *is* the error reporter, so its silence
  looks like "no errors") and `makochat /api/backup` (a backup that "ran but
  threw" is not healthy).
- **BEFORE the work** — when the route already reports its own failures and the
  only unwatched thing is the schedule. Used for `gsc-health` (returns 200 and
  logs the problem by design), `blog-draft` (emails on failure; empty queue is a
  valid no-op), `recalls`, `cleanup`.
- **Unconditionally** — `makoanswer /api/monitor`: it owns its own alerting, so
  skipping the ping when down would double-page one outage as a missed heartbeat.

## THE TRAP — enumerate every success path first

The `error-alerts` routes have **TWO** success returns: an early
`{ok:true, spikes:0}` (the *common* case — no spikes) and the final one.
Pinging only the final return leaves the heartbeat almost never firing and
therefore **permanently alarming** — a monitor that fires only when something
IS wrong is worse than no monitor. Grep every `return` in the handler before
placing the ping.

**I shipped this bug and had to fix it (makologics `8e145a5` → `f8f7dcf`,
verified `up` at 12:45:37 UTC after the fix deployed).** I
discovered the two-path trap while doing aaaawning/bishopbend, covered both
paths there, and **never went back to re-check makologics**, which I'd already
pushed with only the final return covered. Caught it only because the other two
heartbeats went `up` while makologics stayed `pending`.

Two lessons: (1) when you learn something mid-sweep, **re-audit the repos you
already finished** — that's the "what did I leave in that depended on the old
shape" rule; (2) `pending` vs `up` across sibling repos on the same schedule is
a free differential test — if one lags, it's not slow, it's broken.

Also: a fresh heartbeat is `status='pending'`, and down-detection does
`.neq("status","pending")` — so it cannot false-alarm before its first real
ping. Good. But that also means **an unverified ping is an inert monitor**:
always trigger the cron once (CRON_SECRET bearer) and confirm `status` flips to
`up`, rather than trusting the code.

## Coverage as of 2026-07-30

All 29 fleet Vercel crons covered. makoanswer, makochat, makologics (×3),
bndtrentals (×2), aaaawning, bishopbend shipped this day; makoai-portal already
had `cron_runs` + a 26h digest watchdog; makopulse's own loop is covered by the
Cloudflare worker.

Related: [[github-actions-spend-2026-07]], [[digest-liveness-and-secret-ages]].

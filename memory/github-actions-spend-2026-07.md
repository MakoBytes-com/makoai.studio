---
name: github-actions-spend-2026-07
description: "Why MakoBytes-com keeps hitting the $10 GitHub Actions budget — measured July 2026: 5,791 Actions minutes, top burners are toppaws' screenshot backfill (1,167m) and two per-minute-billed uptime crons (848m). Also: a SEPARATE $18.39/mo GHAS Secret Protection charge the Actions budget alert never mentions."
metadata: 
  node_type: memory
  type: project
  originSessionId: 5803045f-c6c3-4e0c-b192-abcb8dcb1763
  modified: 2026-07-30T11:39:05.262Z
---

# GitHub Actions spend — measured, not guessed (July 2026)

Russell got "You've hit 90% of your budget" ($9.02 of $10.00) for the
**MakoBytes-com** org on 2026-07-30. Measured via
`gh api organizations/MakoBytes-com/settings/billing/usage?year=2026&month=7`
(the classic `settings/billing/actions` endpoint is **410 Gone** — moved).

## The two numbers that matter

| Product | Gross | Free allowance | **Net billed** |
|---|---|---|---|
| Actions Linux (5,791 min) | $34.75 | −$25.71 | **$9.04** ← the budget alert |
| GHAS Secret Protection | $18.39 | — | **$18.39** ← *not* in that budget |
| Actions storage (3.2 GB) | $0 | — | $0 |
| **Total July GitHub spend** | | | **$27.43** |

**The budget alert only covers Actions.** Real July spend is ~3× the $10
budget because Secret Protection is a separate line. Don't reassure him the
bill is $10 — it isn't.

## Where the 5,791 Actions minutes went

Every private repo bills; **public repos are free**. Of the org's repos only
`bndtrentals.com` is public — everything expensive is private.

Top repos: toppaws 1,252m · makoanswer 823m · makoai-portal 639m ·
makochat.app 629m (= 58% of the month between four repos).

Per-workflow (billable minutes, GitHub rounds **each job up to a full minute**):

1. **toppaws `screenshots.yml` — 1,167m across 5 runs (233 min/run).** Not
   waste: a deliberate, self-chaining `workflow_dispatch` backfill screenshotting
   ~37k business homepages, resumable, capped ~2,100m by design. **But its own
   header comment budgets against "Team plan includes 3,000/month" without
   accounting for the ~1,400m/month the recurring workflows already eat.** One
   more dispatch = instant overage.
2. **makoanswer `uptime-monitor.yml` — 406m / 404 runs** and
   **makochat `uptime.yml` — 442m / 427 runs = 848m combined.** Each check is a
   few seconds of `curl` that bills a **full minute**. This is the pure waste.
3. gitleaks — 210 runs on portal, 143 makoanswer, 67 makochat (~441m); runs on
   every push *and* weekly full-history.
4. Claude Duty Officer — ~278m across the four repos (real work).

## The reliability finding hiding inside the cost finding

`makoanswer/uptime-monitor.yml` is configured `*/5 * * * *` (288 runs/day
expected). It actually fired **~13 times/day, every day of July** — roughly
once every **110 minutes**, a ~95% miss rate, steady across the whole month
(not a mid-month addition; verified by per-day run counts).
`makochat/uptime.yml` at `*/15` fired ~14/day — same ceiling.

**Both repos converge on ~13–14 scheduled runs/day regardless of the cron
they ask for**, so GitHub is applying a per-repo scheduled-run budget and
silently dropping the rest. Net effect: Russell is *paying* for uptime
monitoring that has **~2-hour blind spots**, while believing it checks every
5 minutes. GitHub's docs do say `schedule` can be delayed or dropped under
load — treat any Actions cron tighter than ~1h as best-effort, never as a
monitor SLA.

## Why the uptime workflows exist — and why MakoPulse already replaced them

Both header comments give the correct rationale: they run on **GitHub's**
infrastructure so a total Vercel/DNS outage is still caught — the one failure
a Vercel-hosted app can't self-report.

**CORRECTION (Russell, same session): "We own makopulse why do we need to use
outside tools?" He was right, and I had under-researched it. My first
recommendation — UptimeRobot / Better Stack — was WRONG. Ignore it.**
MakoPulse already does this, already satisfies the off-Vercel requirement,
and is already running. Verified live 2026-07-30:

- **`monitors` table is actively checking `makoanswer.com` AND `makochat.app`**
  — the exact two sites the GitHub crons duplicate. `paused=false`,
  `current_status=up`, `last_checked_at` minutes old, `regions=[us-east, eu]`.
  Seeded from `supabase/migrations/0002_seed_fleet.sql`.
- **`prober/` runs on Fly.io** (`makopulse-prober`, always-on, `min_machines_running=2`,
  iad US + ams EU). Off-Vercel. Does what serverless can't: ICMP ping, TCP
  connect, traceroute/MTR, headless Chrome, per-phase HTTP timing
  (dns/connect/tls/wait/receive). LIVE — returns 401 without `x-prober-secret`.
- **`worker/` = Cloudflare Worker `makopulse-watchdog`**, cron `*/2`, deployed
  since 2026-07-02 (verified via CF API). Watches MakoPulse *itself* from CF's
  edge and emails via Resend — closing the "who watches the watcher" gap.
- Orchestration: `/api/cron/check` every 3 min (`vercel.json`).

**So: every 3 minutes from two continents, vs GitHub's actual ~13×/day from
one. The GitHub crons are strictly worse AND they cost money.**

### The one thing that would break if you just delete them

`makoanswer/uptime-monitor.yml` is **not** a plain ping. It also curls
`https://makoanswer.com/api/monitor` with an `x-monitor-token` header — the
rich call-path checks (Twilio trunk + Retell webhook + line→agent mapping).
MakoPulse's current makoanswer monitor is a **homepage** check, so deleting the
workflow outright would silently drop phone-path monitoring — the product
itself. `makochat/uptime.yml` IS a plain homepage curl, fully covered already.

Clean swap is available because the `monitors` table already supports it:
`request_headers`, `expected_status`, `method`, `request_body`, `keyword`,
`request_timeout`, `check_interval`, `notify_email/sms/call/push`,
`escalation_policy_id`. So add a monitor on `/api/monitor` with the token
header + `expected_status=200` before removing anything.

### Also found: the control plane's own monitor is dark

`Portal deep health` (`portal.makoai.studio/api/health`) is **paused since
2026-06-14** — 46 days blind on the fleet control plane. Meanwhile
`makoai-portal/heartbeat.yml` burns 73 Actions min/mo doing that same job at
GitHub's throttled cadence. Un-pause the MakoPulse monitor and heartbeat.yml
is redundant too.

### ✅ EXECUTED 2026-07-30 (Russell: "do 1 2 3") — all verified before removal

**−921 Actions min/mo (~$5.53 gross), coverage improved.** Final state: 10
MakoPulse monitors all `up`/200, heartbeat checking in, all three sites 200.

**The token-header monitor I planned was WRONG and was NOT built.** Reading
`makoanswer/app/api/monitor/route.ts` showed a **Vercel cron already runs
`/api/monitor` every 5 min** (`vercel.json`) and the endpoint owns its own
alerting. Proved it live: `monitor_state` rows (`lines`, `balance`,
`inbound_failures`) all `ok`, checked 4 min prior. So polling it from MakoPulse
every 3 min × 2 regions would have been **74× more Twilio/Retell API calls for
zero gain**. LESSON: read the endpoint before pointing a monitor at it — "add a
monitor" is not free when the endpoint does real third-party work.

What was actually built instead:

1. **MakoPulse heartbeat** (dead-man's switch) `MakoAnswer call-path cron`,
   period 300s + grace 300s. makoanswer commit `4ae086b` pings
   `MAKOPULSE_HEARTBEAT_URL` at the end of `/api/monitor`. Verified `status=up`.
   - Pings **regardless of ok/down** — it attests the JOB RAN. Skipping on down
     would double-page one outage as a missed heartbeat too.
   - Env var is **production-only** (not preview, not `.env.local`) so a preview
     deploy or local run can't spoof a check-in and mask a dead prod cron.
   - Verified the detector is real before trusting it: `/api/cron/check` marks
     heartbeats down past `period+grace` — and `.neq(status,'pending')` means a
     never-pinged heartbeat can't false-alarm.
2. **Un-paused `Portal deep health`** — had been dark **46 days**. 200/170ms.
3. **NEW monitor `Portal duty officer`** — caught by reading `heartbeat.yml`
   before deleting it: it pinged **two** endpoints, and `/api/health/officer`
   was **not** covered by the monitor un-paused in step 2. Deleting without this
   would have silently dropped duty-officer liveness. `expected_status=200` so
   the officer-stale 503 registers as down. 200/159ms.
4. **Deleted** `makoanswer/uptime-monitor.yml` (`dbcbd05`),
   `makochat.app/uptime.yml` (`3e16f03`), `makoai-portal/heartbeat.yml`
   (`77ef0f3`) — each only after its replacement was verified checking.
5. **Fixed the stale comment** the deletion orphaned (`09118d5`): the route
   header still told the next reader it had "TWO independent pingers."

Capacity note: Mako Logics org is **Pro** in MakoPulse — 50 monitors, 30s min
interval, browser checks, 5 status pages. Using 10 monitors + 2 heartbeats, so
absorbing the client sites later costs nothing.

**Left alone, needs Russell's call:** a `Nightly backup (demo)` heartbeat has
sat `down` since 2026-06-14 — demo data showing permanent red on his own
product's dashboard.

Not in MakoPulse: the client sites (bulldog, bishopbend, aaaawning, bndt,
toppaws, woodlands, utilities-plus, pixelcopy, localaibox). Those ride the
portal's `fleet-refresh` every 5 min — which runs **on Vercel**, so it has the
same self-reporting blind spot. Candidate for absorbing into MakoPulse later.

## GHAS Secret Protection ($19/committer/mo) — Russell's call

Enabled on exactly **2 private repos: `makoai-portal` and `makologics.com`**
(all other private repos: disabled). Charged all 30 days of July.

Not simply redundant with gitleaks: gitleaks catches a secret **after** it's
pushed (CI fails, secret is already in history), while Secret Protection adds
**push protection** — it blocks the commit before it lands — plus partner
auto-revocation. Given [[incident-mcp-token-public-exposure]] and that the
portal holds the master signing keys / service-role keys / Vercel tokens,
$19/mo for push protection on the control plane is defensible. **Decision is
his** — the point is he's paying it and the Actions budget alert never says so.

## Levers, ranked

- Kill/relocate the 2 uptime crons → **−848 min/mo (~$5.09 gross)**, and
  monitoring gets *better*.
- Don't dispatch toppaws `screenshots.yml` until the backfill is genuinely
  needed, and budget it against the *remaining* allowance, not the full 3,000.
- Narrow gitleaks: full-history weekly is fine, but it need not run on every
  push in repos where CI already runs it.
- Anything genuinely public can move to public repos for free minutes
  (most can't — they hold client work).

Budget period resets **2026-08-01**. At $9.02/$10 with a day to go, the live
risk is that crossing $10 **stops Actions org-wide** — which would take down
CI, the portal's `deploy.yml`, and the duty officer at once.

Related: [[ai-triage-duty-officer]], [[incident-mcp-token-public-exposure]].

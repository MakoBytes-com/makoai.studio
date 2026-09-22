---
name: alert-noise-and-officer-turn-cap-2026-08-05
description: "2026-08-05. The AI spend banner was 100x wrong (cents read as dollars, no spike existed); the fleet's 'open errors' were unclearable noise; and every failed duty-officer run was error_max_turns at 40 turns. All three fixed, with tests + a staleness sweep as the guard."
metadata: 
  node_type: memory
  type: project
  originSessionId: b166a300-b77d-4289-bd06-387937068267
  modified: 2026-08-05T20:17:50.737Z
---

# Three failures that all looked like something else

Russell, escalating through one session: "WTF is going on?" → "STILL SEEING
SHIT LOAD OF ERRORS" → "We should not be getting 20+ reports a day for
BULLSHIT thats broken. I had better results from WordPress." → "I want checks
and balances put in place this CAN NOT happen again."

He was right on every count, and in each case the tooling was lying to him.

## 1. The spend banner read 100x high. There was no spike.

`cost_report.amount` is in **CENTS**. `lib/ai/spend.ts` summed it as dollars
from 2026-07-27. Month-to-date read **$78.69**; the real figure is **$0.79**.

Everything downstream of that was fiction: a "17x July burn rate", a
"one day from the $100 cap" deadline, an afternoon hunting phantom consumers,
and a plan to ask Bishopbend (a regulated client) to take on a bill that was
**36 cents**. Russell killed it with "There is no way they have uploaded that
many documents."

**The reasoning that produced the bug is the lesson.** I argued cents was
impossible because July's account figure (28.93) exceeded the portal's own
metered share (1.07) — but that share is `monthAiSpendUsd()`, a LOCAL estimate
at list price with no cache discount, so it always reads high. **Comparing a
measurement to an estimate proves nothing**, and I then wrote that argument
into a comment telling the next reader not to "fix" it into a /100.

What settles it is pricing the tokens, and it reconciles exactly:
Sonnet 5 input line 25.43 against 127,158 input tokens; 127,158 × $2/MTok =
$0.2543. Output matched to the token (10,948). **If the unit is ever in doubt
again, price the tokens — do not reason about it.**

Fixed in `e0b4ae0`. Real split: Bishopbend $0.36 (HawkSoft dec-page
extraction, `lib/hawksoft/dec-extract.ts`, human-triggered, Sonnet 5),
"makologics.com-blog-drafter" $0.43 (a legacy key name — makologics' own code
only ever requests opus-4-7 and haiku, neither of which appears in the bill;
it is effectively the portal officer's key).

**Nothing needs moving to a client's account. BYOK is a product idea, not a
cost fix.** And a Claude Pro/Max plan can never back a server-side call — no
API key exists for it.

## 2. "Errors that won't clear" were three different real bugs

Not a caching or refresh problem — `/admin` reads `client_kpi_cache`, the
resolve action clears that row, and the snapshot was minutes old.

- **Bulldog: 12 real refused visitors.** One group, "Captcha rejected: the
  widget produced no token", ~2/day since 07-30. The four public forms
  rendered `@marsidev/react-turnstile` and submitted regardless of whether it
  had issued a token. Fixed `6cd90f1`: submit waits on `onSuccess`, drops on
  expire/error, `refreshExpired: "auto"`, plus a plain-English reason beside
  the disabled button. **Trap:** `components/Turnstile.tsx` is a *different*,
  hand-rolled widget used only by admin login/2FA/forgot — I patched it first
  by mistake. Check which widget a form imports.
- **Bishopbend: a normal outcome logged as an error.** "A panel login with
  this email already exists" is a fact, not a fault, and it also double-logged
  real faults. Outcomes now carry `kind: conflict | precondition | fault`;
  callers log none of them (`db4f446`).
- **Voltage Bike: every error open forever.** Its `error_events` has no
  `resolved_at` at all, and the master endpoint's own comment admitted
  "open == all". Nothing could ever be cleared. Now recency defines open
  (`724ed3e`, deployed manually — **that repo has NO git remote**).

## 3. Every failed duty-officer run: `error_max_turns` at 40

The real answer to "every day I am having to submit fixes manually". Sampled
across the fleet, every failure was identical:

    "subtype": "error_max_turns"
    Reached maximum number of turns (40)

**Bulldog hit it three times in a row on the same contact-form bug** (07-31,
08-02, 08-03) and never opened a fix — which is exactly why that captcha bug
survived six days. A capped run produces nothing (the action then 404s trying
to diff a branch it never created) while still spending the Max usage it
consumed. Raised 40 → 80 across **all 23 repos**; 45-min job timeout unchanged
and remains the real backstop (~12 min at 40 turns).

## The guards that were actually put in place

- `lib/errors/noise.ts` — environmental classes (stale-tab server actions,
  ChunkLoadError, ResizeObserver, client network blips, browser-side Turnstile)
  are recorded **pre-resolved** so they never raise a badge.
- **That suppression has a CEILING** (`NOISE_REOPEN_AT = 25`). Past it the
  group opens anyway — a filter with no ceiling is how a real outage gets
  permanently misfiled as noise.
- `daily-cleanup` closes groups unseen for `STALE_AFTER_DAYS = 7`. Safe
  because `/api/err` re-opens any group that recurs.
- **The portal had NO test runner.** Added `node --test` (zero new deps) and
  wired it into CI. The tests are today's real cases, including the one that
  matters: our own server-side "Captcha rejected" must never be filtered as
  captcha noise. **Canary-verified** — widening that regex to
  `/captcha|turnstile/i` turns the suite red.

## 4. voltage.bike was running on nothing at all

Flagged as "a decision for you" rather than fixed. Russell, correctly:
**"you dont need my aproval to do the right thing."** Flagging a fixable
problem instead of fixing it is the same failure as reporting a mess.

It had **no git remote** (production site, backed up nowhere), no CI, no secret
scanning, no Dependabot, no duty officer. Now: private repo
`MakoBytes-com/voltage.bike` (history scanned for secrets first — clean, only
the *name* `process.env.SUPABASE_SERVICE_ROLE_KEY`), fleet-standard workflows,
alerts + automated security fixes enabled.

Enabling Dependabot immediately surfaced **14 alerts (7 high, 7 medium)** in
next / postcss / sharp — all now 0 via the fleet recipe (next bump ALONE is not
enough; next vendors its own sharp and pins postcss, so both need explicit
overrides). Also removed the `@types/bcryptjs` stub (npm's own metadata says
bcryptjs ships its own types; proved with a type probe) and took @types/node 26.

**Turning CI on meant fixing four pre-existing lint errors first** — otherwise
the new repo is red on day one, which is the noise problem again: setState
inside a useEffect in mobile-nav, a ref assigned during render in
photo-uploader, a per-row `Date.now()` in a server component, an unescaped
entity. All real, all fixed.

`dependency-audit.yml` deliberately NOT installed — it needs
`PORTAL_INGEST_SECRET`, which this repo lacks, so it would be permanently red.

## 5. THE ROOT CAUSE of the alert flood — fingerprints keyed on record ids

Russell: "I really need this to work, I cant keep getting all these alerts and
false positives." Measured before guessing: **321 notification-generating
events in 7 days fleet-wide ≈ 46/day** — 109 GitHub issues opened, 170
comments, 42 failed runs. Worse than the "20+" he reported.

The dashboard noise was never the driver. **The duty officer opening GitHub
issues was**, and it was re-filing the same finding repeatedly.

Evidence: makologics had **11 issues opened inside the same minute** on
2026-07-30, each with a slightly different AI-written title, all describing
one upstream SERP provider hiccup — roughly 33 emails for a non-event.

Mechanism, confirmed by reading the code rather than inferring: every site's
`lib/log.ts` computed `sha256(module::message)` on the RAW message, and
`cron/seo-serp-scans` logs ``Campaign ${campaign.id} failed: ${msg}``. Eleven
campaigns → eleven fingerprints → eleven `err:` source keys → eleven triage
items → eleven issues. The triage source keys were fine; the fingerprints
feeding them were not.

At least a dozen call sites in makologics interpolate an id this way (briefs,
audits, scans, AI runs, email recipients), and **every fleet site shares the
same logger**, so all of them carried the latent bug.

**Fix is central, not per-call-site** — one normaliser in `fingerprintFor()`
collapsing uuids, long hex, emails, urls, timestamps and bare numbers to
placeholders before hashing. Fixing call sites individually would hold only
until the next one is written. The identifier is NOT lost — it stays in the
context column, stored and displayed separately.

Verified against the real shapes: 11 campaign failures → **1** fingerprint,
while 3 genuinely different causes in the same module → **3**.

Shipped to makologics (`3b63b0c`), bulldogsecurityservice (`2169e49`),
bishopbend (`23ade07`), aaaawning (`1828321`), utilities-plus (`04631ba`).
CI green on all. makoanswer and makopulse have no `lib/log.ts` — different
error paths, not yet audited for the same class.

**Generalise this:** any high-cardinality value inside a grouped log message
fragments the group. Ids belong in context, never in the message.

## 6. Three client databases had silently stopped being backed up

Russell, on a red "Backup STALE 3d" badge: "Why do we have stale backups
shouldnt the officer catch these?" **No — the officer had 14 detectors and
none of them was backups.** fleet-refresh collected the KPI and the card
rendered it red; nothing ever filed it. Detector added in `f0d0013`, banded by
age (1d/2d/3d/week) so a still-broken backup supersedes rather than re-files.

Swept all 16 Supabase-backed clients. Three had stopped:

| project | last backup | age |
|---|---|---|
| MakoAnswer | 2026-08-02 | 81h |
| MakoPulse | 2026-08-03 | 56h |
| TopPaws | 2026-08-04 | 31h |

**Every backup that exists is `status: COMPLETED` — none failed.** They ran
daily and then stopped being scheduled, each on a different day, on a **Pro**
org where bulldog-cp / bishopbend / aaaawning kept backing up normally. All
three `ACTIVE_HEALTHY`. The Management API exposes no reason. That is
Supabase-side and worth a support ticket.

**And nothing on our side could have recovered from it:** `runDailyExport()`
snapshots the PORTAL's own tables (`createAdminClient()`) and no client's. A
client's only copy of its data was a scheduler we neither control nor can see.

### The fix — `lib/export-clients.ts` (6c8cc68, fe190ec)

Exports every client DB nightly **without touching client schemas**. Requiring
migration 0021's RPCs on 15 projects would mean 15 deployments before the
first byte was safe. Instead: `SUPABASE_PAT` → `GET /v1/projects/{ref}/api-keys`
→ service_role key → PostgREST's OpenAPI root for the table list → Range-paged
reads. Works on a project the moment it joins the fleet.

**Ordering is load-bearing:** most-stale-backup clients run FIRST, so a run cut
short by the time budget covers the ones actually at risk. Clients not reached
are named and counted as errors — a partial run must never read as clean.

Hard-won details:
- **The new `sb_secret_…` key is REJECTED by PostgREST** on these projects
  ("Invalid API key"); the legacy `service_role` JWT works. Measured.
- **PostgREST's OpenAPI lists stored functions as `/rpc/<name>` alongside
  tables.** Missing that filter killed makopulse and toppaws mid-run *after*
  real tables were written — a folder that looks populated but is not. Only
  found by actually running it. Fixed in `fe190ec`.
- **206 is SUCCESS** on a Range request (banked trap, honoured here).
- A capped table is an **arbitrary subset, not the newest N rows** — reads are
  unordered. Reported as an error, never restorable-looking.

**Verified, not assumed:** ran it for real — 70 files / 480,636 rows / 58.4 MB
in `db-exports/2026-08-05/clients/`; read one back and decompressed it (45 rows,
real columns); confirmed anonymous public fetch returns 400, so the bucket is
still private. Client PII (incl. GLBA-regulated Bishopbend) now lives in the
portal's most restricted bucket — a deliberate trade against unrecoverable loss.

## 7. Why finished work kept sitting on the board — THREE stacked causes

Russell: "why hasnt the officer done these" then "I still see both in the dash
... why are they still showing up if its resolved". Two cards (Utilities Plus
vitals #22, Burton NDT vitals #41) looked abandoned. Three separate things:

**a. claude-code-action CANNOT open a PR.** It pushes a branch and prints a
"Create PR ➔" link — no PR creation exists, and its own docs say to use
`gh pr create` as a separate step. Nobody ever added that step, so *every*
completed fix stopped one click short and waited for Russell. That is most of
"every day I am having to submit fixes manually". Worse, **the agent believes
otherwise** — its checklist ticks "Commit, push, open PR" while only the first
two happened. Added the step to all 24 repos.

**b. The officer then correctly handed the card back.** Its no-PR watchdog sees
"run succeeded, no PR, >90 min" and returns the card to `open`. Right call.

**c. THE BUG: nothing could ever close it again.** Both reconcile passes that
mark work finished filter on `status = "dispatched"`. Once a card is back to
`open` they are blind to it, so a fix merging afterwards could never clear it.
Fixed in `2978b64`: an OPEN card that was once dispatched, whose issue is now
closed **with a MERGED PR**, closes on the merge. The merge is required — a
closed issue with no merged PR is the separate "fix may be incomplete" case and
must stay visible.

**Why it could not self-heal:** vitals cards key on a **28-day rolling window**,
so the metric cannot clear for weeks after a real fix. Waiting for the signal to
disappear would have meant staring at resolved work until September. Anything
whose signal heals slowly must close on the *action* (merge), not the metric.

Verified on the live board: both flipped to `approved` on the next 15-min tick;
board went to **0 open**.

### The agent's work was good — worth knowing before distrusting it

On #22 it explicitly refused the officer's hypotheses rather than "fixing" what
was not broken: *"The two causes the duty officer guessed at were already
handled in this codebase."* Hero was already a 90KB WebP with `priority`; there
were zero third-party scripts. It found the real cause (Playfair preloaded
before paint + an unused italic weight). I verified its claims independently
(the only public `italic` is `not-italic`; bndt's hero still owns a `priority`
preload), built both branches — **the agent cannot run npm in its sandbox and
says so** — opened and merged both. Live check: utilities-plus went from **3
preloaded fonts to 1**.

## 8. Not a bug: the "wrong" timestamp

`2026-08-01T00:01:55Z` renders as "Jul 31, 2026, 7:01 PM CT". Correct — CDT is
UTC-5, so midnight UTC is 7pm the previous evening. What looked wrong was that
the card shows `created_at` and the item had sat **4.8 days**. The stale-looking
date was a symptom of §7, not a formatting fault. Check the conversion before
touching a formatter.

## Method failures worth not repeating

Four false-cleans in one session, all the same shape — **a check that cannot
fail is not a check**:

- Reported two showcase repos as still billing per-token. Wrong: local clones
  were 6–7 commits stale. `git fetch` before reading a tree as truth.
- A fleet-wide "0 failed CI runs" from an inline node one-liner that was
  silently erroring. Real answer was 4 on the portal alone. **Stop piping
  throwaway node into shell loops** — write a script file that prints failures.
- A grep filter `grep -iv "^.*//"` stripped every line containing `//`,
  including `https://api.anthropic.com`, producing "makologics has no Anthropic
  code" (it has nine files, under `src/`, which I also didn't check).
- A `tsc` error naming a deleted route was stale `.next` output. `rm -rf .next`
  before believing it.
- **A multi-line `--body` string inside a workflow `run: |` block is INVALID
  YAML** — unindented lines terminate the block scalar. My first version of the
  PR step broke `claude.yml` in all 24 repos. Caught by validating with
  `npx js-yaml` *before* pushing, reverted all 24, rewrote using `--body-file`.
  **Validate generated YAML and shell (`bash -n`) before a fleet-wide push** —
  that one would have disabled the duty officer everywhere.
- **The Vercel CLI token rotates mid-session** (banked previously, hit again):
  a script that read it once started returning `{"invalidToken":true}`. Re-read
  `auth.json` per call, or run `vercel whoami` to refresh.
- Line continuations (`\`) inside a JS template literal collapsed when written
  out; the result was still valid shell (args on one line) but verify with
  `bash -n` rather than assuming either way.

And: I shipped a CI-red commit (`aced0d2`) because I ran the build after adding
a test but not `tsc` — Next's build does not typecheck files outside the app
graph. Fixed in `296373b` (`allowImportingTsExtensions`, legal under `noEmit`).
**Run all four gates — tsc, test, lint, build — not whichever is convenient.**

Related: [[feedback-verify-the-check-actually-ran]],
[[feedback-verify-what-russell-sees]], [[dashboard-auto-refresh-hard-reload]].

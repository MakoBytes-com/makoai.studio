---
name: digest-liveness-and-secret-ages
description: "2026-07-27 — 'why no daily reports?' was a timing artifact (Teams deployed 31 min AFTER that morning's cron), but it exposed that the digest could die silently. Fixed: cron_runs row, delivery-aware sendEmail, 26h watchdog, real secret ages from Vercel + master_signing_keys."
metadata: 
  node_type: memory
  type: project
  originSessionId: 3cd554d3-5fcf-45ca-9455-6684d8c6913a
  modified: 2026-07-27T12:27:12.543Z
---

**Russell 2026-07-27: "Im not getting daily reports? I did get one but none
after that."** Answer: nothing was broken — but the way he found out was.

## The actual explanation (verified, not inferred)

Two channels, two different stories:

- **Email** never missed a day. Resend's delivery log (`last_event`, i.e.
  actually delivered, not merely accepted): 07-24 07:01, 07-25 07:01,
  07-26 07:00, 07-27 07:01 CT — all `delivered` to admin@makologics.com.
- **Teams** had exactly one card because exactly one was ever due. The Teams
  commit `6677697` deployed **07-26 07:31:15 CT**; that morning's digest had
  already run at **07:00:23 CT**, 31 minutes earlier, on email-only code. The
  card he saw was the manual test at 07:32. 07-27 was the first *scheduled*
  Teams card.

**Timing gotcha:** Vercel crons fire late by up to ~2 min (observed 12:00:22,
12:01:32, 12:01:22, 12:01:51 UTC for a `0 12 * * *` schedule). A check at
12:01:31 saw nothing and nearly produced a false "it didn't run" call. Always
re-check ~3 min past the slot before declaring a cron dead.

## What was actually wrong — silent-failure class

1. `daily-digest` wrote **no `cron_runs` row** — the only cron without one
   (fleet-refresh, ai-triage, daily-cleanup, daily-export all do). The digest
   itself *reads* `cron_runs` for non-ok rows to build its "Cron issues" line,
   so it was structurally incapable of reporting its own death.
2. `sendEmail` swallowed every error (`.catch(() => {})`), so the portal logged
   "Morning digest sent" whether or not Resend accepted it. Same class as the
   contact-form incident — see [[incident-contact-form-dead-79-days]].
3. Nothing watched for the digest's absence. The only detector was Russell.

## Shipped (makoai-portal `b991905` + `9d097fb`, both live-verified)

- `sendEmail` returns whether Resend accepted; still never throws. All 19 call
  sites are statement-only `await`s, so the void→boolean change breaks nobody.
- `daily-digest` writes a real `cron_runs` row (ok / partial / error) and logs
  the honest outcome. Teams-not-configured ≠ failure.
- **New `lib/notify/digest-watchdog.ts`** on the 15-min officer tick: no digest
  in 26h → one alert on email + Teams, nags at most 2×/day, self-clears when
  healthy, never throws. Reads `platform_activity_log` (history exists) so it
  can't cold-start false-alarm.

## Secret ages were pure noise — now real

`getSecretAges()` marked `ageDays === null` as **overdue**, and the hand-kept
registry (`ai_triage_state` `secret:<name>`) was empty — so every digest said
6 keys overdue "(age unknown)" forever. Classic alert fatigue.

Now: ages come from **Vercel env-var timestamps** (`updatedAt ?? createdAt`
via `/v9/projects/<p>/env?teamId=`), which is where a rotation actually gets
recorded; newer of (manual stamp, platform stamp) wins. Unknown is reported as
unknown, never as a breach, and keys within 14 days of the 90-day policy get a
"due soon" line. Weekly sweep keeps unknowns visible at `low`.

**`MASTER_SIGNING_KEY` was a phantom** — no such env var exists and no code
reads one. The RS256 keypair lives in the **`master_signing_keys` table**
(active row, rotated by `scripts/rotate-master-key.mjs`). Now resolved from
that row's `created_at`.

## OPEN — Russell's call (gated: rotating these can break crons/DB access)

As of 2026-07-27, five secrets cross the 90-day policy within a week:
RESEND_API_KEY 86d, SUPABASE_SERVICE_ROLE_KEY 85d, CRON_SECRET 85d,
MASTER_SIGNING_KEY 85d (kid `HaxtTmyg`, created 2026-05-02), VERCEL_TOKEN 83d.
Recipe: [[rotate-vercel-env-secrets]] skill; master key = `rotate-master-key.mjs`.

Also standing in the digest: **3 draft client reports awaiting his review/send**.

Related: [[teams-notifications-portal]], [[ai-triage-duty-officer]].

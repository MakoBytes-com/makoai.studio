---
name: teams-notifications-portal
description: "Portal reports to Microsoft Teams since 2026-07-26 — lib/notify/teams.ts posts Adaptive Cards to a Teams Workflows webhook (TEAMS_WEBHOOK_URL, sensitive). Wired: fleet down/recovered alerts, officer critical+high, 7am digest. Email stays primary."
metadata: 
  node_type: memory
  type: reference
  originSessionId: 003b8877-b434-41d6-9534-6f4a3cf4647c
  modified: 2026-07-26T12:33:03.827Z
---

**Shipped 2026-07-26** (makoai-portal commit `6677697`, live + E2E-verified —
Russell confirmed the test card in his channel, then the deployed digest cron
posted a real card).

**How it works:**
- Russell created a Teams **Workflows** flow ("Send webhook alerts to a
  channel" template) in his channel — this is the post-May-2026 method; the
  old Office 365 connector incoming-webhooks are fully retired (disabled
  May 18-22, 2026). Guides mentioning "Incoming Webhook connector" are
  outdated.
- The workflow URL lives in `TEAMS_WEBHOOK_URL` (Vercel prod, **sensitive**,
  + portal `.env.local`). It's a secret — anyone with it can post to the
  channel. Set via bash printf per [[vercel-env-set-via-bash-printf]].
- `lib/notify/teams.ts` → `sendTeamsCard({title, intro, facts, link})` posts
  an Adaptive Card 1.4. **Never throws** (10s timeout, catch-all, returns
  false; unset env = silent skip) so a Teams outage can't break an officer
  tick or cron. Facts capped at 20 — the paired email always carries the
  full list.

**Wired paths (all additive to email, email stays primary):**
1. `lib/fleet/refresh.ts` `sendFleetAlerts` — site DOWN / deploy-failed /
   recovered (the real-time one).
2. `lib/ai/triage.ts` — duty-officer critical+high findings per run.
3. `app/api/cron/daily-digest/route.ts` — 7am CT morning digest.

**Rendering constraints (Workflows webhooks):** cards post under the generic
"Workflows" bot identity (no custom Mako icon possible), interactive buttons
don't render — `Action.OpenUrl` links work and are what we use. Webhook
returns **202** on success.

**Teams UI gotcha:** the template is named "Send webhook alerts to a channel"
in the Workflows dialog (not "post to a channel when a webhook request is
received" as older docs say).

**Extending:** to add another surface (e.g. weekly security sweep, monthly
reports), import `sendTeamsCard` and call it after the `sendEmail` — same
pattern. To repoint the channel: create a new workflow in the new channel,
replace `TEAMS_WEBHOOK_URL` in Vercel prod (rm + printf re-add), redeploy.

Related: [[ai-triage-duty-officer]], [[feedback-business-email-to-makologics-never-gmail]] (email recipient rules unchanged).

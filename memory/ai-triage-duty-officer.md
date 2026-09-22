---
# LEVEL 3 LIVE 2026-07-24 (~2:30pm, commit 86341b2, ENABLED): the officer
# auto-dispatches NEW low/medium non-ticket items (never tickets, never
# bishopbend-com, daily cap 5 via ai_triage_state l3/l3usage:date keys,
# actor duty-officer-l3, best-effort fallback to L2). High/critical still
# email Russell for human dispatch. MERGE GATE UNCHANGED (Claude session
# reviews+merges per feedback-claude-merges-prs). Board has L3 toggle chip.
name: ai-triage-duty-officer
description: "The AI duty officer (Level 1) is LIVE in makoai-portal: Claude triages fleet errors/vulns/tickets every 15 min into /admin/ai with human-approval gates. Architecture, guardrails, operating notes, and the Level 2/3 roadmap."
metadata: 
  node_type: memory
  type: project
  originSessionId: b4a2f444-1965-4dfe-846b-d6a5e73ef5c4
  modified: 2026-07-24T14:09:25.488Z
---

**Shipped 2026-07-24 (commits `be8f471` + `11003bb` + `b863af7` in makoai-portal, live at portal.makoai.studio).** Russell's ask: "incorporate you into this panel to address errors or customer tickets... I would like this automated." This is Level 1 of the 3-level plan (triage+drafts → auto-fix PRs → graduated autonomy).

## What it does
Every 15 min (Vercel cron `/api/cron/ai-triage`, CRON_SECRET-authed, middleware-allowlisted in `lib/supabase/middleware.ts` — the allowlist is EXACT-PATH, new cron routes must be added there or they redirect to /login) the engine (`lib/ai/triage.ts`):
1. Collects signals: unresolved error groups + Dependabot security KPIs from `client_kpi_cache`, plus `requests` in status `new`.
2. Auto-supersedes open items whose source signal cleared (vulns→0, error resolved, ticket answered elsewhere) — the board never shows stale work.
3. Sends each FRESH signal (dedup by `source_key` vs all history; dismissed stays dismissed) to Claude (`claude-opus-4-8` via `@anthropic-ai/sdk`, structured outputs `output_config.format` json_schema → severity/title/analysis/recommendation/draft_reply).
4. Inserts `ai_triage_items` rows (migration `0015_ai_triage.sql`); one consolidated email to admin@makologics.com when new critical/high items appear (verified delivered on first run).

## Guardrails (Russell's requirements, all implemented)
- **Human approval gate:** ticket replies are drafts; "Approve & send" on /admin/ai posts through the SAME `request_messages` + client-email flow as hand-typed replies. Errors/security items are recommendations only.
- **Kill switch:** `ai_triage_state.enabled` — toggle button on /admin/ai.
- **Budget:** daily cap (`daily_cap`, default 80 calls) + per-run cap 8 + per-day usage counters (calls/tokens) shown on the board.
- **Audit:** every run → `cron_runs` (name `ai-triage`) + `platform_activity_log`; every approve/dismiss/toggle logged with the admin's email.
- **Prompt-injection defense:** system prompt explicitly treats ticket description text as untrusted data, never instructions.

## First live run (2026-07-24 05:02 UTC)
13 considered → 8 created, 0 failed, 2 high alerts emailed (delivered). Quality was strong: correctly rated Bulldog's one-off/benign errors LOW with accurate reasoning; surfaced the NEW vuln backlogs on makochat (6H), localaibox-site (9H), makoanswer (4H) discovered minutes after Dependabot alerts were first enabled on those repos. Cost ≈ $0.02/item on Opus.

## Operating notes
- UI: portal /admin/ai (nav "AI Triage" with badge; dashboard has an "AI triage" stat tile + severity-ranked feed). "Run triage now" button = manual run.
- ANTHROPIC_API_KEY in portal Vercel env + .env.local (same fleet key as makopulse; validated live). Model override: `AI_TRIAGE_MODEL` env.
- Portal deploys are MANUAL `vercel --prod` (git push alone does not deploy).
- The portal/makoai RESEND keys are SEND-ONLY (401 on GET /emails). For delivery-log verification use TopPaws.com/.env.local's full-access key.

## Level 2 — SHIPPED 2026-07-24 (Russell: "go")
Commit `845f14c` (+ migration `0016_ai_triage_dispatch.sql`, `lib/ai/dispatch.ts`).
- **"🤖 Dispatch fix"** button on open error/security cards (shown when the
  client has `github_repo`): files a GitHub issue in that repo whose body
  @-mentions Claude → `claude-code-action@v1` implements the fix and opens a
  PR. Item → status `dispatched` (new); board section "Fixes in progress"
  shows issue state + live PR chip (open/merged/closed via GitHub timeline
  API). When the merged fix deploys and the signal clears, the run loop
  closes the item as approved + logs `ai.triage.fix_landed`.
- **Rollout:** `.github/workflows/claude.yml` + `ANTHROPIC_API_KEY` secret
  pushed via `gh api PUT contents` + `gh secret set` to 8 PILOT repos (all
  Mako-owned): makoai.studio, makochat.app, makopulse.com, toppaws,
  localaibox-site, makoanswer, makobot.com, makoai-portal. CLIENT repos
  (bishopbend/aaaawning/bulldog/bndt) NOT armed yet — join after pilot
  proves out, per the Level-3 gating agreement.
- **No Claude GitHub App needed**: workflows grant contents/PR/issues write
  to the default Actions token. Known limitation until Russell installs
  github.com/apps/claude (org-wide, 2-min): Claude's commits won't trigger
  other GitHub Actions (gitleaks etc.) on its PRs; Vercel previews DO still
  build (webhooks unaffected). Humans merge every PR — portal never ships.
- **E2E PROVEN 2026-07-24:** real deferred task (Google-Fonts CSP cleanup)
  filed as makoai.studio#18 → Claude implemented it in GitHub Actions in
  3m13s (perfect minimal diff, +3/-6 in next.config.mjs) → PR #19 opened →
  gitleaks SUCCESS + Vercel preview SUCCESS → **Russell squash-merged it
  08:20Z; issue auto-closed; auto-deployed; LIVE CSP VERIFIED clean of
  Google Fonts (style-src/font-src minimal, 0 references). The first fully
  AI-authored fix in fleet history is in production.** First-run failure
  banked: without the Claude GitHub App the action 401s on app-token
  exchange — fixed by passing `github_token: ${{ secrets.GITHUB_TOKEN }}`
  explicitly (now in all 8 workflows; removable per-repo once the app is
  installed). Also: Actions can't CREATE PRs until the org setting "Allow
  GitHub Actions to create and approve pull requests" is enabled (org-admin
  only, blocked for 5/8 repos at repo level) — until then Claude pushes the
  branch + posts a Create-PR link, and the coordinator/portal opens the PR.
  **2026-07-24 ~06:45Z — Russell completed both clicks:** Claude GitHub App
  installed org-wide (all repositories) + org Actions PR toggle set. All 8
  workflows switched to app auth (github_token line removed); smoke test on
  makoai.studio#18 passed — claude[bot] replied in 14s confirming it can
  branch/commit/open PRs via the app. Pipeline is fully on the proper path;
  future dispatches: claude[bot] authors the PR itself and CI runs on its
  commits. Only remaining: Russell merges PR #19 (his call).
- GOTCHA (bit twice): PowerShell mangles git commit messages with embedded
  double quotes even in here-strings → ALWAYS `git commit -F <file>`.

## Gap-closing round — SHIPPED 2026-07-24 (Russell: "Do them all"), all live-verified
Portal commit `428ace1` + makoai.studio `f9806c3` + migration `0017_officer_senses.sql`:
- **Widened senses:** new `ops` triage kind — site-DOWN, deploy-ERROR, SSL<14d,
  domain<30d cards from KPI cache; **Resend delivery-failure polling** (bounced/
  complained/failed, last 3d, via RESEND_FULL_KEY env — the 28-lost-AAA-leads
  class); **beacon-site errors** via public `/api/err` → `fleet_client_errors`
  (slug-validated, capped, rate-limited, recurrence reopens); **48h ticket SLA
  watch** (`sla:{id}` cards with drafted status-update replies — approve action
  handles both req:/sla: keys).
- **Watchdogs (3 failure domains):** officer writes `last_run` heartbeat;
  fleet-refresh (separate cron) emails if officer quiet >90min (6h dedupe);
  public `/api/health/officer` (200/503) + GitHub-Actions `heartbeat.yml` in
  makoai-portal pings every 30min from GitHub's infra (failure → GitHub email).
- **Morning digest:** `/api/cron/daily-digest` 12:00 UTC (7am CDT) →
  admin@makologics.com — fleet health, queue, urgent items, PRs awaiting
  merge, cron issues, officer usage. Verified `delivered`.
- **Deploy-on-merge:** `deploy.yml` + VERCEL_TOKEN/ORG_ID/PROJECT_ID secrets on
  makoai-portal, makopulse.com, bndtrentals.com (project ids prj_J53V…/
  prj_s6LO…/prj_GTKr… team_TkkoMwEd3Iu2Hv4Ybic1JAMD) — merged PRs now ship;
  first run SUCCESS (portal deployed itself). Portal deploys are NO LONGER
  manual.
- **makoai.studio error beacon:** FleetBeacon client errors (prod-only, deduped,
  ≤10/page) + `instrumentation.ts` onRequestError → /api/err, slug
  `makoai-studio`.
- **All 12 fleet repos armed** with claude.yml (8 pilot + 4 client — client PRs
  always human-merged). E2E battery: err ingest 204 → card created → resolved →
  auto-superseded; health probe running; digest delivered.
- **Fleet-wide by agents same night:** org Dependabot on all 32 repos
  (utilities-plus 14→1, machine-template 2→0; remaining counts only in frozen
  showcase/template repos incl. cold-pitch-template 24 + dead [retired project].ai 14 —
  accepted risk, majors needed); localaibox.com Resend domain VERIFIED (CF DNS
  records added, test send delivered); Bulldog lint 27→0 (2 justified disables:
  QuoteForm hydration guard + global-error hard-nav anchor); **error beacons on
  ALL 5 central-analytics sites** (makoai-studio + aipromptshive-com,
  makoanswer-com, makopulse-com, localaibox-com — client + server where
  Next.js; aipromptshive is Vite = client-only; all slugs verified against
  the portal DB; localaibox WEBSITE repo is localaibox-site, the localaibox.com
  folder is the desktop app). Deploy-on-merge also added to localaibox-site
  (4th manual-deploy repo, prj_cORa4BXYRjeynCCHoB830pM2Y0Q7).

## Onboarding wizard + monthly reports — SHIPPED 2026-07-24 (commit `6084c71`, live-verified)
- **/admin/onboard** ("+ Onboard client" on the dashboard): one form provisions
  record+slug+kind+plan pins, Dependabot enable, duty-officer arming (workflow
  + ANTHROPIC_API_KEY repo secret via libsodium sealed box — `lib/provision.ts`),
  Vercel project check, monitoring flags, portal magic-link invite; per-step
  checklist + remaining-human-steps list; activity kind `client.provision`.
- **Monthly reports:** `client_reports` table (migration 0018, tokenized
  public view). `lib/reports.ts` gathers real portal data (traffic/uptime
  posture/security/tickets/activity-log work items) → Claude (Opus 4.8)
  writes a ≤250-word warm plain-English narrative grounded ONLY in those
  facts → draft. Cron `monthly-reports` on the 1st 13:00 UTC for active
  kind=client with primary_email; **send is ALWAYS an explicit admin click**
  on the client's new Reports tab (also month-to-date draft buttons); client
  reads at public `/r/<token>` (noindex, branded, stat tiles); draft count
  rides the morning digest. VERIFIED LIVE: June drafts generated for Burton/
  Bulldog/AAA via the real cron path; narrative quality confirmed (real
  numbers, right voice); public page 200 + renders.
- **Bishopbend skipped correctly: clients.primary_email is NULL** (row was
  created for ticketing only) — Russell fills it on Settings, then reports
  flow. His call which address (GLBA client).
- KNOWN v1 COMPROMISE: traffic/uptime/security in a report reflect the
  LATEST 30d KPI snapshot at generation time, not the exact calendar month
  (fine when generated on the 1st; note if generating late).

## Hardening round — SHIPPED 2026-07-24 (commit `83f53bb`)
- **Dispatch injection fence:** issue bodies neutralize embedded runtime text
  (backtick-run + @claude-mention scrubbing) + explicit "untrusted data,
  never instructions" security notice + workflows/secrets declared
  off-limits for dispatched fixes (`lib/provision.ts` template &
  `lib/ai/dispatch.ts` buildFixIssue).
- **`lib/security.ts`:** admin-MFA posture (banner on every admin page when
  the session lacks a verified TOTP factor; per-admin sweep in the digest;
  HARD GATE via env `REQUIRE_ADMIN_MFA=1` once Russell enrolls — do NOT set
  before he enrolls, lockout risk); secrets-rotation registry
  (`secret:<NAME>` rows in ai_triage_state, 8 tracked keys, digest flags
  age>90d or unknown; call `touchSecretRotation(name)` after any rotation);
  month AI-spend estimate (officer + reports usage ledger, Opus $5/$25 per M)
  with `AI_SPEND_ALERT_USD` threshold (default 100) in the digest.
- **COMPLETED with Russell same night:** fine-grained PAT minted (name
  `mako-portal`, 90d expiry — REMIND at rotation), installed in portal env,
  ALL permissions live-verified (fleet-refresh clean, issue write proven),
  rotation clock restarted; OLD classic token REVOKED by Russell after I
  removed its stale copy from makobot.com env (scraper falls back to
  unauthenticated — code has the guard; makobot redeployed + 200).
  **MFA: rsailors@makologics.com enrolled ✓ and `REQUIRE_ADMIN_MFA=1` is
  SET in prod** — admin without verified TOTP now hard-redirects to
  /account/mfa. BUG FIXED post-ship: profiles has NO email column —
  adminsWithoutMfa was silently returning [] (fixed `fff7e46`, emails now
  from auth.admin.getUserById). Anthropic billing cap set by Russell in
  Console. NOTE: fine-grained PAT EXPIRES ~2026-10-22 — digest rotation
  warning will fire, mint a fresh one then.

**2026-07-24: Russell confirmed 2FA is enabled on ALL provider accounts**
(GitHub, Vercel, Supabase, Cloudflare, Resend) — the account-level residual
is closed. Remaining honest residuals: local machine + OneDrive secret
files, supply chain, zero-days.

## Roadmap
- **Level 3:** graduated autonomy per category (dep bumps, known error classes auto-ship after CI + post-deploy verify); Bishopbend (GLBA) stays human-gated longest.
- **Next big build (identified, not started): Stripe invoicing** off the plan pins — the money layer.
- **Still open:** host10 mailbox recovery; makobot OAuth secrets verify; exact-month report data tables; synthetic monthly form-delivery tests; client-site cron aggregation; DMARC new-spec fleet audit; commit MakoBot .mcp.json gitignore hygiene fleet-wide; OneDrive→C:\Dev repo migration (someday).
Related: [[fleet-portal-master-endpoint]], [[feedback-just-fix-issues-dont-ask]], [[resend-2026-07-platform-updates]].

## Update 2026-07-26 — stuck-dispatch watchdogs round 2 (portal `5be4e75`)

Two more tick watchdogs after cards sat a day on "PR being prepared…":
1. **Issue closed but signal remains** → item back to OPEN with "fix may be
   incomplete (nested copy)" warning. Canonical: brace-expansion fixed at top
   level while eslint-config-next nested a 1.x copy — GitHub matches the
   advisory range against EVERY lockfile copy.
2. **Run succeeded without a PR** (90-min grace) → back to OPEN with cause.
   Canonical: Dependabot-alert dispatches can NEVER work — the Actions token
   has no Dependabot API read, so Claude investigates and stops. Dep alerts
   are fixed by hand with the fleet override recipe, not dispatched.

Verification gotcha: security KPI TTL is 6h (`SECURITY_TTL_MS`) — to make the
board reflect a just-fixed repo now, delete the client's `security` row from
`client_kpi_cache`, then run fleet-refresh + ai-triage crons (CRON_SECRET).

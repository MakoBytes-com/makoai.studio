# makoai.studio — Memory Index

One line per memory. Content lives in the linked files. Keep hooks short —
enough to find the right file, never the detail itself.

## Running state
- [build_progress.md](build_progress.md) — running build state for the Mako Studio agency site
- [session_summary.md](session_summary.md) — **2026-09-19**: WaaS-only pricing shipped, $200 social add-on, HandPenned off the portfolio, the anglerfish + its two gotchas

## Portfolio & the site itself
- [site-audit-2026-09-08.md](site-audit-2026-09-08.md) — **2026-09-08** full audit: two highs (sharp held vulnerable **by our own override pin**, js-yaml via eslint) with Dependabot showing 0; `unsafe-eval` dropped after canary-verifying the bundle; why `unsafe-inline` **stays** (a nonce forces 32 static routes dynamic). And the one I broke: a source grep cannot prove a CSP origin unused — runtime API data has no literal in the repo
- [fleet-sites-missing-from-portfolio.md](fleet-sites-missing-from-portfolio.md) — **2026-09-08** live audit: 8 fleet sites still absent; TWO wrong infrastructure calls I made and corrected (bdslighting.com is not parked; Davis is not a live Next.js site — it is WordPress on Apache awaiting cutover). `Server:` settles it in one call. Plus a client ticket unpushed 21 days, and a crawlable pre-cutover copy of a live client site
- [portfolio-drift-live-vs-showcase.md](portfolio-drift-live-vs-showcase.md) — **2026-09-08** a frozen fork stops drift after handover but hides the opposite drift: the Utilities Plus entry described a hero video, fonts and services the live site no longer had, and never mentioned its control panel. Fork vs live is a decision that expires
- [portfolio-proposal-entries.md](portfolio-proposal-entries.md) — **2026-09-08** the first "Proposal" entry (Stress A&D): the 4 guards spec work needs before linking, and why status must beat tier
- [portfolio-thumbnail-capture.md](portfolio-thumbnail-capture.md) — 2880×1800; animated heroes use `screenshot-video-hero.mjs`, never Microlink; frames pinned, not wall-clock waited
- [light-theme-and-toggle.md](light-theme-and-toggle.md) — **2026-08-19** dark+light with a nav toggle (GovSprint palette); `.surface-deep` keeps the hero dark because its point cloud is ADDITIVE and vanishes on white
- [feedback-arctic-scrollworld-rejected.md](feedback-arctic-scrollworld-rejected.md) — the AI arctic scroll-world homepage was rejected outright and deleted; what not to repeat before pitching a concept
- [feedback-replaced-designs-get-deleted.md](feedback-replaced-designs-get-deleted.md) — replaced designs get DELETED from the live site; git tags are the archive
- [webgl-pointer-overlay-gotcha.md](webgl-pointer-overlay-gotcha.md) — overlays above a WebGL canvas silently kill pointer interactivity; track on window, `pointer-events-none` on decorative layers
- [product-scrollhouse-theme.md](product-scrollhouse-theme.md) — Scrollhouse for sale at /work/scrollhouse; from the unpaid Alarmion build; "contact for pricing"
- [incident-contact-form-dead-79-days.md](incident-contact-form-dead-79-days.md) — the form was NOT dead; real cause was CONTACT_TO black-holing via AppRiver. Carries the honest correction

## Sales & pricing
- [pricing-waas-model.md](pricing-waas-model.md) — **2026-09-19: WaaS-ONLY** — pay-once tiers + mailboxes DELETED (never re-propose); $200/mo social/GBP add-on; maintenance kept post-term; buy-out figure open; billing INTERNAL, never propose Stripe
- [sales-wordpress-migration-davis-story.md](sales-wordpress-migration-davis-story.md) — sell WordPress prospects with the Davis story, never a stack lecture; Russell declines on fit, not size
- [prospects-pitch-email-design-approved.md](prospects-pitch-email-design-approved.md) — themed pitch email shipped to the portal (e47ca1a): editable, per-prospect price, auto-scraped contact
- [prospects-rebuild-planned.md](prospects-rebuild-planned.md) — prospects rebuilt: audit → AI pitch → public /audit/<token>
- [prospect-aws-app-takeover.md](prospect-aws-app-takeover.md) — OPEN: vendor-built app we own, running in our AWS account; 16-question vendor email + handover sheet written, answers pending

## Portal & fleet operations
- [fleet-vs-portal-coverage.md](fleet-vs-portal-coverage.md) — **THE RULE**: a repo must live in `MakoBytes-com` or the portal is blind to it (verified); Vercel links by repoId so transfers cost no deploys
- [portal-traffic-tile-analytics-mode.md](portal-traffic-tile-analytics-mode.md) — "I see no trafic on these meeters??": `clients.analytics_mode` picks site-pull vs central beacon; the two DIFFERENT causes of a zero
- [portal-light-theme.md](portal-light-theme.md) — **2026-08-19** portal light theme; a token swap was not enough because its surfaces are white-alpha overlays
- [ai-triage-duty-officer.md](ai-triage-duty-officer.md) — AI duty officer live in the portal: 15-min triage → /admin/ai with approval gates, kill switch, caps
- [teams-notifications-portal.md](teams-notifications-portal.md) — portal reports to Teams via Workflows webhook; never throws, email stays primary
- [digest-liveness-and-secret-ages.md](digest-liveness-and-secret-ages.md) — the "missing" digest was a deploy-timing artefact; fixed the silent-death class (cron_runs + delivery-aware send + 26h watchdog)
- [weekly-security-sweep.md](weekly-security-sweep.md) — portal auto-audits weekly + adversarial AI review on PRs; the false-HIGH gotcha on personal-account repos
- [fleet-portal-master-endpoint.md](fleet-portal-master-endpoint.md) — master endpoint must use the canonical www host (auth-strip gotcha)
- [pattern-cron-heartbeat-makopulse.md](pattern-cron-heartbeat-makopulse.md) — FLEET CONVENTION: every Vercel cron pings a MakoPulse heartbeat; never reach for UptimeRobot
- [dashboard-auto-refresh-hard-reload.md](dashboard-auto-refresh-hard-reload.md) — monitoring dashboards need a hard reload; `router.refresh()` is invisible
- [github-actions-spend-2026-07.md](github-actions-spend-2026-07.md) — why the $10 Actions budget hits 90%: measured breakdown, plus a separate GHAS charge the alert never mentions
- [fleet-changes-2026-07.md](fleet-changes-2026-07.md) — ledger for the July 2026 fleet restructuring run

## Security & incidents
- [supabase-rls-fleet-exposure-2026-08.md](supabase-rls-fleet-exposure-2026-08.md) — 29 tables / 4 projects had RLS off + anon write grants (password_hash, totp_secret writable). Fixed fleet-wide; the PostgREST 206-means-success probe trap
- [security-audit-2026-07-24.md](security-audit-2026-07-24.md) — portal audit: CRITICAL profiles-RLS self-escalation + HIGH MFA bypass, both exploit-verified and fixed
- [spend-spike-2026-08-and-bulldog-captcha.md](spend-spike-2026-08-and-bulldog-captcha.md) — **the big one.** No spend spike existed (cost_report is CENTS); the alert flood was fingerprints keyed on record ids; officer could not open PRs at all; 3 client DBs had silently stopped backing up
- [incident-mcp-token-public-exposure.md](incident-mcp-token-public-exposure.md) — CLOSED: MakoBot MCP token exposure, scrubbed AND rotated; rotation recipe banked
- [incident-gcp-billing-disabled-places.md](incident-gcp-billing-disabled-places.md) — RESOLVED: one consolidated key; diagnostic rule — Places 403 but PSI works means billing is off, not code
- [vercel-csp-nonce-shadowing.md](vercel-csp-nonce-shadowing.md) — an enforced CSP without a nonce SHADOWS the report-only one that has it; report-only-first is invalid for a nonce policy
- [umami-csp-gateway-fleet-bug.md](umami-csp-gateway-fleet-bug.md) — Umami recorded nothing on 5 sites: its script posts to gateway.umami.is, which no CSP allowed
- [rotation-blockers-and-vercel-env-gotchas.md](rotation-blockers-and-vercel-env-gotchas.md) — why 3 portal secrets could not rotate; Vercel env-decrypt and Supabase key-minting traps
- [supabase-backup-outage-ticket.md](supabase-backup-outage-ticket.md) — ready-to-send ticket: daily backups stopped on 3 healthy Pro projects; evidence written
- [fleet-email-routing-cloudflare.md](fleet-email-routing-cloudflare.md) — host10 decommission: 5 domains moved to Cloudflare Email Routing; CF-enable is dashboard-only
- [domain-portfolio-and-mako-studio-loss.md](domain-portfolio-and-mako-studio-loss.md) — mako.studio is LOST (never scan, monitor or link to it); full expiry/lock/registrar audit
- [fleet-env-corruption-sweep.md](fleet-env-corruption-sweep.md) — all 28 Vercel projects swept; delivery logs proved forms WERE delivering; reusable scanner/cleaner scripts
- [makologics-db-supabase-not-neon.md](makologics-db-supabase-not-neon.md) — makologics DB is Supabase `qbnygqjuygajgpkkctpt`; never trust project display names, resolve the pooler-username ref

## Dependencies & CI
- [dependabot-eoverride-silent-death.md](dependabot-eoverride-silent-death.md) — Dependabot dead 11 days from EOVERRIDE (a package that is BOTH a direct dep and an override needs `"$name"`); npm audit read clean because nothing was updating the lockfile
- [typescript-7-blocked-by-nextjs.md](typescript-7-blocked-by-nextjs.md) — TS 7 has no JS compiler API so Next's typecheck fails; park the major, never flip `experimental.useTypeScriptCli`
- [esbuild-drizzle-kit-upstream-blocked.md](esbuild-drizzle-kit-upstream-blocked.md) — the drizzle-kit esbuild alert is genuinely unfixable upstream; dev-scope only. Never park it — the parked-check matches on name and would hide real esbuild CVEs
- [fleet-dependabot-patch-posture-audit-2026-07-24.md](fleet-dependabot-patch-posture-audit-2026-07-24.md) — all 39 repos audited; which need manual patch and which have alerts disabled entirely
- [resend-2026-07-platform-updates.md](resend-2026-07-platform-updates.md) — Resend July 2026 changes; GitHub auto-revokes leaked keys, so sudden fleet-wide 401s mean revocation

## Patterns
- [nextjs-cp-three-live-bugs.md](nextjs-cp-three-live-bugs.md) — three bugs that passed typecheck/lint/build and only appeared deployed: prefetched GET logout, pooler deadlock 504, module-load DB client
- [pattern-admin-module-orphaned-from-public-page.md](pattern-admin-module-orphaned-from-public-page.md) — CP module edits a table while the public page renders a hardcoded array, so edits vanish; detection recipe + safe rewire
- [pattern-validation-errors-inline-not-crash.md](pattern-validation-errors-inline-not-crash.md) — user-typo validation in server actions redirects with an inline message, never throws
- [supabase-resumable-upload-traps.md](supabase-resumable-upload-traps.md) — the 4 traps in client upload links, each with a misleading error; signed upload tokens do NOT bypass RLS
- [bulldog-water-control-panel.md](bulldog-water-control-panel.md) — bulldogh2o.com /admin: iron-session + TOTP on its own Supabase project, anon revoked, proven with an anon-key probe
- [govsprint-analytics.md](govsprint-analytics.md) — govsprint.app genuinely counted nothing; beacon + tables built. Read the live schema, don't assume fleet column names
- [feedback-out-of-credits-show-buy-page.md](feedback-out-of-credits-show-buy-page.md) — a paid dependency running dry shows a buy-more page with a billing link, never a bare error
- [kimi-ebusy-makobot-watcher-fix.md](kimi-ebusy-makobot-watcher-fix.md) — agent file-write EBUSY while MakoBot runs means a watcher lock; suspect that first
- [pattern-blend-video-creature.md](pattern-blend-video-creature.md) — the pricing anglerfish recipe: video-on-black + `mix-blend-mode: screen`; ancestor transforms ISOLATE the blend (visible box); real ffmpeg is the Gyan winget build

## Feedback — how Russell wants me to work
- [feedback-never-end-a-turn-with-an-open-item.md](feedback-never-end-a-turn-with-an-open-item.md) — **HARD RULE**: naming a fixable thing does not discharge it. The wording test, and the only 2 real exceptions
- [feedback-just-fix-issues-dont-ask.md](feedback-just-fix-issues-dont-ask.md) — don't ask before fixing issues, fix them all; no per-issue prompts
- [feedback-verify-what-russell-sees.md](feedback-verify-what-russell-sees.md) — verify the RENDERED page, not the DB; walk new surfaces as he would, before he does
- [feedback-verify-the-check-actually-ran.md](feedback-verify-the-check-actually-ran.md) — prove the detector fires on a known-bad input before reporting green; empty output is not "no matches"
- [feedback-admin-forms-need-escape-hatches.md](feedback-admin-forms-need-escape-hatches.md) — never hide an input behind a toggle; every `<select>` of records needs a typed-name escape hatch; **walk the EMPTY state first**
- [feedback-claude-merges-prs.md](feedback-claude-merges-prs.md) — Claude merges PRs himself after review + green checks; never hand Russell merge links
- [feedback-business-email-to-makologics-never-gmail.md](feedback-business-email-to-makologics-never-gmail.md) — all Mako business/app email goes to admin@makologics.com, never the personal gmail
- [feedback-confirm-before-deleting-infra-with-secrets.md](feedback-confirm-before-deleting-infra-with-secrets.md) — don't delete a folder holding secrets or deploy configs on an inference of "abandoned"
- [feedback-narrate-more-answer-questions.md](feedback-narrate-more-answer-questions.md) — narrate multi-step ops fully; answer every question explicitly

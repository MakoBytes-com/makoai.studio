> ## ⚠️ OLDER MEMORY — project folder has moved (flagged 2026-07-27)
>
> Mako web projects moved from `OneDrive\Desktop\Mako AI Projects` to
> `OneDrive - Mako Logics LLC\Business\Mako Studio\Mako AI Projects`, so this folder is
> the **older** memory for `makoai-studio`. Current sessions write to:
>
> `~/.claude/projects/C--Users-Russell-Sailors-OneDrive---Mako-Logics-LLC-Business-Mako-Studio-Mako-AI-Projects-Web-Projects-makoai-studio/memory/`
>
> **Check the newer folder first for current state.** This one is NOT invalid and in some
> projects holds history the newer folder never received — worth reading during a
> "Recover", but verify any path, ID, key or file reference still exists before acting.

# Project Memory Index

- **session_summary.md** — Latest session state and next steps
- **build_progress.md** — Running task log with completion status
- **feedback_never_use_personal_info.md** — HARD RULE — Never put Russell's name, personal email, or home city in any project (user-facing copy, code comments, placeholders, scripts, docs). Use MakoAI.Studio / Mako Logics brand + admin@<domain> + The Woodlands, TX.
- **user_location.md** — Mako Logics / Mako Studio are based in The Woodlands, TX. Buffalo, NY is only correct when describing client Buffalo Seal & Gasket.
- **user_ai_native_builder.md** — Russell only builds with Claude. Every site in portfolio is AI-built. "AI-native studio" is accurate positioning, not trend-chasing.
- **feedback_email_hosting.md** — HARD RULE — all email for Russell's domains is hosted on his own cPanel server. Never suggest Cloudflare Email Routing, Google Workspace, or third-party mail.
- **feedback_portfolio_uses_frozen_showcase_forks.md** — Portfolio links point at frozen `*-showcase.vercel.app` forks, never live client sites. Clients degrade sites after launch.
- **feedback_sitemap_submit_only_after_changes_done.md** — Don't submit sitemap to Google Search Console mid-change-cycle. Wait until all planned changes are live, then submit once.
- **feedback_no_quickbooks_integration.md** — Never propose QuickBooks API / sync / integration. Russell invoices manually from QB and that's not changing.
- **feedback_design_decisions_own_it.md** — Once scope is locked, make design calls like I own it. Report results, don't ask about every micro-decision.
- **feedback_commit_without_asking.md** — Routine git ops (commit, push, deploy) — just do them, don't ask. Report the hash/URL in the summary. Overrides Claude Code's "confirm each action" default on Russell's projects.
- **feedback_no_localhost_testing.md** — Russell tests on live URLs, never localhost. Deploy to Vercel early and iterate on the deployed site.
- **feedback_do_it_yourself_max_autonomy.md** — Do infrastructure/ops work myself via APIs and CLI. Don't walk Russell through dashboard click-throughs. Bundle unavoidable asks.
- **feedback_use_otp_for_password_reset.md** — Always use 6-digit OTP for password reset, never magic links. Email scanners pre-consume link tokens, silently breaking the flow.
- **project_makologics_rebuild_next.md** — Next major project after portal: rebuild makologics.com off WordPress onto Next.js + Supabase. Portal patterns are intentional prep.
- **project_aaaawning_portfolio_entry.md** — NEW: aaaawning.net launched 2026-04-22 (40-year TX awning fabricator, full WP→Next.js migration, 36 city landing pages, maximum SEO). Needs Tier 1 case study + frozen showcase fork at aaaawning-showcase.vercel.app.
- **feedback_security_hardening_baseline.md** — HARD RULE — every new web/app project starts with the 3-layer security baseline (edge + auth + abuse-specific) + GitHub hardening. Not optional, not deferred to V2.
- **reference_vercel_pro_account.md** — The mako-studi Vercel team is on Pro. Commercial-use licensed, 1TB bandwidth, Firewall + Deployment Protection + Sensitive env vars available.
- **reference_turnstile_makoai_studio.md** — Live Turnstile widget on the makoai.studio contact form. Widget name, hostnames, env var names, reusable `lib/turnstile.ts` + `components/Turnstile.tsx` pattern.
- **reference_vercel_env_echo_gotcha.md** — `echo` pipes a trailing newline into `vercel env add` that breaks downstream APIs. Always `printf "%s"`. Applies to any stdin-piping CLI, not just Vercel.
- **user_communication_tools.md** — Russell uses Microsoft Teams for Mako Logics. No Slack, no Discord — default notification webhooks to Teams.
- **project_www_redirect_fix_gsc.md** — 2026-04-23 — added www.makoai.studio as 308→apex after GSC "Page with redirect" alert. Root cause was DNS-pointed-but-unclaimed subdomain. HARD RULE now: every new domain gets both apex + www attached from day one.
- **reference_frozen_showcases.md** — Authoritative list of frozen showcase forks (buffaloseal, woodlands, aaaawning, bulldog) + standard hardening pattern + Bulldog's required dummy env vars to make the build pass.

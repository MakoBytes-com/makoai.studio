---
name: fleet-vs-portal-coverage
description: "What the Mako portal actually monitors vs what the fleet actually is, and the org-repo rule that decides whether a site can be monitored at all"
metadata: 
  node_type: memory
  type: project
  originSessionId: f0e4bb54-a414-412d-b769-affa62fcad7c
  modified: 2026-08-19T19:29:06.653Z
---

Measured 2026-08-19 by diffing the portal's `clients` registry against Vercel,
GitHub, Supabase and the team's domain list.

**The registry IS the fleet board.** `clients` doubles as the site registry
(`kind` = client | internal | showcase). A property with no row gets *nothing*:
no uptime, no deploy state, no SSL/domain expiry, no vulnerability scan, no
nightly DB export. Silence, not a warning.

**THE RULE — a repo must live in `MakoBytes-com` or the portal is blind to it.**
Verified directly: the portal's `GITHUB_TOKEN` returns **404 on every
`russellsailors-hub` repo and 200 on org repos**. `checkGithubSecurity` reports
that as `error: "github 404"` (honest, not a false clean) — but the security
signal is simply absent. So onboarding a site = transfer the repo to the org
FIRST. Vercel links by `repoId`, which survives a GitHub transfer: both
transfers done this day re-pointed themselves with zero deploy disruption.

Registered this session (30 rows now): **GovSprint** (internal, govsprint.app),
**Bulldog Water** (client, bulldogh2o.com — second site for the BDS family,
billing stays on the Bulldog Security Service row), **NautiDawgs** (client,
`development` — the empty dropdown-created row filled in; monitoring watches
`getonup-ladder.vercel.app` because nautidawgs.com is still the client's Wix
site until cutover). All three verified live on the board via a real
fleet-refresh, not assumed.

Still unregistered (each = a real blind spot): `nautidawgs-showcase`,
`bulldogsecurityaichat`, `scrollhouse-theme` and `machine-template-web` (both
products listed for sale), `axyscorp-showcase`. Databases with no portal export
or stopped-backup detector: `bulldogsecurityaichat`, `govsprint` (now
registered), `davis-cp` (**Davis is a registered client whose `supabase_ref` is
still blank**), `voltage-bike` (row exists, ref blank). Their Supabase-side
daily backups ARE completing — the gap is the copy we own. Domains owned with
no expiry watch: `saxclasses.com`, `aipromptshive.com`, `[retired project].ai` — the
mako.studio class of loss.

Other measured gaps: `operating_costs` carries a real number for Supabase only
($185/mo) — Vercel, Resend, Cloudflare, Anthropic, GitHub are null, so Total
Spend is one-sixth true; the `vendors` module has 0 rows; all 6 monthly client
reports ever generated have `sent_at` null, and only 3 of 7 client sites are
eligible because `primary_email` is blank on Bishopbend, Utilities Plus, Davis
and Woodlands. The MSP half (Atera, ThreatDown, M365) has no surface at all.

**Do not re-raise as defects:** `monthly-reports` and `code-audit` show "never
ran" in `cron_runs` only because run-logging shipped 2026-08-09 and both fire on
the 1st — monthly-reports provably ran 2026-08-01 (it wrote the three July
reports). See [[feedback-verify-the-check-actually-ran]].

Prime Protection was retired the same day — Vercel project, GitHub repo, local
folder and Claude memory deleted; cold archive with full history at
`Mako AI Projects/_Archives/PrimeProtection-retired-2026-08-19`. Related:
[[esbuild-drizzle-kit-upstream-blocked]].

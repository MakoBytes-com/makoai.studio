---
name: weekly-security-sweep
description: "Portal has a two-layer automated security system (2026-07-24): weekly deterministic sweep with graded reports at /admin/security, + change-triggered adversarial AI review on portal PRs. Russell: 'cover my ass from every aspect'."
metadata: 
  node_type: memory
  type: project
  originSessionId: b4a2f444-1965-4dfe-846b-d6a5e73ef5c4
  modified: 2026-07-25T01:06:13.511Z
---

**Built 2026-07-24** (Russell: "add it to the portal with reports" + "cover
my ass from every aspect"). Two layers, exactly the recommended shape:

**A) Weekly deterministic sweep** — cron `/api/cron/security-sweep`
(Mondays 13:00 UTC), viewer at **/admin/security** (nav: "Security sweep",
after AI Triage), "Run sweep now" button. Grades every LIVE monitored site
(dev-status sites skipped) A-F across: security headers (HSTS/CSP/nosniff/
XFO/Referrer/Permissions), server fingerprint, dependency vulns
(Dependabot per repo), SEO basics (title/meta-desc/robots/sitemap), Core
Web Vitals (from cached KPI), uptime/SSL, + portal hardening
(adminsWithoutMfa, overdue secrets). Reads the 5-min KPI cache + adds
live-fetch checks. Stored in `security_reports` (migration 0025,
admin-RLS). Emails admin@makologics.com only on critical/high, else
silent. `lib/security-sweep.ts` = engine. First run: grade A 97/100, 24
sites.

**B) Change-triggered adversarial review** —
`.github/workflows/security-review.yml` on makoai-portal: opus reviews
every PR touching lib/**, app/api/**, **/actions.ts, middleware,
supabase/migrations/** and comments findings (auth gates, RLS WITH CHECK,
AAL2, untrusted-data fencing, secrets, IDOR). Read+comment only. This is
the layer that catches a NEW auth hole like the two the audit found.

**GOTCHA banked:** the portal GITHUB_TOKEN is MakoBytes-org-scoped → 404s
on russellsailors-hub personal repos (pixelmonsters-com,
utilities-plus-showcase). The sweep now checks repo reachability FIRST:
unreachable → LOW "unverifiable" (monitoring gap), reachable+alerts-404 →
HIGH "disabled". Don't let a can't-check masquerade as a HIGH (false HIGH
= erodes trust, the [[feedback-verify-what-russell-sees]] lesson).

**Real finding from run 1:** bulldog/aaa/woodlands SHOWCASE forks were
rebuilt WITHOUT the security-headers baseline (public, no CSP) — fixed.

**GOTCHA #2 (dev sites):** the sweep audits the APEX domain (what real
visitors hit). For dev sites mid-migration (utilities-plus.com,
woodlandsfamilypsychiatry.com, axyscorp.com) the apex still points at the
LEGACY platform (WordPress/BlueHost, Wix) — NOT the Next.js rebuild on
*.vercel.app. So the sweep's "missing CSP/HSTS" on those was the OLD site;
the new builds DO have headers (verified on their .vercel.app URLs). Those
findings resolve on DNS cutover, not via code. When a dev site grades
low, check whether the apex is still legacy before "fixing."

**Now covers all 28 sites** (dev included, Russell: dev=live security-wise;
sweep exclusion removed). Related: [[security-audit-2026-07-24]],
[[ai-triage-duty-officer]], [[feedback-verify-what-russell-sees]].

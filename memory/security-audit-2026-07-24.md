---
name: security-audit-2026-07-24
description: "2026-07-24 deep security audit of makoai-portal (fleet control plane) + fleet patch sweep. Found+fixed a CRITICAL live priv-esc (profiles RLS) and a HIGH MFA bypass, both exploit-verified. Portal is otherwise strongly built."
metadata: 
  node_type: memory
  type: project
  originSessionId: b4a2f444-1965-4dfe-846b-d6a5e73ef5c4
  modified: 2026-07-24T22:27:10.285Z
---

**Deep security audit, makoai-portal = fleet control plane** (Russell:
"audit this whole project, make sure everything is secure and patched" →
"just fix everything"). Two adversarial agents (opus auth/code + sonnet
fleet patch posture) + inline baseline checks.

## FIXED + EXPLOIT-VERIFIED
- **CRITICAL — profiles RLS self-escalation** (migration 0024, live): the
  `profiles_self_update` UPDATE policy had USING but NO WITH CHECK →
  Postgres reused USING as the post-update check → any CLIENT account could
  `PATCH /rest/v1/profiles {"role":"admin"}` with the PUBLIC anon key +
  their own JWT and become full fleet admin. Fix: WITH CHECK that lets a
  non-admin self-update only if role is unchanged (service_role bypasses
  RLS, so onboarding unaffected). Exploit test: HTTP 403, role stays
  'client'. **This one hole defeated all other admin gating** — everything
  else was solid, this was the crack.
- **HIGH — MFA bypass** (commit e5d975e): admin gate checked only that a
  TOTP factor was ENROLLED, never that the SESSION completed it (AAL2). A
  stolen password alone (AAL1) reached /admin, never entering a code —
  login's `mfa_required` was a client-side hint. Fix: getMyMfaPosture
  reports needsStepUp; admin layout redirects AAL1→/auth/mfa. Verified BOTH
  ways: AAL2 admin →200 (no lockout), AAL1 admin →307 /auth/mfa (blocked).
- **HIGH — dispatch injection**: neutralize() now defangs ~~~ tilde fences
  + leading markdown headings (was backtick+@claude only).
- **MEDIUM — open redirect**: /auth/callback rejects non-same-origin `next`.
- **Portal npm**: 4 HIGH (nested postcss@8.4.31 path-traversal via next) →
  0, via direct postcss ^8.5.23 + matching override (commit a0ad325).

## CLEAN (verified negative — the portal is well-built)
All 47 server actions gate before first DB touch; all 26 API routes gated;
master-JWT/SSO solid (RS256 pinned, iss re-pinned post-verify, jti replay
guard, 30s TTL); no hardcoded secrets; service-role never client-side; no
dangerouslySetInnerHTML; RLS enabled+scoped on all core tables (profiles
was the lone hole); full security-header baseline live.

## DEFERRED (documented, low risk)
M2 reset-code Turnstile (already 5/email/15min fail-closed = brute-force
infeasible; needs 2-sided FE change). LOW: L1 constant-time cron compare,
L2 logout CSRF, L3 XFF IP pinning, L4 CSP nonces. INFO: client
estimate approve/decline may silently no-op (RLS admin-write-only) —
correctness, not security.

## Fleet patch posture (agent, full table in
[[fleet-dependabot-patch-posture-audit-2026-07-24]])
Most repos clean w/ auto-fix on. Manual-patch queue (agent running):
saxclasses (1 CRIT next-auth homoglyph + 11 HIGH), utilities-plus-showcase
(17 HIGH), cold-pitch-template (12 HIGH — TEMPLATE, propagates to new
sites), [retired project].ai (7 HIGH dormant). Enabled alerts+auto-fix on
pixelcopy-web/app/releases (were blind; releases is PUBLIC).

**Tools banked:** scripts/probe-board.mjs (authed rendered-page probe,
run from PowerShell — MSYS mangles /path args); exploit-test.mjs +
aal1-test.mjs patterns in scratch. Related:
[[feedback-verify-what-russell-sees]], [[ai-triage-duty-officer]].

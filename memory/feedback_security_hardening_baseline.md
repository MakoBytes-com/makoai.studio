---
name: Every Mako project starts with this security baseline
description: Hard rule — every web project Russell ships must implement this three-layer security baseline on day one, not as an afterthought. Validated against the Mako Studio Portal build 2026-04-20.
type: feedback
originSessionId: e68abf5d-4212-4bd8-a996-d7710efc71a7
---
**Rule.** Every web/app project built for Russell — portals, dashboards, marketing sites with forms, SaaS, client deliverables, makologics.com rebuild, and anything going forward — ships with the **three-layer security baseline** below. Not one layer. All three. Not deferred "until V2." On day one.

**Why:** Russell runs makologics.com which has been hammered on WordPress for 20+ years. He's moving off WP onto Next.js + Supabase specifically to shed attack surface. Every new project is a door into his business identity. One slip = credential compromise, data loss, client trust destroyed. The portal build (2026-04-20) proved all three layers can be added in ~4-5 hours total. It's not optional work.

---

## Layer 1 — Edge + basic auth hardening (do first)

**On the CDN (Cloudflare):**
- Proxied DNS (orange cloud) — never expose origin IP
- Bot Fight Mode on
- Turnstile widget on every public form (signup, login, contact, password reset)

**On the app:**
- Per-email + per-IP rate limits on: login, signup, password reset, OTP verification, any public-write endpoint (`lib/rate-limit.ts` in-memory Map is fine for MVP scale)
- Honeypot field on every public form (hidden `<input>` that bots fill)
- Server-side Turnstile verification in every POST handler (`lib/turnstile.ts`)
- Dependabot + Dependabot security updates enabled on the GitHub repo
- HTTPS enforced (HSTS with `includeSubDomains; preload`)
- Security headers: `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` tight

---

## Layer 2 — Auth + monitoring

**On auth:**
- TOTP MFA for admin accounts minimum (Supabase has this native via `auth.mfa.enroll/challenge/verify`)
- Step-up MFA required via AAL check in the login route
- Passwords set via admin-controlled flow (not relying on Supabase's default emailer alone)
- Password reset flow uses **6-digit OTP** not magic links (scanners pre-consume links — see `feedback_use_otp_for_password_reset.md`)

**On content:**
- Strict Content-Security-Policy with an allowlist of origins — NO `unsafe-inline` on scripts where avoidable
- `Cross-Origin-Opener-Policy: same-origin`

**On ops:**
- Sentry (or equivalent) wired into client + server with tunneled route (`/monitoring`) to bypass ad-blockers
- Error alerts go to `admin@makoai.studio` + `russell.sailors@gmail.com`

---

## Layer 3 — Abuse-specific

- **File upload validation:** strict MIME allowlist + magic-byte content inspection + size cap. Defeats renamed-extension spoofing. (`lib/file-validation.ts`)
- **Login history + anomaly alerts:** record every successful login (IP, country from `cf-ipcountry`, user-agent). On admin accounts, email alert on first-seen IPs. (`lib/login-monitor.ts` + `login_history` table)
- **Storage cleanup:** deleting a parent entity (client, request, project) removes its storage files too. No orphans.

---

## GitHub repo hardening (on EVERY repo, public or private)

- Dependabot: weekly npm + monthly GH actions
- Dependabot security updates: auto-PR on CVE
- Vulnerability alerts enabled
- Default `GITHUB_TOKEN` workflow permissions = read
- If public repo: Secret scanning + push protection + private vulnerability reporting (all free)
- If private repo: consider GitHub Pro ($4/mo) OR make public (if no secrets in code). Portal exception: the makoai-portal repo remained private without Pro.
- Org-level: require 2FA for all members

---

## What NOT to do

- **Do not propose magic links** for password reset or invite flows. Email scanners pre-consume one-time tokens. Always OTP or admin-set password.
- **Do not use Supabase's built-in emailer** for anything that matters. Route through Resend (SMTP or API direct) — Supabase default has a 3/hr free-tier cap and limited reliability.
- **Do not require strict per-IP allowlists** on admin routes without an "already-trusted" unlock mechanism. Russell travels / uses mobile hotspot. Locks himself out. Use MFA + login anomaly alerts instead.
- **Do not defer security to V2.** The portal build showed it takes 4-5 hours total. Anything longer and scope is wrong.

---

## Bootstrap checklist for a new project

1. Scaffold → **first commit includes** `.github/dependabot.yml` + security headers in `next.config.mjs`
2. Before first deploy → Layer 1 items above
3. Before first client invite → Layer 2 items
4. Before first production traffic → Layer 3 items
5. GitHub hardening as part of the initial push

**Reference implementations** (all in `makoai-portal`):
- `lib/rate-limit.ts` · `lib/turnstile.ts` · `lib/file-validation.ts` · `lib/login-monitor.ts` · `lib/email/send.ts`
- `middleware.ts` · `next.config.mjs` · `sentry.*.config.ts`
- `supabase/migrations/*`
- `components/Turnstile.tsx`

Lift them wholesale into the next project.

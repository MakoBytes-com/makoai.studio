---
name: Russell is on Vercel Pro
description: Vercel Pro plan active on the mako-studi team (2026-04-20). Unlocks higher limits, commercial use, deployment protection, firewall rules, sensitive env vars, 1 TB bandwidth.
type: reference
originSessionId: e68abf5d-4212-4bd8-a996-d7710efc71a7
---
**Fact.** Russell upgraded the `mako-studi` Vercel team to **Pro** on 2026-04-20 (~$20/mo).

**What Pro unlocks (relevant to Mako projects):**
- **Commercial use license** — Hobby restricts to personal use; Pro is required for MSP client work, portal with paying clients, etc. Needed for compliance.
- **1 TB bandwidth** (vs 100 GB Hobby) — matters once makologics.com + client sites see real traffic.
- **Deployment protection** — lock preview URLs behind auth/password so WIP isn't publicly accessible.
- **Vercel Firewall** — custom rate-limit rules + IP blocks at the Vercel edge (layered on top of Cloudflare).
- **Sensitive env vars** — encrypted-at-rest secret keys. Flag service-role keys + API tokens as Sensitive.
- **More concurrent builds + deploy minutes.**
- **Web Analytics with longer retention.**
- **Usage caps / spend management.**

**How to apply:**
- When provisioning env vars for secret values (`SUPABASE_SERVICE_ROLE_KEY`, `TURNSTILE_SECRET_KEY`, `RESEND_API_KEY`, `SENTRY_DSN`, etc.), **flag them as "Sensitive"** in the Vercel UI. Public vars (`NEXT_PUBLIC_*`) stay regular.
- For client-facing apps pre-launch, enable **Deployment Protection** on preview deploys so mid-build URLs don't leak.
- Use **Vercel Firewall** for app-layer abuse patterns (e.g. path-based rate limits on `/api/signup`) — complements the in-memory rate limiter in code.
- No longer need to worry about "Hobby plan only" warnings on commercial tools.

**Billing email:** goes to the Vercel team billing address (admin@makobytes.com or similar).

---
name: Cloudflare Turnstile widget for makoai.studio contact form
description: Pointer to the live Turnstile widget protecting the contact form — widget name, hostnames, env var names, and the reusable code modules.
type: reference
originSessionId: 9eaeca22-65db-4465-a51a-301c8e0f18c0
---
**Live on makoai.studio as of 2026-04-20.**

## Cloudflare widget
- **Dashboard:** https://dash.cloudflare.com/?to=/:account/turnstile
- **Widget name:** `makoai.studio contact form`
- **Mode:** Managed (Cloudflare decides invisible vs. interactive based on risk signals)
- **Hostnames allowed:** `makoai.studio`, `makoai-studio.vercel.app` (preview deploys)

## Vercel env vars (project `mako-studi/makoai-studio`, Production)
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY` — public, inlined at build time
- `TURNSTILE_SECRET_KEY` — flagged **Sensitive** (Vercel Pro feature per `reference_vercel_pro_account.md`)

## Code modules (reusable — lift into any future project)
- `lib/turnstile.ts` — `verifyTurnstile(token, ip)` server helper; returns `{ ok: true, dormant: true }` when secret is missing so the same code runs in dev/new-project scaffolds without the widget
- `components/Turnstile.tsx` — client-side widget that lazy-loads `challenges.cloudflare.com/turnstile/v0/api.js` and renders in dark theme; returns `null` when site key is missing
- Submit flow gates on captcha token presence when site key is set, silently skips gating when not

## Defense-in-depth on the contact form
1. Cloudflare Turnstile (this) — bot verification
2. `lib/email.ts` honeypot `website` field — hidden input that bots fill
3. In-memory rate limit — 3 submissions / IP / 10 min in `app/api/contact/route.ts`
4. Server-side email validation + Resend deliverability (DKIM/SPF/DMARC already set on the domain)

## Rotation / revocation
If either key leaks, rotate via the Cloudflare widget page (regenerates both keys) then re-run:
```
echo NEW_SITE_KEY | vercel env add NEXT_PUBLIC_TURNSTILE_SITE_KEY production --force
echo NEW_SECRET | vercel env add TURNSTILE_SECRET_KEY production --sensitive --force
vercel --prod --yes
```

## Precedent
This is the reference implementation for the Layer 1 Turnstile requirement in `feedback_security_hardening_baseline.md`. Lift these three files (plus the `.env.local.example` entries) into the next project (makologics.com rebuild, any client site with a form) — all that changes is the widget hostnames in Cloudflare.

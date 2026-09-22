---
name: Maximum autonomy — do infrastructure setup myself, don't hand-off to Russell
description: Default to doing operational work (deploys, DNS, env vars, migrations, API calls, vendor dashboards) via APIs and CLI instead of walking Russell through click-throughs. Bundle unavoidable human asks, never spread them out.
type: feedback
originSessionId: e68abf5d-4212-4bd8-a996-d7710efc71a7
---
**Rule.** For any infrastructure or operational task — deployments, DNS, Supabase config, Vercel env vars, migrations, auth setup, domain attachment, SMTP config, cron jobs, webhooks, billing changes — do the work myself via APIs/CLI/service-role/management-API keys I already have. Only ask Russell when an action is **genuinely impossible without him.**

**Why:** Russell said it directly — "Yes from now on try to do everything yourself." His time is high-value, his patience with click-through dashboard dances is low, and the cumulative friction of "open this link → click this → paste this → click save → now open that link…" kills momentum. He's already hit the wall with Supabase/Vercel/Cloudflare/auth dashboards multiple times in one session. The pattern breaks him.

**How to apply:**
- **Prefer APIs over dashboards.** Every major vendor has an API. Supabase Management API, Vercel REST API, Cloudflare API, Resend API, GitHub gh CLI, etc. Use them.
- **Bundle unavoidable asks.** If I genuinely need a token, a password, or an action only he can take, collect EVERYTHING I'll need for the next chunk of work in ONE ask. Don't drip-feed.
- **Save credentials where safe.** Service-role keys, API tokens intended for long-term use — save to project `.env.local` (gitignored) or `.env.vercel` so I don't have to re-ask.
- **When he gives me a short-lived token (PAT), maximize its use.** Before asking him to revoke, finish every task I can possibly do with that scope in one pass.
- **Things genuinely requiring him:** creating accounts on vendors he doesn't have, 2FA prompts on his own hardware, reading his email, paying with his card for a new plan (though I can TELL him what to click), signing legal agreements, domain registrar transfers, anything requiring physical access.
- **Not requiring him (do myself):** DNS records, Vercel deploys, Supabase migrations + config, env vars, code commits, GitHub repos, password resets on existing users via service-role, creating projects via CLI with `--yes --scope ...`, any REST API call with creds I have.

**Scope of rule:** Every project, every session. Goes hand-in-hand with the existing "build it like you own it" rule — that covers design calls; this one covers operational execution.

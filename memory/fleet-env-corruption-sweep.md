---
name: fleet-env-corruption-sweep
description: "2026-07-07 fleet-wide Vercel env-corruption sweep — all 28 projects scanned; 6 sites had readable newline/BOM corruption (fixed+redeployed), 3 have blind sensitive keys (flagged for Russell), PEM keys correctly left alone. Reusable method + scripts."
metadata: 
  node_type: memory
  type: project
  originSessionId: bc5a5033-aacf-4efc-82ae-200a0cc64bb1
---

**Trigger:** makoai.studio's contact form was found dead for 79 days (env newline
in RESEND key), and Bishopbend's ANTHROPIC key was BOM-corrupted 2 days prior.
Two hits → Russell ordered a fleet sweep, then "fix it all." Done 2026-07-07.

**Scope:** all 28 Vercel projects under team `makoai-studio` (the only team).
Whole fleet is uniformly on **Resend** (no SendGrid/SMTP/Nodemailer anywhere).

## Corruption FOUND + FIXED (readable values → cleaned + redeployed + verified)

| Site | Corrupted vars | Impact | Verify |
|---|---|---|---|
| **makoai.studio** | RESEND_API_KEY, CONTACT_TO/FROM_EMAIL | contact form dead 79d | send 200 (commit 4205891) |
| **bulldogsecurityservice.com** (CLIENT) | RESEND_API_KEY, TURNSTILE_SECRET_KEY, ADMIN_USER, ADMIN_PASSWORD | form dead at BOTH captcha+email layers; admin login likely locked | corrupt key→HTTP 400, clean→200; redeployed www.; send 200 |
| **makopulse.com** | ANTHROPIC_API_KEY (**BOM ﻿ + CR**) | AI features dead | cleaned key → Anthropic /v1/models 200 |
| **makobot.com** | NEXTAUTH_URL, GITHUB_CLIENT_ID, AUTH_TRUST_HOST, CURRENT_BUILD, DOWNLOAD_URL | OAuth callback + installer download-link risk | cleaned + redeployed |
| **aipromptshive.com** (ai-prompts-hive) | VITE_SUPABASE_URL, _PROJECT_ID, _PUBLISHABLE_KEY | Supabase backend (build-time inlined) | cleaned + redeployed |
| **makologics.com** | DATABASE_URI, DATABASE_URI_NEON_BACKUP | tolerated (site up) but hygiene | cleaned + redeployed |

## BLIND — sensitive-flagged, unreadable on pull, could NOT verify or safely fix → FLAGGED for Russell to re-enter

Vercel "sensitive" vars pull back EMPTY, so static scan is blind and I can't
test/clean them. Local repos had only empty placeholders. Re-enter fresh
(guarantees clean) from each provider's dashboard:
- **aaaawning.net** (CLIENT): RESEND_API_KEY, TURNSTILE_SECRET_KEY, GOOGLE_PLACES_API_KEY — its contact form delivery is UNVERIFIED. Addresses (CONTACT_EMAIL_FROM/TO) are readable+clean. Recommend one manual form test OR re-enter Resend key.
- **bndtrentals.com** (bndt-showcase project, CLIENT): RESEND_API_KEY, IRON_SESSION_PASSWORD, SUPABASE_SERVICE_ROLE_KEY, TURNSTILE_SECRET_KEY — same blind status.
- **makobot.com**: GITHUB_CLIENT_SECRET, GOOGLE_CLIENT_SECRET, AUTH_SECRET, GITHUB_TOKEN, LICENSE_KEY_SECRET, SETUP_KEY — since makobot's readable OAuth vars WERE corrupt, the paired secrets are likely corrupt too → **makobot GitHub/Google login is probably broken**; re-enter the two OAuth secrets.

## Correctly LEFT ALONE (would be DAMAGED by "cleaning")

- **PEM keys**: bulldog + aaaawning `MASTER_PUBLIC_KEY` (9 line-breaks) + `TENANT_PRIVATE_KEY` (28) — the `\n` is STRUCTURAL (portal RS256 JWT keys, read as `const pem = process.env.X`). Stripping them breaks the portal. Scanner over-flags these; human judgment required.
- **makologics SESSION_SECRET**: harmless trailing newline; cleaning it just force-logs-out users for zero benefit. Left (noted).

## Clean sites (no action)
bishopbend.com (CLIENT — delivery vars all clean ✓), woodlandsfamilypsychiatry (no email wired — intake not backed), utilities-plus / axyscorp (no app env — in-progress), toppaws, makochat, makoanswer, makoai-portal, voltage.bike, pixelcopy, localaibox, machine-template, saxclasses, + all 6 frozen showcases.

## Root cause + detection

Values were pasted into Vercel with a trailing newline (`echo` vs `printf`)
or a BOM (copied from a BOM-encoded file). **Detection:** `vercel env pull`
renders a real embedded newline as the two-char text `\n` inside the dotenv
value, and a BOM as a literal ﻿ char — grep pulled files for `\n"` at line
ends. Fix: re-add via `printf '%s'` / stdin-file so no trailing byte sneaks in.

## Reusable toolkit (scratchpad/sweep/)
- `envscan.py` — masked static corruption scanner (findings + delivery-var inventory).
- `deliverytest.py` — direct Resend API send test (no browser/Turnstile needed).
- `cleanenv.py <project> <scope> VAR...` — safe whitelist clean+re-add (never blanket; can't hit PEM keys). Uses full path to `vercel.cmd` (Windows subprocess can't resolve .cmd).
- Turnstile does NOT auto-pass headless → browser form-submission can't test delivery; the direct-API send is the real test.

## ⚠️ DELIVERY-LOG VERIFICATION (2026-07-08) — corrects the corruption severity

There is ONE shared Mako Resend account; every full-access project key lists
the same 14 verified domains (incl. aaaawning.net + bndtrentals.com). Read the
account's `GET /emails` log (384 msgs) — the corruption was mostly TOLERATED,
NOT fatal. **Forms have been delivering leads:**
- **Bulldog: WORKING** — continuous `[Contact Form]`/`[Virtual Consult]` leads
  delivered to info@bdsnation.com through today. NOT losing leads. (My env
  clean was harmless hygiene; the raw-curl 400 mis-suggested breakage — Node
  trims the header newline, and Bulldog's addresses were clean.)
- **AAA Awning: WORKING** — estimate requests delivering to main@aaaawning.net
  today. Key clean. BLIND SPOT CLEARED.
- **BNDT: WORKING** — contact/quote messages delivering to
  information@bndtrentals.com. Key clean. BLIND SPOT CLEARED.
- **Bishopbend: WORKING** (28 delivered, 0 fail).

**The REAL lost business (env-corruption was NOT the main culprit — suppression was):**
- **AAA Awning — 28 estimate requests SUPPRESSED** (May 15–26), all to the OLD
  `admin@aaaawning.net` address (real named leads: glenda, Luke Eaton, Steve
  Small, Angie Belcher, Umika Shah, …). Resend suppressed that recipient after
  a bounce → 28 lost. Already remediated: aaaawning switched delivery admin@ →
  main@aaaawning.net on 2026-05-23 (commit 4df2257); July sends to main@ all
  deliver. The 28 May leads themselves are likely gone unless captured elsewhere.
- Minor bounced/suppressed: makopulse 8 bounced, toppaws 3 bounced + 2
  suppressed, makoanswer 1 bounced.
- **localaibox.com domain = `failed` verification** in Resend → its mail would
  bounce. Fix domain verification (add/repair DNS records) if localaibox needs email.

Tooling added: `resend_map.py` (account→domains), `resend_log.py` (send-history
analysis per domain — the definitive "is this form delivering" test, better than
any env scan). Resend `GET /emails?limit=100&after=<id>` lists account history;
send-only (restricted) keys 401 on it — use a full-access project key.

## Follow-ups still open
1. Russell re-enters the 3 blind sites' sensitive keys (above) + confirms makobot login.
2. Manual form test on aaaawning + bndt (client lead paths still unverified).
3. Code-level `.trim()` hardening per repo (only makoai.studio + planned) — prevents recurrence; not yet on the other fixed sites (env-clean restored function).
4. Lead-recovery: see [[incident-contact-form-dead-79-days]] — host10 mailbox may hold makoai leads pre-06-29.

Related: [[incident-contact-form-dead-79-days]], [[fleet-email-routing-cloudflare]].

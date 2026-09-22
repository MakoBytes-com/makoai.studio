---
name: incident-contact-form-dead-79-days
description: makoai.studio contact form never delivered a single email for 79 days — Vercel env vars stored with trailing newlines; fixed 2026-07-07 (clean envs + .trim() all env reads). Fleet-wide env sweep is the follow-up.
metadata: 
  node_type: memory
  type: project
  originSessionId: bc5a5033-aacf-4efc-82ae-200a0cc64bb1
---

**⚠️ CORRECTION (2026-07-08, after reading the actual Resend send log):** the
original "never delivered / dead 79 days" framing below was **overstated /
wrong**. The Resend delivery log proves the makoai contact form DID deliver:
only **4 "New inquiry" sends ever** (04-19, 04-20, 05-02, 07-08), all with the
newline visible in the from-address yet **status=delivered** — Node's undici
and SES TOLERATE a trailing newline in header/from values (they trim it). So
the env corruption was largely COSMETIC, not fatal. Why Russell saw no email:
(a) the site is extremely low traffic (1-5 impressions/day pre-June → almost
no real submissions, hence the 05-02→07-08 gap is "nobody submitted," not
"broken"); (b) inquiries delivered to `admin@makoai.studio`, which BEFORE
2026-06-29 was the host10 cPanel mailbox Russell had LOST THE PASSWORD TO — so
he never saw them. After 06-29 that address forwards to admin@makologics.com.
Net: not a mass-lead-loss bug; a low-traffic form routing to an inbox he
couldn't read. Env cleaned anyway (correct hygiene). Keep this correction
above the original (preserved for the reasoning trail).

**Original (overstated) writeup:**
makoai.studio's contact form was believed dead since its env vars were set
(~2026-04-19). `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, and `CONTACT_FROM_EMAIL`
were all stored in Vercel with a trailing newline (bad paste — `echo` vs
`printf`). A newline in the API key makes a raw HTTP client reject the
Authorization header (curl → 400). Route could return 502. (This was the
working hypothesis before the send log disproved the "fatal" part.)

**Business-impact caveats:**
- Direct emails to admin@makoai.studio BEFORE 2026-06-29 went to the host10
  cPanel mailbox Russell had lost the password to. **Recover that mailbox's
  contents before decommissioning host10 — possible lost leads inside.**
- After 06-29 they forward to admin@makologics.com (CF Email Routing).
- Exact failed-send count: unknowable from API (key is send-only,
  restricted). Russell can check the Resend dashboard logs, but the
  mechanism guaranteed zero deliveries.

**Fix (commit `4205891` + env replacements, all verified):**
1. All 3 env values replaced byte-clean (`printf '%s'` / stdin-file into
   `vercel env add`; verified by re-pull).
2. Code hardening: `.trim()` on EVERY env read — contact route
   (key/to/from), lib/turnstile.ts (secret; it's sensitive-flagged so its
   cleanliness can't be inspected — trim covers it), lib/places.ts
   (API key + place ID). The whole pasted-newline class is now inert.
3. Direct Resend API send test with clean key: HTTP 200, id `5c347f9c-…`
   → delivery chain Resend → CF routing → admin@makologics.com.

**Gotchas banked along the way:**
- `vercel env pull` escapes a REAL newline in a stored value as `\n` text
  in the dotenv file — that's how you detect corruption: pull and grep for
  `\n"` at line ends.
- Resend send-only ("restricted") keys 401 on GET /emails — a 401 parsed
  carelessly looks like "empty send log." Check HTTP status.
- Resend API behind Cloudflare rejects python-urllib's default UA
  (error 1010) — send a browser UA.
- The Claude Code Bash layer can mangle backslash escapes inside inline
  python (`-c` and heredocs) — write .py files via the Write tool for
  anything with escape sequences.
- This is the SAME bug class as Bishopbend's BOM+CRLF-corrupted
  ANTHROPIC_API_KEY (fixed `4260942`, 2026-07-07). **Two projects in two
  days → assume fleet-wide: sweep every Vercel project's env for
  newline/BOM corruption + end-to-end test every contact form.** Proposed
  to Russell as next step.

Related: [[fleet-email-routing-cloudflare]] (the routing chain),
[[session_summary]] (Fable rebuild same day — rebuild did NOT cause this;
route/env predate it and were byte-identical).

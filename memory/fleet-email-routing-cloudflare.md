---
name: fleet-email-routing-cloudflare
description: host10.makologics.com cPanel mail server is being decommissioned; inbound mail for 5 domains moved to Cloudflare Email Routing forwarding to admin@makologics.com. Full fleet MX sweep + the CF-enable + Resend-suppression gotchas.
metadata: 
  node_type: memory
  type: reference
  originSessionId: 2071f865-a74b-4aa5-9222-d56b2e703d96
---

**host10.makologics.com (`72.52.251.108`) is being decommissioned.** On **2026-06-29** all inbound mail living on it was migrated to **Cloudflare Email Routing**, every address forwarding to **admin@makologics.com** (a destination already verified in the CF account `b471d392a9c59820ee9139076366be7f`, so no verify-click was needed).

**Migrated (5 domains, all CF-DNS zones):** makoai.studio, makobytes.com, aipromptshive.com, toppaws.com, makobot.com. Each got: CF `route1/2/3.mx.cloudflare.net` MX, single clean SPF (`v=spf1 include:_spf.mx.cloudflare.net ~all`), an explicit `admin@<domain>` → admin@makologics.com rule, AND a **catch-all → admin@makologics.com** (save-everything). Old host10 apex MX deleted via API per zone. **Resend `send.<domain>` MX (SES feedback-smtp) KEPT** on makoai.studio/makobytes.com/toppaws.com — outbound unaffected (Resend aligns via DKIM `resend._domainkey`, not apex SPF).

**Verified receiving end-to-end:** makoai.studio, makobytes.com, aipromptshive.com, toppaws.com all confirmed (test mail landed in admin@makologics.com). **makobot.com** was the last one — config done + MX live, only its final live-receive test was pending at session end (do a Gmail send to admin@makobot.com to close it).

**[retired project].ai — DEAD, left on host10 intentionally.** Russell said it's dead; its mail just stops when the box dies. No migration, DNS untouched.

**Full fleet MX sweep result (run before decommission, resolving each MX target to IP, flagging `72.52.251.108`):**
- ON host10 (all handled above): makoai.studio, makobytes.com, aipromptshive.com, toppaws.com, makobot.com, [retired project].ai(dead).
- **makologics.com is NOT on host10** — it's on AppRiver/Zix (`*.arsmtp.com`), untouched/safe.
- No-MX / no mail (safe): aineuralbank.com, bulldogsecurityservice.com, elitebicycle.repair, makopulse.com, onpremlm.com, onprimlm.com, pixelcopy.app, saxclasses.com, saxlessonstx.com, woodlandsfamilypsychiatry.com.
- Mail elsewhere (safe): aaaawning.net, axyscorp.com, bishopbend.com, bndtrentals.com, mako.studio, makoanswer.com, makochat.app, prosurve.com, utilities-plus.com.
- Coverage = all 17 CF zones + 10 known external domains. **Decommission is safe once makobot.com's receive test passes; [retired project].ai is the only thing knowingly left on the box (dead).**

**GOTCHA 1 — Cloudflare Email Routing ENABLE is dashboard-only, not API-token-able.** `POST /zones/{id}/email/routing/enable` + settings (`GET /email/routing`) + required-records (`/email/routing/dns`) all return `10000 Authentication error` for ANY token, even one with **Email Routing Rules + Email Routing Addresses + Zone:Read + DNS:Edit** (added every scope, still refused). CF gates "turn on + write/lock MX" behind the logged-in dashboard session. So enable ALWAYS needs Russell: dashboard → Email Routing → (banner) **"Use the old UI"** → **Get started** → **"Add records and enable"**. Pre-delete the host10 apex MX first (DNS token) so the "Non-Cloudflare MX records exist" banner doesn't block it.

**GOTCHA 2 — Resend suppression after propagation-lag bounce.** Right after enabling, CF routing takes a few minutes to actually accept mail even though MX already resolves to cloudflare. A test sent in that window BOUNCES, and Resend then marks that recipient **`suppressed`** account-wide (won't retry it). So: wait for public MX to show cloudflare AND give it a couple minutes before testing, OR verify with a Gmail send (the clean, suppression-free proof Russell used repeatedly). Resend test mail was sent from `notifications@toppaws.com` (verified domain on the toppaws Resend account; `onboarding@resend.dev` only sends to the account owner).

**Tokens (values in MakoBot transcripts, not re-displayable by CF):** `email` token `cfut_mENlvWo6…` (now scoped Email Routing Addresses + Email Routing Rules + Zone:Read + DNS:Edit, all zones) does rules/catch-all/MX-delete; `cfut_6ZkIJE…` ("mako-fleet-automation", Zone.DNS) lists zones + edits DNS. Recovered from `MakoBot/Memory/transcripts/studio_b4b794ec-*.md`.

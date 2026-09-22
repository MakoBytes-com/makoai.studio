---
name: Russell hosts his own email — never use Cloudflare Email Routing
description: All email for Russell's domains is hosted on his own mail server (cPanel-based). Do not suggest Cloudflare Email Routing, Google Workspace, Zoho, Proton, or any third-party forwarding. MX records must point at his server.
type: feedback
originSessionId: adda8264-8044-427e-bec4-8926444a5891
---
**Rule.** Russell runs his own mail server (cPanel-based — see aipromptshive.com's setup on `host10` for the existing pattern). Every domain under Mako Logics / Makologics MSP uses his server for mail, not a third-party routing service.

**What to suggest:** MX records pointing at Russell's mail hostname (he'll tell you the exact hostname per domain — typically `mail.<domain>` resolving to his server's IP). SPF + DKIM + DMARC records for deliverability.

**What NOT to suggest:**
- Cloudflare Email Routing
- Google Workspace / Gmail-hosted mail for the domain
- Zoho Mail, Fastmail, Proton, etc.
- Any "forward to my Gmail" flow

**Why:** He already runs the infrastructure, wants every business domain on one consolidated mail setup, and prefers not to pay per-seat costs for third-party mail. Also, consolidating on his own server means no vendor lock-in.

**When setting up a new domain:**
1. Ask Russell for the MX records (hostname + priority — usually he just says "same pattern as <existing domain>")
2. Add MX records at Cloudflare DNS (typically Proxied = off)
3. Add SPF record (`v=spf1 +a +mx +ip4:<server-ip> ~all` or similar — he'll confirm)
4. Add DKIM records (from cPanel's email config for that domain)
5. Add DMARC record (`v=DMARC1; p=quarantine; rua=mailto:...;`)
6. The mailbox itself (`admin@<domain>`, etc.) is created by Russell in cPanel — not something I can automate via Cloudflare API.

**If Resend or another sender-auth service is also used on the domain:** their DNS records (DKIM for sending) coexist with Russell's MX records. They serve different functions — MX = where mail arrives, DKIM = who's allowed to send as the domain. Both can exist simultaneously.

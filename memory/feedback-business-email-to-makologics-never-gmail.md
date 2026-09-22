---
name: feedback-business-email-to-makologics-never-gmail
description: "All Mako business/app email (form leads, notifications, alerts) MUST go to admin@makologics.com — NEVER russell.sailors@gmail.com. The Gmail is personal; admin@makologics.com is the monitored business inbox."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: bc5a5033-aacf-4efc-82ae-200a0cc64bb1
---

Russell, 2026-07-08: "Nothing should ever go to my gmail it should go to
admin@makologics.com — Thats a real account I have access to."

**Why:** russell.sailors@gmail.com is his PERSONAL address. admin@makologics.com
is the real, monitored **business** inbox he actually works out of. Routing
business email (contact-form leads, app notifications, monitoring alerts) to
his personal Gmail is wrong — he won't treat it as his business channel, and
it muddies personal/business separation. I made this mistake fixing the
makoai.studio form (set CONTACT_TO to his Gmail); he corrected it firmly.

**How to apply (all projects):**
- Any `CONTACT_TO`, `*_NOTIFY_TO`, `ALERTS_EMAIL_TO`, `EMAIL_TO`, admin-
  notification, or monitoring-alert recipient defaults to **admin@makologics.com**
  unless Russell names a different business inbox (e.g. a client's own inbox for
  their site).
- **NEVER** set an app/config recipient to russell.sailors@gmail.com. My own
  ad-hoc *test* sends to Gmail are fine (they're throwaway), but nothing in a
  deployed config.
- **Fleet gmail sweep DONE 2026-07-08.** Repointed every *email-delivery*
  recipient off russell.sailors@gmail → admin@makologics.com:
  makopulse `ALERT_TO` (env + alerts.ts fallback), makoanswer
  `MONITOR_NOTIFY_TO` (env + monitor/route.ts fallback), **pixelcopy**
  `ALERT_TO` (was HARDCODED in app/api/report/route.ts — env scan alone
  missed it; a CODE grep caught it → always grep code too, not just env).
- **Deliberately LEFT (auth allowlists, NOT delivery — changing = LOCKOUT):**
  makobytes `ADMIN_ALLOWED_EMAILS`, makopulse `SUPERADMIN_EMAILS` +
  `MAKOPULSE_EMAIL` (auth.ts login identity), makoai-portal `ADMIN_EMAILS`.
  These recognize Russell's gmail as *who may log in* (Google OAuth identity),
  they don't send mail to it. makologics.com is AppRiver (not a Google login),
  so swapping them would lock him out of 3 admin panels. If he ever wants to
  stop logging in with gmail, set up an admin@makologics.com login method
  FIRST, then swap — never blind-swap an allowlist.
- Russell also said (2026-07-08) **don't change vars that route to
  support@makologics.com** — leave those as-is.
- Not touched (not delivery): makopulse mock-data.ts demo strings + an
  incident-actions.ts doc comment mention the gmail — cosmetic only.

**Deliverability note:** admin@makologics.com is on AppRiver/Zix. AppRiver has
quarantined Mako-domain mail before (makologics contact form, 07-06, fixed
328f515 by changing the FROM to a non-mailbox sender). Mail sent FROM another
Mako domain (e.g. admin@makoai.studio, DKIM-verified via Resend) TO
admin@makologics.com should pass, but if a form's mail goes missing, check the
**AppRiver quarantine** and whitelist the sender. Related:
[[incident-contact-form-dead-79-days]], [[fleet-email-routing-cloudflare]].

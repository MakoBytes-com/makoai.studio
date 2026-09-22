---
name: domain-portfolio-and-mako-studio-loss
description: "mako.studio is LOST — lapsed, re-registered 2025-08-02, now at Sav.com on Afternic sale nameservers. Don't chase it, don't scan it. Full audit of the domains Russell DOES own (expiry, lock, registrar) + the queued protection work."
metadata: 
  node_type: memory
  type: project
  originSessionId: 5803045f-c6c3-4e0c-b192-abcb8dcb1763
  modified: 2026-07-30T14:52:12.506Z
---

# mako.studio is NOT Russell's — treat as third-party property

He owned it, it expired without him noticing, and a drop-catcher took it.
**Verified 2026-07-30 from the `.studio` registry RDAP:**

- Registrar **Sav.com, LLC** (IANA 3902), abuse `abuse-contact@sav.com`
- Registered **2025-08-02**, expires **2026-08-02**, status `active`
- Nameservers **ns1/ns2.afternic.com** — GoDaddy's aftermarket. It is *listed
  for sale*; the `/lander` redirect is the sale page.

**Never scan it, monitor it, or link to it.** It is someone else's asset now.
Already cleaned up on 2026-07-30: removed from MakoPulse (had been checking a
stranger's parking page every 3 min from two continents, with a stale
"domain expires in 30 days" incident open 28 days), and removed from
makologics' quarterly vulnerability-scan task (`050df42`) — that task was
instructing an authenticated scan of a domain Mako doesn't own, which is
unauthorised scanning of a third party, not a stale-docs problem.

## Russell's verdict + the standing analysis (don't re-litigate)

He's angry about it and it's justified, but the recommendation was **let it go**:
UDRP needs (1) trademark rights, (2) no legitimate interest, (3) bad faith at
registration. He's strong on 2 and 3 — a parking page is textbook no-legitimate-
interest, and offering to sell above cost is the *first enumerated example* of
bad faith (UDRP ¶4(b)(i)). **Element 1 is the gate and he fails it**: no
registered mark, and Wayback shows only ~8 captures of mako.studio from
2017–2019 (previous owners, not his period). Filing a mark now does NOT help —
bad faith is judged when they registered. ~$1,500 to file, poor odds.
Brand already moved to makoai.studio everywhere.

**Trademark misconception corrected:** you don't trademark domains, you
trademark a NAME — one filing covers the name across every TLD. If he ever
files, it should be **MAKOLOGICS** (distinctive, his actual business), not
"Mako Studio" ("mako" is a shark, "studio" descriptive — weak and crowded).

## LIKELY ROOT CAUSE of the loss (high confidence, worth acting on)

Registrar expiry notices go to the domain contact email. `admin@makoai.studio`
was a **host10 cPanel mailbox he had lost the password to** until mail moved to
Cloudflare on 2026-06-29 ([[incident-contact-form-dead-79-days]]). Every
warning — 60/30/7-day and final — almost certainly landed somewhere he could
not open. Not carelessness; a broken notification path. **Verify the contact
address on every remaining domain.**

## Audit of domains he DOES own (public RDAP, 2026-07-30)

| Domain | Expires | Lock | Registrar |
|---|---|---|---|
| toppaws.com | 2026-10-01 (62d) | — | **eNom** |
| makologics.com | 2027-02-09 | LOCKED | **eNom** |
| makobot.com | 2027-02-11 | LOCKED | **eNom** |
| makoai.studio | 2027-04-19 | LOCKED | Cloudflare |
| makochat.app | 2027-04-26 | LOCKED | Cloudflare |
| pixelcopy.app | 2027-05-13 | LOCKED | Cloudflare |
| localaibox.com | 2027-05-26 | LOCKED | Cloudflare |
| makoanswer.com | 2027-06-08 | — | Cloudflare |
| voltage.bike | 2027-07-05 | LOCKED | Cloudflare |

Unread (RDAP rate-limited after 3 retries — NOT confirmed clean):
makobytes.com, aipromptshive.com, makopulse.com.

**Everything readable is transfer-LOCKED** — hijack-by-transfer is covered.
Nothing is near-term; closest is toppaws at 62 days.

## QUEUED — Russell said "yes but lets do this later" (2026-07-30, had a meeting)

1. **Move the three eNom domains to Cloudflare** — makologics.com first (his
   business's own domain, on the registrar he controls least, same corporate
   family as the one holding mako.studio). Transfers need his approval at both
   ends, so prep + walk him through step by step.
2. **Then set 5–10 year registrations.** This is the actual fix — a domain
   registered to 2035 cannot be lost to an unread email. Cheaper than one UDRP.
3. **Verify contact email = admin@makologics.com on every domain.**
4. **Fix the 6 client domains with NULL `domain_expires_at` in MakoPulse**
   (bulldog, bishopbend, bndt, utilities-plus, axys, woodlands) — they were
   checked and returned null. Same blind spot that cost him mako.studio,
   pointed at sites he's responsible for as MSP. Raise the warning window from
   30 to 90 days — 30 is not enough time to fight for a domain.
5. Optional/later: MAKOLOGICS trademark. Lower priority than 1–3.

**Auto-renew status is NOT public** and could not be verified — the Cloudflare
tokens in TopPaws/makopulse/voltage `.env.local` all lack Registrar scope
(403/404). Needs `Registrar: Read` added to a CF token, and eNom account access.

Related: [[pattern-cron-heartbeat-makopulse]], [[github-actions-spend-2026-07]].

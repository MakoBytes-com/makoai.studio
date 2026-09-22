---
name: pricing-waas-model
description: makoai.studio pricing is WaaS-ONLY ($0-down/$349-mo) since 2026-09-19 — pay-once project tiers and hosted mailboxes DELETED; $200/mo social/GBP add-on; maintenance kept for post-term clients.
metadata: 
  node_type: memory
  type: project
  originSessionId: 23a30a3a-a218-436a-803a-1c5dc41ec083
  modified: 2026-09-19T23:13:32.536Z
---

makoai.studio's [/pricing](https://makoai.studio/pricing) leads with a **flagship $0-down / Website-as-a-Service option**, not the buy-outright tiers. Russell decided 2026-06-04 to push clients to this model (saw a YouTube influencer doing free-site + $349/mo + 1-yr).

**Locked decisions (Russell's calls):**
- **Single tier, $349/mo flat**, 12-month term then month-to-month (not the tiered $249/349/449 I proposed).
- **Exit = buy-out to own:** cancel after 12mo no penalty; leave early or own the code outright via a one-time build buy-out. This anti-lock-in clause is the brand edge (Russell's positioning is "no ghost pricing / no lock-in scam").
- **Presentation:** flagship section leads the page (I placed it first, ahead of buy-outright, which is reframed as "Or buy it outright"). Not a toggle.
- FAQ has 5 $0-down entries (how it works, vs buy-outright, ownership, cancel, price-lock); all feed the page's FAQ JSON-LD.

**Build cap (added 2026-06-05, commit `ad85d00`):** the free $0-down build is explicitly capped at the **Standard tier** (custom 6–12 page site, local SEO, analytics, light CMS). Premium AI features / Custom portals = a quoted adder on top of the $349. Surfaced as a "What your free build covers" block in the WaaS card, the first "everything's included" bullet, and a new FAQ ("What size site does the $0-down plan include?") that also feeds the FAQ JSON-LD. Rationale: $349×12 = $4,188 only pencils against the $4,000 Standard build, so capping there protects margin.

**Billing is INTERNAL — no Stripe (Russell, 2026-07-24):** when I proposed
Stripe invoicing off the portal's plan pins, Russell said "No stripe we
have internal billing." Do NOT propose Stripe/payment-processor
integrations for client billing again; invoicing runs through his internal
process. Portal features may still *display* plan/billing status, but
collection is his.

**OPEN — Russell's to decide:** (1) the buy-out **dollar figure/formula is not published** — FAQ says "we tell you up front"; (2) the Premium/Custom **adder amount is not published** either ("a small quoted adder"). If he wants either concrete, add to the relevant FAQ answers.

Why WaaS fits him specifically: AI-native = near-zero marginal build cost, so fronting a free build is cheap for him (unlike a traditional agency), and it pairs with the Makologics MSP recurring-revenue model. See [[build_progress]].

**2026-09-19 — WaaS is now the ONLY build model (Russell's call).** Prospects were gravitating to $0-down/$349-mo and he said plainly he doesn't want the pay-once customers: "I really don't want to deal with people that want that model. I really like the month-to-month zero cost." Shipped (commits `2c6c9e6`, `e42c34b`):
- **Project pricing DELETED** from /pricing (Starter $2,500 / Standard $4,000 / Premium $6,000 / Custom), plus the buy-outright FAQ and every cross-reference (layout.tsx meta description, Houston serving page). Do not re-propose pay-once tiers. My anchor-pricing argument for keeping them was heard and overruled.
- **Email hosting / mailboxes DELETED** too ("Also remove mailboxes") — the cPanel mailbox tiers section is gone; only Cloudflare email *routing* is still mentioned as part of hosting. Don't re-add mailbox products.
- **Maintenance tiers ($149/$249/$349) KEPT deliberately** — Russell mid-turn: "We still need the Monthly maintenance. For people who reach the 12 month term and just need maintenance." Reframed on-page as post-term / already-owned-site tiers.
- **NEW: $200/mo Social & Google Business presence management** (his ask): GBP posts/photos/hours/Q&A, review responses, Facebook, YouTube, NAP consistency, monthly recap. Positioned as add-on to $349 plan or any maintenance tier, or standalone. Has its own FAQ entry (feeds JSON-LD).
- Free-build size cap survives but is now phrased "up to a dozen pages" — the tier names it referenced no longer exist on the page.

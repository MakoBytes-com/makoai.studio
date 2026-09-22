---
name: product-scrollhouse-theme
description: Scrollhouse listed as the 2nd for-sale theme on /work (after machine-template); came from the unpaid Alarmion build; "contact for pricing" per Russell.
metadata:
  type: project
---

**Scrollhouse** is listed on the portfolio as an available product: `/work/scrollhouse`
(commit `ea57df3`, 2026-07-30). Demo: https://scrollhouse-theme.vercel.app · repo private
`MakoBytes-com/scrollhouse-theme` · Vercel `makoai-studio/scrollhouse-theme`.

A scroll-cinematic site theme — the scroll scrubs a pre-rendered continuous camera flight,
filmed natively twice (desktop 16:9 + mobile 9:16). Originally built as a requested concept
for **Alarmion**, who loved it and refused to pay; converted into a sellable asset instead of
written off. No Alarmion branding survives in any video frame (verified frame-by-frame), which
is what made resale possible.

**Why:** it is the second for-sale product on /work, so it follows the **`machine-template`
pattern exactly** — `status: "Available"`, `tier: "product"`, plus a full `caseStudy` object so
it renders as a card on `/work`, generates `/work/<slug>`, and enters the sitemap
automatically via `caseStudySlugs()`. Adding a portfolio item with no `caseStudy` would make it
invisible on `/work` (the page filters on `p.caseStudy`).

**How to apply:**
- **Pricing: "Contact for pricing" — no number on the card.** Russell's explicit call
  2026-07-30. Matches how the rest of the site sells and avoids anchoring low. Don't add a
  price without asking.
- Card screenshots are **2880×1800** (1440×900 viewport at `deviceScaleFactor: 2`), PNG, in
  `public/portfolio/`. ~2–5 MB is normal for this set.
- Target buyers: home security & monitoring, smart home, solar, HVAC/home services,
  remodelling, residential real estate. **Those verticals skew heavily to WordPress +
  WooCommerce**, so the theme doubles as a lead-in to migration work — pair it with the
  DavisInvestigation story (outgrew WooCommerce, now paying for a custom AWS SQL build + Next.js
  front end, nearly lost a multimillion-dollar contract to plugin security).
- If it is ever sold **exclusively** to one company in the security vertical, that forecloses
  reselling into that vertical. Nothing is committed while it's "contact for pricing".

Related: [[pricing-waas-model]] (the WaaS flagship is separate — this is licensed per project,
like machine-template).

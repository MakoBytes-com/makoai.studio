# Session summary — 2026-09-19

Pricing went WaaS-only on Russell's call, a new $200/mo social add-on shipped,
HandPenned left the portfolio, and the pricing hero gained a photoreal animated
anglerfish. Seven commits, all live and verified on makoai.studio. Clean tree,
nothing open on this site.

## 1. HandPenned removed from the portfolio
`c74f5db`. Product was retired and deleted 2026-09-16. Entry, llms.txt line,
screenshot-script block and thumbnail all gone; verified live — /work, llms.txt
and sitemap carry no trace, /work/handpenned 404s. (The page checker flagged 5
"broken" images during verification; all were lazy-load artefacts, each URL
returned 200 when fetched directly.)

## 2. Pricing is WaaS-ONLY — Russell's decision, do not re-propose
`2c6c9e6`. Prospects gravitate to $0-down/$349-mo; Russell: *"I really don't
want to deal with people that want that model. I really like the month-to-month
zero cost."* My anchor-pricing argument for keeping pay-once tiers was heard
and overruled.
- Project tiers ($2,500/$4,000/$6,000/Custom) DELETED, plus the buy-outright
  FAQ, the layout.tsx meta description and the Houston serving page references.
- Mailboxes/email-hosting tiers DELETED too (his mid-turn ask); only Cloudflare
  email *routing* remains mentioned as part of hosting.
- Maintenance tiers ($149/$249/$349) KEPT deliberately — "for people who reach
  the 12 month term and just need maintenance" — reframed on-page as post-term.
- Free-build size cap now reads "up to a dozen pages" (tier names it referenced
  no longer exist). Fixed a stale "Resend email" mention → Cloudflare.
Full decision detail: [[pricing-waas-model]].

## 3. Shipped — $200/mo Social & Google Business presence management
`e42c34b`. His ask. Own section after maintenance: GBP posts/photos/hours/Q&A,
review responses drafted in his clients' voice, Facebook, YouTube, NAP
consistency, plain-English monthly recap. Positioned as add-on to the $349 plan
or any maintenance tier, or standalone; has its own FAQ entry feeding the
FAQ JSON-LD. Meta description updated.

## 4. Shipped — the pricing anglerfish (four commits, two real lessons)
`73f5e16` → `da4b145` → `20d5323` → `6bb0f30`. He circled the empty water right
of the hero and asked for an animated anglerfish that "blends in perfectly".
- First pass was a hand-drawn SVG; he rejected it: *"This needs to look like a
  real angler fish."* Replaced with CrazyRouter photoreal footage on pure
  black, boomerang-looped with ffmpeg, erased into the page with
  `mix-blend-mode: screen`. He approved the still before the video spend.
- **Lesson 1 (blend isolation):** a transform/animation on the WRAPPER creates
  a stacking context that isolates the child's blend — visible black box. The
  drift must animate the video element itself.
- **Lesson 2 (immutable cache):** he spotted a faint square — video compression
  noise floor passing through `screen`. Fixed by crushing blacks to zero at
  encode + feathering frame edges with a CSS mask, verified by MEASURING pixel
  values across all four edges (flat 11–15, no step). But the fix didn't reach
  the live site: `/videos/*` is cached immutable for a year, so the re-encode
  had to ship under a NEW filename (`anglerfish-v2`). Any re-encoded media on
  the fleet must be renamed, never replaced in place.
- Dark theme only; reduced-motion users get the still poster; pointer-inert.
Recipe + gotchas banked: [[pattern-blend-video-creature]].

## End state
Pricing page live and verified with fresh bytes: one $349 flagship, $200 social
add-on, $149/$249/$349 post-term maintenance, anglerfish seamless (462,683-byte
v2 encode serving, page references v2). Security headers 6/6, no console
errors, clean tree, all pushed.

## Still open (not this site)
**The Davis cross-tenant SSN read** remains the oldest open CRITICAL in memory
(flagged 08-25 through 09-08, untouched) — `GET /api/applicants/:id` returns any
company's applicant including `ssn`. It belongs to the Davis project tab, not
here, but it is still the most valuable next thing anywhere in the fleet.

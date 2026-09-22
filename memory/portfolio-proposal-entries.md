---
name: portfolio-proposal-entries
description: "How spec/proposal work goes in the makoai.studio portfolio — the \"Proposal\" status, and the four guards a speculative rebuild of someone else's brand needs before it can be linked"
metadata: 
  node_type: memory
  type: project
  originSessionId: c5f4cd97-b95b-40e4-9ee3-a29c2168f481
  modified: 2026-09-08T22:24:03.319Z
---

**2026-09-08.** Russell: *"Add stress-ad-preview.vercel.app be sure to say it's
a proposal site."* Shipped as `7bd6a2e` — the portfolio's first entry for work
nobody commissioned.

## The thing that was actually wrong

Every frozen client showcase in this portfolio ships three guards: `Disallow: /`
in robots.txt, `<meta name="robots" content="noindex, nofollow, nocache">`, and
a visible "Portfolio Demo" pill. **stress-ad-preview.vercel.app had none of
them** — a fully crawlable rebuild of another company's brand, carrying their
photographs, technical illustrations and PDFs. Linking it from makoai.studio is
precisely what would have sent Google at it and put it in competition with
Stress Aerospace and Defense's own site.

Fixed before the link went up (deployed to the `stress-ad-preview` Vercel
project, which has **no git repo** — `npx vercel --prod --yes` from the folder):
1. `<meta name="robots" content="noindex, nofollow, nocache">` in index.html
2. `public/robots.txt` with `Disallow: /` — **and** `robots.txt` added to the
   SPA rewrite's negative lookahead in vercel.json, or the rewrite serves
   index.html for it (that is why the old robots.txt "existed" and returned HTML)
3. `X-Robots-Tag: noindex, nofollow, noarchive` header, so non-HTML responses
   are covered too
4. A fixed on-page notice: "A design proposal by Mako Studio. Not affiliated
   with, commissioned by, or endorsed by Stress Aerospace and Defense, LLC."

## The status has to beat the tier

`statusLabel()` in `app/work/[slug]/page.tsx` mapped tier → label, and
`tier: "client-build"` returns **"Approved · frozen showcase"**. A proposal
needs the client-build tier to land in the homepage grid, so without a fix the
page would have claimed a company that never hired us had approved the work.
Status now wins over tier: `if (item.status === "Proposal") return "Proposal ·
not a client engagement"`.

Adding `"Proposal"` to the status union is type-safe by construction —
`statusColor` in `PortfolioCard.tsx` is a `Record<PortfolioItem["status"],
string>`, so a missing badge colour fails the typecheck. It got a lumen/cyan
badge deliberately distinct from amber "In Progress" and tide "Client".

## What else had to move

- **Section copy lies by omission.** The homepage said "Products we own, and
  client sites we built. Every project here was designed and **shipped**", and
  /work said "each one designed, coded, and shipped end-to-end. **Approved**
  client builds…". Both amended. Adding one honest card is not enough if the
  paragraph above it contradicts the card.
- **llms.txt got its own `## Proposal work (NOT client engagements)` section**
  naming stress-ad.com as separate, unaffiliated and unchanged. AI crawlers are
  the readers most likely to collapse "on their portfolio" into "their client".
- **Thumbnail guard.** The entry went into `screenshot-video-hero.mjs` (animated
  blueprint hero, no `<video>`, `settle: 6000`) with
  `expectText: "A design proposal by Mako Studio"` — if the on-page notice ever
  stops rendering, the capture fails instead of quietly producing a thumbnail
  that presents their brand as a delivered client build. The pill is bottom-right
  and the tile is 16:10 uncropped, so the notice is legible in the card itself.

## Traps hit

- `npm i -D puppeteer-core` to capture the thumbnail **must be reverted before
  committing** — the script documents it as a one-off local tool, and leaving it
  in package.json adds 25 packages to every CI install and the Dependabot surface.
- Five Dependabot PRs auto-merged during the session. After `git rebase`, the
  package.json had changed, so the earlier build/lint/typecheck were stale —
  re-ran `npm ci` + all three before pushing, per the fast-forward rule.
- `*-live.png` was not in .gitignore's screenshot family; added.

See [[portfolio-thumbnail-capture]] and [[fleet-sites-missing-from-portfolio]].

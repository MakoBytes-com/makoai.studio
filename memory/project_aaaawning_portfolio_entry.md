---
name: AAA Awning — portfolio entry to add
description: aaaawning.net launched 2026-04-22; needs to be added as a Tier 1 client case study on makoai.studio following the buffaloseal/woodlands showcase-fork pattern
type: project
---

## Context

**aaaawning.net went live 2026-04-22** — full WordPress → Next.js 16 migration for AAA Awning Co., Inc., a 40+ year Texas awning fabricator (Houston HQ). Russell built it as a Makologics MSP client project. It needs to join the makoai.studio portfolio as a **Tier 1 current client build** (same tier as buffaloseal and woodlands case studies).

## What the site is

A custom lead-generation site for a Houston-based awning manufacturer serving residential + commercial across Houston, Dallas, Fort Worth, Austin, San Antonio, and the Texas Gulf Coast. Replaces a dated WordPress site. Built for maximum SEO and AI-search visibility — particularly local SEO across 36 Texas cities.

## Headline facts for the case study

- **Industry:** Custom awning fabrication and installation
- **Client:** AAA Awning Co., Inc. (client owner Gene Liebrecht — don't reference by name in the case study without approval)
- **Founded:** 1984
- **Replaced:** Previous WordPress site on host10.makologics.com
- **Launched:** 2026-04-22
- **Pages:** 64 prerendered (1 homepage, 14 product pages, 36 city landing pages, + hubs/legal/gallery/FAQ/etc.)
- **Domains:** aaaawning.net + www.aaaawning.net

## Stack

- **Framework:** Next.js 16.2.4, App Router, React 19, TypeScript
- **Styling:** Tailwind v4 (`@theme` tokens, light theme, burgundy `#B22951` primary)
- **Fonts:** Inter (body), Playfair Display (serif display), Pinyon Script (logo text)
- **Forms:** Resend (transactional email) + Cloudflare Turnstile (captcha)
- **Analytics:** Umami Cloud + Vercel Analytics + Vercel Speed Insights
- **Live data:** Google Places API (live GBP rating on homepage)
- **Hosting:** Vercel (mako-studi team)
- **Repo:** https://github.com/MakoBytes-com/aaaawning.net (private)

## Feature highlights worth emphasizing

**Maximum SEO and AI-search optimization (core value prop):**
- 36 dedicated city landing pages with ~1,200–1,800 words of **genuinely unique** per-city content — real neighborhoods named, local climate considerations, commercial corridor mentions, city-specific FAQs
- City-specific LocalBusiness + Breadcrumb JSON-LD schema on every location page
- FAQPage schema on the /faq hub, every product page, every location page — key signal for LLM citation
- llms.txt at site root for AI-crawler discovery
- Sitemap.xml + robots.txt via next-sitemap
- Organization + HomeAndConstructionBusiness schema sitewide
- Dynamic OG image for social share cards (/opengraph-image)
- Twitter card metadata
- 301 redirects from every legacy WordPress URL to new equivalents (preserves inbound link equity from 40 years of printed materials)

**Content depth:**
- Hero video background (AI-generated via Runway, intentionally subtle)
- 14 product detail pages with intro, features, use cases, materials, real installation gallery, product-specific FAQs
- Sunbrella color charts (5 color families) + Kynar metal finishes (4 families) with hex swatches + stripe patterns rendered as CSS gradients
- Visual Shapes & Styles reference with SVG side-profile diagrams of 8 awning shapes
- Hurricane-season page written for Texas Gulf Coast exposure with pre-storm checklist

**Lead-gen form:**
- Full estimate form with city picker (all 36 cities), project-type selector, honeypot, Cloudflare Turnstile captcha
- Per-IP rate limit (3 submissions / 15 min) on the Server Action
- Emails route via Resend from `website@aaaawning.net` to `admin@aaaawning.net` (domain verified in Resend)

**Security hardening:**
- HSTS (preload-eligible 2yr) + X-Content-Type-Options + X-Frame-Options + Referrer-Policy + Permissions-Policy
- Honeypot field + rate limit on form submissions
- Content-length guards on input fields
- X-Powered-By stripped

**Password-protected admin dashboard:**
- `/admin` protected by HTTP Basic Auth in Next.js middleware, constant-time credential comparison, per-IP failure lockout (5 attempts / 15 min)
- Embedded Umami share-URL iframe scoped to aaaawning.net only (doesn't expose Russell's other sites in same Umami account)
- Quick-link cards to Vercel Analytics, Speed Insights, Google Business Profile, Resend, Cloudflare Turnstile, GitHub, Vercel project

**Image work:**
- 70 installation photos scraped from the legacy WP site by product category, manually deduped to preserve the "never mix category images" hard rule
- SEO-friendly filenames (post-rename), keyword-rich alt text on every `<Image>` component
- Branded SVG favicon + dynamic Apple touch icon via ImageResponse

## What to add on makoai.studio

Following the established pattern in [lib/portfolio.ts](../../../../lib/portfolio.ts) (from buffaloseal + woodlands):

### 1. Portfolio entry

Tier 1 client card. Suggested fields:
- `slug`: `aaaawning`
- `name`: `AAA Awning Co., Inc.`
- `caseStudy`: `true`
- `tier`: 1
- `year`: 2026
- `url`: `https://aaaawning-showcase.vercel.app` (the frozen showcase fork — to be created; see below)
- Tech tags: `Next.js 16`, `TypeScript`, `Tailwind v4`, `Resend`, `Umami`, `Vercel`
- Description: something like *"40-year Texas awning fabricator's full WordPress migration to Next.js. 64 pages, 36 city landing pages, maximum SEO and AI-search optimization, live Google reviews, password-protected analytics dashboard. Houston, Dallas, Fort Worth, Austin, San Antonio, Texas Gulf Coast."*

### 2. Case-study page at `/work/aaaawning`

Following the 4 existing case studies (toppaws, makobot, buffaloseal, woodlands) as the template. Content worth covering:
- Hero section: AAA Awning Co. tagline, "40 years, rebuilt for the next 40"
- The problem: dated WordPress site, poor SEO, no analytics, slow mobile
- What we built: 64 pages, 36 city-specific landing pages with unique 1,200+ word local content each
- Metrics once available (page-1 local rankings, first-week traffic, form conversion rate)
- Technical highlights: per-city content strategy, LocalBusiness + FAQPage schema, llms.txt, dynamic OG, admin dashboard with Umami embed
- Stack line
- "View live" → `https://aaaawning-showcase.vercel.app` (NOT the live aaaawning.net — frozen-showcase rule)

### 3. Create the frozen showcase fork

Per the `feedback_portfolio_uses_frozen_showcase_forks.md` rule:

1. Clone the live `MakoBytes-com/aaaawning.net` repo
2. Create new GitHub repo `MakoBytes-com/aaaawning-showcase` (public, for portfolio)
3. Push the clone to it
4. Create new Vercel project `aaaawning-showcase`, link to the new repo, deploy to `aaaawning-showcase.vercel.app`
5. **Strip live credentials from the showcase Vercel env:**
   - Remove `RESEND_API_KEY` (or set to a dummy — form will show "call us" fallback, which is the right behavior for a showcase)
   - Remove `ADMIN_PASSWORD` (or set to something public-shareable; or guard the whole /admin route behind a "this is a showcase" banner)
   - Remove `NEXT_PUBLIC_TURNSTILE_SITE_KEY` + secret (form renders without captcha, form handler already gracefully degrades)
   - Remove `GOOGLE_PLACES_API_KEY` + `GOOGLE_PLACE_ID` (trust row falls back to "Highly Rated" generic text)
   - Remove Umami env vars (no tracking on the showcase)
6. **Add a "Portfolio Demo" pill** to the TopBar on the showcase — visible indicator this is a frozen snapshot of the shipped work
7. **Add a `robots` noindex** meta at root layout for the showcase
8. Once deployed and verified, the showcase URL is frozen — never updated even if aaaawning.net changes later

### 4. Alternative if Russell wants a lighter-touch showcase

If creating a full fork feels like overkill, an acceptable minimum:
- Fork the repo
- Deploy as-is with all env vars stripped (form won't send, admin won't unlock, tracking doesn't fire — all fine for a showcase)
- Add noindex + portfolio-demo pill
- Done

## Things NOT to mention publicly in the case study

- Client owner's name (Gene Liebrecht) — don't attribute without asking
- Exact admin credentials obviously
- Google Place ID / specific API keys
- The SpamHero / mail.* DNS CNAME issue at cutover — internal lesson, not client-facing
- Specific lead volumes until we have client permission to share

## Source memory on this project (cross-read if helpful)

Full context in the aaaawning.net Claude project memory:
`C:\Users\Russell.Sailors\.claude\projects\c--Users-Russell-Sailors-OneDrive-Desktop-Mako-AI-Projects-Web-Projects-aaaawning-net\`

Key files there:
- `memory/session_summary.md` — complete launch summary
- `memory/project_aaa_awning.md` — kickoff decisions
- `memory/project_brand_and_forms.md` — brand palette + form routing
- `memory/project_workflow.md` — no-localhost deploy workflow
- `memory/project_dns_email.md` — DNS + email hosting at host10
- `memory/feedback_image_categories.md` — hard rule on image categorization
- `memory/feedback_dns_cutover_cnames.md` — DNS cutover lesson

## Suggested sequence for the makoai.studio session

1. Read this file + the `feedback_portfolio_uses_frozen_showcase_forks.md` rule
2. Create the `MakoBytes-com/aaaawning-showcase` repo + Vercel project
3. Strip credentials, add noindex, add Portfolio Demo pill on the showcase fork
4. Add the `aaaawning` entry to `lib/portfolio.ts`
5. Write `/work/aaaawning/page.tsx` following the existing 4 case studies as template
6. Update sitemap if needed (already picks up case studies dynamically)
7. Commit + push + verify live on makoai.studio

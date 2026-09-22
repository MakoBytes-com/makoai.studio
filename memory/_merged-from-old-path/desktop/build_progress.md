---
name: Build Progress
description: Running log of makoai.studio project work and task status
type: project
updated: 2026-05-03
originSessionId: 2026-05-03-bndt-frozen-showcase-and-case-studies
---
## Done (2026-05-03 evening — BNDT frozen showcase, Lagunares re-fork, 4 new case studies)

### Standing rule codified — frozen-showcase exception list
- [x] Saved Russell's explicit 4-name exception list to `feedback_portfolio_uses_frozen_showcase_forks.md`: ONLY MakoBytes / MakoBot / AI Prompts Hive / TopPaws link to live sites. Everything else (clients, pitches, pending deals, prospects, archived) uses a frozen showcase fork. Pending-client status no longer gets a pass — that's actually the highest-risk window.

### BNDT (Burton NDT Rentals) — pending client → frozen showcase
- [x] Surfaced critical issue: existing `bndt-showcase.vercel.app` was running `index, follow` + `Allow: /` for every AI crawler — directly competing with the eventual real `bndtrentals.com` brand domain in search
- [x] Created `MakoBytes-com/bndtrentals.com` (live source repo) — discovered local folder had 28 files of production code uncommitted under "Initial commit from Create Next App", committed the full production tree as `2218648`
- [x] Created `MakoBytes-com/bndt-showcase` repo, cloned to `Web Projects/bndt-showcase`
- [x] Hardened: added `src/components/DemoPill.tsx`, flipped layout robots to `noindex,nofollow,nocache`, mounted `<DemoPill realUrl="https://www.bndtrentals.com" />`, replaced `src/app/robots.ts` with disallow-all, replaced `src/app/sitemap.ts` with empty array
- [x] Connected existing `mako-studi/bndt-showcase` Vercel project to GH repo, deployed
- [x] Verified: HTTP 200, `<meta name="robots" content="noindex, nofollow, nocache"/>`, "Portfolio Demo" pill, `robots.txt` returns `Disallow: /`

### Lagunares (Laguna Resources) — re-fork from `lagunares.com` source repo
- [x] Same problem as BNDT: original `lagunares-com.vercel.app` deploy had `index, follow` + indexable
- [x] Created `MakoBytes-com/lagunares-showcase` repo by cloning the existing `MakoBytes-com/lagunares.com` repo, retargeting remote, pushing
- [x] Hardened: added `components/DemoPill.tsx`, flipped layout robots, mounted `<DemoPill realUrl="https://lagunares.com" />`, overwrote `next-sitemap.config.js` with disallow-all + empty sitemap
- [x] Created new `mako-studi/lagunares-showcase` Vercel project (auto-connected to GH repo on `vercel link`)
- [x] Deployed via `vercel deploy --prod --yes`
- [x] Verified: HTTP 200, noindex meta, Portfolio Demo pill, `Disallow: /` in robots.txt

### makoai.studio — 4 new case studies + BNDT entry — commit `5f76d10`
- [x] Added Burton NDT Rentals entry to `lib/portfolio.ts` between AAA Awning and Lagunares (Tier 1 client-build, status In Progress, full caseStudy block)
- [x] Repointed Lagunares URL: `lagunares-com.vercel.app` → `lagunares-showcase.vercel.app`
- [x] Wrote `caseStudy` block on Bulldog Security entry (~6 shipped items, custom location pages + lead pipeline narrative)
- [x] Wrote `caseStudy` block on AAA Awning entry (WP migration, 36 city landing pages, live Google Reviews, private Umami)
- [x] Wrote `caseStudy` block on Burton NDT Rentals entry (application-first catalog, persistent quote cart, calibration + repair, industrial SEO)
- [x] Wrote `caseStudy` block on Lagunares entry (warm editorial theme, dark cinematic hero, RRC-operator credibility, JSON-LD)
- [x] Updated `app/llms.txt/route.ts` — added Burton NDT Rentals (https://www.bndtrentals.com) + Laguna Resources (https://lagunares.com) to Featured Work
- [x] Updated `scripts/screenshots.mjs` — added bndt slug, repointed lagunares to showcase URL, changed `--only-new` filter to bndt + lagunares
- [x] Captured fresh BNDT + Lagunares screenshots via Microlink at 1440×900 (force=true)
- [x] Build verified clean: `npx tsc --noEmit` exit 0, `npx next build` exit 0, all 8 case-study paths prerender (`bulldog-security`, `aaaawning`, `bndt-rentals`, `lagunares` plus existing 4)
- [x] Committed `5f76d10`, pushed, triggered explicit `vercel deploy --prod --yes` to ensure the deploy fired
- [x] Verified live: `/work/bndt-rentals`, `/work/bulldog-security`, `/work/aaaawning`, `/work/lagunares` all return HTTP 200; homepage portfolio shows Burton NDT Rentals + Laguna Resources cards; llms.txt reflects new entries

### Memory updated
- [x] `feedback_portfolio_uses_frozen_showcase_forks.md` — replaced loose "etc." exception with explicit 4-name list (MakoBytes, MakoBot, AI Prompts Hive, TopPaws), added 2026-05-03 precedent entry
- [x] `reference_frozen_showcases.md` — added BNDT + Lagunares rows to the active showcases table, added per-showcase env notes (both need none), added "Pending-client / pitch builds also need this" lessons-learned section anchored to BNDT as the test case
- [x] `session_summary.md` — full rewrite for the 2026-05-03 evening session

## Done (2026-05-03 — MakoBytes card refresh + hero whale brightness pass)

### MakoBytes portfolio card screenshot — commit `d9d3dae`
- [x] Re-captured https://makobytes.com via Microlink at 1440×900 (force=true)
- [x] Saved to `public/portfolio/makobytes.png` (replaces older landing thumbnail)
- [x] No code change — `lib/portfolio.ts:239` already references that path
- [x] No trim needed — clean grab to bounding box
- [x] Deployed via auto-deploy on push

### Hero whale video brightness pass — landed at `74bb59b`
- [x] Russell flagged hero video as too dim
- [x] Identified the four stacked darkening layers: video CSS filter, left-to-right scrim, top+bottom fade, blue radial atmosphere
- [x] Pass 1 (`a8b5797`) — moderate lift: filter brightness 0.7 → 0.9, saturate 1.05 → 1.1; scrim `from-95 via-45 to-transparent`; top fade 60 → 50; radial 60 → 40
- [x] Pass 2 (`f873a29`) — Russell said still too dark, so pushed harder: filter brightness → 1.05, scrim `from-85 via-15 to-transparent`, top fade and radial removed entirely. Russell: "go back one."
- [x] Reverted with `74bb59b` back to Pass 1 settings — final landed state
- [x] All builds clean, all deployed via auto-deploy on push
- [x] Lesson preserved in session_summary.md: the dim wasn't the filter, it was the scrim middle stop + radial blue stack. 45/40 sweet spot.

## Done (2026-05-01 — frozen showcases, portfolio cleanup, hero misfire, navbar hairline)

### Frozen showcase forks
- [x] Created `MakoBytes-com/aaaawning-showcase` from live aaaawning.net repo, deployed `https://aaaawning-showcase.vercel.app`
- [x] Created `MakoBytes-com/bulldog-showcase` from `MakoBytes-com/bulldogsecurityservice.com` dev repo, deployed `https://bulldog-showcase.vercel.app`
- [x] Both showcases hardened: `noindex/nofollow/nocache` meta in root layout, `DemoPill` component (Portfolio Demo + Live site link), `next-sitemap.config.js` rewritten to disallow-all + empty sitemap
- [x] Bulldog Vercel env: dummy `SESSION_SECRET` + `DATABASE_URI` set so the build passes (Drizzle + sessions in dev repo crash the build without them)
- [x] Verified both: 200 status, noindex meta present, Demo pill rendering, robots.txt disallows all
- [x] Saved standard pattern + dummy env requirements in `reference_frozen_showcases.md` so the next DB-backed showcase fork doesn't repeat the iteration cycle

### Portfolio update — commit `0862804`
- [x] Removed [retired project] entry from `lib/portfolio.ts` (project dead)
- [x] Removed [retired project] line from `app/llms.txt/route.ts`
- [x] Deleted `public/portfolio/[retired project].png`
- [x] Promoted Bulldog from Tier 3 archived → Tier 1 client-build, repointed at `https://bulldog-showcase.vercel.app`
- [x] Repointed AAA Awning from live URL → `https://aaaawning-showcase.vercel.app` (was violating frozen-fork rule)
- [x] Added AAA Awning entry to llms.txt (was missing)
- [x] Reframed Bulldog in llms.txt from "MSP-only" to current client build
- [x] Refreshed `public/portfolio/bulldog.png` from new showcase
- [x] Refreshed `public/portfolio/makobot.png` (new Bulldog-light theme on makobot.com shipped same day)
- [x] Updated `scripts/screenshots.mjs`: source from showcase URLs for buffaloseal/woodlands/aaaawning/bulldog (was sourcing from live, would drift on next re-run)
- [x] Build clean, deployed live, verified `aaaawning-showcase` and `bulldog-showcase` rendered on the homepage and `[retired project]` is gone

### Hero image swap — REVERTED
- [x] Russell handed me `C:\Users\Russell.Sailors\OneDrive\Desktop\MakoBot Temp\Hero\hero.jpg` to use as the new hero
- [x] Swapped onto makoai.studio: replaced looping video with `next/image` static, dropped 4 dead fallback CSS classes (water-bg, caustics, particles, shadow-swim), deleted `hero.mp4`. Commit `35781bb`, deployed.
- [x] Russell flagged: image was meant for makobot.com, not makoai.studio
- [x] Reverted with `b8cc969`, redeployed. makoai.studio back to looping video hero. `/hero.mp4` restored, `/hero.jpg` 404 confirmed.
- [x] Original `MakoBot Temp/Hero/hero.jpg` untouched, still available for makobot.com when Russell wants it

### Navbar white hairline — commit `cb64577`
- [x] Russell reported a slight white line under header links on scroll
- [x] Located: `components/Navbar.tsx` line 28 — `border-b border-white/5` on the scrolled-state navbar
- [x] Confirmed via git blame: present since initial scaffold commit (`adc0545`, Apr 19), never modified since. Russell's "it was not doing this before" was likely just first-noticing.
- [x] Removed the border. backdrop-blur-xl + bg-ink-900/70 already creates clean separation.
- [x] Deployed. Awaiting Russell hard-refresh confirmation.

## Done (2026-04-23 — GSC redirect fix + cross-domain sweep)

- [x] Diagnosed GSC "Page with redirect" alert on makoai.studio — root cause was www.makoai.studio DNS→Vercel edge with no project claim → broken 308 + SSL fail
- [x] Attached www.makoai.studio to Vercel project with redirect=apex, redirectStatusCode=308 (via API)
- [x] Verified SSL cert auto-issued (CN=www.makoai.studio, valid through 2026-07-22)
- [x] Verified www→apex 308 live on all paths (/, /pricing, /work/*, /serving/*)
- [x] Watch-your-back sweep — fixed makobytes.com, toppaws.com, aaaawning.net, aipromptshive.com, makobot.com (different bug variants on each)
- [x] Saved playbook + 307 default gotcha to `project_www_redirect_fix_gsc.md`

## Done (2026-04-22 — pack expansion + founder-name scrub)

- [x] Added AAA Awning Co. + Laguna Resources entries at top of `lib/portfolio.ts`
- [x] Added `--only-new` flag to `scripts/screenshots.mjs` for cheap targeted refreshes
- [x] Replaced "Russell" with "Mako Logics" across `lib/portfolio.ts`, `app/llms.txt/route.ts`
- [x] Added `/\b(russell|sailors)\b/i` review-text filter in `lib/places.ts` to drop Google Reviews naming the founder
- [x] Three commits shipped: `1d0a039`, `9a4700c`, `5b3ab59`

## Done (initial scaffold + April work)

- [x] Scaffolded Next.js 15 + Tailwind + Vercel
- [x] Hero with crossfade-looped Seedance/Runway hero video (holographic wireframe)
- [x] Portfolio grid with cards + real screenshots
- [x] Services, Process (AI-native), About, Contact, Footer
- [x] Contact form via Resend (rate-limited, honeypot, Cloudflare Turnstile)
- [x] Embedded Google Map + ProfessionalService JSON-LD schema
- [x] Frozen showcases for buffaloseal + woodlands (Vercel-hosted with Demo pill)
- [x] Domain registered at Cloudflare Registrar (makoai.studio)
- [x] Full DNS setup: site, mail (MX + A + SPF + DKIM + DMARC), Resend — all via CF API
- [x] admin@makoai.studio mailbox on host10 cPanel
- [x] Resend domain verified, API key in Vercel env, send tested
- [x] Vercel custom domain + HTTPS cert
- [x] Dynamic OG image, favicon, llms.txt, privacy, terms
- [x] Vercel Analytics, security headers, rate limit, metadataBase
- [x] Case-study system: extended `PortfolioItem` type with `caseStudy`/`tier`/`archived`/`archivedNote`
- [x] `/work/[slug]` dynamic route with premium case-study template
- [x] 4 flagship case studies: TopPaws, MakoBot, Buffalo Seal, Woodlands
- [x] 3 service-area pages with real local content (`/serving/conroe-tx`, `/serving/houston-tx`, `/serving/the-woodlands-tx`)
- [x] Pricing page, Testimonials section pulling Mako Logics Google reviews via Places API
- [x] About — replaced unverifiable "100+ Sites Shipped" with honest stats
- [x] Explicit canonical tags on home, /privacy, /terms
- [x] Visible Service Areas card inside Services section

## Next Up (when ready)

- [ ] **Apply the hero image to makobot.com** — Russell's original intent for `MakoBot Temp/Hero/hero.jpg`. Open question: replace the Walkthrough component or sit alongside it? Ask Russell first.
- [ ] **Verify navbar hairline gone** after Russell hard-refreshes makoai.studio
- [ ] AAA Awning case study at `/work/aaaawning` (Tier 1 card now links to showcase but has no `caseStudy` block yet)
- [ ] Bulldog case study at `/work/bulldog-security` (optional — Russell didn't ask)
- [ ] GitHub auto-deploy in Vercel (30 sec: Settings → Git → Connect `MakoBytes-com/makoai.studio`)
- [ ] Pro-Surve takedown watch — company sold, may need to remove card
- [ ] (optional) Re-screenshot buffaloseal.png + woodlands.png from showcase URLs (decide on Demo-pill-in-thumbnail tradeoff first)

## Known gotchas

- MakoBot auto-injects CLAUDE.md, AGENTS.md, .cursorrules — show as modified in git status, should NOT be committed. Leave them alone.
- Showcase forks are frozen — never push further changes. Client-requested updates go to the client's own repo, NOT the showcase fork.
- Tier 3 (earlier-work) cards have no outbound link — by design.
- `vercel env add` via stdin needs `printf "%s" "value" | vercel env add NAME production` — `echo` adds a trailing newline that breaks downstream APIs (saved in `reference_vercel_env_echo_gotcha.md`).
- Vercel's default redirect status code is 307 Temporary, not 308 Permanent — always pass `redirectStatusCode: 308` explicitly when adding a domain redirect (saved in `project_www_redirect_fix_gsc.md`).
- Bulldog showcase build requires dummy `SESSION_SECRET` + `DATABASE_URI` — its dev repo uses Drizzle + sessions and `/admin/logout` + `/api/cron/enrich-leads` crash at build without them (saved in `reference_frozen_showcases.md`).

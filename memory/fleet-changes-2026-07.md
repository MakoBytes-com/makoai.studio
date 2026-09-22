---
name: fleet-changes-2026-07
description: "Ledger for the July 2026 fleet restructuring Russell is running from the makoai.studio session — tracks each change, status, and verification"
metadata: 
  node_type: memory
  type: project
  originSessionId: 40166b06-ec11-4a88-8f09-366a1ba61c2e
  modified: 2026-07-26T06:11:50.915Z
---

# Fleet Changes — July 2026 (ledger)

Russell is making a series of fleet changes from this session ("I want to do it here to keep track of it all"). One entry per change.

## Change 1 — Eliminate legacy PromptPixel — ✅ DONE (verified) 2026-07-25

**Scope (Russell's calls):** legacy PromptPixel only — PixelCopy (the renamed C# successor, MS Store + $8/mo Stripe) untouched. Cold archive before deletion. Zero real customers confirmed pre-deletion (accounts table = 1 row, Russell's own gmail, polar-import).

**Cold archive** → `Mako AI Projects\_Archives\PromptPixel-final-2026-07-25\`:
git bundles of both repos (verified), PixelPrompt-folder.tar.gz (351 MB, 1,172 entries, verified readable), PromptsPixel dev screenshots, PP-ui-screenshots (late find: Desktop\Image\PP = PromptPixel v3 UI shots), Supabase exports (accounts, admin_users, admin_rate_limit, admin_recovery_codes), PixelPrompt Claude memory copy.

**Executed:**
- makobytes.com commit `1b61d53` (62 files) deployed + verified: /promptpixel tree, $25 buy route, iron-session admin, Stripe webhook, license/verify, PP admin APIs, proxy.ts middleware, lib/{stripe,email,auth,turnstile,admin/index}, demo components all deleted. Homepage/nav/CTA/footer repointed to PixelCopy; layout metadata, sitemap (LAST_MODIFIED bumped 2026-07-25), robots, llms.txt, llms-full.txt, privacy, terms rewritten for two-product lineup. 301 /promptpixel/:path* → pixelcopy.app. CSP: challenges.cloudflare.com removed (Turnstile was PP-admin-only). master/users now returns zeros (no user system); master/health probes page_views (schema_rev 2). track route PP filter removed; TRACKED_EVENTS drops pageview_promptpixel (events-feed keeps render map for historical rows).
- Live verification: /promptpixel + /buy → 308 pixelcopy.app; homepage 200, 0 PP mentions; 6/6 security headers; sitemap/robots/llms clean; master endpoints 401-gated; dead routes 404; error_events EMPTY post-deploy.
- Stripe (shared acct): product "PromptPixel Pro" (prod_UpW3rgrqyMYjUf) + $25 price (price_1Tpr1T…) archived; webhook we_1Tpr1t… (makobytes.com) deleted. PixelCopy/MakoPulse/makochat/makoanswer/toppaws webhooks untouched.
- Supabase (ixowuzznvnbhbckduthv): dropped accounts, admin_users, admin_rate_limit, admin_recovery_codes. Remaining: analytics_events, error_events, page_views.
- Vercel makobytes-com env: removed STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, STRIPE_PRICE_PROMPTPIXEL, SESSION_SECRET, TURNSTILE ×2, POLAR_API_TOKEN, POLAR_WEBHOOK_SECRET, RESEND_API_KEY (all verified zero code references). Local .env.local cleaned to match.
- GitHub: MakoBytes-com/PromptPixel + PromptPixel-Source deleted (verified 404, 0 pixel repos left in org).
- Local disk: App Dev\PixelPrompt (772 MB), Desktop\Image\PromptsPixel, Desktop\Image\PP, PixelPrompt Claude project memory — all deleted post-archive.
- Global CLAUDE.md: PromptPixel refs → PixelCopy (screen-capture tool line, MakoBytes product list, desktop-triage examples).

**Addendum (same day, Russell's follow-up):**
- promptpixel.com: Russell does NOT own the domain (part of why the brand died) — item closed, no action possible or needed. Fleet-wide grep for links to it: sweep run across Web Projects + App Dev source (result recorded below when complete; no hits as of mid-scan).
- makobytes.com pricing-honesty pass SHIPPED (commit `cb2fbc7`, deployed + verified): "one-time purchase / perpetual license / no subscriptions" claims removed from hero, philosophy card ("Fair pricing. No dark patterns."), JSON-LD, OG metadata, and the OG image; hero "under 40mb" replaced with "lightweight" (PixelCopy deploy measured ~70 MB — claim was false). Live-verified: zero stale claims rendered, 6/6 headers, error_events empty.

**Still open (cosmetic):**
- MakoBot skill descriptions still mention PromptPixel (e.g. desktop-app-never-shuts-itself-down) — patch whenever.

## Change 2 — Eliminate AI Prompts Hive (aipromptshive.com) — ✅ DONE (verified) 2026-07-25

**Russell: "Same thing get rid of it" + "remove it from the makoai.studio list also".** Zero real users confirmed pre-deletion: 2 auth accounts = the site's own system account (owned all 5,470 catalog prompts) + Russell.

**Cold archive** → `Mako AI Projects\_Archives\AIPromptsHive-final-2026-07-25\`: verified repo bundle, folder tar (minus node_modules), FULL DB export (9 JSON files — 5,470 prompts, page_views, faqs, profiles, config, auth users; parse-verified with utf-8), Claude project memory copy.

**Executed (in safety order):**
1. Portal fleet registry: clients row 22aec505 → status `cancelled` + `monitor_enabled=false` + explanatory note (row KEPT for FK history; enum has no 'retired'). Seed script entry removed (portal commit `62be5a4`) so reseeds can't resurrect it. Monitoring silenced BEFORE the site died — no duty-officer alarms.
2. makoai.studio commit `9bc4f98` (deployed + verified): portfolio entry + screenshot + llms.txt line + screenshots.mjs entry removed. Same-pass fixes: MakoBytes card/llms product line → "PixelCopy and MakoBot"; llms TopPaws line caught up to the June pet-directory rewrite. /work renders 0 hive mentions live.
3. makobytes.com commit `62fdfd4` (deployed): AI Prompt Hive keyword set removed from metadata.
4. Vercel project `ai-prompts-hive` deleted via REST API (CLI project rm is interactive-only; token at AppData/Roaming/com.vercel.cli/Data/auth.json). Site now 404s — intended.
5. GitHub `MakoBytes-com/ai-prompts-hive` deleted (verified 404).
6. Supabase project `xjvqpiijhsjvliqjnzyg` ("aipromptshive") DELETED via Management API (after exports verified).
7. Local: repo folder (404 MB) + .claude project memory deleted post-archive (OneDrive rm needed a background retry — slow release).
8. Global CLAUDE.md: product line → "PixelCopy, MakoBot"; aipromptshive removed from portfolio-projects list.

**Verified end-state:** makoai.studio /work 200 + clean, llms.txt clean, aipromptshive.com 404, fleet_client_errors EMPTY since deploys (note: table keys on `last_seen`, not created_at).

**Domain note:** aipromptshive.com is Russell's (Cloudflare DNS + Email Routing → admin@makologics.com — routing left intact, harmless). Registrar renewal = his call when it comes up; DNS records still point at Vercel and now 404, which is the intended dead state.

## Change 3 — Retire saxclasses.com (RESTORABLE — stop Supabase spend) — ✅ DONE (verified) 2026-07-25

**Russell: "same for saxclass but I want to be able to restore this later if need be. I just dont want to have to pay for superbase."** So: full retirement, restore-grade archive, repo KEPT (private + archived).

**The landmine that memory flagged, confirmed and navigated:** saxclasses production env pointed at makologics-prod (qbnygqjuygajgpkkctpt — the renamed "saxclasses" project). The actual sax content (19 courses + 47 lessons) lived THERE; the dedicated "saxclasses" Supabase project (yxlelogckvdyjhcuabuj) was a 100% EMPTY billable scaffold. Ownership verified before dropping anything: makologics.com code never queries courses/lessons; saxclasses code does.

**Pre-deletion facts:** Stripe 0 subscriptions ever; Mux 0 assets; site already coming-soon; no Stripe/Mux env ever deployed to Vercel (local-only keys).

**Restore kit** → `_Archives/saxclasses-retired-2026-07-25/` with RESTORE.md walkthrough: verified repo bundle, folder tar, BOTH env snapshots (local + Vercel prod — contain secrets), schema DDL JSON for both DBs, data-courses.json (19) + data-lessons.json (47).

**Executed:** portal clients row → `paused` + monitor off (kept, restore = flip back); seed line removed (portal `c4dfdbb`); GitHub repo private + ARCHIVED (not deleted — the restore vehicle; also moots its CRITICAL Dependabot item); Vercel project `saxclasses.com` deleted (API, 204); Supabase dedicated project DELETED (bill stopped); courses+lessons dropped from makologics-prod post-dump; local folder + .claude memory archived + deleted.

**Verified:** saxclasses.com + www both 404 (intended dark state, DNS left intact); makologics.com 200 healthy after the table drops; 0 remaining sax tables in makologics-prod.

**Domain:** saxclasses.com is Russell's — DNS untouched; renewal his call when it comes due.

**Addendum 2026-07-26 — portal CP row DELETED (was paused).** Russell tried to delete the Sax Classes client row from the CP himself and hit "Something went wrong on the server." Fleet error bridge showed the real cause: the delete form's type-the-name guard is exact-match and his two attempts ("Sax CLasses", "SAX CLASSES") didn't match "Sax Classes" — the validation throw landed on the crash page instead of telling him. Row deleted via Management API (0 users/requests/endpoints; 7 KPI cache rows cascaded; activity logged kind client.delete), the two bridge rows + the stale 07-25 credits row marked resolved (portal board back to 0 open). UX fixed in makoai-portal `73190e1`: mismatch now redirects back to settings with an inline red message, compare is case/whitespace-insensitive. NOTE: restore now = re-add the client row via /admin/onboard (the paused-row path is gone); RESTORE.md kit unaffected.

Read-only sweep of all 16 remaining Supabase projects (tables/rows/users/storage/size): **no empty databases left** — saxclasses was the only scaffold. Lightest: makochat (12 rows — but powers the live MakoChat support widget on makoai.studio + pixelcopy.app), makobytes (34 rows — portal reads it), utilities-plus (client). Flagged voltage-bike / makoanswer / pixelmonsters as the only retirement candidates by activity; **Russell: "Nope the rest of the sites are all production."** No further retirements — the July restructuring is COMPLETE at 3 changes. Don't re-propose retiring these.

## Change 4 — makobytes.com FULL REBUILD: "PRECISION INSTRUMENTS" — ✅ SHIPPED 2026-07-25

**Russell: complete creative freedom, keep the colors, "make something absolutely amazing", Higgsfield authorized. Mid-build steer: "keep in mind MakoBytes is a software company" → software stays the subject (hand-built app-UI mockups front the product plates; machined artwork is the craft accent), and the metaphor is said out loud in the hero.**

**Concept:** the site is a machinist's spec sheet — blueprint-grid drawing paper, navy ink (#0061aa) on white with brushed-steel plates. Hero: "Software, built like precision instruments." with SVG dimension lines that draw themselves around FIG. 00 (the house mark). Mono spec ticker. Catalog = machined plates with steel serials (PX-01 PixelCopy / MB-02 MakoBot), spec tables, corner screws, hover light-sweeps; each fronted by a CSS app-window mockup (PixelCopy capture overlay / MakoBot memory panel) over Higgsfield artwork. The Standard = 4 engraved certification stamps (Signed/On-device/Fast/Fair). Provenance: "Machined in Texas." Footer = engineering-drawing TITLE BLOCK (Drawn by/Unit/Sheet/Rev/Scale/Status ● Released). New OG card in the same language.

**Stack:** Space Grotesk (display) + Inter + JetBrains Mono, all next/font self-hosted; gsap + lenis (Reveal/RevealLines/Magnetic/SmoothScroll ported from makoai.studio's Fable build); 3 Higgsfield marketing_studio_image artworks in public/images (instrument-badge, plate-pixelcopy, plate-makobot). Admin dashboard, policy pages, master APIs, analytics wiring, headers UNTOUCHED (legacy CSS classes preserved).

**Shipped:** commit `f48125c` (14 files); Dependabot auto-merged next-auth beta.32 right after (7978c80) — production deploy contains both. **Recovery:** tag `pre-rebuild-2026-07-25` + branch `backup/pre-rebuild-2026-07-25` (pushed) + Vercel instant rollback.

**Verified:** local Puppeteer probe (desktop + 390px mobile): ZERO console errors, zero overflow, H1 server-rendered, OG 200; mobile nav overlap caught in screenshots and fixed pre-ship. Live: homepage 200 w/ new content, 6/6 security headers, artwork + OG 200, /promptpixel 308 intact, error_events EMPTY post-deploy.

**Gotchas banked:** Vercel CLI `project rm` has no --yes (use REST API; token at AppData/Roaming/com.vercel.cli/Data/auth.json); puppeteer-core install lives at ~/AppData/Local/Temp/csp-audit (CHROME at Program Files); Node ESM resolves imports from the script's dir — copy probes next to node_modules.

## Change 5 — makobytes.com REBUILD ROUND 2: "MAKOOS" — the site IS a desktop — ✅ SHIPPED 2026-07-25

**Russell on the spec sheet: "nice but... looks and feels like many Claude sites. I want something truly unique, software development focused. Go crazy... insanely unique."** Web check confirmed OS-style sites exist only as personal portfolios (OSFOLIO etc.) — no commercial software company ships its storefront as a desktop. For a Windows desktop studio the lane was empty.

**Shipped (commits `54c1a8e` MakoOS + `787da8d` security; live + verified):** makobytes.com now BOOTS — MakoOS firmware screen ("telemetry ... NOT FOUND (by design)"), Higgsfield machined-navy wallpaper, desktop icons, real window manager (drag, z-order, min/max, Escape-close), taskbar with running apps + live CT clock + signed-shield tray, start menu, one-per-session signature toast. Catalog ships installed: PixelCopy.exe + MakoBot.exe windows w/ UI demos + spec tables; catalog.sig = certificate dialog telling the code-signing story; README.md = studio story; wallpapers/ = 2 free Higgsfield artworks (circuit-mako + house-mark) with download buttons; contact.eml composer; mako.exe releases a steel SVG shark across the screen (reduced-motion → opens wallpapers instead). Spec sheet KEPT at /sheet ("prefer paper?"), sitemap'd.

**Engineering:** window contents are server-rendered ReactNodes passed into the client WM → all copy in HTML for SEO/no-JS; `data-os-open` click delegation lets server content drive the WM; phones get full-screen window sheets + app bar (start menu = mobile nav); boot skipped on reduced-motion/repeat visits (sessionStorage); -webkit-backdrop-filter added for Safari. Verified via Puppeteer interaction probe (boot, cert-open via delegation, start menu, shark, mobile): ZERO console errors, 0 overflow, H1 SSR. Live: 6/6 headers, /promptpixel 308 intact, /sheet 200, error_events EMPTY.

**Security ride-along:** pushing woke Dependabot → 12 alerts (7 high). Fixed same session: group PR #20 merged; conflicted #19 superseded by direct next 16.2.6→16.2.12 + overrides (postcss ^8.5.18 as direct dep + override — EOVERRIDE gotcha: override must match direct dep; sharp ^0.35.3; brace-expansion ≤5.0.7→^5.0.8). npm audit 0; Dependabot alerts `[]`; deploy Ready; homepage 200.

**Recovery:** tags `pre-rebuild-2026-07-25` (original) + `spec-sheet-2026-07-25` (round 1) + backup branch + Vercel rollback. Round-1 design remains user-visible at /sheet.

**Addendum (`d7f3597`, live + verified):** Russell: shark "lame looking and swimming backwards." Fixed — mako.exe now swims the actual circuit-mako wallpaper artwork, cut out via Higgsfield remove_background (pass the generation job_id as media_id; verify alpha with PIL — raw IDAT bytes are row-filtered, don't eyeball them), PIL-cropped to content (867×335, 420KB). Art faces LEFT → swim reversed to right-to-left. Sprite at /images/mako-sprite.png, 200 live, errors clean.

**Addendum 2 (`ca99ec3` + `04f751b`, live + verified):** Russell asks, same evening:
- *MakoBot window image → makobot.com hero:* banner now uses hero-poster.jpg (the robot; the hero itself is a video, poster is the still). Same swap applied to /sheet MB-02.
- *contact.eml → REAL form:* new /api/contact — validation, honeypot, 5/10min IP rate limit (shared Upstash KV), **Cloudflare Turnstile enforced server-side (fails closed)**, delivery via Resend from verified makobytes.com → admin@makologics.com direct (no forward hops). E2E verified: local + LIVE sends both `delivered` in Resend log; enforcement 400 without token on prod. RESEND_API_KEY restored (was removed in PP teardown). GOTCHA BANKED: `.env.production.local` shadows `.env.local` under `next start` — it held `RESEND_API_KEY=""` and silently blanked the key; check BOTH files. Turnstile: reused account widget 0x4AAAAAABd0GHb… repointed makobytes.io→makobytes.com via CF API (makopulse's CF token is Turnstile-READ-only; **TopPaws' CLOUDFLARE_API_TOKEN has write** — PUT response includes the secret). CSP re-allows challenges.cloudflare.com. Privacy policy gained a Contact Form section (Turnstile/Resend disclosure).
- */sheet /privacy /terms "need fixing":* privacy + terms rebuilt in the precision language with "← Back to MakoOS" nav; /sheet brand+nav+footer now route back to the OS.
- *Ride-along fixes (Resend log exposed them):* MakoPulse still monitored the retired aipromptshive.com (alerted "down") AND sent the alert to russell.sailors@gmail — monitor row PAUSED (id 5bc1a815…), makopulse `ALERT_TO` env repointed to admin@makologics.com (Vercel prod + local, redeploy pushed on `master` branch — note: makopulse uses master, not main). SUPERADMIN_EMAILS (login allowlist) deliberately untouched.

**Addendum 5 (makoai.studio `0e1f629`, live + verified) — PORTFOLIO CATCHES UP:** MakoBytes card on makoai.studio updated for MakoOS — new tagline ("The software studio site that boots like a desktop"), description, tags, llms.txt line, and a fresh 2880×1800 thumbnail captured from the LIVE desktop post-boot via puppeteer (don't use Microlink for MakoOS — it would screenshot the boot screen). Note: /work renders names+screenshots only; card copy shows on the homepage portfolio section.

**Addendum 4 (`92ea667`, live + verified) — SPEC SHEET DELETED:** Russell saw the sheet in the viewer and called it "the old site... pissing away my credits." The round-1 design is now fully GONE: /sheet + /sheet/doc deleted, viewer window + all links + sitemap entry removed, /sheet/:path* 301 → home, frame-ancestors back to 'none'. RULE LEARNED: when Russell replaces a design, the old one gets DELETED, not preserved as an easter egg / paper edition — don't keep superseded designs reachable. Live: /sheet 308→home, all routes OS, sitemap clean, 0 errors. (Old design still recoverable via git tag spec-sheet-2026-07-25 if ever wanted.)

**Addendum 3 (`a21f15d`, live + verified) — ONE OS EVERYWHERE:** Russell: /sheet /privacy /terms "still open in the old format, they need to open in the OS." Now every route boots MakoOS: shared OSApp shell; /privacy + /terms open as privacy.txt/terms.txt document windows (content SSR'd per route → SEO/legal links intact, single h1 per route); /sheet opens the paper document MAXIMIZED in a viewer window via iframe of /sheet/doc (noindexed, canonical /sheet, escape links target=_top). Start menu/README/welcome links open windows instead of navigating; legal docs live in the start menu. **CSP GOTCHA BANKED: frame-ancestors 'none' blocks a site from iframing ITSELF — changed to 'self' (external framing still blocked; X-Frame-Options SAMEORIGIN unchanged); the Puppeteer probe caught it pre-ship.** Live-verified: all 4 routes serve the OS shell, /sheet/doc serves the raw paper doc, 6/6 headers, error_events empty.

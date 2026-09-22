# Build Progress — makoai.studio

## 2026-09-19 — PRICING GOES WAAS-ONLY; THE ANGLERFISH

Seven commits (`c74f5db` → `6bb0f30`), all live and verified. Full narrative in
[[session_summary]]; decisions in [[pricing-waas-model]] and
[[pattern-blend-video-creature]].

- **HandPenned removed from the portfolio** (`c74f5db`) — product retired
  2026-09-16; entry, llms.txt line, thumbnail, screenshot-script block gone.
  Portfolio is now 22 entries.
- **Pricing rebuilt WaaS-only** (`2c6c9e6`) — Russell dropped the pay-once
  project tiers AND the mailbox/email-hosting tiers on his own call; the $349
  flagship is the only build path. Maintenance ($149/$249/$349) kept, reframed
  as post-term. NEVER re-propose pay-once tiers or mailbox products.
- **$200/mo Social & Google Business management added** (`e42c34b`) — add-on or
  standalone, own FAQ, feeds the FAQ JSON-LD.
- **Photoreal animated anglerfish in the pricing hero** (`73f5e16`…`6bb0f30`) —
  CrazyRouter still → video → ffmpeg boomerang → `mix-blend-mode: screen`.
  Two banked gotchas: wrapper transforms isolate the blend (visible box), and
  `/videos/*` immutable caching means re-encodes MUST ship under a new
  filename (`anglerfish-v2` is current). Dark theme only; poster fallback for
  reduced motion.

## 2026-09-08 — THE PORTFOLIO AUDIT, AND ITS FIRST PROPOSAL ENTRY

Recover, then Russell: "we need to look at sites that are missing from the
portfolio." Audited live rather than from memory — **10 sites are live and
absent** and Davis is filed as Archived with no URL when it is a current client
we shipped tickets to in August. Full inventory:
[[fleet-sites-missing-from-portfolio]].

**I got one wrong and it is worth remembering.** I reported bdslighting.com as a
parked registrar lander. It is not, and never was — it is fully live on Vercel,
8/8 pages 200. The IPs I read as GoDaddy parking (216.150.1.1 / 216.150.16.1)
are Vercel's apex pair, and this machine's resolver was holding a stale record.
Vercel's own config endpoint said `misconfigured: false` the whole time. An
unexpected lander is a DNS reading, not a conclusion — confirm with `curl -sI`
and the provider's config endpoint before calling a live client site parked.

**Then Russell: "bdslighting.com and bds water need to be added."** Both shipped
(`b4b25bf`), placed directly after Bulldog Security so the family reads together
— security, water, lighting. Both point at their live domains rather than frozen
showcase forks, because we operate them, and that exposed the same class of bug
as the proposal entry: `statusLabel()` gave every client-build "Approved ·
frozen showcase", so both went live describing a fork that does not exist.
Fixed in `fd61c11` by deriving the claim from the entry's own url.

Then he picked one: add stress-ad-preview.vercel.app, marked as a proposal.
Shipped `7bd6a2e` + `5b65180`, live and verified.

**The part that mattered was not the card.** Every frozen client showcase ships
noindex + robots disallow + a visible pill; the Stress A&D preview had none of
the three, so linking it from makoai.studio would have pushed Google at a
crawlable rebuild of another company's brand, photographs and PDFs. Four guards
went on the proposal site first (meta robots, a real robots.txt — which needs
adding to the SPA rewrite's negative lookahead or it serves index.html, an
X-Robots-Tag header, and an on-page notice), then the card went up.

`statusLabel()` maps tier to label, and `client-build` returns "Approved ·
frozen showcase" — a proposal needs that tier to appear in the grid, so without
the fix the page would have claimed approval from a company that never hired us.
Status now beats tier. Both section intros were amended too: the homepage said
everything shown was "shipped", /work said "Approved client builds". One honest
card is not enough if the paragraph above it contradicts it.
[[portfolio-proposal-entries]].

**Then: "update Utilities Plus to the new site" and "nautidawgs is a client."**
Both shipped (`c5af1d4`). Utilities Plus had drifted badly against its frozen
showcase — the entry described a Pexels hero video that no longer exists,
replaced typography, a service list with solar and waste instead of water
filtration and moving, and said the domain rollout was "underway". Worse, it
never mentioned the control panel the client now runs the whole site from, which
is the actual value of the project. Rewritten against the live site and the repo
and pointed at utilities-plus.com; thumbnail recaptured onto the guarded path so
the superseded showcase design cannot ship again.
[[portfolio-drift-live-vs-showcase]] is the durable lesson: **fork vs live is a
decision that expires.** nautiDAWGS went In Progress → Client with its cutover
recorded as done.

**Then three more, plus Davis** (`dec55ff`, `922c3d7`, `2868139`). BDS
Government Services, MakoChat and HandPenned written from each live site and
repo. Davis moved out of the archive tier to a client build, In Progress,
pointing at the rebuild — a finished site held back on purpose because the
domain also serves a client portal, which is the interesting part and is now
what the case study is about.

**Two things worth carrying forward.** HandPenned's README described a Phase 1
shell with the engine still to come; the live product has eight tools, open
signup and published pricing — read the live site, not the README. And the
tier-vs-status bug surfaced a THIRD time, putting "Approved · live" on a
pre-cutover rebuild and "Approved" on two In Progress builds; the label now
reads where an entry points and whether it is finished as two separate facts.
All three instances passed typecheck, lint and build and only showed on the
deployed page.

**Pro-Surve removed** (`da6cefc`) on Russell's word — portfolio only, they are
**still an MSP client**, so do not read it as the relationship ending or restore
the entry. It was the last `earlier-work` item (that section now hides itself)
and the Houston page's only featured work, swapped for AAA Awning rather than
leaving a heading over nothing.

**Portfolio: 23 entries.** Five sites still absent: govsprint.app, makomail.app,
localaibox.com, pixelmonsters.com, voltage.bike.

**Full site audit** (`5f15075`, `e9dfbc4`) — "check the whole site for issues
then fix and save." Two high-severity vulns cleared, and the sharp one is the
lesson: **our own override pinned `^0.35.3` while the advisory covered
everything below 0.35.4**, so a pin we wrote was holding a production
vulnerability in place, with Dependabot reporting zero the whole time. Dropped
`unsafe-eval` (canary-verified nothing in the bundle needs it); kept
`unsafe-inline` as a stated decision, because a nonce forces all 32 prerendered
routes dynamic on a site with no login. Mounted Speed Insights (was not
installed — no field CWV at all) and deleted a dead 2.7 MB hero.mp4.

**And one I broke:** removed `lh3.googleusercontent.com` from `img-src` on the
strength of a source grep, which blanked the five Google reviewer avatars —
those URLs come from the Places API at runtime and appear nowhere in source.
Caught by driving the live page, fixed in minutes. Build, typecheck and lint
were all green while the site was visibly broken.
[[site-audit-2026-09-08]].

Housekeeping in the same pass: reverted the one-off `puppeteer-core` install
before committing (it would have joined every CI install), re-ran ci/typecheck/
lint/build after five Dependabot PRs auto-merged mid-session, added `*-live.png`
to .gitignore, and compacted MEMORY.md from 21 KB to 12 KB with all 63 memories
still indexed.

## 2026-08-19 (evening) — COVERAGE, A CONTROL PANEL, AND TWO LIGHT THEMES

Six repos in one session. Detail in [[session_summary]]; the durable lessons
are in the linked memories below.

**Coverage.** The portal watched 27 of 36 Vercel projects. Registered GovSprint,
NautiDawgs and Bulldog Water; moved two repos into the org first, because the
portal's GitHub token is blind to personal repos — verified, not assumed
([[fleet-vs-portal-coverage]]). Prime Protection retired: cold-archived, then
deleted from Vercel, GitHub and disk.

**bulldogh2o.com got a control panel** — leads, traffic, errors, FAQs, users,
TOTP, wired to the master CP ([[bulldog-water-control-panel]]). Its three live
bugs are the most reusable thing here: a prefetched `<Link>` to a GET logout
signing users out by itself, concurrent queries deadlocking Supabase's
transaction pooler into a 504, and a module-load DB client turning a missing
env var into a failed CI build ([[nextjs-cp-three-live-bugs]]).

**The traffic meters read zero because of a switch, not a bug.**
`clients.analytics_mode` chooses between pulling from a site and a central
beacon only four sites ever fed; eleven cards showed a flat line while the
sites were busy ([[portal-traffic-tile-analytics-mode]]). Utilities Plus 1,047
views, Pixel Monsters 97, and GovSprint — which genuinely counted nothing — got
a beacon built ([[govsprint-analytics]]).

**Light themes** on makoai.studio ([[light-theme-and-toggle]]) and the portal
([[portal-light-theme]]), both from the GovSprint palette, dark still the
default, contrast measured. The recurring lesson across three placement passes:
shipped and working is not the same as findable — a centred container means the
end of your nav is nowhere near the corner of anyone's screen.

## 2026-08-05 — FLEET RELIABILITY DAY: the alerts were the bug

Started as "why is AI spend so high", ended as a full pass over why the fleet's
own monitoring could not be trusted. Full detail:
[[spend-spike-2026-08-and-bulldog-captcha]] — read it before touching the
officer, the error board, or anything that pages Russell.

**The headline: there was no spend problem.** `cost_report.amount` is in CENTS
and the banner had summed it as dollars since 2026-07-27 — $0.79 read as
$78.69. That manufactured a spike, a deadline against the $100 cap, and nearly
a request that a regulated client absorb a 25-cent bill. Russell killed it with
"There is no way they have uploaded that many documents." He was right; my
"proof" it was dollars compared a measurement against a local ESTIMATE, which
proves nothing.

**Alert volume, measured not guessed: 46/day** (109 GitHub issues, 170
comments, 42 failed runs in 7 days). Root cause was NOT the dashboards —
`fingerprintFor()` hashed the raw log message, so `Campaign ${id} failed` gave
one fingerprint per record. One upstream hiccup opened **11 issues in a
minute**. Fixed centrally (normalise ids/uuids/urls/timestamps before hashing)
on makologics, bulldog, bishopbend, aaaawning, utilities-plus.

**Duty officer, three separate faults:**
1. every failed run was `error_max_turns` at 40 — Bulldog hit it 3× on the same
   real bug and never fixed it. 40 → 80 across 23 repos.
2. `claude-code-action` **has no PR creation** — it pushes a branch and prints a
   link. Every finished fix waited on a human click. PR step added to 24 repos.
3. a card handed back to `open` could never close again (both reconcile passes
   filter `status = "dispatched"`), so merged fixes sat on the board forever.

**Backups: three client databases had silently stopped** (MakoAnswer 81h,
MakoPulse 56h, TopPaws 31h) — all COMPLETED, none failed, Pro org, siblings
fine. The officer had no backup detector at all. Added one, and the portal now
exports EVERY client DB nightly (it only ever exported its own). Ran it
immediately: 70 files / 480k rows / 58 MB, read back and verified private.

**voltage.bike had no git remote, no CI, no secret scanning, no Dependabot** —
a production site backed up nowhere. Now a private repo with the full fleet
guards; enabling alerts surfaced 14 CVEs, all cleared.

**Guards so this class cannot silently return:** noise classifier WITH a
volume ceiling (a filter with no ceiling hides outages), 7-day staleness sweep,
and the portal's **first test runner** (node --test, zero deps) wired into CI —
canary-verified that widening the captcha pattern turns the suite red.

**End state:** fleet 0 open errors · 0 open triage cards · spend $0.79 · all CI
green · Bulldog/Bishopbend/Voltage error classes fixed at source.

**Owed / next:** makoanswer + makopulse have no `lib/log.ts` and were not
audited for the fingerprint class (makoanswer was the #2 issue source). Supabase
support ticket for why Pro daily backups stopped — that one is Russell's.
Re-measure the 46/day baseline in a few days to confirm the drop.

## 2026-08-04 (evening) — Recover + Dependabot queue cleared (a5fcc69, 0106a39)

Recover run first (every memory location). Repo was clean at 5712c7b; two open
Dependabot PRs found and handled per the golden rule:

- **#32 setup-node 4→7** (dependency-audit.yml, monthly actions bump) — checks
  green, squash-merged as `a5fcc69`. Auto-merge couldn't take it because it's a
  major and the workflow is patch+minor by design.
- **#34 ESLint 10.8.0 — PARKED, not merged.** Its own CI run proved the known
  fleet blocker on this repo: ESLint 10 removed the legacy rule-context APIs and
  eslint-config-next's bundled eslint-plugin-react still calls them
  (usedPropTypes.js, exit code 2) — same failure as bishopbend-showcase and
  machine-template. `0106a39` adds a semver-major-only eslint ignore to
  dependabot.yml (scoped per the narrow-ignores convention so security patches
  still flow), with the reason + lift condition (eslint-config-next declares
  ESLint 10 support) in the comment. Dependabot closed #34 itself the moment
  the ignore landed.

End state: 0 open PRs, 0 Dependabot alerts, CI + gitleaks + Dependabot Updates
green on main, tree clean. Site not touched (no deployable change — both
commits are .github/ only, so no Vercel deploy fires).

STILL OWED from earlier today (unchanged): utilities-plus.com cutover
verification once Russell flips DNS tonight — headers baseline, CMS content
rendering, contact-form E2E.

## 2026-08-04 — FLEET DATABASE SECURITY DAY (no makoai.studio code change)

Triggered by a Supabase security-advisor email. Three passes over all 16 Supabase
projects; two genuinely live holes closed. Narrative in session_summary.md, full
technical detail in [[supabase-rls-fleet-exposure-2026-08]].

**Closed #1 — 29 tables across 4 projects had RLS OFF plus full anon
INSERT/UPDATE/DELETE**: pixelmonsters (15), utilities-plus (11), bulldog-cp (2),
makoanswer (1). `users.password_hash`, `users.totp_secret` and
`password_reset_token_hash` were readable *and* rewritable on two of them — admin
account takeover, not just a leak. Enabled RLS + revoked anon/authenticated grants;
the same attack now returns 401 everywhere.

**Closed #2 — TopPaws `import_businesses` / `dedupe_businesses` were anon-callable**
over the public REST RPC endpoint against a 173,821-row directory (arbitrary row
injection or a real merge/delete pass, no credentials). Revoked EXECUTE on 9 mutating
functions; service_role and `/api/track` verified still working.

**Verified clean:** all 16 projects, zero tables an anonymous caller can modify —
proven by impersonating `anon` in a rolled-back transaction, with a canary to prove
the detector fires. Also enabled leaked-password protection on bulldog-cp + mako-cp.

**Two false readings I caught before reporting** (both recorded in the memory file):
PostgREST returns **206 on success** for Range requests, and a zero-match `PATCH`
returns 204 whenever the role holds the GRANT — the second nearly produced an alarming
"12 projects writable" report naming Bishopbend's `customers` and the portal's
`master_signing_keys`. Both wrong; both caught by re-testing.

**OWED — utilities-plus.com cutover, tonight (Russell's move).** The domain currently
resolves to 206.189.184.137 (DigitalOcean/nginx), NOT the Next.js app; `/faq` 404s live
though the route is committed. DB side is ready and unaffected (app connects as the
Postgres owner role). When he flips DNS I owe a live verification: security-headers
baseline, CMS content actually rendering (15 FAQs / 8 providers / 34 content_fields),
and the contact form delivering end to end.

## 2026-07-31 — DEFERRED-REGISTER DAY: fleet credential turnover + two real fixes

Register 20 → 4 open (all mine, all future-dated; nothing waits on Russell).
Full narrative in session_summary.md. This repo's own change was small — the
brace-expansion pin (`4627244`) — but it was the pilot for a 14-repo sweep.

**Every credential the portal and products run on was replaced and verified
against live traffic:** master RS256 signing key (`HaxtTmyg` → `coDbh40r`),
CRON_SECRET, the database key (legacy `service_role` → `sb_secret_`), the browser
key (anon JWT → `sb_publishable_`), VERCEL_TOKEN, GITHUB_TOKEN, and the shared
Stripe restricted key split into three per-product keys. Old Vercel token and old
Stripe key are dead; the old PAT self-expired on regeneration.

**Three had structural blockers, which is why they had sat:**
- The master key's "overlap window" did not exist — 11 client CPs each verify a
  single static `MASTER_PUBLIC_KEY` with no JWKS. Built multi-PEM verification
  into all 11 first.
- The database key could not rotate at all: `lib/vendor-crypto.ts` derived its
  AES key from it. Decoupled while the ciphertext table was still empty.
- Details: [[rotation-blockers-and-vercel-env-gotchas]].

**Two fixes Russell pushed back into being** (both were wrongly written off, once
by me):
- **brace-expansion** — fixed across 14 repos by pinning per parent, not parked.
  npm audit still shows high (advisory range swallows the patched 1.x) — known
  false positive.
- **Bulldog CSP** — `unsafe-inline`/`unsafe-eval` now GONE from script-src.
  The blocker was Vercel reflecting the response CSP into request headers, which
  breaks the usual report-only-first rollout: [[vercel-csp-nonce-shadowing]].

**Found unasked:** Umami analytics was recording nothing on five sites —
[[umami-csp-gateway-fleet-bug]].

**Open fleet signal not touched:** 2 client-side errors on makoanswer.com
(`TypeError: Load failed` 07-30, Turnstile error 07-28). Predate this session.

## 2026-07-30 — MakoPulse added to the portfolio (0fe1b86, LIVE + verified)

Russell asked whether MakoPulse was used in makoai.studio. It wasn't — zero
references anywhere — and it turned out to be the only Mako product **missing
from the portfolio** while machine-template was in it. Shipped as
`tier: "product"` with a full case study, placed after MakoAnswer. Verified
live: /work/makopulse 200 + one h1, homepage grid, /work, thumbnail, llms.txt,
sitemap, 6/6 headers.

Copy grounded in makopulse.com's own live llms.txt + package.json. Thumbnail via
Microlink — correct here; the Puppeteer-only rule is for makobytes/pixelcopy,
which animate before settling.

**Then Russell said he doesn't actually know what MakoPulse does beyond
pinging.** So the claims were verified rather than trusted, since I'd sourced
them from a file we wrote (circular). Result: multi-region probes, real
incidents, heartbeats, status page, Stripe/Twilio/Anthropic all REAL. But
**AI diagnosis had never once run** — it only fires on outages and nothing on
the fleet has ever actually gone down (all 8 incidents in history were "slow").
Proved it with a throwaway monitor on an unreachable host: it correctly
identified DNS failure across both regions, recognised `.invalid` as a reserved
TLD, ruled out a transient cause, and inferred it was a test. Claim stands.
Test monitor + incident deleted; 19 monitors, 0 open incidents.

**LOCAL TOOLING WAS BROKEN and nobody could have known:** after this morning's
fast-forward past 6 commits, `node_modules` still held ESLint 10.8.0 with no
eslint-config-next (the pre-5b94c0b set), so every local lint run crashed
rather than checked. `npm ci` fixed it. RULE: a fast-forward that changes
package.json needs an install, or your local checks are theatre.

Domain work + the mako.studio loss: [[domain-portfolio-and-mako-studio-loss]].

## 2026-07-28 — CI/lint hardening sweep (6 commits, RECONSTRUCTED 07-30)

These landed on 07-28 and were never written to this project's memory —
the session that ran them logged its note under bulldogsecurityservice.com
("fleet CI sweep"). Recovered from git on 2026-07-30.

- `5b94c0b` **the linter had been dead since the Next 16 upgrade** — `next lint`
  was removed, so `npm run lint` passed "lint" to next as a DIRECTORY name and
  errored. Every "lint passed" signal in this repo was worthless. Fixed with
  ESLint 9 + `eslint.config.mjs` importing `eslint-config-next/core-web-vitals`
  and `/typescript` **directly** (FlatCompat throws "Converting circular
  structure to JSON" here AND pulls in a vulnerable minimatch@3), then fixed the
  19 problems it surfaced across pricing/Footer/Navbar/Turnstile/three.
  package.json: eslint ^10 → ^9, `brace-expansion` override dropped.
- `211b5cf` Claude duty-officer workflow now runs on the **Max subscription**,
  not per-token API billing.
- `31f1fcc` + `c2be704` pinned `actions/checkout@v7` / `setup-node@v7`.
- `1a7ebea` `vercel.json` — stop burning preview deploys on Dependabot branches.
- `e720a07` new `dependency-audit.yml` reports npm audit to the portal, prod vs dev.

Duty-officer issue **#31** ("lint failing on main") was filed 06:28 and fixed by
`5b94c0b` at 06:49 — it sat open until closed on 07-30.

## 2026-07-27 (afternoon) — PixelCopy + MakoAnswer added to the portfolio (c7711fe, LIVE)

Russell: "add https://pixelcopy.app/ and https://makoanswer.com/ to the
portfolio, these can be direct links no frozen sites." Both shipped as
`tier: "product"` entries with **full case studies**, so they appear on the
homepage grid, `/work`, `/work/<slug>`, and the sitemap — everything derives
from `lib/portfolio.ts`, nothing else needed editing. Card order now:
toppaws · makoanswer · makobot · pixelcopy · makobytes · machine-template.

**Convention confirmed:** frozen `*-showcase.vercel.app` forks are for CLIENT
builds only (so the portfolio can't drift after handover). Mako-owned products
link straight at the live site — toppaws, makobot, makobytes, and now these two.

**Thumbnail gotcha extended:** `scripts/screenshots.mjs` (Microlink) must NOT
be used for makobytes.com **or pixelcopy.app** — makobytes boots MakoOS and
pixelcopy scroll-scrubs a cinematic, so a naive shot lands on a boot screen or
mid-flight frame. Both are Puppeteer-only: load → wait ~5s → scroll to top →
shoot 1440x900 @2x (= 2880x1800, matching every other thumbnail). That rule is
now a comment in the script, and its stale hardcoded `--only-new` filter was
replaced with a real slug filter.

Verified before AND after deploy: 12 case-study routes prerender, both new
pages 200 with exactly one h1, zero broken images, no horizontal overflow at
1440px and 390px, zero console errors, 6/6 headers, sitemap + llms.txt carry
both, fleet errors 0 open. Content is sourced from each product's own live
llms.txt/llms-full.txt + package.json, so the stacks and pricing claims are
truthful (Retell/Twilio for MakoAnswer; WinUI 3 + MSIX + Store cert for PixelCopy).

**Dependency queue cleared same session** (fab23d6 + #29/#30 merged): `@types/node`
25 → 26 typechecks and builds clean; **TypeScript 7 is PARKED, not merged** —
it's the native/Go compiler and doesn't expose the JS compiler API Next.js needs
("TypeScript 7.0.2 does not provide the compiler API required by Next.js"), so
`.github/dependabot.yml` now ignores typescript majors with the reason and the
lift condition. See [[typescript-7-blocked-by-nextjs]]. `actions/checkout@v4 → v7`
in claude.yml merged (gitleaks.yml was already v7). End state: 0 open PRs,
0 Dependabot alerts, npm audit 0.

## 2026-07-27 — site verified green (no code change); fleet digest hardened in the portal

Recover + live verification of THIS site, all green, nothing to fix:
`main` clean at `247d26b`, production deploy Ready, `/` `/work` `/pricing`
`/seo` `/serving` `/work/aaaawning` all 200, the four dead `/work` slugs all
308→/work, **6/6 security headers**, no `X-Powered-By`, **0 open Dependabot
alerts, 0 open PRs, npm audit 0**, gitleaks scheduled run green.

Session work was in **makoai-portal** (the 7am fleet digest), not this repo —
see [[digest-liveness-and-secret-ages]] and session_summary. Recorded here
only so the next Recover knows this site was verified on 07-27 and needs
nothing.

## 2026-07-26 (late) — dead /work slugs 308 to /work (247d26b, LIVE + verified)

Open-loop verification pass at Russell's ask, then he said "FIX THIS" on the
redirects. Shipped: `redirects()` in next.config.mjs — /work/{buffaloseal,
lagunares, aipromptshive, [retired project]} → /work permanent ([retired project] found by a
full-git-history slug hunt; it was never on the open list). Verified live:
all four 308→/work, live slugs 200, headers 6/6, fleet errors 0 open
(site_slug/resolved_at are the real column names; a 400 from wrong columns
is NOT "zero errors" — re-query). OG-Fraunces loop CLOSED by design (Georgia
deliberate, comment in opengraph-image.tsx). PARKED by Russell: pricing
buy-out/adder figures (his call), first prospect send + re-audit of the 16
old-format prospects (his click / his go). GSC indexing items unverifiable
from here — his Search Console.

## 2026-07-26 — Tailwind 4 LIVE + dependency queue zeroed (fc62ab2)

Stack change: **tailwindcss 4.3.3, CSS-first** — `tailwind.config.ts` is GONE,
the BIOLUMINANCE theme (abyss/lumen/tide/mist palette, fonts, eases) now lives
as `@theme` in `app/globals.css`; PostCSS plugin is `@tailwindcss/postcss`;
autoprefixer removed (built in). Verified pixel-equivalent vs pre-migration
via local-vs-live screenshot pairs before shipping. Also: TypeScript 6.0.3;
overrides sharp ^0.35.3 / postcss ^8.5.19 (matches DIRECT devDep — EOVERRIDE) /
brace-expansion ^5.0.8 → npm audit 0. Auto-merge workflow now merges
patch+minor (was patch-only — that's why #17 sat two weeks). Dependabot PRs
0 open, alerts 0. Future config edits go in globals.css @theme, NOT a config file.

**What:** Mako Logics' agency portfolio/marketing site. Live at https://makoai.studio
**Stack:** Next.js 16.2.x + Tailwind 3.4 + Vercel. Repo: MakoBytes-com/makoai.studio. Vercel team: makoai-studio. Domain at Cloudflare Registrar.

## 2026-07-25 — Prospect sales machine COMPLETE (in makoai-portal, RUSSELL-APPROVED "Looks good")

The full cold-outreach flow shipped to portal.makoai.studio/admin/prospects
(commits e47ca1a → 82a475e on MakoBytes-com/makoai-portal, all live):
themed BIOLUMINANCE pitch email (editable, per-prospect price, mockup
toggle, contact-email auto-scrape, test + real send via Resend, editor
first on the page); public /audit/<token> report upgraded with honest
"Security check" + "Can AI find you?" pass/fail sections; View-report
buttons; Re-audit pending spinner + audited-at stamp; out-of-credits
banner system; portal server-error bridge; single-deploy pipeline
(Vercel Git integration only; deploy.yml = manual fallback). Copy rules:
SEO (Google + AI) included in the price — never an add-on; never "small"
studio. Full detail in session_summary.md 2026-07-25 entries and
[[prospects-pitch-email-design-approved]].
**New (2026-07-07):** three / @react-three/fiber / drei / gsap / lenis — the Fable rebuild's 3D + motion stack.

## State (2026-07-07) — FABLE REBUILD **SHIPPED + APPROVED**

BIOLUMINANCE is **live in production at https://makoai.studio** (merge
`aa766e8` + cursor-fix `bf09c3e` on main). Russell reviewed the live site
and approved: "Looks great." Post-deploy verified: headers, JSON-LD,
zero page errors, cursor interaction proven on prod via mouse-driving probe.
**Recovery (if ever needed):** tag `pre-fable-rebuild`, branch
`backup/pre-fable-rebuild`, zip in Web Projects/, Vercel instant rollback.
Includes CursorGlow diver's-lamp (site-wide) — see
[[webgl-pointer-overlay-gotcha]] for the overlay/pointer lesson.

### What the rebuild is

- **Concept:** the deep ocean makes its own light; homepage scroll = a dive
  (DepthGauge instrument rail, fathom telemetry, contact = "THE FLOOR" over
  the shipwreck bg).
- **Hero:** parametric bioluminescent particle mako — custom GLSL, 42k pts
  desktop/16k mobile, forms on load, disperses on scroll, pointer repulsion,
  IntersectionObserver GPU pause, reduced-motion = still frame, WebGL-less =
  CSS backdrop. Files: components/three/{makoPointCloud.ts,MakoParticles.tsx,
  MakoHeroCanvas.tsx}.
- **Design system:** abyss/lumen/tide/mist palette; Fraunces (display,
  italic) + Inter + JetBrains Mono (telemetry) via next/font self-hosted;
  glass-deep cards; film grain; house ease cubic-bezier(0.22,1,0.36,1).
- **Motion:** Lenis (lib/gsapClient.ts + components/motion/SmoothScroll.tsx),
  Reveal/RevealLines/Magnetic primitives (components/motion/). All honor
  prefers-reduced-motion.
- **Preserved byte-identical:** all copy, JSON-LD, metadata, sitemap.ts,
  robots.ts, llms.txt route, /api/contact, lib/{portfolio,places,turnstile,
  email}.ts, next.config.mjs (CSP unchanged — zero new origins).
- **New:** app/favicon.ico (PNG-in-ICO 256px), BIOLUMINANCE OG card.
- **Removed:** legacy ink/steel tokens, old underwater CSS (water-bg,
  caustics, god-rays, particles, shadow-swim), hero-radial/card-gradient,
  .glass — all after verified orphaned. hero.mp4 no longer used by Hero but
  still in public/ (kept, harmless).

### Verification done (all local, dev server)

- `npm run build` clean at every stage; zero TypeScript/lint errors.
- Puppeteer probes (screenshots in session scratchpad): hero form/disperse,
  all home sections, mobile 390px, /pricing /seo /work /work/bulldog-security
  /serving, OG image, reduced-motion. Zero console errors.
- JSON-LD block counts per page match pre-rebuild contract; H1s
  server-rendered; sitemap/robots/llms 200.

## Next steps

1. Verify preview deploy Ready → give Russell the branch preview URL
   (makoai-studio-git-fable-rebuild-makoai-studio.vercel.app).
2. On Russell's go: merge fable-rebuild → main, verify production, then
   check errors dashboard per never-ship-broken rule.
3. Deferred polish: Fraunces in OG image; drop Google-Fonts CSP entries
   (fonts fully self-hosted); Dependabot #8 Tailwind-4 major needs re-scope
   vs the rebuilt config; 2 npm moderates await next's postcss bump upstream.

## Open / deferred (verified 2026-07-26)

- Search Console (Russell): request indexing for /work, /serving, top 3 case
  studies + "Excluded by noindex (3)" drill-in — status UNKNOWN, lives in his
  GSC account, can't verify from here.
- Thin-content /serving/* city pages.
- PARKED (Russell 2026-07-26): pricing buy-out figure + Premium adder amounts
  unpublished ([[pricing-waas-model]]) — his call, don't re-raise as a task.
- PARKED (Russell 2026-07-26): first real prospect send + re-audit of the 16
  pre-07-25 prospects (portal) — his click/go, don't re-raise as a task.
- DONE 2026-07-26: 301s for dead /work slugs (247d26b — all four incl.
  [retired project]). CLOSED by design: Fraunces in OG image (Georgia is deliberate).

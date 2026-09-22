---
name: site-audit-2026-09-08
description: "Full makoai.studio audit — two high-severity vulns hidden behind our own override pin, CSP tightened, and the CSP origin I removed on a bad grep that blanked five faces on the homepage"
metadata: 
  node_type: memory
  type: project
  originSessionId: c5f4cd97-b95b-40e4-9ee3-a29c2168f481
  modified: 2026-09-09T00:06:46.377Z
---

**2026-09-08.** Russell: *"check the whole site for issues then fix and save."*
Commits `5f15075` + `e9dfbc4`. Ended: 0 vulnerabilities prod and dev, 32/32
routes 200, 6/6 headers, clean tree, CI green.

## The one I got wrong — read this first

I removed `https://lh3.googleusercontent.com` from `img-src` because
`grep -rn googleusercontent app components lib` found nothing. **It is used.**
Those are the Google reviewer avatars on the testimonials rail, and the URLs
arrive from the **Places API at runtime**, so the origin exists nowhere in
source. It deployed and blanked five faces on the homepage until I drove the
live page and saw 15 CSP violations.

**A source grep cannot prove a CSP origin is unused.** Runtime data — API
responses, CMS rows, user content — carries origins that never appear in the
repo. Before removing any origin: load the real page in a browser and watch for
violations first, then remove. A comment now sits on that line saying so.

It only ever showed up in the browser. `npm run build`, typecheck and lint were
all clean with the site visibly broken.

## Two high-severity vulns, one hidden behind our own pin

- **sharp** — production high (libheif, GHSA-rgj7-g3m4-5g8c, affects `<0.35.4`).
  Our `overrides` pinned `^0.35.3`, so **the override we wrote was holding the
  vulnerable version in place**. Bumped to `^0.35.4`.
- **js-yaml** — dev high (GHSA-2883-xcg3-v3hh, needs `>=4.3.2`), transitive via
  `eslint → @eslint/eslintrc@4.3.1`. Overrode to `^4.3.2`, inside the `^4.3.0`
  eslintrc accepts. Neither is a direct dep, so plain overrides are correct —
  no `$name` reference needed (that trap is only for direct-dep collisions).

**Dependabot reported 0 open alerts the whole time.** `npm audit` found both.
Run both, always — the cross-check memory says the same thing and it held again.

## CSP

- **Dropped `unsafe-eval`.** Verified first: zero chunks in
  `.next/static/chunks` contain `eval(` or `new Function(`, with a canary to
  prove the detector fires. Turnstile, MakoChat's embed and the Vercel beacons
  all still work — confirmed in the browser after deploy.
- **`unsafe-inline` stays, as a decision rather than an omission.** Removing it
  needs a per-request nonce from middleware, and a nonce **forces every route to
  render dynamically**. This site is 32 prerendered pages with no login and no
  user content; trading that for hardening on a surface with nothing behind it
  is a bad deal. Bulldog runs nonce + strict-dynamic because it has an
  authenticated control panel. The reasoning is now a comment in
  `next.config.mjs` so it is not re-litigated as an oversight.
- The CSP comment said to flip the header *to the value it already had* —
  leftover from the report-only rollout, removed.

## Also fixed

- **Speed Insights mounted.** It was not installed at all, so there were no
  real-user Core Web Vitals — only lab runs. Both its origins were already
  allowed, so it cost nothing. Note it and Analytics load from **randomised
  same-origin paths** (`/7b89dd4ed7dd0f02/script.js`), not `vercel-scripts.com`
  — grepping scripts for "vercel" finds neither and looks like a failure.
- **Deleted `public/hero.mp4`** — 2.7 MB, referenced by nothing since the
  BIOLUMINANCE rebuild, and the README still told the next person to drop a
  RunwayML video there for a component that no longer reads it. README rewritten
  to describe the WebGL hero that actually ships.

## Verified clean, deliberately unchanged

32/32 routes 200 with exactly one `h1`, a description and a canonical · every
`Image`/`img` has alt (checked with a multiline parser after a naive
line-based grep gave a false pass, canary-verified) · no broken images · no
heading-level jumps · skip link present · no links or buttons without an
accessible name · fonts self-hosted via `next/font` · no render-blocking
external CSS · **Three.js is code-split and absent from the initial HTML**
(871 kB chunk loads only via `dynamic()`) · thumbnails deliver as **31 kB WebP**
despite 2.7 MB PNG sources, so the 49 MB of source PNGs is repo weight only and
not worth a format migration · privacy policy matches actual practice including
the MakoChat widget · contact endpoint returns 400 on malformed input, enforces
Turnstile, 405s a GET and **rate-limits from the second request** · legacy
`/work` slugs still 308 · 0 Dependabot alerts, 0 open PRs, no committed secrets,
no `X-Powered-By`.

Console errors on the live site are all from Cloudflare's own Turnstile
challenge script. Not ours, not fixable here.

See [[feedback-verify-the-check-actually-ran]] — that rule earned its keep twice
in this audit, once caught before shipping and once not.

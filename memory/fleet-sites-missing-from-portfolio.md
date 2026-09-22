---
name: fleet-sites-missing-from-portfolio
description: "The 2026-09-08 audit of what is live in the fleet but absent from the makoai.studio portfolio — 10 sites, one wrong entry, and one finished site sitting behind a parked domain"
metadata: 
  node_type: memory
  type: project
  originSessionId: c5f4cd97-b95b-40e4-9ee3-a29c2168f481
  modified: 2026-09-08T23:14:53.997Z
---

**2026-09-08.** Russell: *"we need to look at sites that are missing from the
portfolio."* Every line below was checked live (HTTP status + `<title>`), not
recalled.

Portfolio at the time: 18 entries — 8 client builds, 8 products, 2 archived
earlier-work.

## Live and absent (10)

**Bulldog family sites we built** — a whole division invisible on our own site:
- ~~`bulldogh2o.com`~~ — **ADDED 2026-09-08** (`b4b25bf`), /work/bulldog-water
- ~~`bdslighting.com`~~ — **ADDED 2026-09-08** (`b4b25bf`), /work/bds-lighting
- ~~`bdsgovservices.com`~~ — **ADDED** (`dec55ff`), /work/bds-government-services

Both added entries point at their **live domains, not frozen showcase forks**,
because we operate these sites. That exposed a second false label:
`statusLabel()` returned "Approved · frozen showcase" for every `client-build`
entry, so both shipped a status line describing a fork that does not exist —
fixed in `fd61c11` by deriving the claim from whether the entry's own url
contains `-showcase.`

**Mako products:**
- ~~`makochat.app`~~ — **ADDED** (`dec55ff`), /work/makochat
- ~~`handpenned.com`~~ — **ADDED** (`dec55ff`), /work/handpenned. Note its
  README was well out of date: it described a Phase 1 shell with the rewrite
  engine still to come, but the live product has eight tools, open signup and
  published pricing. **Read the live site, not the repo's README.**
- **Still absent (5):** `govsprint.app`, `makomail.app` (landing page only —
  would be a thin card), `localaibox.com`, `pixelmonsters.com`, `voltage.bike`

## Wrong, not missing — and I was wrong about it twice

**Davis Investigation Services** is filed `status: "Archived"`,
`tier: "earlier-work"`, `url: ""`. That is wrong, but **not** for the reason I
gave three times today. I said davisinvestigationservices.com "is a live Next.js
site we own". **It is not.** The live domain serves the client's original
**WordPress + Elementor site on Apache** (1,257 Elementor references,
`wp-content`, `wp-includes`), hosted on Liquid Web at 72.52.251.108.

The truth, from the repo's own `CUTOVER.md`: the rebuild is **built and awaiting
DNS cutover**, deployed at `davisinvestigationservices.vercel.app`, and the
cutover is deliberately blocked — *"Do not cut DNS until the new portal is
imported into this app — the portal login must never go dark for clients."*
The correct portfolio status is **In Progress**, like AXYS and Woodlands.

The `Server:` header is what settles this in one call. Twice today I inferred
infrastructure from a repo and a commit log instead of asking the server.

## Two live findings that came out of checking Davis

1. **The client's ticket had never been pushed.** Commit `4b1ff25` (2026-08-18,
   "Collection-site weekday hours 6:30 PM -> 6:00 PM … client ticket #11090")
   sat unpushed on this machine for 21 days — `main...origin/main [ahead 1]` —
   and `origin/main` still carried 6:30 PM, so it existed in exactly one place
   on earth. Rebased onto the 9 commits that had landed meanwhile and pushed
   (`280787e`); both the home and Drug & DWI pages now read 6:00 PM on the
   deployed rebuild. **Check `git status -sb` on every client repo you open** —
   a commit that is authored but unpushed looks identical to done.
2. **The pre-cutover rebuild was fully indexable** (`robots.ts` = `allow: "/"`)
   while the client's real site is live and ranking on the same brand — the same
   class as the stress-ad preview found the same morning. Fixed in `2bb19aa`
   with an `X-Robots-Tag: noindex, nofollow, noarchive` header keyed on a
   `has: [{ type: "host", value: "(.*)\\.vercel\\.app" }]` condition, so it stops
   applying by itself the moment the real domain serves the app. **A guard keyed
   on the environment beats a flag someone has to remember to flip at cutover.**

## CORRECTED — the "parked domain" finding was wrong

I reported that **bdslighting.com was a parked domain** serving a registrar
lander (`<script>window.onload=…href="/lander"</script>`). **That was wrong.**
It is fully live on its real domain and always was: 8/8 pages 200, `Server:
Vercel`, `X-Nextjs-Prerender`, full security headers, 78 KB of real page.

**Why the false reading, so it is not repeated.** The `216.150.1.1` /
`216.150.16.1` pair I took for GoDaddy parking IPs are **Vercel's apex IPs** —
bulldogh2o.com resolves to exactly the same pair and works fine. This machine's
resolver was almost certainly holding a stale pre-cutover record at the moment I
checked; the domain has been correct on `8.8.8.8` and on Vercel throughout
(`GET /v6/domains/<d>/config` returned `"misconfigured": false`,
`"ipStatus": "no-change"`, and the project lists both apex and www as
`verified: true`).

**The rule:** an unexpected lander is a DNS reading, not a conclusion. Confirm
with `curl -sI` (look at `Server:` and the real byte count) and with the
provider's own config endpoint before calling a live client site parked — and
re-check against a public resolver, because the local one lies after a recent
cutover. Being wrong in this direction is expensive: it manufactures an
"outage" on a client property and a DNS task for Russell that does not exist.

Both domains sit on GoDaddy nameservers (`domaincontrol.com`), and there is no
GoDaddy API credential anywhere on this machine — their bot wall blocks
automated sign-in and the account is a shared login. So GoDaddy DNS genuinely is
Russell's to do by hand. It just did not need doing here.

## Deliberately excluded (do not re-raise)

- `stress-ad.com` — the live domain is still the client's own WordPress behind
  Sucuri/Cloudproxy. Our build is a proposal only; it went in as a Proposal
  entry, pointed at the preview URL, never at their domain
  ([[portfolio-proposal-entries]])
- `makologics.com` — the parent MSP company, not a portfolio piece
- `makoai-portal` — internal
- Buffalo Seal and Woodlands' live Wix domain — MSP-only under the standing rule

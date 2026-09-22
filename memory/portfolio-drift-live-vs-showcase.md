---
name: portfolio-drift-live-vs-showcase
description: "Frozen showcase forks stop the portfolio drifting after handover, but they let the entry describe a design the client no longer runs — how Utilities Plus went stale, and the guard now in place"
metadata: 
  node_type: memory
  type: project
  originSessionId: c5f4cd97-b95b-40e4-9ee3-a29c2168f481
  modified: 2026-09-08T23:14:33.642Z
---

**2026-09-08.** Russell: *"update Utilities Plus to the new site."* Shipped
`c5af1d4`.

## The failure mode nobody was watching for

The frozen-showcase convention exists so the portfolio cannot drift **after
handover** — the client changes their site, our case study still shows what we
built. It works. But it creates the opposite drift, and that one is worse,
because it is invisible: **the entry keeps describing a design the client no
longer runs.**

Utilities Plus had moved a long way past its fork. The entry claimed:
- a 3.95 MB Pexels hero video → **there is no `<video>` on the live homepage**
- Mulish / Baskervville / Frank Ruhl Libre → **live is Inter + Playfair Display**
- services including solar and waste → **live has water filtration and moving
  services, and no solar or waste**
- "22 routes" from the WordPress migration → **a different, smaller route set**
- "Production rollout is underway on their domain" → **live since well before**

The two headlines are the quickest tell, and worth remembering as the
diagnostic: the showcase still serves *"Moving Made Effortless. Connections Made
Seamless."* while utilities-plus.com leads with *"Everything Your New Home
Needs. Handled Before Move In."*

**And the biggest thing was an omission, not an error.** The site had grown a
full control panel — page copy, FAQs, providers and a media library in Postgres,
a lead inbox, in-house analytics and Core Web Vitals, TOTP admin — and the case
study did not mention any of it. That is the actual value of the project, and
the write-up was selling a 2026 WordPress migration instead.

## What changed

Rewritten against the live site and the repo rather than patched, and pointed at
`utilities-plus.com`. It joins Bulldog Water and BDS Lighting as an entry that
links at the live site rather than a fork, so `statusLabel()` renders it
"Approved · live".

The thumbnail moved off Microlink (`screenshots.mjs`) onto the guarded capture
path (`screenshot-video-hero.mjs`) with `expectText: "Handled Before Move In"`.
That guard is doing real work here: the superseded showcase is still up and
still serves the old headline, so a capture aimed at the wrong URL now fails
instead of quietly shipping a picture of a design that no longer exists. Any
entry pointing at a LIVE site gets a text guard for the same reason.

## The bug class this exposed, three times in one day

`statusLabel()` in `app/work/[slug]/page.tsx` computes a claim from the entry's
**tier**, and tier is a grouping, not a claim. Every time, it asserted something
the entry did not have:

1. A **proposal** inherited `client-build` → "Approved · frozen showcase",
   claiming approval from a company that never hired us.
2. **Bulldog Water and BDS Lighting** point at live domains with no fork →
   still "Approved · frozen showcase", describing a fork that does not exist.
3. **Davis**, a rebuild deliberately held back from cutover, read
   "Approved · live" — neither approved nor live. Same fault silently
   mislabelled **AXYS** and **Woodlands**, both In Progress, both claiming
   approval.

Final shape reads two independent facts off the entry itself — where it points
(`url.includes("-showcase.")`) and whether it is finished (`status`) — so
neither can drift:

```
Proposal            → "Proposal · not a client engagement"
product tier        → "Live"
In Progress + fork  → "In progress · frozen showcase"
In Progress + live  → "In progress · preview build"
settled    + fork   → "Approved · frozen showcase"
settled    + live   → "Approved · live"
```

**The lesson: derive a claim from the fact it asserts, never from the category
the thing was filed under.** All three only surfaced by reading the deployed
page — every one passed typecheck, lint and build.

## The rule

**Deciding between a fork and the live site is a decision that expires.** For a
third-party client — nautiDAWGS, AAA Awning, Bishopbend — the fork is right,
because they will change the site and we want the as-shipped version. For sites
we operate — the Bulldog properties, Utilities Plus — the live site is right,
and pointing at a fork means showing an old design of a site we control.

When work continues on a site after its case study is written, the case study is
part of that work. Nothing re-reads it on its own.

Also fixed in the same pass: **nautiDAWGS was still `status: "In Progress"`**
with an outcome saying it "moves toward its domain cutover". The cutover
completed 2026-09-08 — now `Client`, and the outcome says live. Utilities Plus
was missing from llms.txt entirely.

See [[portfolio-proposal-entries]] and [[portfolio-thumbnail-capture]].

---
name: umami-csp-gateway-fleet-bug
description: "Umami analytics was silently dead on 5 fleet sites — its script posts to gateway.umami.is, which no CSP allowed. Fixed 2026-07-31."
metadata: 
  node_type: memory
  type: project
  originSessionId: cc0cd53e-6e22-4492-8f78-7c422d332f3e
  modified: 2026-07-31T10:39:22.159Z
---

# Umami was recording nothing on five sites, because CSP blocked its endpoint

Every site embedding Umami allowed `https://cloud.umami.is` (the script) and
`https://api-gateway.umami.dev` (events, historically) in `connect-src`. But
`cloud.umami.is/script.js` posts to **`https://gateway.umami.is`**, which nothing
allowed — so every event was refused by CSP and the dashboards recorded nothing.

Affected and fixed 2026-07-31: **aaaawning.net, bishopbend.com,
aaaawning-showcase, bishopbend-showcase, bulldog-showcase**.

**How it surfaced:** running a web-vitals verification harness on aaaawning.net
after a dependency bump. The vitals passed; the run failed only on its
"zero console errors" assertion, and the errors were
`Refused to connect ... violates the document's Content Security Policy` for
gateway.umami.is on every page view. The bump was unrelated — a harness that
asserts a clean console found a bug nobody was looking for.

**Verify it empirically, don't reason about it:**
`curl -s https://cloud.umami.is/script.js | grep -oE "https://[a-z0-9.-]*umami[a-z0-9.-]*"`
prints the endpoint the script actually uses. Then check each site's live
`connect-src`.

**Fix:** add `https://gateway.umami.is` to `connect-src`. The older origins were
left in place rather than swapped — restoring the blocked path is the goal, and
removing an origin that might still serve some path is a separate decision.

**The general shape, seen twice now on this fleet** (the other was Vercel Blob
uploads sitting at "0%" forever): a CSP-blocked request produces NOTHING in any
server log. The feature looks installed, the dashboard is just empty. Whenever a
third-party integration "works but reports nothing", check `connect-src` against
what the vendor's current script actually calls — vendors move endpoints without
notice and the allowlist silently goes stale.

Related: [[feedback-verify-the-check-actually-ran]].

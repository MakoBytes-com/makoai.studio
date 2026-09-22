---
name: incident-gcp-billing-disabled-places
description: "RESOLVED 2026-07-24: prospect scan 'places search failed' = old Places key lived in a billing-DISABLED GCP project ('Google Fonts'). Fixed by minting a NEW Places-API-(New)-restricted key in mako-studio-places (billing active) + wiring GOOGLE_PLACES_API_KEY in portal Vercel env. Verified live: scan found 17 businesses."
metadata: 
  node_type: memory
  type: project
  originSessionId: b4a2f444-1965-4dfe-846b-d6a5e73ef5c4
  modified: 2026-07-25T06:13:01.572Z
---

**RESOLVED 2026-07-24 — final fix:** the old Places key actually lived in the
**mako-font-89812 ("Google Fonts")** project, whose billing was disabled —
NOT in a project we could just re-bill cleanly. Russell wanted it consolidated,
so we minted a NEW key `AIzaSyAp…DRwk` in **mako-studio-places** (which we'd
linked to **My Billing Account 1** / `019017-7CCBFB-C43831`, valid Amex 08/28),
restricted to **Places API (New)** only, no app restriction (server-side on
Vercel). Set as `GOOGLE_PLACES_API_KEY` in the portal Vercel prod env (printf,
no newline), redeployed. **Verified end-to-end: live authed scan `plumber`/
`77380` → 202, found 17 businesses.** GOTCHA en route: first restriction pick
gave `API_KEY_SERVICE_BLOCKED` — the legacy "Places API" was checked instead of
"Places API (New)"; the code hits `places.googleapis.com` = Places API (New).

**FULLY CONSOLIDATED (done 2026-07-24):** Russell deleted the old 2015 key,
which ALSO powered `GOOGLE_PAGESPEED_API_KEY` (portal) + makoai.studio reviews
(GOOGLE_PLACES_API_KEY, key `…IoQM`) — caught it and migrated everything to the
ONE new key `…DRwk`:
- makoai.studio `GOOGLE_PLACES_API_KEY` → new key, redeployed, live reviews
  pill verified (had been cache-protected 24h; would've dropped w/in a day).
- portal `GOOGLE_PAGESPEED_API_KEY` → new key (after enabling PageSpeed
  Insights API on mako-studio-places + adding it to the key's API
  restrictions). Verified end-to-end: live scan → PSI scores populated
  (Ambrose Plumbing perf 94 / seo 100 / grade B).
- End state: ONE key in mako-studio-places, restricted to Places API (New) +
  PageSpeed Insights API, billing on My Billing Account 1, used by portal
  (scan + PSI) AND makoai.studio (reviews). Old sprawl key gone. GOTCHA:
  anonymous PSI is 429 (quota dead) — a valid key is required, can't just drop
  it.

**0136B3 FLEET AUDIT DONE 2026-07-24** (grepped all 4 repos for paid Google
API usage, health-tested their keys):
- **makobytes.com** — no paid Google APIs. Clean. ✓
- **TopPaws.com** — no paid Google APIs. Clean. ✓
- **aaaawning.net** — has a GBP-reviews feature (legacy Places Details) but
  `GOOGLE_PLACES_API_KEY` is UNSET in its Vercel env → dormant, makes no calls,
  nothing broken. (If reviews ever wanted, wire the new `…DRwk` key.)
- **makologics.com** — WAS BROKEN (same deleted `…IoQM` key). Public
  `GoogleReviewBadge` (Places API New) + admin SEO geocoding both dead. FIXED:
  repointed `GOOGLE_PLACES_API_KEY` → new `…DRwk`, redeployed, live badge
  verified 200. **CAVEAT:** makologics admin SEO tooling (`src/lib/seo/
  geocode.ts`, `buildContentBrief.ts`) uses the **Geocoding API**, which the
  new key is NOT restricted to allow → admin geocoding/heatmap/content-brief
  actions will 403 (API_KEY_SERVICE_BLOCKED) until Geocoding API is enabled on
  mako-studio-places AND added to the `…DRwk` key's API restrictions. Public
  site unaffected; admin-only. RESOLVED 2026-07-24: enabled Geocoding API on
  mako-studio-places + added it to the `…DRwk` key, verified OK (geocoded a
  Montgomery TX addr). FINAL: one key `…DRwk` does Places(New) + PageSpeed +
  Geocoding, across portal + makoai.studio + makologics.com. Fully consolidated.

So the deleted-key blast radius was: portal (scan+PSI) ✓fixed, makoai.studio
reviews ✓fixed, makologics.com reviews ✓fixed. Nothing else on 0136B3 uses
paid Google APIs. The 0136B3 billing-active question is moot — the broken
sites were all on the deleted KEY (in mako-font-89812), not on 0136B3's own
keys.

--- original diagnosis (reusable rule) ---

**Symptom:** Portal prospect scan (`/admin/prospects` → Discover) returned
"places search failed"; `prospect_scans.error_message` = `Places API
returned 403 PERMISSION_DENIED / "The caller does not have permission"`.
Worked fine 2026-05-05 (found 17), broke since.

**Root cause: BILLING is disabled on the Google Cloud project** that owns
the Maps/Places API key. Places API (New) `places:searchText` masks the real
reason behind a generic PERMISSION_DENIED. Diagnostic that nailed it (ran
the prod key directly, key pulled via `vercel env pull`):
- PageSpeed API with the key → **200** (PSI is FREE, no billing needed).
- **Geocoding** with the same key → `REQUEST_DENIED: "You must enable
  Billing on the Google Cloud Project ... /billing/enable"` ← the honest msg.
- Places (New) → 403 PERMISSION_DENIED.

So: **Maps/Places/Geocoding (billable) fail; PageSpeed (free) works.** The key
itself is valid (39 chars, `AIzaSy…`, no corruption) and is the SAME value as
`GOOGLE_PAGESPEED_API_KEY`. Both are in the portal's Vercel prod env.

**Reusable rule:** if a Google Maps/Places/Geocoding call 403s with
PERMISSION_DENIED but PageSpeed works, it's almost always **billing off on
the GCP project** — confirm with a Geocoding call, which returns the explicit
billing message. Not a code bug, not an env-corruption issue.

**Fix (Russell-only — needs his GCP console + payment method):** re-enable
billing on that project at https://console.cloud.google.com/billing — link a
billing account / update the card. Affects EVERYTHING on that project using
Maps/Places/Geocoding (incl. makoai.studio's own Places usage), not just the
scan. PSI-based audit scores are unaffected.

**Also confirmed (supersedes the old "add PSI key" TODO):**
`GOOGLE_PAGESPEED_API_KEY` IS set in prod and PSI returns 200 — real
Lighthouse scores are LIVE on audits. See [[prospects-rebuild-planned]].

**Code side (shipped `28b6696`):** the scan route now maps the raw Google
error → an actionable UI message ("billing is disabled — re-enable it")
instead of the opaque "places search failed".

---
name: fleet-portal-master-endpoint
description: "When repointing a client's portal (master) endpoint after go-live, use the canonical NON-redirecting host (www), never the bare apex — fetch strips Authorization on cross-host redirects."
metadata: 
  node_type: memory
  type: reference
  originSessionId: 23a30a3a-a218-436a-803a-1c5dc41ec083
---

The Mako fleet control plane is **makoai-portal** (portal.makoai.studio, Vercel team makoai-studio). It pulls each client's `/api/master/errors|health|analytics|users` every 5 min (cron `fleet-refresh`) into `client_kpi_cache`, signing an RS256 JWT (master_signing_keys → client `client_endpoints.endpoint_url`). Connected clients: **AAA Awning + Bulldog only** (Bishopbend NOT connected — not live yet as of 2026-06-04).

**Gotcha banked 2026-06-04 (Bulldog cutover):** Bulldog's apex `bulldogsecurityservice.com` **307-redirects to `www.`**. Node `fetch` (undici) **strips the `Authorization` header on a cross-host redirect**, so pointing the master endpoint at the bare apex silently breaks the signed pull (auth lost on the hop → 401 → portal goes blind). **Fix: point `endpoint_url` at the canonical non-redirecting host — `https://www.bulldogsecurityservice.com`.** Verified all-200 via a real fleet-refresh. Apply this to every future client repoint after DNS cutover: test the custom domain's `/api/master/*` for redirects first, and use the host that answers directly.

Also banked: **Bulldog competitor cron (`scrape-competitors`) rides ScrapingBee's free tier (1000 credits/mo)** which exhausts mid-cycle → all 6 BBB profiles 401 "Monthly API calls limit reached". Fixed 2026-06-04 (commit 38c0da8) to degrade gracefully (bail on first quota hit, log to ops/cron_runs only, NOT error_events). **OPEN spend decision:** to refresh all 6 weekly, Russell needs a paid ScrapingBee plan (~$49/mo) or reduced scope; left on free tier (refreshes early each cycle, then skips quietly).

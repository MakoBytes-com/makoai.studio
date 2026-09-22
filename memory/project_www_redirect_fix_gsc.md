---
name: www redirect fix (GSC Page with redirect)
description: 2026-04-23 — added www.makoai.studio as 308 redirect to apex after GSC flagged Page with redirect. Root cause was DNS-pointed-but-unclaimed subdomain.
type: project
originSessionId: 11ef8900-3bca-49e0-875d-728e955f15b1
---
## What happened
On 2026-04-23 Google Search Console emailed Russell: "Page with redirect" is preventing indexing on makoai.studio.

Root cause: **www.makoai.studio had a DNS CNAME to `cname.vercel-dns.com` but was NOT attached to any Vercel project.** Vercel's edge fallback behavior for unclaimed domains whose DNS points at it:
- `http://www.makoai.studio` → served a generic 308 redirect to `https://www.makoai.studio/`
- `https://www.makoai.studio` → SSL handshake failure (no cert issued)

Google's crawler saw the 308 and flagged the URL as "Page with redirect."

## Fix applied
Attached www to the Vercel project via API with a 308 redirect to apex:

```bash
curl -X POST "https://api.vercel.com/v10/projects/<PROJECT_ID>/domains?teamId=<TEAM_ID>" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"name":"www.makoai.studio","redirect":"makoai.studio","redirectStatusCode":308}'
```

Vercel auto-issued an SSL cert for www within ~30 seconds (DNS already resolved to Vercel).

## Verification
- `https://www.makoai.studio` → 308 → `https://makoai.studio/` (200), valid cert
- `https://www.makoai.studio/<any-path>` → 308 → `https://makoai.studio/<same-path>` (200)
- `http://www.makoai.studio` → 308 → `https://makoai.studio/` (via HSTS upgrade)
- Cert subject `CN=www.makoai.studio`, valid through 2026-07-22

## Important context about "Page with redirect"
GSC's "Page with redirect" status is usually **informational, not an error**. It literally means "these URLs redirect, so we won't index them — we'll index the destination instead." A www→apex 308 redirect will STILL show up under this status in GSC, and that's correct behavior. The problem here wasn't that URLs redirected — it was that the www variant was broken (SSL fail) AND unclaimed, which made Google unsure how to handle it.

## Post-fix GSC steps for Russell
1. Open Search Console → makoai.studio property
2. Coverage report → "Page with redirect" → click into the affected URL list
3. For each affected URL, click "Validate Fix" at the top of the list
4. Google will recrawl over the next few days and move those URLs to the proper consolidation status

## Sweep across all Mako domains (same session)
After fixing makoai.studio, scanned all 7 Mako production domains and applied the same fix class to every site with the bug. Final state verified clean 2026-04-23:

| Domain | Canonical | Non-canonical | Fix applied |
|---|---|---|---|
| makoai.studio | apex | www → 308 | this session (POST) |
| makologics.com | apex | www → 308 | already correct |
| makobot.com | **www** | apex → 308 | this session (PATCH — was 307 by default, upgraded to 308) |
| makobytes.com | apex | www → 308 | this session (POST) |
| toppaws.com | apex | www → 308 | this session (POST) |
| aaaawning.net | apex | www → 308 | this session (PATCH — www was attached with no redirect) |
| aipromptshive.com | apex | www → 308 | this session (PATCH — www was attached with no redirect) |
| [retired project].ai | — | — | currently 503 (separate issue) |

Two distinct bug variants found:
1. **www not attached** (makobytes, toppaws, original makoai) — DNS→Vercel edge but no project claim. Vercel serves broken 308 + SSL fail. Fix: POST new domain with redirect fields.
2. **www attached as duplicate** (aaaawning, aipromptshive) — both apex + www on same project, no redirect, serving same content. Fix: PATCH existing www with redirect fields.

**Vercel default gotcha:** if you POST a domain with `redirect` set but no `redirectStatusCode`, Vercel silently defaults to 307 Temporary (not 308 Permanent). 307 works functionally but Google doesn't transfer link equity through it the way it does through 308. **Always explicitly set `redirectStatusCode: 308` when adding a redirect domain.** makobot.com hit this — apex redirect had been 307 since launch and was upgraded 2026-04-23.

## Prevention for future domains
**HARD RULE going forward: every new production domain gets both apex AND www attached to the same Vercel project from day one, with www as a 308 redirect to apex (or vice versa, whichever is canonical).** If DNS points a subdomain at Vercel but Vercel has no project claiming it, the result is broken SSL + unexplained redirects.

Checklist on every new site launch:
- [ ] Canonical variant attached (apex or www)
- [ ] Non-canonical variant attached as 308 redirect to canonical
- [ ] Both show `verified: true` in Vercel domain list
- [ ] SSL cert issued for both (check `curl -I https://www.<domain>`)
- [ ] Sitemap + canonical tags reference ONLY the canonical variant

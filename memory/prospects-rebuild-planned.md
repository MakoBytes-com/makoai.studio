---
name: prospects-rebuild-planned
description: "Prospects section REBUILT 2026-07-24 (audit-driven): add a business+URL -> live site audit (Google Lighthouse + our security/SEO/SSL checks) -> Claude AI pitch -> public sendable /audit/<token> report. Request templates REMOVED."
metadata: 
  node_type: memory
  type: project
  originSessionId: b4a2f444-1965-4dfe-846b-d6a5e73ef5c4
  modified: 2026-07-25T10:56:38.520Z
---

**REBUILT 2026-07-24** (Russell: "rebuild it how you see fit"). The old
prospects (scan -> build a throwaway demo site via GitHub+Vercel, pitch was
a deterministic plumbing-template, NOT AI) is replaced by an audit-driven
flow that reuses tonight's audit tooling:

**Flow:** /admin/prospects -> "Add a prospect" (business name + URL + optional
contact/city/industry) -> auto-runs `auditUrl()` on their live site ->
A-F scorecard -> "Generate pitch" (Claude opus, audit-backed) -> "Create
sendable report link" -> PUBLIC /audit/<token> (no login). Pipeline:
discovered/selected/sent/won/passed.

**Key files:** `lib/prospects/audit.ts` (auditUrl: fuses Google Lighthouse
via lib/scanner/pagespeed + our header/SSL/SEO/tech checks -> findings +
score+grade), `lib/prospects/pitch.ts` (generatePitch, Claude opus, leads
with real findings + "we audit our own 28 sites weekly" hook, bills the
usage ledger), `app/admin/prospects/{page,[id]/page,actions}.tsx`,
`app/audit/[token]/` (PUBLIC report — the old /audit/[id] was admin-gated
& undeliverable; now token-auth via service role, in middleware
PUBLIC_PREFIXES, noindex). Migration 0028 (audit_json/grade/score,
pitch_md, public_token, contact_email; + made scan_id/place_id/category/
city NULLABLE so manual adds work — GOTCHA: old table required scan_id).

**REMOVED:** the throwaway-site machinery (build-pitch/delete-pitch routes,
lib/prospects/site-config.ts, BuildPitch/DeletePitch/ProspectActions
components). Request templates feature GONE (migration 0027 drop table;
was cosmetic client-form prefill, no FK).

**OWED — Google PageSpeed API key:** the audit's headline "Google's own
scores" need `GOOGLE_PAGESPEED_API_KEY` in the portal Vercel env (free,
25k/day). WITHOUT it PSI returns null (scores show "—") but the audit
still produces security/SSL/SEO/tech findings. Anonymous PSI quota is
exhausted. Walk Russell through creating the key.

**Still uses:** GOOGLE_PLACES_API_KEY (the market-scan discovery still
works). Related: [[weekly-security-sweep]], [[security-audit-2026-07-24]].

**FUTURE (Russell 2026-07-25, verbatim intent): "One day I will want to
automate this, for now I'm going to test it manually."** The end-to-end
flow (scan → audit → pitch email → send → pipeline tracking) is designed
to be automatable later — e.g. a cron that scans a market, audits, drafts
pitch emails into a review queue, and sends only on approval. DO NOT
build automation until Russell says go; he's validating the manual flow
first. When he asks, mind CAN-SPAM posture (currently one-at-a-time
manual sends with an opt-out line — bulk automation raises the bar).

**UPDATE 2026-07-24 (shipped `b91d093`, verified live):** Russell kept the
keyword discovery + thumbnails; asked to (a) restore thumbnails on the list,
(b) add a way to remove discoveries, (c) unify scan with the new engine.
Done: list rows show `hero_screenshot_url` thumbnail + grade chip (grade-
letter tile fallback); per-row remove `×` (hover-revealed, sibling of the
row Link — NOT nested in the anchor) via `removeProspect`, plus a bulk
"Clear N discovered" (`clearDiscovered`, only deletes status='discovered').
The market-scan enrich route (`app/api/admin/prospects/enrich/[id]`) now
ALSO builds audit_json/grade/score by calling `auditUrl(url, {psi, signals})`
— a new PREFETCHED overload that reuses the PSI+cheerio it already fetched,
so scanned prospects are pitch-ready with NO extra API calls. So the
earlier "scanned prospects need Re-audit" caveat is GONE. Live probe: 200,
64 remove buttons, 13 thumbnails, 6 grade tiles rendering.

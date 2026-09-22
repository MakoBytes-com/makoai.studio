---
name: resend-2026-07-platform-updates
description: "Resend platform updates (July 2026 newsletter) relevant to the Mako fleet — Remote MCP + Claude Connector, OAuth, new DMARC spec, GitHub secret-scanning auto-revoke, Vercel Marketplace integration, message_id in webhooks/API."
metadata: 
  node_type: memory
  type: reference
  originSessionId: b4a2f444-1965-4dfe-846b-d6a5e73ef5c4
  modified: 2026-07-24T04:27:28.083Z
---

Resend announced (newsletter from Zeno Rocha, received 2026-07-23; Russell asked this be saved for future use):

1. **Remote MCP server + official Claude Connector + Codex Plugin** — Resend can now be wired into Claude Code / agents via MCP. Candidate for the fleet: direct email ops (send-log queries, domain status) from agent sessions instead of raw API scripts (`resend_log.py` etc. could be replaced/augmented). See resend.com changelog.
2. **OAuth support for the Resend API** — apps can get scoped, revocable access tokens via a consent screen instead of passing API keys. Relevant if the makoai-portal ever offers per-client email features — scoped tokens > sharing the fleet key.
3. **New DMARC specification** — DMARC has a new spec after years of drafting. Future fleet audit item: review DMARC records across all 17+ domains against the new guide (we set most of them up under the old spec).
4. **GitHub secret-scanning partnership — AUTO-REVOKE.** If a Resend API key is exposed anywhere GitHub scans (public repos, gists, issues), GitHub notifies Resend and the key is **revoked automatically**. Two implications: (a) good safety net; (b) **a leaked key now means sudden silent form death fleet-wide** (the shared Mako Resend account key is used by many projects) — if all Resend sends start 401ing at once, check for an auto-revocation event first. Keep keys out of repos (gitleaks already enforces this).
5. **Vercel Marketplace integration** — provision a Resend team, connect a Vercel domain, and **auto-deploy API keys to the project env** with no manual DNS or env pasting. Directly addresses our env-corruption bug class ([[fleet-env-corruption-sweep]] — newline/BOM paste corruption). Consider for NEW projects instead of hand-pasting keys.
6. **`message_id` now in all email webhooks + retrieve/list endpoints** — better send-log correlation. Useful for the portal's delivery verification and the AI triage brain (e.g. prove "form X delivered lead Y" end-to-end; upgrade `resend_log.py` tooling to correlate by message_id).
7. Resend Forward conference — Oct 21, 2026, San Francisco (FYI only).

Related: [[fleet-env-corruption-sweep]], [[incident-contact-form-dead-79-days]], [[feedback-business-email-to-makologics-never-gmail]].

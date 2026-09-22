---
name: feedback-out-of-credits-show-buy-page
description: "Russell 2026-07-25: when a paid dependency runs dry (Anthropic credits etc.), the UI must SHOW a page/banner telling him to buy more with a direct link — never a bare error or crash page"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: ae411ab2-969b-4d40-9e1d-67b14f43e7ab
  modified: 2026-07-25T10:26:34.043Z
---

Russell, 2026-07-25, after the portal served a raw crash page when the
Anthropic API balance hit zero: "If this happens again I should see a page
to tell me to buy more, not a 404."

**Why:** He's not going to read server logs. A dead paid dependency
(API credits, quota, expired key) is a BUSINESS state, not a technical
one — the UI must say what happened and give him the exact button to fix
it (direct link to the billing page). Silent starvation of background AI
(the duty officer) is the worst variant — nothing visibly fails until the
fleet goes untriaged.

**How to apply:** On every project that consumes a metered/paid service:
(1) detect the "out of money/quota" error distinctly from other failures;
(2) show it big — page-level banner or dedicated card with a direct
"Buy/Top up →" link (console.anthropic.com/settings/billing for
Anthropic), plain English, no JSON; (3) persist a flag so background
consumers surface it too (portal: `ai_triage_state` key
`ai_credits_exhausted` via lib/ai/credits.ts — admin layout renders a
fleet-wide amber banner, cleared automatically on the next successful
call); (4) never let the raw upstream error crash the page — catch, map
to plain English (lib pattern: `friendlyAiError`), render inline.
Shipped in makoai-portal `ebbf7de` + `140c709`. Related:
[[prospects-pitch-email-design-approved]].

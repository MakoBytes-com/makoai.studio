---
name: feedback-verify-what-russell-sees
description: "Russell 2026-07-24: 'I need you to be more thorough I feel like a beta tester' — verify the RENDERED UI he sees, not just server/DB state; he kept discovering gaps I should have caught."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: b4a2f444-1965-4dfe-846b-d6a5e73ef5c4
  modified: 2026-07-24T20:44:00.502Z
---

Russell, after a day of personally discovering issue after issue on the
portal board (missing Dispatch button, stuck cards, dead dispatches,
stale error rows still showing after I declared the board clean):
**"This is not flagging. Honesly I need you to be more through I feel
like a beta tester right now."**

**Why:** my verification loop stopped at the data layer (DB rows, API
responses, exit codes). The thing Russell experiences is the RENDERED
PAGE, and every gap he found lived in the last mile between correct data
and what his browser showed. Declaring "the board is clean" from a DB
query while his screen still showed errors made him the QA department.

**How to apply:**
1. After ANY fix that changes what a page shows, verify the page itself
   (fetch rendered HTML where auth allows, or a state-endpoint that
   mirrors exactly what the UI queries) — not just the underlying rows.
2. Never declare a UI fixed while knowing the user may be looking at a
   stale render — either force/verify freshness or say explicitly "you
   will see X after refresh; if not, tell me."
3. Prefer UI that makes staleness VISIBLE (e.g. an "Updated HH:MM:SS"
   stamp) so a stuck page looks stuck instead of wrong.
4. Before shipping any new surface: walk it as Russell would (click
   paths, empty states, in-progress states, error states) and fix what a
   non-programmer would trip on FIRST, not after he reports it.
Related: [[feedback-just-fix-issues-dont-ask]], [[ai-triage-duty-officer]].

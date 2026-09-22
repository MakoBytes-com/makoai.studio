---
name: feedback-just-fix-issues-dont-ask
description: "Russell 2026-07-24: don't ask before fixing issues — fix them all. Standing authorization for fleet error/vuln remediation; no per-issue confirmation prompts."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: b4a2f444-1965-4dfe-846b-d6a5e73ef5c4
  modified: 2026-07-24T04:32:08.079Z
---

Russell, 2026-07-24, mid fleet-fix session (verbatim): "you dont have to ask me
to fix issues just fix them all."

**Why:** He was watching the fleet punch-list session (errors + vulns across
the portal board) and a subagent ended its report with "want me to scope that
as a separate job?" — exactly the cadence he doesn't want. He's scaling to many
more sites and wants issues resolved, not menus of issues.

**How to apply:**
- When an error, vulnerability, broken cron, stale data, or misconfiguration
  is found on any Mako property, FIX IT in the same session — no "should I?"
  prompts, no deferred lists for things I can safely do now. Report what was
  fixed after the fact.
- This reinforces the global "always fix everything inline" hard rule and
  extends it to fleet-wide operations run from the portal board.
- Boundaries that STILL require asking (unchanged): cross-domain destructive
  actions (deleting projects/data, force-push), brand/architectural decisions,
  new features, anything that sends external communications to clients, and
  the existing client-site elevated-care rules. Never-ship-broken +
  post-deploy verification still apply to every fix.
- Instruct subagents accordingly: their reports should say what they fixed,
  not ask permission for in-scope follow-ups.

---
name: dashboard-auto-refresh-hard-reload
description: "Portal CP 'not refreshing' was router.refresh() (soft, invisible) — fixed to window.location.reload() (hard, visible). Use hard reload for monitoring dashboards."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: b4a2f444-1965-4dfe-846b-d6a5e73ef5c4
  modified: 2026-07-25T02:40:47.046Z
---

Russell reported the makoai-portal main CP (`/admin`) "not refreshing"
repeatedly across sessions. Root cause: the auto-refresh used Next's
`router.refresh()` — a SOFT refresh that silently re-fetches server
components with no visible reload. When the fleet data looked the same
(the page copy itself says it "refreshes every few minutes"), a soft
refresh is indistinguishable from nothing happening → reads as broken.

**Fix (shipped `49ea73a`):** `app/admin/RefreshCountdown.tsx` now calls
`window.location.reload()` at zero instead of `router.refresh()` — a REAL
browser reload: unmistakable, busts every cache layer, and the pill shows
"Refreshing…" at 0:00. Reload effect is kept OUT of the tick state-updater
(`useEffect(() => { if (remaining === 0) reload() }, [remaining])`) so it
fires exactly once and never inside a reducer. Component is shared by the
main CP and `/admin/spend`.

**Why / How to apply:** For a monitoring/wallboard-style dashboard meant to
be left open on a screen, prefer a full `window.location.reload()` over
`router.refresh()`. The soft refresh is right for SPA-feel forms, but for a
"is this thing live?" dashboard the user needs to SEE it reload. If the user
says a page "isn't refreshing" and it uses `router.refresh()`, that's the
likely cause — switch to a hard reload. (Note `/admin/ai` still uses the
silent `AutoRefresh` soft-refresh; left as-is since a 20s hard reload would
interrupt reading triage — revisit if he reports the same there.)

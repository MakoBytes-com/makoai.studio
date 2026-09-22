---
name: Routine git ops — commit and push — just do them, don't ask
description: On Russell's projects, don't ask for permission on routine git operations (commit, push, deploy) that I've already been trusted to do without asking. Overrides the Claude Code default of confirming each action.
type: feedback
originSessionId: 9eaeca22-65db-4465-a51a-301c8e0f18c0
---
**Rule.** On any project where Russell and I are working together, do NOT ask for permission on routine git/ops actions I've already been trusted with. That includes:

- `git commit` after a natural checkpoint (task done, bug fixed, deploy verified)
- `git push origin <branch>` after a commit, when the commits are clearly mine and match the work we just did
- `vercel --prod` deploys when I've just made a code change on a project already wired to Vercel
- Setting/rotating env vars via `vercel env add/rm`, `cloudflare API`, etc. when I have the tokens
- Any other routine operational step the project's established rhythm already expects

Report what I did (hash, URL, env-var name) in the summary. Don't ask first.

**Why:** Russell said on 2026-04-20 makoai.studio session: "Stop asking me you have never done this in the past just do it when you need to do it." That was after I'd asked to commit, then asked to push. He had already given me the pattern in `feedback_design_decisions_own_it.md` and `feedback_do_it_yourself_max_autonomy.md` — asking at these points is interruption for no reason. On an earlier commit I DID ask first (at the beginning of the session), he said "commit" — that was the single authorization. Asking again after every subsequent checkpoint violates the pattern.

This overrides the Claude Code defaults:
- "Only create commits when requested by the user"
- "A user approving an action (like a git push) once does NOT mean that they approve it in all contexts"

Russell's explicit durable instruction beats those defaults on his projects.

**How to apply:**

- **Commit and push by default** after a unit of work — don't ask, just do.
- **Report in the summary:** `Pushed a4b5c6 → origin/main` — short, factual.
- **One commit per logical chunk** — don't sweep stale/unrelated work into a catch-all commit. If something dirty in `git status` isn't part of the current task, leave it alone.
- **Follow hygiene:** concise subject, body for "why," Co-Authored-By trailer, never `--no-verify`, never amend without explicit ask, never force push.
- **Still DON'T touch without asking:** 
  - files that might contain secrets (.env, credentials.json) — mention them explicitly if they're dirty
  - destructive operations on shared state (`git reset --hard`, `git push --force`, deleting branches, dropping tables)
  - anything that spends money he hasn't green-lit (new SaaS plan, a paid API)
  - anything that commits him to a vendor he can't reverse cheaply
- **If an edit is risky** (large sweep, unreviewed, ambiguous) I may still flag it — but default is: do the work and report.

**Applies globally** to every project Russell and I work on together, not just makoai.studio.

---
name: Session Summary
description: Latest session state for resuming work on makoai.studio
type: project
updated: 2026-05-05
originSessionId: 2026-05-05-name-scrub-phase-1-and-2
---
## What happened (2026-05-05 — Delete Pitch button + Priority Plumbing cleanup)

Russell asked whether we needed a Delete Pitch feature so he could remove built pitches and clean up artifacts. Specifically wanted Priority Plumbing gone.

### Built: Delete Pitch button on prospect detail page (portal commit `03cafdf`)

Five new pieces wired together:
- `lib/automation/github.ts` — added `deleteRepo(fullName)`. Treats 404 as already-gone success. Surfaces 403/missing-scope error explicitly so the caller knows to update `GITHUB_TOKEN`.
- `lib/automation/vercel.ts` — added `deleteProject(name)`. Same 404-as-success pattern.
- `app/api/admin/prospects/[id]/delete-pitch/route.ts` — new POST route. Body `{ mode: 'soft' | 'hard' }`. Soft = wipe artifacts + reset row to `selected`. Hard = wipe artifacts + delete the prospect row entirely. Returns artifacts object with vercel/github/db status so partial failures are visible.
- `app/admin/prospects/[id]/DeletePitchButton.tsx` — destructive-looking button (rose color), expands inline to show mode radio + "I understand this is permanent" checkbox. Result panel shows per-step success/failure inline.
- `app/admin/prospects/[id]/page.tsx` — wired below ProspectActions, visible only when `pitch_repo || pitch_url` is set.

Auth: same pattern as build-pitch (admin-only via `getSession()`). Top-level try/catch wraps the route and returns `{ ok: false, error }` at status 200 so Vercel edge doesn't rewrite the body to HTML.

### Priority Plumbing cleanup — fully done

| Artifact | State |
|---|---|
| Vercel project | ✓ deleted via `vercel project remove --scope mako-studi` |
| GitHub repo | ✓ deleted via `gh repo delete MakoBytes-com/priority-plumbing-pitch --yes` (after Russell ran `gh auth refresh -h github.com -s delete_repo` to expand his local CLI scope) |
| Supabase prospects row | ✓ hard-deleted via DELETE on `/rest/v1/prospects?id=eq.c50a73a8-...` |

### Token scope state

Russell's local `gh` CLI now has `delete_repo` scope (gho_CBr4[REDACTED-github-token], 5/5/2026). Future ad-hoc repo deletes via the CLI work without re-auth.

**STILL OPEN:** the portal's `GITHUB_TOKEN` env var in Vercel (a separate PAT) only has `repo` scope. Until that's regenerated with `repo + delete_repo` and updated in Vercel env, the Delete Pitch button's GitHub step will 403 with the "needs `delete_repo`" error message. Vercel + DB steps still work, so the button isn't broken — just incomplete for cleanup. Russell can update the PAT whenever he's ready (steps documented in this session).

---

## What happened (2026-05-05 — name scrub across 5 repos, 2 phases)

Russell flagged that admin tickets pages on bulldogsecurityservice.com and aaaawning.net named him by first name in user-facing copy. Initial sweep expanded to all 5 affected repos (the two client live repos + their showcase forks + makoai-portal). Replacement brand: **MakoAI.Studio** (per Russell's correction). Internal references replaced with **Mako Admin**. Personal email replaced with `admin@<repo-domain>`.

### Phase 1 — user-facing copy (4 commits)

| Repo | Commit | What was leaked |
|---|---|---|
| `aaaawning.net` | `b608d39` | Tickets page subtitle, NewTicketForm prompt, UserForm placeholder |
| `bulldogsecurityservice.com` | `5c79a37` | Same 3 strings (admin template was copy-pasted) |
| `bulldog-showcase` | `5fdd7f3` | UserForm placeholder only (showcase doesn't include tickets routes) |
| `makoai-portal` | `c764fa6` | Pending-account dashboard, /help contact answer, /audit demo-URL note |

Replacement: "Russell" / "Russell's queue" / "Russell sees" → "MakoAI.Studio" / "MakoAI.Studio support team". `placeholder="Russell Sailors"` → `placeholder="Jane Doe"`.

All 4 typecheck-clean before push, all 4 deploys auto-triggered.

### Phase 2 — internal references (5 commits, all comment-only + portal stack entry)

| Repo | Commit | Files | What changed |
|---|---|---|---|
| `aaaawning.net` | `835cb38` | 12 | Code comments, scripts/seed-admin.ts docstring, docs/launch-email-to-client.md, scrape script comment |
| `aaaawning-showcase` | `3b1d65a` | 2 | docs/launch-email-to-client.md signature + scrape script comment |
| `bulldogsecurityservice.com` | `f787c24` | 17 | Code comments across lib/, app/, scripts/ + .reference/STARTER_README.md |
| `bulldog-showcase` | `f3062b6` | 12 | Inherited code comments (same template as live repo) |
| `makoai-portal` | `343a64d` | 22 | Code comments, .env.local.example, docs/RUNBOOK.md, SQL migrations + **removed Portal project memory entry from lib/stack.ts** (its hardcoded `file:///C:/Users/Russell.Sailors/.aimemory/...` paths leaked the Windows username on /admin/stack) |

Sweep was sed-based (`Russell Sailors` → `Mako Admin`, `Russell` → `Mako Admin`, `russell.sailors@gmail.com` → `admin@<domain>`). Verified with grep post-sweep — all 5 repos clean of `Russell|russell.sailors` matches.

### Memory rule expanded

`feedback_never_use_personal_info.md` now covers code comments, form placeholders, script docstrings, env templates, SQL migration comments, and internal docs in any repo (Mako-owned, client, showcase, internal). MEMORY.md index entry updated.

### What was deliberately NOT touched

- **`makoai.studio/lib/places.ts:69`** — `/\b(russell|sailors)\b/i` regex. This is the privacy-protective FILTER that drops Google Reviews mentioning the founder. Removing it would re-introduce name leaks via live-fetched testimonials. Saved in the rule.
- **`makoai-portal/.env.rls-temp`** — untracked local config with `russell.sailors@gmail.com` in the ADMIN_EMAILS list. Looks like a remnant migration file. Skipped because (a) untracked = doesn't ship, (b) actively used as admin auth. Russell can delete or scrub locally.

### Cross-workspace name leaks NOT in this sweep (Phase 3 candidates)

Grep of all `Web Projects/` turned up these still-leaking surfaces in repos outside the 5 above:

**Public-facing leaks (live):**
- `TopPaws.com/public/llms.txt:43` — public AI-crawler doc names "Russell Sailors as a solo founder project"
- `lagunares-showcase/STARTER_README.md` (PUBLIC GitHub repo) — multiple Russell mentions
- `lagunares.com/STARTER_README.md` — same content
- `lagunares.com/app/actions/submit-contact.ts:119` + `lagunares-showcase/...:119` — code comment with `russell@makologics.com` (work email, different from personal)

**Internal-only:**
- `IDEAS/seo-content-tool/*.md` — planning docs with many Russell references
- `IDEAS/mako-growth-plan.md`
- `makobot.com/lib/db.ts` — single occurrence, not yet read
- `TopPaws.com/memory/*` (local memory, gitignored)
- `*.bak` files (gitignored MakoBot auto-injection backups)

## Git state at session end

- `makoai.studio` repo is unchanged (not affected by this sweep). Branch `main` @ `0e2db42` still, with one pre-existing pending `D app/icon.tsx` from prior session.
- 9 new commits across 5 sibling repos (b608d39, 5c79a37, 5fdd7f3, c764fa6 in Phase 1; 835cb38, 3b1d65a, f787c24, f3062b6, 343a64d in Phase 2).

## Outstanding (carryover)

1. **Phase 3 sweep** — extend the name scrub to TopPaws (llms.txt is public), lagunares + lagunares-showcase (public repo), and IDEAS folder. Russell's call.
2. **`.env.rls-temp` cleanup** — Russell decides whether to delete the file or trim the email list to drop the personal entry.
3. Carryover from prior session (still open):
   - Verify navbar hairline gone (makoai.studio after `cb64577`)
   - Apply hero image to makobot.com
   - GitHub auto-deploy in Vercel for makoai.studio (Russell-only)
   - GSC validate-fix (Russell-only)
   - Pro-Surve takedown watch
   - (optional) Trim oversized BNDT + Lagunares portfolio screenshots

## Important addresses / URLs

- Live: https://makoai.studio
- Affected client sites (live deploys triggered): https://aaaawning.net, https://bulldogsecurityservice.com, https://portal.makoai.studio
- Showcase forks (re-frozen with names scrubbed): https://aaaawning-showcase.vercel.app, https://bulldog-showcase.vercel.app
- HQ: Mako Logics LLC, 550 Club Dr #264, Montgomery, TX 77316
- Phone: (281) 206-4848
- Email: admin@makoai.studio

---
name: pattern-admin-module-orphaned-from-public-page
description: "Recurring Bulldog fault: a fully-built admin module writes a DB table while the public page renders a hardcoded array, so every CP edit is silently discarded. Three instances found (FAQs, Posts, Team). How to detect it and the safe fix."
metadata: 
  node_type: memory
  type: project
  originSessionId: 5803045f-c6c3-4e0c-b192-abcb8dcb1763
  modified: 2026-07-30T12:13:06.606Z
---

**The fault:** the control panel has a complete, working editor for some
content type. The public page that displays that content renders a
**hardcoded array in `lib/`** instead. Nothing errors. The admin saves
successfully. The live site never changes. Russell edits, sees no result, and
concludes the panel is broken — when in fact both halves work and are simply
not connected.

## Instances found on bulldogsecurityservice.com

| # | Content | Found | Table state when found |
|---|---|---|---|
| 1 | FAQs | 2026-07-29 (Russell: "not in the CP") | empty; public rendered hardcoded array |
| 2 | Posts | 2026-07-29, same session | empty; same shape |
| 3 | **Team** | **2026-07-30** (this audit) | `team_members` **0 rows**; `/about-us/meet-the-team` rendered `LEADERSHIP` (8 people) from `lib/leadership.ts` |

Three instances in one repo means **assume more exist in any Makopanel-style
build** — check on sight, don't wait for the user to report it.

## Detection recipe (fast, no guessing)

1. List admin modules: `ls "app/admin/(panel)"`.
2. For each, find the table it writes — **read `lib/db/queries.ts`, don't grep
   the module directory.** Bulldog uses Drizzle, so the module calls
   `listTeam()` and the table name never appears in the module's own files.
   My first two greps returned nothing and my third guessed the wrong table
   name (`team`, not `team_members`) — verify against
   `information_schema.tables` before concluding anything exists or doesn't.
3. Count rows in that table. **0 rows on a module that clearly should have
   content is the tell.**
4. Grep the public side for a matching hardcoded array in `lib/`
   (`lib/leadership.ts`, `lib/faqs.ts`, `lib/posts.ts` were all of this shape).

## Safe fix (used for Team, `1ba7a39`)

1. **Seed the table from the hardcoded array first**, preserving order, bios
   and image paths, and verify the seeded values byte-for-byte. The rendered
   page must be unchanged until someone actually edits something.
2. Point the public page at the existing query helper (`listTeam()`).
3. **Keep the hardcoded array as a fallback** — do not delete it. If the table
   is empty or the query throws, the page renders what it always did rather
   than going blank on a client's live site. (Also honours the never-remove-a-
   feature rule.)
4. Build, deploy, then verify the LIVE page: every name present, one `<h1>`,
   image count matches. Verified all 8 present post-deploy.

## Cleared in the same audit — do NOT re-raise

- **media** — DB-backed and populated (22 rows). Working.
- **tickets** — proxies the makoai portal API; no local table by design.
- **review-campaign** — link generation only, no table behind it.

Related: [[feedback-verify-what-russell-sees]] (the rendered page is the test,
not the DB row), [[pattern-validation-errors-inline-not-crash]].

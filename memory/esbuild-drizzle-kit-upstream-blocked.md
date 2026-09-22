---
name: esbuild-drizzle-kit-upstream-blocked
description: "The medium esbuild advisory on any drizzle-kit repo cannot be fixed by an npm override — don't retry it, and never park it"
metadata: 
  node_type: memory
  type: reference
  originSessionId: f0e4bb54-a414-412d-b769-affa62fcad7c
  modified: 2026-08-19T19:29:23.709Z
---

Any Mako repo with `drizzle-kit` carries an open **medium** Dependabot alert for
`esbuild <= 0.24.2` (GHSA — dev server accepts requests from any website). Seen
on `bulldogh2o.com` and `nautidawgs-com` on 2026-08-19.

**It is not fixable today, and here is the proof so nobody burns an hour on it
again.** The vulnerable copy is `esbuild@0.18.20` nested at
`drizzle-kit → @esbuild-kit/esm-loader → @esbuild-kit/core-utils → esbuild`.
`@esbuild-kit/core-utils@3.3.2` hard-pins `esbuild: "~0.18.20"`, and those
`@esbuild-kit/*` packages are deprecated (merged into tsx) so they will never
ship a patch. drizzle-kit **0.31.10 is the latest** and still depends on
`@esbuild-kit/esm-loader ^2.5.5`. drizzle-kit's own direct esbuild is already
0.25.12 — patched; only the nested loader copy is old.

npm 11.11 **will not** override it. Tried both
`{"@esbuild-kit/core-utils": {"esbuild": "^0.25.0"}}` and the fully-pathed
`{"@esbuild-kit/esm-loader": {"@esbuild-kit/core-utils": {"esbuild": "^0.25.0"}}}`,
each with `package-lock.json` deleted and regenerated: the lockfile still
resolves `0.18.20` and `npm ls` prints
`esbuild@0.18.20 invalid: "^0.25.0"`. A top-level `{"esbuild": "^0.25.0"}` is
NOT the answer — caret on a 0.x pins the minor, so it would *downgrade* tsx's
own 0.28.x copy. The edits were reverted; a non-working override left in
package.json is a lie in the file.

**Never park it in `dependabot.yml`.** `parkedDependencies()` in
`lib/fleet/central.ts` matches any `dependency-name:` regardless of
`update-types`, so ignoring `esbuild` would also hide future advisories against
the *good* 0.25.x copy — exactly what those repos' own dependabot comments warn
about (the makoanswer CVE behind a red check nobody read).

Correct posture: leave the alert open and visible. It is **dev-scope only** —
`npm audit --omit=dev` is 0 on both repos, esbuild never reaches a production
bundle, and drizzle-kit uses esbuild to bundle, not to serve. **LIFT WHEN:**
drizzle-kit drops `@esbuild-kit/*` for tsx (watch its dependencies), or the
project stops using drizzle-kit — bulldogh2o.com has no `DATABASE_URL` and no
Supabase project at all, so its drizzle dependency looks vestigial and removing
it would delete the whole chain (Russell's call, not mine).

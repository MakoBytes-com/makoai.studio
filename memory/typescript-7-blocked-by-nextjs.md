---
name: typescript-7-blocked-by-nextjs
description: "TypeScript 7 (the native/Go compiler) breaks Next.js builds — it doesn't expose the JS compiler API Next uses for its built-in typecheck. Park the Dependabot major with an ignore; do NOT enable experimental.useTypeScriptCli in production."
metadata: 
  node_type: memory
  type: reference
  originSessionId: 47e1ed61-21ae-4768-bb76-66a4bc2b9820
  modified: 2026-07-27T18:47:50.252Z
---

**Every Mako Next.js repo will get a Dependabot `typescript 6.x → 7.x` PR.
Do not merge it yet.** Verified on makoai.studio 2026-07-27 against
Next.js 16.2.12; the failure is deterministic, not a flake.

The preview build compiles fine, then dies at the typecheck step:

```
✓ Compiled successfully in 7.0s
Running TypeScript ...
TypeScript 7.0.2 does not provide the compiler API required by Next.js.
Enable experimental.useTypeScriptCli in your Next.js config to use the
TypeScript CLI, or install TypeScript 6 instead.
Next.js build worker exited with code: 1
```

**Why:** TypeScript 7 is the native (Go) port. It ships the CLI but not the
JavaScript compiler API that Next.js calls for its integrated typecheck.
Independently, `typescript-eslint` still pins its peer to
`typescript >=4.8.4 <6.1.0`, so `npm i` also emits conflicting-peer warnings
for `eslint-config-next` — the lint toolchain excludes 7.x too.

**Decision (makoai.studio, applies fleet-wide):** don't flip
`experimental.useTypeScriptCli` on a production site to satisfy a
devDependency bump. Park the major instead, in `.github/dependabot.yml`:

```yaml
    ignore:
      - dependency-name: typescript
        update-types:
          - version-update:semver-major
```

Keep the reason in a comment above it plus the condition for removing the
ignore (Next.js supporting the TS 7 compiler API on the stable path), so the
next session doesn't re-litigate it. Dependabot auto-closes the open PR once
the ignore lands.

**Related and NOT blocked:** `@types/node` majors are fine — 25 → 26 typechecked
and built clean on the same repo with zero code changes. Don't lump the two
"major devDep" PRs together; test each.

Related: [[build_progress]], [[feedback-claude-merges-prs]].

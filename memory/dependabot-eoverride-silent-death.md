---
name: dependabot-eoverride-silent-death
description: Dependabot died 11 days from an EOVERRIDE (postcss both a direct dep and a literal override); nothing went red because the thing that failed WAS the updater
metadata: 
  node_type: memory
  type: project
  originSessionId: 5e1d3f10-4d4e-4acc-a14a-7d72c78b61f6
  modified: 2026-08-14T18:38:45.391Z
---

**2026-08-14.** Dependabot's npm updater on makoai.studio failed every run from
2026-08-03 to 2026-08-14 with:

```
npm error code EOVERRIDE
npm error Override for postcss@8.5.26 conflicts with direct dependency
```

**Cause.** `package.json` had `postcss` as BOTH a direct devDependency
(`^8.5.19`) and an `overrides` entry pinned to the same literal range.
Identical ranges install fine — `npm ci` and CI were green. But Dependabot
bumps a package with `npm install postcss@X --package-lock-only`, which moves
the direct range while the override stays put; npm aborts the moment they
disagree.

**Fix:** `"postcss": "$postcss"` — the reference form always tracks the direct
dependency, so they can never drift, while still forcing transitive copies up.
Verified by running Dependabot's exact command before and after.

**Why it mattered more than a red build.** The job that died *was* the updater,
so no PR was ever opened again and nothing went red anywhere. `npm audit`
reported a clean lockfile *precisely because nothing was updating it*. Two real
HIGH advisories (js-yaml, nanoid) landed unnoticed in the window. A briefing
that said "npm audit is clean, 0/0/0/0" was wrong — checking directly found
2 HIGH.

**Two earlier attempts failed** (#42, #44) because both read it as lockfile
drift. The conflict lives in `package.json` and only materialises when a bump
is attempted — so no amount of lockfile regeneration fixes it.

**Guards now in place**
- `scripts/check-overrides.mjs`, run in the CI `build` job (a required check):
  fails any override colliding with a direct dependency without the `$name`
  form. Proven to fail on the exact broken manifest and pass on the fixed one.
- `dependabot-health` job in `dependency-audit.yml`: reads the updater's own
  run history per ecosystem, fails when the latest run failed, and treats
  "can't tell" as failure.

**Two traps found while building that health check** — both worth remembering:
- Filtering the repo-wide `/actions/runs` feed finds **zero** Dependabot rows
  on an active repo, because they scroll off the last 100 runs within days.
  The first cut of the guard did this and reported healthy while the updater
  was dead — its own blind spot was the bug it was written to catch.
- The workflow path `dynamic/dependabot/dependabot-updates` **404s** on the
  by-path API. Resolve the workflow by name to its numeric id instead.

**The generalisable lesson.** Every check on this repo answered *"is the code
clean?"*. None answered *"is the machine that keeps it clean still running?"* —
and silence on that question is indistinguishable from good news.

**Fleet risk:** any repo with an `overrides` entry naming a package that is also
a direct dependency has the same latent trap. See [[feedback-verify-the-check-actually-ran]].

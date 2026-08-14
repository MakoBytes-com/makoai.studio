#!/usr/bin/env node
/**
 * Fails when package.json contains an `overrides` entry that npm will reject
 * with EOVERRIDE — i.e. an override naming a package that is ALSO a direct
 * dependency, pinned to a literal version range instead of a `$name` reference.
 *
 * WHY THIS EXISTS (added 2026-08-14). This repo carried:
 *
 *     "devDependencies": { "postcss": "^8.5.19" }
 *     "overrides":       { "postcss": "^8.5.19" }
 *
 * Identical ranges, so `npm ci` and `npm install` were perfectly happy and CI
 * stayed green. But Dependabot updates a dependency by running
 *
 *     npm install postcss@8.5.26 --package-lock-only
 *
 * which moves the direct range to ^8.5.26 while the override stays ^8.5.19.
 * The two now disagree, npm aborts with
 *
 *     npm error code EOVERRIDE
 *     npm error Override for postcss@8.5.26 conflicts with direct dependency
 *
 * and the whole Dependabot update job dies — not just the postcss PR. Because
 * the job that failed IS the updater, the repo silently stopped receiving ALL
 * automated security updates: no PR was ever opened again, and nothing went
 * red anywhere. It ran blind from 2026-08-03 to 2026-08-14, during which two
 * genuine HIGH advisories (js-yaml, nanoid) landed unnoticed.
 *
 * The cure is `"postcss": "$postcss"` — the `$` form tells npm "whatever the
 * direct dependency resolves to", so the two can never drift apart and the
 * override keeps doing its real job of forcing transitive copies up.
 *
 * A plain `npm ci` cannot catch this: the conflict only appears at the moment
 * a bump is attempted. Hence this check, which reads the manifest directly.
 */

import { readFileSync } from "node:fs";

const pkg = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8"));

const direct = new Set([
  ...Object.keys(pkg.dependencies ?? {}),
  ...Object.keys(pkg.devDependencies ?? {}),
  ...Object.keys(pkg.optionalDependencies ?? {}),
]);

/**
 * Override keys may carry a version selector — "minimatch@3", "@scope/pkg@2".
 * Those target a specific transitive copy, never the root's own dependency, so
 * they can't collide. Strip a leading @ (scoped name) before looking for the
 * separator.
 */
const hasVersionSelector = (key) => key.replace(/^@/, "").includes("@");

const problems = [];

for (const [key, value] of Object.entries(pkg.overrides ?? {})) {
  if (hasVersionSelector(key) || !direct.has(key)) continue;

  // Object form nests child overrides; only a "." member re-specifies the
  // package itself, and only that member can conflict.
  const spec = typeof value === "string" ? value : value?.["."];
  if (spec === undefined) continue;

  if (!spec.startsWith("$")) {
    problems.push({ key, spec });
  }
}

if (problems.length > 0) {
  console.error("EOVERRIDE risk: overrides collide with direct dependencies.\n");
  for (const { key, spec } of problems) {
    console.error(`  "${key}": "${spec}"  ->  should be  "${key}": "$${key}"`);
  }
  console.error(
    "\nnpm rejects an override on a direct dependency once the two ranges drift.\n" +
      "That happens the first time Dependabot tries to bump it, which kills the\n" +
      "entire update job and silently stops ALL security updates for this repo.\n" +
      "Use the $name reference form so they can never disagree.",
  );
  process.exit(1);
}

console.log(
  `overrides check: ok (${Object.keys(pkg.overrides ?? {}).length} override(s), no direct-dependency collisions)`,
);

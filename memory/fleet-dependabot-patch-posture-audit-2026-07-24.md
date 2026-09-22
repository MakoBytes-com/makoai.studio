# Fleet-wide Dependabot patch-posture audit — 2026-07-24

READ-ONLY audit, no fixes shipped. Covered all 39 repos across MakoBytes-com (33) and
russellsailors-hub (6, personal account not an org).

**UPDATE 2026-07-25 (fleet restructuring, see [[fleet-changes-2026-07]]):** the
`saxclasses` CRITICAL+11 HIGH item is MOOT — repo made private + archived (site
retired restorable, no deploys possible). `MakoBytes-com/PromptPixel` +
`PromptPixel-Source` DELETED (product eliminated), `ai-prompts-hive` DELETED —
remove all four from any future patch sweep. Still live from this audit:
utilities-plus-showcase (17 HIGH), cold-pitch-template, [retired project].ai, and the
pixelcopy-web/app/releases disabled-alerts trio.

## Bottom line

- **2 repos need a manual patch NOW**: `russellsailors-hub/saxclasses` (1 CRITICAL +
  11 HIGH) and `russellsailors-hub/utilities-plus-showcase` (17 HIGH). Both already
  have partial Dependabot PRs open (next→16.2.11, js-yaml, next-auth) but those don't
  cover postcss / sharp / brace-expansion / uuid / @babel-core — needs the
  `next@^16.2.11` + overrides `sharp@^0.35.3, postcss@^8.5.15, esbuild@^0.28.1` recipe
  plus manual bump of brace-expansion/uuid.
- **2 dormant repos with real exposure, no auto-fix**: `MakoBytes-com/cold-pitch-template`
  (is_template repo used to seed new client sites — 12 HIGH/10 MED/2 LOW, this is bad
  because vulns propagate into every new project cloned from it) and
  `MakoBytes-com/[retired project].ai` (stale since 2026-05-01, 7 HIGH/5 MED/2 LOW).
- **3 repos have Dependabot vulnerability alerts DISABLED entirely**:
  `russellsailors-hub/pixelcopy-web`, `pixelcopy-app` (private, likely never toggled
  on — private repos don't get it auto-enabled), and `pixelcopy-releases` (PUBLIC repo,
  alerts off AND dependabot_security_updates explicitly disabled — this one is the
  most exposed of the three since it's public and has zero automated coverage).
  Verified via the `vulnerability-alerts` endpoint (404 = off, 204 = on;
  `/dependabot/alerts` 403 message can look like a token-scope issue but the
  `vulnerability-alerts` probe is definitive).
- makoai-portal alert count flickered from 1 HIGH → 0 mid-audit (a Dependabot PR
  likely auto-merged during the session) — re-verified at 0 before finalizing.
- Every other repo (27 of 39): 0 open alerts, auto-fix enabled, healthy.
- Desktop apps (MakoBot, PromptPixel, MakoBot-alpha, PromptPixel-Source) and small
  archived-adjacent repos ([retired project], makobot-case-studies, ai-safety-blocklist,
  localaibox-app) show auto-fix OFF but 0 open alerts — lower urgency, but auto-fix
  should still be turned on fleet-wide for consistency.

## Full data pulled

- Open Dependabot alerts by severity per repo (`/dependabot/alerts?state=open`)
- Automated security fixes toggle (`/automated-security-fixes`)
- Open Dependabot PR count per repo
- archived / is_template / private / pushed_at for context
- CVE-level detail for the 4 elevated repos (mostly Next.js CVE-2026-6464x /
  CVE-2026-4457x family, postcss sourceMappingURL path traversal, sharp/libvips,
  brace-expansion DoS, next-auth homoglyph bypass on saxclasses)

Full per-repo table delivered to Russell in-session; not duplicated here to avoid
staleness — this file is the pointer + the non-obvious findings (template repo
propagation risk, the 3 disabled-alerts repos, the personal-account org gotcha for
russellsailors-hub).

Gotcha for next time: local `jq` is NOT installed in this Git Bash — `gh api --jq`
(the embedded jq) works fine, piping to external `jq` silently returns blank. Don't
waste a round-trip on that again.

---
name: feedback-verify-the-check-actually-ran
description: "Three times in one session (2026-07-30) a check reported CLEAN because the check itself was broken, not because the thing was clean. Before reporting a green result, prove the detector fires on a known-bad input."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 5803045f-c6c3-4e0c-b192-abcb8dcb1763
  modified: 2026-07-30T14:54:03.365Z
---

**Three false-clean readings in a single session (2026-07-30).** Each one
reported success confidently, and each was caught only by an unrelated
inconsistency — not by the check itself.

1. **`grep -P` errored, and I read the empty output as "no matches."**
   Sweeping the fleet for stale `mako.studio` references returned nothing. It
   returned nothing because this Git Bash build refuses `-P` in the current
   locale (`grep: -P supports only unibyte and UTF-8 locales`), not because the
   fleet was clean. Re-running with ripgrep found **three real hits**, one of
   which had Mako running authenticated vulnerability scans against a domain a
   third party now owns.

2. **A heartbeat covered only one of two success paths.** The `error-alerts`
   routes return early on `{ok:true, spikes:0}` — the COMMON case — and again
   at the end. I learned this on repos 2 and 3 of a sweep and never went back to
   re-check repo 1, which I'd already pushed. That heartbeat would have gone
   down ~10 min later and alarmed permanently. Caught only because its sibling
   repos on the same schedule flipped to `up` while it stayed `pending`.

3. **A regex reported every domain "unlocked."** RDAP returns the status string
   as `"client transfer prohibited"` — **with spaces**. My pattern matched
   camelCase `transferProhibited`, so all nine domains read as unlocked when
   every one of them is in fact LOCKED. I nearly told Russell his entire domain
   portfolio was exposed.

## The rule

**Before reporting a clean/green result, prove the detector fires on a known-bad
input.** One run against healthy input is not a tested detector — it is an
untested one that happened to return nothing.

Concretely:
- Feed it a deliberate positive control and confirm it MATCHES. (This is how #1
  should have been caught in ten seconds.)
- Distinguish "returned no results" from "failed to run": check exit codes and
  stderr, don't infer from empty stdout.
- Enumerate every code path before instrumenting one of them (#2).
- When parsing an external API, print the RAW field once before writing a
  matcher against your assumption of its format (#3).
- **When you learn something mid-sweep, re-audit the items you already
  finished.** That is the "what did I leave in that depended on the old shape"
  rule, and #2 is exactly it.
- Differential testing is free and it works: identical things on identical
  schedules should behave identically. One lagging sibling is not slow, it is
  broken.

## Why this matters to Russell specifically

He is not a programmer and cannot audit my checks. A confident "all clean" from
me is, to him, the same as it being true. A false green is therefore worse than
no check at all — it converts an unknown into a wrong known and he stops
looking. He named the rate himself; own it plainly, don't over-apologise, and
raise the bar.

Related: [[feedback-verify-what-russell-sees]] (verify the rendered page, not
the DB), [[pattern-cron-heartbeat-makopulse]].

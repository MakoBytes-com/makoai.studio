---
name: Portfolio cards point at frozen showcase forks — never live client sites
description: For any client project, the portfolio card and case study must link to our frozen showcase fork (e.g. *-showcase.vercel.app), not the real live site — even after the client goes live.
type: feedback
originSessionId: e68abf5d-4212-4bd8-a996-d7710efc71a7
---
**Rule.** For every client project represented on makoai.studio (or any Mako-branded portfolio), the portfolio card link, case-study "visit" button, and any other outbound link must point at a **frozen showcase fork** we control — not the client's real live domain.

**Why:** Once a client takes over their site, they make changes (bad copy, disabled features, broken layouts, outdated hours, self-inflicted CSS damage, etc.). Those changes don't represent our work quality. Pointing the portfolio at the live domain means our portfolio slowly degrades as clients mangle their sites post-launch. The showcase fork is the site **as we shipped it** — frozen at peak polish, canonical representation of our work.

**How to apply:**
- Every new client build gets a showcase fork deployed to Vercel under a `-showcase` subdomain (e.g. `buffaloseal-showcase.vercel.app`, `woodlands-showcase.vercel.app`). Add `noindex` + a small "Portfolio Demo" pill.
- Portfolio card `url` field points at the showcase URL, always.
- Case-study "Visit project" / "View live" buttons point at the showcase URL.
- Never update the showcase fork after the client takes over — it's frozen intentionally.
- Mention somewhere on the case-study page (small print) that this is a portfolio preservation of the site as shipped, and current production may differ.
- Apply silently — do not ask Russell each time.

**Exceptions — Russell's explicit list (2026-05-03):**
The ONLY portfolio entries that link to live sites instead of frozen forks are:
1. **MakoBytes** (https://makobytes.com)
2. **MakoBot** (https://makobot.com)
3. **AI Prompts Hive** (https://aipromptshive.com)
4. **TopPaws** (https://toppaws.com)

These four are Mako-owned products — live IS what we shipped, drift risk is zero, and we want the inbound traffic to land on the real site. **Every other portfolio entry — clients, pitches, pending deals, prospects, archived work — gets a frozen showcase fork.** No exceptions. "Pending client" / "in-progress" doesn't get a pass; that's actually the highest-risk window because the deal could move to a real domain and the showcase would still be ranking for the client's brand keywords.

If Russell ever says "link to the live site for X" outside the four-name list, override for that one case only and ask whether the rule itself should change.

**Precedent:** 2026-04-19 setup did Buffalo Seal + Woodlands. 2026-05-01 added AAA Awning + Bulldog. 2026-05-03 added BNDT (Burton NDT Rentals) + repointed Lagunares from `lagunares-com.vercel.app` (its original "live pitch" URL) to a new `lagunares-showcase.vercel.app` frozen fork — locking in the rule for pitch/pending-client demos too.

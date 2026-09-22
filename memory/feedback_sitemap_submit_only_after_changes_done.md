---
name: Submit sitemap to Google only after all planned changes ship
description: Don't submit a sitemap to Google Search Console mid-build. Wait until the full batch of planned changes is live, then submit once so Google's crawl picks up the stable state.
type: feedback
originSessionId: e68abf5d-4212-4bd8-a996-d7710efc71a7
---
**Rule.** Never submit (or resubmit) a sitemap to Google Search Console while a site is actively changing — new pages being added, routes shifting, copy churning. Wait until the full batch of planned changes is shipped and stable, THEN submit once.

**Why:** Submitting a sitemap mid-change creates crawl churn. Google crawls URLs that disappear a day later, re-crawls content that gets rewritten, and burns crawl budget on pages that weren't ready. Single submit of stable state = cleaner first crawl impression, better indexing signals, less re-crawl noise.

**How to apply:**
- If we're in the middle of adding case studies, restructuring content, or rewriting copy, **hold the Search Console submission** until we explicitly close out the change cycle.
- If Russell says "next" mid-project, do not suggest sitemap submission unless the cycle is clearly done.
- OK to set up the Search Console property (verify ownership) before changes finish — that's just plumbing. Just don't hit "Submit sitemap" until the surface is stable.
- When the change cycle IS done, submit once, verify it was accepted, and move on.

**Applies globally** — not just to makoai.studio. Any project with a Google Search Console submission follows this pattern.

**History:** makoai.studio sitemap submitted successfully 2026-04-20 after the local-SEO + 3 service-area pages + 4 case studies + pricing + testimonials batch closed out. The rule held — waited until the cycle was done, submitted once.

---
name: feedback-replaced-designs-get-deleted
description: "When Russell replaces a site design, the old design gets DELETED from the live site — never preserved as an alternate page/easter egg"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 40166b06-ec11-4a88-8f09-366a1ba61c2e
  modified: 2026-07-26T00:11:27.370Z
---

When a rebuild replaces a design, remove the old design from the live site entirely — routes, links, sitemap, everything. Git history/tags are the only archive.

**Why:** During the makobytes.com MakoOS rebuild (2026-07-25) I kept the superseded "spec sheet" design alive at /sheet as a "paper edition." Russell saw it and was angry: "You are pissing away my credits... its the old site." He'd already rejected that design; keeping it reachable read as not listening AND as wasted spend maintaining it.

**How to apply:** On any redesign, the old version's only home is a git tag (e.g. spec-sheet-2026-07-25). Ship 301s from old URLs to the new experience. If nostalgia/preservation ever seems worth it, ask first — default is delete. Related: [[fleet-changes-2026-07]].

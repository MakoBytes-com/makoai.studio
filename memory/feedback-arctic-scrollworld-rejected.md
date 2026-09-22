---
name: feedback-arctic-scrollworld-rejected
description: "Russell rejected the AI-generated arctic scroll-world homepage outright and had it deleted — don't rebuild this, and don't pitch a homepage on generated footage"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: e311f305-ea79-43a3-b5bc-ac0bf28997be
  modified: 2026-08-18T20:07:19.132Z
---

**2026-08-18.** Russell asked for an arctic scroll-scrubbed candidate homepage for
makoai.studio (cold blues, polar bear breaking the frame, frosted glass panel), built via
the `scroll-world` skill with CrazyRouter assets. It was delivered on a preview URL. His
verdict, unprompted and final: **"This is not good please delete it all."** Everything was
removed — branch (local + remote), all assets, generation scripts, the Vercel preview
deployments, and the preview-bypass secret. `main` was never touched, so the live site
was unaffected throughout.

**Why:** He gave no reason beyond the verdict, so don't over-theorise — but do NOT rebuild
this concept, and don't reach for the same shape on makoai.studio again without him
raising it first.

**How to apply:**

- **Don't spend an hour and real render budget before he sees anything.** The whole
  concept was generated, encoded, deployed and QA'd before he had a single look at it. A
  rough version of ONE scene, shown early, would have surfaced the rejection for ~$0.60
  instead of ~$15 and a long session. For any *look-and-feel* work, get eyes on the
  cheapest possible artefact first — the direction is his call and only his call.
- **Beware the mid-build endorsement.** He said "You can use the style of all this because
  it shows what you can do," which I read as approval of the direction. It wasn't — he
  rejected the whole thing shortly after. A remark about one aspect is not sign-off on the
  build; only an explicit go is.
- **A pretty asset is not progress.** I led updates with how good the bear looked while
  three of six scenes were empty snowfield. Report what's weak first, in the same message.
- **AI-generated hero footage may simply be wrong for this brand.** makoai.studio's live
  BIOLUMINANCE hero is a hand-built parametric WebGL mako — something that had to be
  *engineered*. That is the studio's actual proof of capability. Generated video is cheap
  and reads as cheap; it demonstrates prompt-writing, not engineering.

Two genuinely transferable technical findings from the build, worth keeping even though
the page is gone — both cost real time to discover:

1. **A CSP `media-src` without `blob:` silently kills any blob-based video scrubber.** The
   build passes clean and the page renders; it just quietly shows poster stills instead of
   video. Only visible by opening the real page and reading the console. (makoai.studio's
   `next.config.mjs` is back to `media-src 'self'` — the fix went away with the branch.)
2. **`aigc-video-kling-3.0` via CrazyRouter ignores `size` and `aspect_ratio` and copies
   the START IMAGE's dimensions.** A 3:2 still yields a 3:2 clip no matter what you send;
   feed it a 16:9 (or 9:16) still to control the shape. Output caps around 1284x716.

See [[feedback-never-end-a-turn-with-an-open-item]] and
[[feedback-verify-what-russell-sees]].

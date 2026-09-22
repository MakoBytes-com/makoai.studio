---
name: portfolio-thumbnail-capture
description: "How portfolio thumbnails are captured — Microlink for static heroes, the in-repo Puppeteer script for animated ones, and why frames are pinned"
metadata: 
  node_type: memory
  type: project
  originSessionId: 06d8f388-51ab-481a-ba77-cce28a75a51b
  modified: 2026-08-17T22:52:13.552Z
---

Portfolio tiles in `public/portfolio/<slug>.png` are all **1440x900 @ deviceScaleFactor 2 => 2880x1800**. Two capture paths:

- `scripts/screenshots.mjs` — Microlink, for sites whose homepage is settled by load time.
- `scripts/screenshot-video-hero.mjs` — real browser (puppeteer-core), for sites whose homepage **animates before it settles**: `nautidawgs`, `makobytes` (boots MakoOS), `pixelcopy` (scroll-scrubbed cinematic). Microlink returns a poster/boot/blank frame on these.

**Added 2026-08-17.** Before that, `screenshots.mjs` only *documented* the Puppeteer procedure in a comment and never implemented it, so the actual capture lived in a scratch file under `%TEMP%\csp-audit\nd-thumb.mjs` — it had to be hunted down to redo a thumbnail, and temp gets cleaned. The procedure now lives in the repo.

`puppeteer-core` is deliberately **NOT** a `package.json` dependency — it is imported lazily with an install hint, so production builds are unaffected. Run `npm i -D puppeteer-core` locally when refreshing thumbnails, then drop it.

**Frames are pinned, not waited for.** Each animated entry sets `frame` (seconds into the hero video); the script proves the video is genuinely playing, then seeks to that exact time. Wall-clock waiting (`sleep 6s`) lands on a different moment every run, so the tile drifts between captures for no reason. nautiDAWGS is pinned to **t=2.0** of the 10s hero — the dog is mid-climb *on* the ladder with the v8 brushed-aluminium mounting plate and "Get On Up" both legible. A later frame (~7.6s) has the dog standing and the ladder buried under the hero's legibility gradient, which reads as the old charcoal bracket.

Entries can also assert what shipped — `expectVideo` (regex on `currentSrc`) and `expectText` — and the script **refuses to save** rather than writing a thumbnail that misrepresents the site. Verified by pointing it at `hero-v99`/`$449`: it failed and wrote no file.

Related: [[feedback-verify-what-russell-sees]], [[feedback-verify-the-check-actually-ran]], [[feedback-replaced-designs-get-deleted]].

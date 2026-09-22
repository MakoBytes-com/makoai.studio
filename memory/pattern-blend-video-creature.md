---
name: pattern-blend-video-creature
description: "Recipe for \"real\" animated creatures/objects that blend into a dark site — generated video on pure black + mix-blend-mode screen; the wrapper-transform isolation gotcha."
metadata: 
  node_type: memory
  type: project
  originSessionId: 99060417-faf7-443a-a34b-a2357dbc45cf
  modified: 2026-09-19T23:31:52.655Z
---

The pricing page's anglerfish (shipped 2026-09-19, commit `da4b145`) is the
canonical example of putting a photoreal animated element on a dark page with
no visible box. Russell rejected a hand-drawn SVG ("This needs to look like a
real angler fish"); the recipe that worked:

1. **Still first:** CrazyRouter image (nano-banana-pro via generate_image) of the
   subject "isolated on a PURE BLACK background", edges of frame pure black.
   Get Russell's approval on the still before spending video minutes.
2. **Video from the still:** generate_video with the still as first frame;
   prompt for near-stationary hovering, static camera, background stays pure
   black, "ends near the starting position so it can loop".
3. **Seamless loop:** ffmpeg boomerang — `split → reverse → concat`, scale 960,
   fps 24, crf 27, `-an -movflags +faststart` (same trick as the BDS refinery
   hero). PATH `ffmpeg` on this machine is a broken store stub; the real one is
   the Gyan winget build under `%LOCALAPPDATA%\Microsoft\WinGet\Packages`.
4. **Blend:** `<video autoplay muted loop playsinline>` with
   `mix-blend-mode: screen` — black frame becomes invisible over the abyss
   background; only the subject and its glow render. Poster webp shown instead
   under `prefers-reduced-motion`; whole wrapper hidden in
   `[data-theme='light']`.

**THE GOTCHA that produced a visible dark rectangle on the first attempt:**
any transform/filter/opacity/animation on an ANCESTOR of the blended element
creates a stacking context that isolates `mix-blend-mode` from the page — the
black frame comes back. The drift animation must live on the video element
itself; the positioning wrapper stays inert. (Cousin of
[[webgl-pointer-overlay-gotcha]].)

Also: a 404 on the new asset seconds after deploy Ready was edge propagation,
not a missing file — `git show --stat` proving the binary is in the commit is
the check that prevents a panic re-deploy.

Component: `components/AnglerFish.tsx`; styles at the bottom of
`app/globals.css` (`.angler-*`); assets `public/videos/anglerfish.mp4` (525 KB)
+ `anglerfish-poster.webp`.

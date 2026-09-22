---
name: webgl-pointer-overlay-gotcha
description: "Decorative overlay divs above a WebGL canvas silently kill R3F pointer interactivity — track the pointer on window, not the canvas, and mark overlays pointer-events-none."
metadata: 
  node_type: memory
  type: reference
  originSessionId: bc5a5033-aacf-4efc-82ae-200a0cc64bb1
---

On the 2026-07-07 Fable rebuild of makoai.studio, the hero's reading-pane
gradient (`absolute inset-0`, rendered after the canvas) swallowed every
pointer event, so the particle shark's cursor repulsion + parallax shipped
dead — caught only when Russell said "the cursor does not seem to do
anything." Build/probes never caught it because nothing errors: R3F's
`useThree().pointer` just stays at (0,0).

**How to apply:**
1. Any decorative full-bleed layer (gradients, tints, vignettes) stacked
   over an interactive canvas MUST have `pointer-events-none`.
2. For R3F scenes that react to the cursor, don't rely on canvas-bound
   events at all — listen on `window`, map clientX/Y to the canvas
   container's rect → NDC, and pass a ref into the scene
   (see `components/three/MakoHeroCanvas.tsx`). Then copy/CTAs above the
   canvas can never starve it.
3. Shader-space bug that rode along: `uPointer` was in world space but
   particle positions are pre-group-transform (local) — subtract the
   group's offset or repulsion misses by exactly that offset.
4. Verification that WOULD have caught it: Puppeteer `page.mouse.move()`
   into the interactive area + before/after screenshots
   (`fable-cursor-probe.mjs` in the csp-audit toolkit). Static screenshots
   can't prove interactivity; drive the mouse.

Related: [[build_progress]] (rebuild architecture).

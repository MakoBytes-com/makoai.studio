---
name: light-theme-and-toggle
description: "makoai.studio has dark and light themes with a nav toggle — how the token swap works, and the dark islands that are load-bearing"
metadata: 
  node_type: memory
  type: project
  originSessionId: f0e4bb54-a414-412d-b769-affa62fcad7c
  modified: 2026-08-19T22:02:30.662Z
---

Shipped 2026-08-19 on Russell's ask: "create a light theme based off this site
using its colors etc for makoai.studio https://govsprint.app/app" and then
"so it will have the option to run dark and light theme".

**Palette** is lifted from govsprint.app/app (read out of its live `:root`, not
eyeballed): ground `#f8f9fb`, surface `#fff`, sunken `#f1f5f9`, ink `#1d3554`,
lines `#cfd9e5`/`#e4ebf3`, brand `#006fb9`/`#0061aa`/`#004d88`. Same brand blue
family as Bulldog Water — Russell reuses it across the fleet.

**How the swap works.** Tailwind 4 compiles `bg-abyss-950` to
`var(--color-abyss-950)`, so `[data-theme='light']` in app/globals.css
redefines those custom properties and every utility re-themes with no
component edits. The scales are therefore ROLE-based and swap ends between
themes: `abyss` = surfaces, `mist` = foreground, `lumen` = accent, `tide` =
solid fills. It reads oddly (abyss-950 is near-white in light mode) and it beat
rewriting ~510 colour classes across 36 files. This only worked because the
codebase uses opacity modifiers for tints and borders (`border-mist-300/15`,
`bg-lumen-400/10`) and solid colours only for real fills — check that before
trying the same trick elsewhere.

**`.surface-deep` is a dark island** — a subtree that keeps the deep tokens
inside the light theme. Three sections use it and each for a real reason:
- **Hero** — its Mako point cloud renders with ADDITIVE blending. Adding light
  to a white page produces white, so on a light ground the shark literally
  disappears. This is the one to remember.
- **Testimonial wall** — sits on dark video.
- **Contact** — full-bleed underwater photograph with dark scrims; rendered
  light it went muddy grey and the address text fought it.
- **Navbar while unscrolled** — it is fixed over the hero, so in light mode its
  navy links sat on a near-black hero and vanished. It borrows the deep palette
  while transparent and returns to the page palette once scrolled.
The class sets NO background of its own, precisely because the navbar wears it
while transparent.

**Two things that only showed up once rendered**, both worth expecting again:
restoring the dark COLOURS in an island is not enough — the
`--background-image-*` atmosphere gradients have to come back too, or the hero
wears light veils that fade to `#f8f9fb` over a dark ground and washes out to
grey. And Cloudflare Turnstile bakes its colour scheme in at render time, so it
was a black slab in the light contact form until it was given the theme and
re-rendered on change (`useTheme()` is exported from ThemeToggle for that).

**Defaults:** dark stays the default when nobody has chosen, so the site is
unchanged for every visitor who never touches the switch; an explicit choice
wins and persists in `localStorage['mako-theme']`. A blocking inline script in
`<head>` applies it before first paint — deciding the theme in an effect is
what causes the white flash. The toggle reads `<html data-theme>` through
`useSyncExternalStore` rather than mirroring it into state, which satisfies the
React compiler's rule against setState-in-effect and syncs open tabs for free.

**Contrast was measured, not assumed** — every text step clears WCAG AA on both
ground and card; the floor is the telemetry grey at 4.69:1. The muted greys are
deliberately darker than the reference's: GovSprint's own `#7a8aa0` is 3.34:1,
under the 4.5 floor, and this site uses that step for real prose.

**"I dont see it" — twice, and both times he was right.** First the switch was
a 36px circle with a hairline border and a bare icon: present, working,
invisible. Then, made into a labelled pill, it was still in the wrong PLACE —
everything in the bar lives in `.container-narrow` (max-w-6xl, centred), so on
a 2560px monitor the right-hand end of the NAV is ~700px short of the right-hand
edge of the SCREEN. He was looking at the corner, which is where a theme switch
belongs. It is now absolutely positioned against the window edge from `xl` up
(39px in at every width from 1280 to 2560), with an icon-only copy inside the
nav below that. **Lesson: "it's shipped and it works" is not the same as "he
can find it", and a centred container means the end of your nav is not the
corner of anyone's screen.**

That measuring sweep also turned up a **pre-existing bug**: at 768–800px the
nav needs ~805px and the row gives it 785, so it ran past its container and was
silently clipped by `body{overflow-x:hidden}` — cutting into "Start a project",
the primary CTA, on small laptops and landscape tablets. The full bar now waits
for `lg` (1024px) instead of `md`. Worth remembering that `overflow-x: hidden`
hides this class of fault completely; measure `nav.right` against
`container.right` rather than trusting that the page has no scrollbar.

Also fixed in passing: four section fades had `#020509` hard-coded inline and
painted a black band across a light page (now `fade-down`/`fade-up` utilities
that follow the ground colour in scope), and `text-tide-200` was used in five
places while `--color-tide-200` was never defined, so those badges silently
inherited their parent's colour.

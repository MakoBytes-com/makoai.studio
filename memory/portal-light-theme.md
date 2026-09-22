---
name: portal-light-theme
description: "makoai-portal has a light theme with a switch — why it needed more than a token swap, and where the switch lives"
metadata: 
  node_type: memory
  type: project
  originSessionId: f0e4bb54-a414-412d-b769-affa62fcad7c
  modified: 2026-08-19T22:57:14.687Z
---

Shipped 2026-08-19. Russell asked for the GovSprint light theme on
makoai.studio, then corrected himself: he meant **the portal**. (The
makoai.studio version stays — he said to leave it.) The portal is the better
home for it anyway: govsprint.app/app is itself an admin UI, so the palette
maps onto a control panel rather than a marketing site.

**Dark navy is still the default.** The 2026-05-02 "dark chrome, bright pastels
for charts only" decision stands; this is a per-person preference behind a
switch. Storage key `mako-portal-theme` — deliberately NOT shared with
makoai.studio's `mako-theme`, since someone may want a dark panel and a light
site.

**Where the switch is:** pinned to the **top-right of the window** (20px in),
on `/login` and inside the panel alike, with a compact copy in the mobile
header. Labelled "Light"/"Dark", never icon-only.

It started at the bottom of the sidebar next to Sign out — a reasonable home
for a preference and the wrong place to FIND one; Russell asked for the top
right, same as on makoai.studio hours earlier. The main column carries a little
extra headroom on desktop (`md:pt-14`) so the fixed button never lands on a
page's own action button — `/admin/clients` has a primary button exactly there.

**Why a token swap was not enough — the thing to remember.** This UI builds its
surfaces out of **white-alpha overlays**: `glass` is
`rgba(255,255,255,0.045)`, hairlines are `border-white/10`. Those are a lift on
near-black and *literally nothing* on white. Three moves fixed it:
1. The shared utilities (`glass`, `card`, `divide-soft`, hover accents) now read
   named variables — `--surface-raise`, `--line`, `--line-strong`,
   `--line-accent`, `--card-blur` — that describe the INTENT, with each theme
   supplying the colour. Changing these utilities re-themes most of the panel,
   because `card` alone is used 171 times, `input` 230, `label` 371.
2. The ~240 inline `white/N` and `black/N` classes across 120 components are
   re-pointed **centrally by their compiled class names**
   (`[data-theme='light'] .bg-white\/5 { … }`) rather than by editing every
   file. Modal backdrops (`bg-black/60`, `/70`) are deliberately left dark, or
   a dialog stops reading as modal.
3. **The 200/300 steps of amber/emerald/red/sky/violet/orange are remapped.**
   They are built to glow on black — `amber-300` on white is 1.6:1 — and they
   carry every status chip in the panel (`text-red-300` alone appears 73
   times). Their 500 steps are left alone: those only appear as low-alpha tint
   fills and borders, where they still work.

Also themed because they are painted, not tokenised: `.bg-hero`, the `.texture`
noise overlay (removed on light — it has no banding to fix there and its
`mix-blend-mode: overlay` just makes grey speckle), and the scrollbars, which
were painting a black gutter down a white page.

**Charts:** `lib/chart-colors.ts` gained a light-surface set plus
`chartPalette(theme)`. The original values were validated against `#050912` and
none survive white unexamined — the grid is white at 7% (invisible) and the
axis type is 3.3:1. Only consumer is the client report chart at `/r/[token]`,
which is a client component and reads the theme.

Turnstile was hard-coded `theme: "dark"` on BOTH this repo and makoai.studio —
a black slab on the white login card. Cloudflare bakes the colour scheme in at
render time, so it needs the theme in its effect deps to re-render.

Contrast measured, not assumed: every text step clears AA on both ground and
card (floor 5.02:1), white-on-button 6.4:1, and every chart series clears 3:1
on white. Related: [[light-theme-and-toggle]] for the makoai.studio version and
the "shipped ≠ findable" lesson behind the labelled button.

**Not verified:** the signed-in admin pages. The portal enforces MFA, so there
is no way to render them headlessly; the login page (same `card`/`input`/
`btn-primary`/`label` utilities) and the token flip were verified live instead.

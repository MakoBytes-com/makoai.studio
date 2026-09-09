# Mako Studio

Marketing + portfolio site for Mako Studio — the web practice inside Mako Logics.

**Stack:** Next.js 15 (App Router) · TypeScript · Tailwind · Resend · Vercel

## Quick start

```bash
npm install
cp .env.local.example .env.local   # fill in RESEND_API_KEY later
npm run dev                         # http://localhost:3000
```

## Hero

The hero is a WebGL particle mako built with custom GLSL, not a video —
`components/three/{makoPointCloud,MakoParticles,MakoHeroCanvas}.tsx`, mounted
through a `dynamic()` import so Three.js stays out of the initial bundle. It
forms on load, disperses on scroll, and repels the pointer.

Fallbacks are built in: `prefers-reduced-motion` gets a still frame, and a
browser without WebGL gets a CSS backdrop. The old `public/hero.mp4` video
path was retired with the BIOLUMINANCE rebuild and the file has been deleted;
nothing reads it.

## Contact form

Form → `POST /api/contact` → Resend → `CONTACT_TO_EMAIL`. Until `RESEND_API_KEY`
is set, submissions log to the server console and return `{ ok: true }` so the
dev flow isn't blocked.

## Portfolio data

One file — [lib/portfolio.ts](lib/portfolio.ts). Add/edit entries there and
they render automatically on the `#work` grid.

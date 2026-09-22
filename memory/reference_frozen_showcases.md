---
name: Frozen showcase forks — repos + URLs
description: Authoritative list of Mako Logics client frozen-showcase forks, their GitHub repos, Vercel URLs, and the standard hardening pattern applied to each
type: reference
originSessionId: bd216163-374a-4e6a-89bc-4cac5cb82d2d
---
## Active frozen showcases

| Client | Repo | Showcase URL | Forked from |
|---|---|---|---|
| Buffalo Seal & Gasket | `MakoBytes-com/buffaloseal-showcase` | `https://buffaloseal-showcase.vercel.app` | (initial scratch import) |
| Family Psychiatry of The Woodlands | `MakoBytes-com/woodlands-showcase` | `https://woodlands-showcase.vercel.app` | (initial scratch import) |
| AAA Awning Co. | `MakoBytes-com/aaaawning-showcase` | `https://aaaawning-showcase.vercel.app` | `MakoBytes-com/aaaawning.net` (live repo) |
| Bulldog Security Service | `MakoBytes-com/bulldog-showcase` | `https://bulldog-showcase.vercel.app` | `MakoBytes-com/bulldogsecurityservice.com` (dev repo) |
| Burton NDT Rentals | `MakoBytes-com/bndt-showcase` | `https://bndt-showcase.vercel.app` | `MakoBytes-com/bndtrentals.com` (live source repo, also created 2026-05-03) |
| Laguna Resources | `MakoBytes-com/lagunares-showcase` | `https://lagunares-showcase.vercel.app` | `MakoBytes-com/lagunares.com` (live source repo) |

All six are linked from `lib/portfolio.ts` on makoai.studio. **Standing rule (2026-05-03):** every portfolio entry except the four Mako-owned products (MakoBytes, MakoBot, AI Prompts Hive, TopPaws) gets a frozen showcase fork — pending-client / pitch builds explicitly included. See `feedback_portfolio_uses_frozen_showcase_forks.md` for the full exception list.

## Standard hardening applied to every showcase

1. **`<meta name="robots" content="noindex, nofollow, nocache">`** in root layout — replaces the live site's index/follow.
2. **`DemoPill` component** at `components/DemoPill.tsx` — fixed top-right pill that says "Portfolio Demo · Live site →" with a link to the real domain. Mounted in `<body>` of root layout (in the public-chrome branch only, NOT inside `/admin/*` if the layout differentiates).
3. **`next-sitemap.config.js` rewritten** to `exclude: ["/*"]` and a single `{ userAgent: "*", disallow: "/" }` policy. This makes the generated `robots.txt` disallow everything and the generated sitemap empty.
4. **Single commit** named "Showcase snapshot — frozen for Mako Studio portfolio" applied on top of the forked main.

## Env vars on showcase Vercel projects

Stripped down to dummies — anything that gracefully degrades is removed entirely.

For Bulldog specifically, the dev repo uses Drizzle + sessions, so build requires:
- `SESSION_SECRET` = dummy string (build fails without it on `/admin/logout`)
- `DATABASE_URI` = `postgres://demo:demo@localhost:5432/demo` (build fails without it on `/api/cron/enrich-leads`)

These let the build succeed; admin/cron routes will 500 at runtime, which is fine for a frozen demo.

For AAA Awning, no env vars set — Resend, Turnstile, Umami, Google Places all gracefully degrade to "no email sent / no captcha / no analytics / generic rating text."

For BNDT (Burton NDT Rentals), no env vars set — pure prerendered catalog, no external dependencies in the demo.

For Laguna Resources, no env vars set — pitch site is fully prerendered, schema baked at build time, Umami gracefully degrades.

## Standard build pattern (for next time)

For a Next.js client repo at `<live-path>`:

```bash
gh repo create MakoBytes-com/<slug>-showcase --public --description "Frozen portfolio snapshot of <client domain> — preserved as shipped"
git -C <live-path> push https://github.com/MakoBytes-com/<slug>-showcase.git main:main
git clone https://github.com/MakoBytes-com/<slug>-showcase.git <new-local-path>
# Add components/DemoPill.tsx (copy from any existing showcase)
# Edit app/layout.tsx (or src/app/layout.tsx): import DemoPill, render <DemoPill realUrl="https://<live>" />, switch robots metadata to noindex
# Replace next-sitemap.config.js with the disallow-all version
git -C <new-local-path> add -A
git -C <new-local-path> commit -m "Showcase snapshot — frozen for Mako Studio portfolio"
git -C <new-local-path> push
cd <new-local-path>
vercel link --yes --project <slug>-showcase --scope mako-studi
# (set any required env vars with `printf "%s" "value" | vercel env add NAME production --scope mako-studi`)
vercel deploy --prod --yes
# Verify: noindex meta, Portfolio Demo pill, robots.txt disallow all
```

## Verification checklist

For every new showcase, before adding to the portfolio:

```bash
curl -s "https://<slug>-showcase.vercel.app" | grep -oiE '<meta[^>]*name="robots"[^>]*>|Portfolio Demo'
# Must show: <meta name="robots" content="noindex, nofollow, nocache"/>  AND  Portfolio Demo

curl -s "https://<slug>-showcase.vercel.app/robots.txt"
# Must show: User-agent: *  Disallow: /
```

## Why this matters (don't drop the rule)

Client builds drift after takeover — staff change, content gets edited, design dilutes. The frozen showcase is the canonical "this is what we shipped" version for portfolio purposes. If we ever link the portfolio at a live client URL, the portfolio quality decays even though our work was good. The whole point is making the portfolio time-invariant.

The `noindex` is critical: without it, the showcase competes with the eventual live client domain in Google for the client's brand keywords.

## Pending-client / pitch builds also need this

BNDT (2026-05-03) was the test case: the existing `bndt-showcase.vercel.app` Vercel deploy was running with `index, follow` and `Allow: /` for every AI crawler — directly competing with the eventual real `bndtrentals.com` brand domain. Same risk applied to `lagunares-com.vercel.app` (the original Lagunares pitch URL). The fix was to apply the standard hardening to both and repoint the portfolio at `lagunares-showcase.vercel.app`.

**Lesson:** "It's just a pitch / pending close" is not a reason to skip hardening. That's actually the highest-risk window — the deal could close, the showcase outlives the pitch, and now the showcase is fighting the eventual production domain in search results.

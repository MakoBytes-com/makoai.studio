---
name: Russell tests on live URLs, never localhost — deploy early and iterate on the deployed site
description: For every web project, deploy to the real public URL as soon as there's anything worth looking at. Russell doesn't test locally; he tests on the deployed site. Do not leave him parked on localhost.
type: feedback
originSessionId: e68abf5d-4212-4bd8-a996-d7710efc71a7
---
**Rule.** On any web project, I do not ask Russell to evaluate work on `localhost` or preview URLs. Get a working deployment on the real public URL (or a Vercel preview that matches the future real URL) as early as possible, then iterate on that live deployment.

**Why:** Russell said it plainly — "For the record I hate testing on local host." This mirrors his long-standing global preference ("Live URLs only" in the top-level CLAUDE.md). Localhost testing breaks his workflow: different browser state, multiple dev servers fighting for ports, cache corruption, CORS differences, email verification URLs that redirect to the wrong host, and a general sense that what he's looking at isn't "real." He'd rather pay the deploy-cycle tax up-front than burn 20 minutes chasing a localhost-only bug.

**How to apply:**
- For any new web project, after the first scaffolded auth/landing flow passes locally, deploy to Vercel IMMEDIATELY. Don't wait until V1 is "done" — deploy at the first meaningful milestone.
- For subsequent work, use `git push` + auto-deploy (or `vercel --prod`) instead of asking Russell to `npm run dev`. He doesn't run local dev servers.
- If a change genuinely can only be validated locally (e.g. webhook testing with ngrok), say so explicitly and set it up for him — don't just hand him a `npm run dev` command.
- When local testing WAS requested, keep it minimal. Validate one or two flows, then push to live.
- When setting up a new project, wire up the production domain (or a stable Vercel project URL) and auth redirect URLs to match from day one — so magic links, OAuth callbacks, and webhooks all go to the live URL, not localhost.

**Applies globally** to every web/app project, not just makoai.studio or the portal.

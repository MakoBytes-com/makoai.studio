---
name: feedback-confirm-before-deleting-infra-with-secrets
description: Never auto-delete a project folder that holds a .env/secrets or could back live infra — confirm first, even mid-cleanup-spree.
metadata:
  type: feedback
---

During a 2026-06-08 cleanup spree (Lagunares wipe → Buffalo stale clones → umami-analytics), I deleted the self-hosted `umami-analytics/` folder after judging it abandoned (live client sites load Umami **Cloud** `cloud.umami.is`, and its Vercel project was already gone). Russell then said **"we are using it."** The folder held a `.env` with the Neon `DATABASE_URL`, `APP_SECRET`, `HASH_SALT` — irreplaceable locally. He chose not to recover it ("we're good, leave it alone"), but the deletion call was wrong.

**Why this matters:** a string of authorized deletions (declined client, stale clones) built momentum, and I extended "delete what we don't need" to a folder I only *inferred* was unused. Inference isn't authorization. The `.env`/secrets + Docker configs were a signal it was real infra, not dead weight.

**How to apply:**
- A folder containing a `.env`, secrets, DB credentials, or deploy configs (Dockerfile/docker-compose/.vercel) is **infra**. Do NOT delete it on inference of "abandoned" — confirm explicitly with Russell first, naming what's inside.
- "It's not wired into the live site I checked" ≠ "it's unused." It may run elsewhere (Docker on a box/VPS, another scope) off a DB that's still live.
- The DATA living in an untouched managed DB (Neon/Supabase) being safe does NOT make deleting the local source+`.env` harmless — the `.env` secrets may exist nowhere else.
- Cleanup momentum is the trap: each item in a delete-spree still gets its own "is this actually dead, and do I have explicit OK?" check. Relates to [[fleet-portal-master-endpoint]] (infra needs verification, not assumption).

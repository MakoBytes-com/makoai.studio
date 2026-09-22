---
name: supabase-resumable-upload-traps
description: "The four non-obvious things that break anonymous resumable (TUS) uploads to Supabase Storage — all found the hard way while building client upload links in makoai-portal, none visible locally"
metadata: 
  node_type: memory
  type: project
  originSessionId: 88370289-89a2-473f-ae91-133c0fb97ba6
  modified: 2026-08-19T17:36:56.745Z
---

Built **2026-08-19** in `makoai-portal` (v1.8.0/1.8.1): admin-generated upload links
(`/upload/[token]`) letting a client send multi-GB files with no login. Bytes go
browser → Supabase Storage over TUS, authorised per-file by a signed upload token.
Proven live: **1 GB in 108s across 171 chunks**; 60 MB in 6.2s.

Four traps, in the order they bit. Every one returned a *wrong-sounding* error.

**1. `Invalid Compact JWS` — don't send the anon key as the bearer.**
Supabase's own docs show `authorization: Bearer ${session.access_token}`. This project's
anon key is the modern `sb_publishable_…` format, which is **not a JWT**, and the
resumable endpoint parses the bearer as one. Fix: the *signed upload token itself* is a
JWT — use it as the bearer. Also works with `apikey: <publishable>` + `x-signature`, but
bearer-the-signature is format-independent, so prefer it. `x-signature` alone fails.

**2. `permission denied for function is_admin` — a latent fleet-wide landmine.**
Migration 0059 revoked EXECUTE on `is_admin()`/`is_client_member()` from `public`/`anon`,
but six `storage.objects` policies were still declared `to public` = *every* role.
**Postgres evaluates every policy applying to the caller's role, not just the ones about
the bucket you're touching** — so ANY anonymous read of `storage.objects` hit a function
anon couldn't call and raised a hard error instead of a clean denial. Latent since 0059;
nothing had ever touched storage as anon before. Fixed in 0063 by scoping them to
`authenticated`. **Check other Supabase projects for `to public` policies calling
SECURITY DEFINER helpers that anon can't execute.**

**3. `new row violates row-level security policy` — a signed upload token does NOT
bypass RLS.** It authenticates the request; the insert into `storage.objects` is still
governed by RLS. Don't grant anon blanket insert — 0064 adds a SECURITY DEFINER
`upload_link_open(text)` so Storage only accepts bytes inside the folder of a link that
exists, is unrevoked and unexpired. Real second boundary: a leaked signature still can't
file anything under a dead link. Takes **text not uuid** — the value comes from an object
key and may be anything; casting in the policy raises instead of returning false.

**4. `upsert` must be set on `createSignedUploadUrl(path, { upsert: true })`, not via the
`x-upsert` header** — the header has no effect on a signed-token upload (it's in the
supabase-js docstring). Without it, resuming/retrying onto an existing path fails.

Other things worth keeping:
- **CSP**: use the host from `NEXT_PUBLIC_SUPABASE_URL`, NOT the `<ref>.storage.supabase.co`
  host the docs recommend for speed. `next.config.mjs` builds `connect-src` from that URL's
  host only, and a CSP block is silent — same shape as [[umami-csp-gateway-fleet-bug]].
  Verified zero console errors in a real browser upload.
- **chunkSize must be exactly 6 MB.** Not a tuning knob; other values are rejected.
- **Never trust the declared size.** Completion re-reads the object's real size from
  Storage. Proven: declared 1 byte, uploaded 30 MB, recorded 31,457,280.
- **A null `file_size_limit` on a bucket inherits the PROJECT limit.** Raising the project
  cap 50 MB → 50 GB would have silently taken `request-attachments` (client-facing!),
  `vendor-documents` and `db-exports` with it. Pin every bucket before raising it.
- Cost: Supabase Pro includes **100 GB file storage, $0.021/GB after**; 250 GB egress then
  $0.09/GB. The `$0.125/GB` on the pricing page is *database disk* — a different meter.
  Don't confuse them again.

---
name: rotation-blockers-and-vercel-env-gotchas
description: "Why the three portal secrets could not be rotated (fake overlap window, KDF-seed coupling) and the Vercel/Supabase API traps hit while fixing it, 2026-07-31."
metadata: 
  node_type: memory
  type: project
  originSessionId: cc0cd53e-6e22-4492-8f78-7c422d332f3e
  modified: 2026-07-31T10:39:05.076Z
---

# Secret rotations stall for STRUCTURAL reasons — find them before scheduling

All three portal secrets in the deferred register were "just rotate it" items.
None of them were. Rotated 2026-07-31; the blockers are the reusable lesson.

## 1. The master signing key's "overlap window" did not exist

`scripts/rotate-master-key.mjs` retires the old key and inserts a new active one,
and the register said rotation "needs the overlap window". **There was no overlap
to use.** Each of the 11 per-client CPs verifies against ONE static
`MASTER_PUBLIC_KEY` env var — no JWKS, no `kid` selection — so the instant the
master signs with a new key, every master→client call 401s until all 11 envs are
updated AND all 11 projects redeploy. All 11 endpoints are pulled every 5 minutes
by `fleet-refresh`, so the gap would have been immediately visible.

**Fix, now fleet-wide:** `verifyMasterToken()` accepts MULTIPLE concatenated PEMs
in `MASTER_PUBLIC_KEY` and tries each. One PEM behaves exactly as before, so it is
backwards compatible. Rotation is now: ship the multi-PEM verifier → put both PEMs
everywhere → redeploy → flip the master → later trim the old PEM.
**Only fall through to the next key on `ERR_JWS_SIGNATURE_VERIFICATION_FAILED`** —
expiry/audience/algorithm failures must still be real rejections, or the loop
silently weakens verification.

Order matters at the flip: promote the incoming key to `active` FIRST, then retire
the outgoing one. The signer takes `status='active'` ordered by `created_at desc`,
so there is never an instant with no active key. Stage the incoming key as
`retired` (the enum is only `active|retired`) — a retired row is inert because the
signer never loads it.

## 2. A credential used as a KDF seed can never be rotated

`lib/vendor-crypto.ts` derived its AES-256-GCM key via HKDF from
`SUPABASE_SERVICE_ROLE_KEY`, and said so in its own header comment: rotating the
service-role key "WILL invalidate every encrypted license_key in the DB". That is
why an 85-day-old credential sat unrotated. Decoupled onto a dedicated
`VENDOR_ENCRYPTION_KEY` **while `vendor_licenses` held zero encrypted rows**, so
no re-encryption was needed; doing it later means migrating live secrets.
`decryptLicenseKey` still falls back to the old seed for v1 ciphertext.

**Rule: never derive an encryption key from a credential you intend to rotate.**
When you find that pattern, decouple it at the moment the ciphertext table is
empty — that window does not come back.

## 3. Proving a fallback is actually being used

`createAdminClient()` prefers `SUPABASE_SECRET_KEY` and falls back to the legacy
key, which means a passing health check proves nothing. The way to prove the new
credential is live is to DELETE the fallback from production and re-verify —
health ok, crons 200, admin routes 307. Success with no fallback available is the
only real evidence.

## Vercel + Supabase API traps (all cost real time)

- **`GET /v9/projects/{id}/env?decrypt=true` returns CIPHERTEXT.** Comparing
  against it reported all 21 env rows as drifted on a perfectly healthy fleet.
  Plaintext comes only from the SINGLE-env endpoint `/v9/projects/{id}/env/{envId}`.
- **`preview`-target rows never decrypt even there** — they still come back as the
  `{"v":"v2","c":...}` envelope. An unreadable row is NOT a wrong row. Write the
  canonical value instead of diffing it.
- **The Vercel CLI's `auth.json` token ROTATES while you work.** A token read once
  at script start 403s `{"invalidToken":true}` minutes later. Re-read the file on
  every call and retry once after shelling out to `vercel whoami`. Helper:
  scratchpad `vapi.mjs`.
- **Supabase's Management API CAN mint new-format keys** —
  `POST /v1/projects/{ref}/api-keys {type:'secret',name}` — despite the docs
  describing the dashboard. It requires `name`. So new-key rotation is NOT
  dashboard-only and never needs to be handed to Russell.
- Legacy `anon`/`service_role` JWTs retire end of 2026. The portal server is off
  them; the browser `anon` key still is not, which is why legacy keys cannot be
  disabled yet.

Related: [[digest-liveness-and-secret-ages]], [[feedback-verify-the-check-actually-ran]].

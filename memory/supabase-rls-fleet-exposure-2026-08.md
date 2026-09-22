---
name: supabase-rls-fleet-exposure-2026-08
description: "2026-08-04 Supabase advisor email was real — 29 tables across 4 projects had RLS off + full anon INSERT/UPDATE/DELETE grants (incl. password_hash + totp_secret); fixed fleet-wide, no evidence of compromise"
metadata: 
  node_type: memory
  type: project
  originSessionId: fa774725-c7a8-4bd7-a6ec-d57923c0af93
  modified: 2026-08-04T19:08:00.673Z
---

**2026-08-04 — Supabase security-advisor email was a REAL critical, not noise. Fixed and verified.**

Supabase emailed about `rls_disabled_in_public` / `sensitive_columns_exposed` on
pixelmonsters + utilities-plus "and 3 other tables across 2 more projects".
Swept all 16 Supabase projects via the Management API (PAT lives in
`makoai-portal/.env.local` as `SUPABASE_PAT` — the one in `~/.supabase/access-token`
is DEAD, returns 401).

**What was actually wrong — 29 tables, 4 projects:**
- pixelmonsters (15 tables), utilities-plus (11), bulldog-cp (2: `content_fields`,
  `trusted_devices`), makoanswer (1: `bookings`).
- RLS was OFF *and* `anon` held SELECT+INSERT+UPDATE+DELETE on every one.
- Worst: `users` on both pixelmonsters and utilities-plus exposed `password_hash`,
  `totp_secret`, and `password_reset_token_hash` — readable AND writable. That is
  full admin-account takeover (read the TOTP secret to defeat MFA, or just UPDATE
  password_hash). Also `user_recovery_codes`, bulldog's `trusted_devices`
  (MFA "remember this device" token hashes), `contact_submissions` PII,
  `ai_chat_messages`, `admin_audit_log`.

**The fix (applied via Management API `/database/query`):**
`ALTER TABLE ... ENABLE ROW LEVEL SECURITY` on all 29, plus
`REVOKE ALL ON ALL TABLES IN SCHEMA public FROM anon, authenticated` on all four
projects. Verified by re-running the same anon-key attack: every table now returns
`401 / 42501 permission denied`. Fleet ERROR-lint count went 29 → 0 (only
mako-cp's `client_self` remains, see below).

**Why this was safe to do with zero app changes — the key architectural fact:**
Every affected app (pixelmonsters, utilities-plus, bulldog, makoanswer) talks to
Postgres via `DATABASE_URL`/`DATABASE_URI` as role `postgres` through the pooler —
NOT via supabase-js/PostgREST. Verified `postgres` has `rolbypassrls = true`, owns
every public table, and **zero tables are FORCE ROW LEVEL SECURITY** (`relforcerowsecurity`).
So RLS cannot affect these apps at all. Check those three things before enabling RLS
anywhere in this fleet — that combination is what makes it a no-op for the app and a
hard wall for `anon`.

**mako-cp `client_self` — deliberately left as SECURITY DEFINER.** It is
`security_invoker=false` but carries its own gate: `WHERE is_client_member(id) OR is_admin()`.
Anon gets `[]`. Do NOT "fix" it by flipping `security_invoker=on` — `clients` has only
an admin SELECT policy, so that would return zero rows and break every client's
`/dashboard` (portal reads `client_self`, not `clients`). Revoked the pointless `anon`
grant instead (now 401); `authenticated` retained. The advisor will keep flagging this
one — it is an accepted, documented exception.

**No evidence of compromise:** pixelmonsters has one admin (Russell's), utilities-plus
two legitimate admins, audit logs clean, no rogue rows. Real-world exploitability was
also lower than the email implies — none of these apps ship a Supabase anon key to the
browser (checked bulldog's homepage + `/admin/login` JS bundles; key absent), so an
attacker needed to obtain the anon key first. Still a critical misconfiguration, but
not a confirmed breach. See [[feedback-verify-the-check-actually-ran]].

**Probe trap that nearly caused a false "safe" reading:** PostgREST answers a `Range`
request with **HTTP 206 Partial Content on success**. My first probe labeled 206 as
"blocked" and would have reported ~20 exposed tables as safe. Treat 200 AND 206 as
readable. Also `id=eq.<uuid>` on an integer PK returns 400 (type error) which is NOT
a permission denial — use `id=eq.-1` for a zero-match write probe that proves
permission without mutating a single row.

**ROUND 2 — Russell asked "did you check the rest of the fleet", and the honest answer
was "only the RLS dimension". The second pass found a separate live hole:**

- **TopPaws had 22 SECURITY DEFINER functions executable by `anon`, including
  `import_businesses(jsonb)` and `dedupe_businesses(boolean)`.** Both confirmed
  reachable over the public REST RPC endpoint (HTTP 200) against a **173,821-row**
  business directory — meaning an unauthenticated caller could inject arbitrary rows
  or fire a real merge/delete pass. The repo's own comment says
  "service_role-only import_businesses RPC" (`scripts/seed/lib.mjs:46`), so the grant
  was never intended. Every caller (`business-actions.ts`, `listing-actions.ts`,
  `api/track/route.ts`, seed scripts) uses `supabaseAdmin()` = service role, and
  TopPaws has **no anon client at all** (only `src/lib/supabase/admin.ts`).
  Revoked EXECUTE on the 9 mutating fns; verified anon now 401/404, service_role 200,
  site 200, and `/api/track` still writing (page_views 479 → 480).

- **THE POSTGRES TRAP THAT ALMOST SHIPPED A FAKE FIX:** `REVOKE EXECUTE ... FROM anon,
  authenticated` **did nothing** for most functions, because Postgres grants function
  EXECUTE to **PUBLIC** by default — the privilege arrives via PUBLIC, not via the role.
  My first revoke silently left `dedupe_businesses`, `create_business` and the `track_*`
  fns still anon-callable, and only a follow-up `has_function_privilege()` check caught
  it. Correct form: `REVOKE EXECUTE ON FUNCTION x FROM PUBLIC, anon, authenticated;`
  then `GRANT EXECUTE ON FUNCTION x TO service_role;` — the re-grant is mandatory or you
  break the app, since its only EXECUTE path may have been PUBLIC too.

- **Public storage buckets (all intentional, verified not a leak):** bndt-prod
  `catalog-pdfs`/`catalog-images`, pixelcopy `releases`, toppaws `pets`,
  voltage-bike `listing-photos`. The portal's `request-attachments` and `db-exports`
  are private — confirmed.
- **Enabled leaked-password (HIBP) protection** on bulldog-cp and mako-cp; that WARN
  is now gone fleet-wide.
- **Assessed and deliberately LEFT:** mako-cp's 4 anon-executable definer fns
  (`is_admin`, `is_client_member`, `client_role`, `client_can_see_billing`) are the RLS
  *policy predicates* — policies evaluate as the querying role, so they MUST stay
  executable; they return false for anon. TopPaws' remaining read aggregations and
  bndt/toppaws public-read policies are the public directory/catalog working as designed.
  `function_search_path_mutable`: checked all three projects — **0** functions are the
  exploitable combination (definer + anon-callable + mutable search_path), so it is
  hygiene, not a hole.

**ROUND 3 — "make sure we're good on all the other sites." Answer: all 16 are clean,
and the scary-looking intermediate result was MY probe lying.**

A zero-match `PATCH ?id=eq.-1` returning 200/204 does **NOT** mean anon can write. With
no rows matched, RLS never gets a chance to deny anything, so the call succeeds whenever
the role merely holds the table-level UPDATE **grant**. That produced a false alarm
listing ~12 projects (including bishopbend/GLBA and makologics-prod) as "WRITABLE",
naming tables like `customers`, `users`, `master_signing_keys`. It was wrong.

**The authoritative test — impersonate the role and roll back:**
```sql
BEGIN; SET LOCAL ROLE anon;
WITH u AS (UPDATE public.<t> SET <col>=<col>
           WHERE ctid IN (SELECT ctid FROM public.<t> LIMIT 3) RETURNING 1)
SELECT count(*) FROM u;
ROLLBACK;
```
Result across every public table in all 16 projects: **0 rows anon could modify.**
Nothing can be harmed because the transaction always rolls back — even where anon IS
permitted. Ran a **canary** (a deliberately vulnerable table: RLS off + `GRANT ALL TO
anon`, created and rolled back inside the same transaction) and the probe correctly
flagged it — so the fleet-wide "0" is a real negative, not a broken detector.
Anon-readable data fleet-wide is only bndt's published catalog and toppaws' public
directory, both by design. See [[feedback-verify-the-check-actually-ran]].

Reusable scripts in this session's scratchpad: `probe.py` (anon-key exposure prober),
`sweep.py` (RLS/grant/permissive-policy/definer-view sweep), `sweep2.py` (storage
buckets + all lint levels + live anon probe on all 16), `fix_rls.py`.
Related: [[security-audit-2026-07-24]], [[weekly-security-sweep]],
[[feedback-verify-the-check-actually-ran]].

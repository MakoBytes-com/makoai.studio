---
name: makologics-db-supabase-not-neon
description: "makologics.com's DB is SUPABASE project qbnygqjuygajgpkkctpt (renamed makologics-prod 2026-07-24; was misnamed 'saxclasses'). Neon was legacy — stale DATABASE_URI_NEON_BACKUP env removed. Russell: 'We don't use neon.'"
metadata: 
  node_type: memory
  type: project
  originSessionId: b4a2f444-1965-4dfe-846b-d6a5e73ef5c4
  modified: 2026-07-24T09:11:23.664Z
---

**Corrected 2026-07-24.** Old memory implied makologics ran on Neon
(DATABASE_URI + DATABASE_URI_NEON_BACKUP). Live env check proved the
PRIMARY `DATABASE_URI` was already **Supabase** — the migration happened
months ago; only the stale Neon backup var lingered. Russell confirmed:
"We don't use neon."

**The trap that hid it:** the Supabase project holding Makologics' data
(case_studies, contact_submissions, compliance suite, Makopanel tables)
was **named "saxclasses"** — a reused/mislabeled project. There were TWO
projects named saxclasses; `yxlelogckvdyjhcuabuj` is the real saxclasses
(courses/lessons/subscriptions).

**Fixed same night:**
- Project `qbnygqjuygajgpkkctpt` RENAMED to **makologics-prod** via
  Management API (PATCH 200).
- `DATABASE_URI_NEON_BACKUP` removed from makologics Vercel env (no code
  referenced it — verified by grep); redeployed; live 200.
- Portal: Makologics `supabase_ref=qbnygqjuygajgpkkctpt`,
  `db_provider='supabase'` → backup chip live (project has healthy daily
  backups, verified in the drill under its old name).
- Migration `0020_db_provider.sql`'s `neon` backfill for Makologics was
  wrong at authoring time — corrected in DB; the file is historical.

**CLOSED 2026-07-24:** Russell deleted ALL stale Neon projects (Makologics
+ a pre-migration Bulldog copy + anything else in the account — "everything
is deleted"). Bulldog's live prod URI was verified Supabase (bulldog-cp,
user postgres.xfzktotopke…) before deletion. Both sites verified 200 after.
**Neon is fully decommissioned — the fleet is 100% Supabase for databases.**

**Lesson:** always resolve which URI is PRIMARY before declaring a
provider, and never trust Supabase project display names — the ref in the
pooler username is the truth. Related: [[ai-triage-duty-officer]].

---
name: bulldog-water-control-panel
description: "bulldogh2o.com got its own /admin control panel wired to the master portal — what it is, where the pieces live, and the decisions behind them"
metadata: 
  node_type: memory
  type: project
  originSessionId: f0e4bb54-a414-412d-b769-affa62fcad7c
  modified: 2026-08-19T20:55:22.503Z
---

Built 2026-08-19. Bulldog Water (bulldogh2o.com, the BDS client site) had no
admin of any kind: every enquiry existed only as an email, and every FAQ change
was a code change by Mako. It now has a panel at **bulldogh2o.com/admin**,
connected to portal.makoai.studio the same way the parent site is.

**Stack** — iron-session + bcryptjs + otplib TOTP + qrcode, drizzle over
postgres.js, on its own Supabase project **`hpxnnbehblvmlgzejnme`**
(bulldogwater-cp). The CP dependencies were already sitting unused in
package.json from the original scaffold; nothing imported them until now.

**Modules** — Overview, Leads (status, internal note, CSV export), Traffic
(first-party beacon: page views, referrers, events, Core Web Vitals, bots
excluded via isbot), Errors (grouped by fingerprint), FAQs, Users (roles,
password reset, TOTP reset), Profile (password + TOTP enrolment).

**Decisions worth not re-litigating:**

- **Leads are written to the database BEFORE the email is attempted**, and the
  panel flags any stored-but-not-emailed. Previously the email WAS the record,
  so a Resend outage lost the enquiry outright. Proven under a real outage: a
  submission with the DB down still returned `delivered:true`.
- **The FAQ module is wired to the public page.** `app/(site)/faq` reads the
  table via `getPublishedFaqs()` and the actions call `revalidatePath("/faq")`;
  `lib/faqs.ts` is the fallback for an EMPTY table only. Verified live end to
  end: edit in the panel → text appears on bulldogh2o.com/faq → revert → gone.
  This is deliberately not the arrangement that has bitten the parent site,
  where a CP module edited a table nothing rendered.
- **Public pages moved into an `app/(site)` route group** so the root layout no
  longer puts the storefront header and footer above the panel. URLs unchanged.
- **`requireUser()`/`requireAdmin()` is the only gate — there is no
  middleware.** It re-reads the user from the DB on every page and action,
  which is the only check that can know an account was disabled a minute ago.
- **Its Supabase project has anon/authenticated revoked across the whole public
  schema, plus RLS on every table**, verified with a live anon-key probe
  returning 401 on users, leads, error_events and faqs. The app reaches the DB
  only as the postgres role through drizzle. Do this on any NEW Supabase
  project — the default grants would publish `password_hash` and `totp_secret`
  to anyone holding the anon key.
- Temporary passwords are shown once via an encrypted session flash, never in a
  URL.

**Portal connection** — `client_endpoints` row for client
`daabfe7b-3099-4eaf-934a-6fcd5982d9e8`, endpoint `https://bulldogh2o.com`, kid
`7URgzGIg`. All four `/api/master/*` scopes verified returning 200 to the
portal's own fleet-refresh and 401 to anonymous and forged bearers.
`scripts/seed-admin.mjs <email>` creates or resets an admin and prints a
one-time password — it is also the way back in if everyone is locked out.

Read [[nextjs-cp-three-live-bugs]] before touching auth, the analytics page, or
the DB client: three separate bugs here shipped green and only appeared live.

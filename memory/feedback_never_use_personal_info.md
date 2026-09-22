---
name: Never use Russell's personal info on any project
description: Russell's personal email, name, and real-life location must never appear on any public-facing project. Use brand emails and business location instead.
type: feedback
originSessionId: adda8264-8044-427e-bec4-8926444a5891
---
**Rule.** Never put Russell's personal email address (russell.sailors@gmail.com), personal name, or private personal information into any public-facing asset (website, marketing copy, docs, metadata, README, error page, support page, contact form default, OG image, open graph description, etc.). If an inquiry address is needed, use **admin@<project-domain>** (e.g. `admin@mako.studio`, `admin@toppaws.com`, etc.).

**Location.** For any business-facing "where are we" copy, the correct location is **The Woodlands, TX** — not Buffalo, NY. Buffalo is only correct when describing the client *Buffalo Seal & Gasket*, which is physically in Buffalo, NY.

**Why:** Russell separates his businesses (Mako Logics / Makologics MSP / MakoBytes / Mako Studio) from his personal identity for privacy, spam-avoidance, and a clean professional/personal boundary. A personal email or hometown showing up on a public site blurs that line and creates real spam + OSINT exposure.

**How to apply:**
- Default every contact form, mailto link, and "email us" link to `admin@<domain>`.
- Default every location reference (footer, contact block, JSON-LD `address`, metadata descriptions) to The Woodlands, TX — unless the copy is specifically about a client whose own location differs.
- Apply this silently (no "do you want me to change this" prompt) — it's a hard rule, not an option.
- Global rule — mirrored in MakoBot project memory as `feedback_never_use_personal_info.md`.

**Name specifics (reconfirmed 2026-04-22 on makoai.studio).** Public-facing copy attributes work to **"Mako Logics"** (or "Mako Studio" for web deliverables) — never "Russell", "Russell Sailors", or any "founder / primary operator / I" framing that singles him out by name. Fix locations include: portfolio card descriptions, llms.txt, about paragraphs, case studies, OG descriptions, release notes, commit-authored `Signed-off-by` public blurbs.

**Third-party content.** Live-fetched data (Google Reviews via Places API, embedded testimonials, etc.) must be **filtered before render** to drop any item that names the founder. Pattern now in [lib/places.ts](lib/places.ts): `/\b(russell|sailors)\b/i` applied against review text. Use the same pattern for any future live-content integration (Trustpilot, Yelp, Facebook, LinkedIn share-outs, etc.).

**Discovered gap 2026-04-22:** name leak persisted on makoai.studio through three surfaces (llms.txt, portfolio description, Google Reviews component) despite the rule being in memory for 3 days. Root cause: rule covered email + city, but name enforcement was implicit. Now explicit. Scan new projects for `Russell|Sailors` before first deploy.

**Discovered gap 2026-05-05 (extends scope to admin UI + form placeholders + public source).** Russell flagged user-facing leaks on `bulldogsecurityservice.com` and `aaaawning.net` admin panels: tickets page subtitle, NewTicketForm prompt, and `placeholder="Russell Sailors"` on the user form. Both repos shared a copy-pasted admin template that hard-coded his name. Same template propagated into the bulldog-showcase frozen fork. **The rule now covers, in every repo (Mako-owned, client, showcase, internal):**

1. **All admin UI text and placeholders** — "Russell's queue", "Russell sees new tickets", `placeholder="Russell Sailors"`, etc. Even though admins are typically only Russell + Mako staff, these strings render in screenshots, support exports, and any future client-side admin onboarding.
2. **All form placeholders** — generic person-name placeholders use `Jane Doe`. Never seed a placeholder with a real person's name.
3. **Code comments in any public-source repo** — `// Russell can edit ...`, `// Russell sees ...`, etc. Replace with `// the admin can edit`, `// the operator sees`, or `// Mako`. Public GitHub repos (including showcase forks) are indexed; comments leak via repo browsing and AI training data.
4. **Script docs / README usage examples** — `seed-admin.ts` example commands like `--email russell.sailors@gmail.com --name "Russell Sailors"` get sanitized to `--email admin@example.com --name "Admin"`.
5. **Internal env templates** — `.env.local.example` comments stop describing "Russell's email" → describe "the admin email".
6. **Internal docs (RUNBOOK.md, launch-email-to-client.md, etc.)** — owner/contact rows use `Mako Logics LLC` + `admin@<domain>`. Personal name only where it's explicitly a legal-entity signature (e.g. operating-company filings) — never on customer-shared deliverables.

**How to apply the broader rule:**
- Default replacement table:
  - `Russell's` → `the admin's` (or `the operator's`, or `Mako's` depending on context)
  - `Russell` (standalone subject) → `the admin` / `the operator` / `Mako`
  - `Russell Sailors` (placeholder/seed) → `Jane Doe` (placeholder) or `Admin` (seed)
  - `russell.sailors@gmail.com` → `admin@example.com`
- **At session start on any repo, run:** `grep -nrE "Russell|Sailors|russell\.sailors@" --exclude-dir=node_modules --exclude-dir=.git --exclude-dir=.next .` Treat any hit as a defect to fix in this session, even if it's "just a comment."
- **When copy-pasting an admin/template page across repos, scrub names BEFORE the paste lands** — that's how the bulldog/aaa double-leak happened.

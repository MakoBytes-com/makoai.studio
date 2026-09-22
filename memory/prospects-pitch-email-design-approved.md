---
name: prospects-pitch-email-design-approved
description: "Themed prospect pitch EMAIL (deep-ocean/BIOLUMINANCE design from claude.ai artifact 229f8642) — SHIPPED into makoai-portal 2026-07-25 (commit e47ca1a): editable in the portal, per-prospect price, mockup toggle, auto-scraped contact email, test + real send via Resend"
metadata: 
  node_type: memory
  type: project
  originSessionId: ae411ab2-969b-4d40-9e1d-67b14f43e7ab
  modified: 2026-07-25T11:20:49.359Z
---

**The Written Pitch upgrade for the prospects pipeline.** Russell asked for a
better pitch than the plain generated text; a prior session built a **themed
pitch email** as a claude.ai artifact and on 2026-07-25 Russell said **"I like
it"** — this is the approved design.

**Artifact URL:**
https://claude.ai/code/artifact/229f8642-d2a0-49e9-94d5-efff80b8e521
(title: "Mako Studio — Themed Pitch Email")

**What it is:** a single-visual-world prospect pitch email in the deep-ocean
bioluminescent theme (matches makoai.studio's BIOLUMINANCE). Built
email-client-safe: 600px table layout, all-inline styles, web-safe fonts
(Georgia display / Arial body / Consolas mono), hex colors, no external
assets. Palette: bg #010407/#030711, card borders #0A1832/#0F2247, cyan
accents #2FCDEB/#5EEAFF/#9AF2FF, text #F2F6FB/#C7D3E4/#A9B5CB/#8A95AD,
CTA blue #3B82F6.

**Sections in order:** hidden preheader → header (Mako·Studio wordmark +
"Houston · The Woodlands") → eyebrow "Automated site audit" + greeting
("Hey — we took a look at [Business Name]") → warm-local AI intro copy →
audit scorecard card (big grade letter + score/100 + speed/seo/secure
mini-stats) → "What's quietly costing you calls" findings list (colored
severity dots, plain-English impact lines) → offer card ("$0 down, $349/mo",
cyan border) → optional mockup card ("View the mockup →", only when a link
exists) → dual CTAs ("See your full report" primary / "See our work"
secondary) → proof line (makoai.studio/work + "we run this same audit on our
own 28 sites every week") → coffee sign-off → footer with opt-out line.
Sample data shown: The Woodlands Plumbing Co., grade C, 72/100, speed 44.
Everything in [brackets] fills per prospect (AI copy + audit data + price).

**SHIPPED 2026-07-25** (makoai-portal commit `e47ca1a`, migration 0029
applied via Supabase Management API using SUPABASE_PAT/SUPABASE_REF from
.env.local). What Russell asked for — "edit the pitch email, change the
price, choose to offer a mockup or not, pull their email from the site,
add other controls you think of" — all live:

- `lib/prospects/pitch-email-template.ts` — the design as ONE pure renderer
  shared by the editor's live-preview iframe AND the send path (preview =
  exactly what sends). `sanitizePitchEmail` clamps drafts server-side.
- `lib/prospects/pitch-email.ts` — AI copy pass (forced-tool JSON:
  subject/preheader/intro/scoreline + findings rewrites, mapped 1:1 onto
  audit findings so severity dots stay truthful). Regenerate keeps the
  deal settings (price/mockup/links).
- Editor on `/admin/prospects/[id]` (`PitchEmailEditor.tsx`): send-to email,
  subject, preheader, headline name, intro, score one-liner, findings
  include-checkboxes + severity-dot picker + text edits, price down+monthly
  (defaults $0/$349), offer heading/note, mockup toggle+link+headline+note,
  work-link, proof, sign-off, Save draft, **Send me a test** ([TEST]
  prefix, no status change), **Send to prospect** (confirm dialog, warns on
  re-send). Sent banner shows pitch_email_sent_at/_to.
- Send mints the public /audit/<token> link on demand, flips
  discovered/selected → sent, logs activity; `sendRawEmail` THROWS on
  failure (unlike portal notification emails). From "Mako Studio
  <admin@makoai.studio>" (routes to admin@makologics.com via CF).
- Contact-email auto-scrape (`contact-scrape.ts`): mailto+text regex,
  homepage first (audit already has the HTML), then max 2 fetches of
  /contact-style pages; ranks domain-match + info@/contact@ prefixes;
  wired into BOTH manual re-audit and market-scan enrich; never overwrites
  a hand-entered address. `AuditResult.contactEmail` is the carrier.
- `ai-usage.ts` — shared AI-spend ledger (pitch.ts refactored onto it).

Pricing rule honored: $349/mo WaaS default, billing INTERNAL — never
Stripe ([[pricing-waas-model]]). Related: [[prospects-rebuild-planned]].

**HARD PREF (Russell 2026-07-25): the pitch email stays IMAGE-FREE — no
logo, no pictures — "I don't want it to get flagged" (spam
deliverability). The text wordmark "Mako·Studio" IS the email's brand
mark. Never add the fin logo or any image to this template.** Copy rules:
SEO (Google + AI) included in the price line stays; never call the
studio "small".

---
name: Next project — rebuild makologics.com off WordPress
description: After the Mako Studio Portal work winds down, the next major project is rebuilding makologics.com off WordPress onto the same Next.js + Supabase stack used for makoai.studio / the portal. The portal work (auth, client records, email templates, branded design system) is deliberate prep for it.
type: project
originSessionId: e68abf5d-4212-4bd8-a996-d7710efc71a7
---
**Fact.** Russell stated on 2026-04-19 that the next project is **rebuilding makologics.com** — moving it off WordPress onto the same Next.js stack used for makoai.studio and the portal. The portal work we're doing now (branded email templates, auth flows, client management, UI component library, Resend integration, design system) is intentional prep — those pieces carry over directly.

**Why:** Russell's existing makologics.com is WordPress. He's been explicit about wanting to leave WordPress behind on every project going forward (see `user_ai_native_builder.md`). He's been using the portal build to develop and debug the patterns he'll use on makologics.com. Branded transactional emails, passwordless auth, admin consoles, HIPAA-aware forms — all reusable.

**How to apply:**
- When building new components or patterns in the portal, keep them **reusable and exported from shared modules** so they can be lifted into makologics.com later without refactoring.
- When proposing scope / architecture choices for the portal, favor decisions that ALSO serve a future content-heavy marketing site with forms + internal dashboards (makologics.com's likely shape).
- When Russell kicks off makologics.com: start by lifting `lib/email/send.ts`, `components/PortalNav.tsx` patterns, and any auth scaffolding. The Supabase schema for portal clients is separate from whatever makologics.com needs, but the patterns translate.
- Don't bring this up unsolicited during portal work, but don't scope decisions as if the portal is the only consumer of these patterns.

**Current status of makologics.com:**
- Live on WordPress
- Russell is NOT under pressure to rebuild immediately — it works today
- Rebuild timing: "soon" per Russell (2026-04-19). No fixed deadline.

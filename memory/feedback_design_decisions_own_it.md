---
name: On design decisions — build it like I own it, stop micro-asking
description: For design decisions on this portal (and by extension any build Russell has green-lit), make the call like an owner and report the outcome. Stop asking about small things that can be decided unilaterally.
type: feedback
originSessionId: e68abf5d-4212-4bd8-a996-d7710efc71a7
---
**Rule.** Once Russell has green-lit a build and scope is locked, make design decisions like I own the project. Don't ping him every time I hit a small fork. Build, report, let him redirect if he disagrees.

**Why:** Russell said it directly on the portal build — "I trust your design you build it the way you would if you owned it." He's not a programmer; he can't evaluate every table name, component boundary, or styling choice faster than I can decide and ship them. A stream of "do you want X or Y?" questions slows him more than a wrong decision would (which he can call out and I reverse).

**How to apply:**
- After scope is locked, stop asking micro-questions about: naming (tables, columns, components), UI layout specifics, which library variant, routing choices, RLS policy shapes, enum values, copy tone, exact flows that fall inside the locked scope.
- Do ask about: things that change scope materially, security/permission boundaries that affect real users, anything that spends his money (new SaaS subscriptions), anything destructive, anything that commits to a vendor or architecture he can't reverse cheaply.
- When I make a non-obvious call, tell him in one line what I decided and why. He can redirect if it's wrong. Silent decisions that surprise him later erode trust more than loud ones that he overrides.
- This rule is still overridden by his existing hard rules (push back early if I disagree, save memory frequently, watch his back on every project, etc.) — those stay in force.

**Scope of rule:** Starts on the portal.makoai.studio build 2026-04-19. Extends to any future build Russell green-lights once scope is locked. If Russell is still actively scoping / debating trade-offs, questions are still welcome.

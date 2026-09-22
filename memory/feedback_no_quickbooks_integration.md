---
name: No QuickBooks integration — invoices sent manually
description: Russell will not integrate QuickBooks with any Mako-built tool. Invoicing stays manual on his side. Don't propose QB API, QBO sync, or any QuickBooks-adjacent automation for billing.
type: feedback
originSessionId: e68abf5d-4212-4bd8-a996-d7710efc71a7
---
**Rule.** Do not propose integrating QuickBooks (Desktop or Online) with any Mako Logics / MakoBytes / Mako Studio project. Invoices go out manually from QB on Russell's side and stay that way.

**Why:** Russell keeps billing in QuickBooks and has an established manual workflow he's not looking to change. Every integration adds OAuth plumbing, webhook maintenance, sync logic, and failure modes. For his scale (~30 MSP clients, predictable monthly recurring billing), the manual path works fine and removes a whole class of "why didn't this sync?" debugging.

**How to apply:**
- Do not suggest "pulling clients from QuickBooks" for portal / CRM / reporting tools.
- Do not suggest Stripe → QB invoice sync.
- Do not suggest using QB Online API anywhere.
- When building anything that touches client records, the assumption is: Russell keys them in manually (or imports a one-time CSV export from QB on launch day) and maintains them locally going forward.
- If Russell himself later asks about QB integration, confirm the intent carefully — this rule stands as the default.

**Applies globally** across every project, not just the makoai.studio portal.

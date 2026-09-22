---
name: pattern-validation-errors-inline-not-crash
description: "Server-action validation that a user can trigger by typing must render inline (redirect back with a message), never throw — a throw shows the generic crash page and pollutes the fleet error bridge as a fake server error. Found via the Sax Classes delete 2026-07-26."
metadata: 
  node_type: memory
  type: project
  originSessionId: 003b8877-b434-41d6-9534-6f4a3cf4647c
  modified: 2026-07-26T06:44:33.812Z
---

**The defect class (found 2026-07-26, makoai-portal):** Russell tried to delete
the Sax Classes client from the CP. The delete form's type-the-name guard was
exact-match, his typing ("Sax CLasses", "SAX CLASSES") didn't match
"Sax Classes", and the action did `throw new Error(...)` — so he saw the
generic "Something went wrong on the server" page, never the actual message,
and the typos landed in `fleet_client_errors` as fake server errors for the
duty officer.

**Why:** In Next.js App Router, an uncaught throw in a server action lands on
the nearest error boundary (`app/admin/error.tsx`) AND gets captured by
`onRequestError` → fleet error bridge. That's the right path for genuine
failures, the wrong path for "you typed it wrong."

**How to apply:**
- Any validation a user can trip from a form (name confirmations, format
  checks, required fields not enforceable client-side) → `redirect()` back to
  the form's page with an `?x_error=` param, render it inline (`role="alert"`,
  red card) near the control. Slice the param when rendering (`.slice(0,300)`);
  React text rendering keeps it XSS-safe.
- Confirm-name guards compare case-insensitively with collapsed whitespace —
  they prove intent, not typing discipline. Keep the non-empty requirement
  (empty-field bypass was a real CSRF-shaped hole, fixed earlier).
- Genuine server failures (DB errors, upstream 5xx) keep throwing — boundary +
  bridge is correct for those.
- Fixed for deleteClient in makoai-portal `73190e1`. KNOWN REMAINING CLASS:
  other portal admin actions (updateClient, addTeamMember, etc.) still throw
  on user-triggerable validation — convert them the same way whenever one is
  touched or if Russell hits another crash page on a form.

Related: [[feedback-verify-what-russell-sees]], [[fleet-changes-2026-07]].

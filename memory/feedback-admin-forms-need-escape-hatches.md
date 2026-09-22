---
name: feedback-admin-forms-need-escape-hatches
description: "Russell caught the same class of admin-UI mistake twice in ten minutes — a field hidden behind a toggle, and a dropdown with no way to add a missing entry. Build the escape hatch into the form, don't make him find it."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 88370289-89a2-473f-ae91-133c0fb97ba6
  modified: 2026-08-19T18:22:45.645Z
---

**2026-08-19**, while trying the new client upload links in makoai-portal. Two
corrections in a row, both the same underlying mistake, both found within
seconds of him opening the page:

1. *"So there is no place on this site for me to enter an email to send to the
   client?"* — The email field existed, but only inside a card for an EXISTING
   link, and only after clicking an "Email it" toggle to reveal it. On a page
   with no links yet there was no email input anywhere.
2. *"I dont see nautidawgs in the lsit to file under. I need to be able to fill
   out a new client or chose one"* — The dropdown listed all 27 client records
   correctly; nautiDAWGS simply wasn't one. The list was right and the flow was
   a dead end.

**Why:** both failures look fine to whoever built them, because the builder
knows the link exists / knows what's in the table. To the person actually using
it, a field you reach by first clicking something else is a field that isn't
there, and a dropdown that can only offer what already exists is a wall the
moment you need something new. This is Russell's standing "if a normal person
can't figure it out without instructions, it's wrong" applied to admin forms —
and he is the normal person here.

**How to apply — on every admin form, before calling it done:**
- **Put the primary action's input on the primary form.** If the point of
  creating a link is sending it, the address field belongs on the create form,
  not on a card that doesn't exist until after you've created it.
- **Never hide an input behind a toggle** to keep a card tidy. Always visible
  beats discoverable-by-clicking. Both fields here are now inline.
- **Every `<select>` of existing records needs a "not in this list" path** —
  a free-text field next to it that creates the record. Typing wins over the
  dropdown.
- **Walk the EMPTY state first.** Both bugs were only visible with zero rows,
  which is exactly the state Russell sees on a brand-new feature and the one
  least likely to get tested.
- **When auto-creating a record from a side door, override the column defaults
  that assume a full setup.** The new-client stub is `status='pending'` (not the
  default `active`, which would put it in revenue/renewals as if earning) and
  `monitor_enabled=false` (not the default `true`, which would point the fleet
  cron at a site that doesn't exist and raise false alerts). Match an existing
  name case-insensitively first so you don't create a duplicate beside it.

See [[feedback-verify-what-russell-sees]] — same root cause: verify the rendered
page as Russell will meet it, not the data layer underneath it.

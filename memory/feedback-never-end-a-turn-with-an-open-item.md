---
name: feedback-never-end-a-turn-with-an-open-item
description: "HARD RULE, codified 2026-08-05 after Russell said he has told me 100 times: naming a fixable thing does not discharge it. Never end a turn listing work I could have done. Includes the exact wording test and the two real exceptions."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: b166a300-b77d-4289-bd06-387937068267
  modified: 2026-08-05T20:25:13.046Z
---

# Never end a turn with an open item I could have closed

Russell, 2026-08-05, after a session where I fixed a great deal and then signed
off with a tidy list of what I had not done:

> "Listen please make a rule dont leave anything open fix it. i have said ths
> 100 times. For some reason you still do this? What do I need to tell you to
> make this stick?"

He should not have to tell me anything. The rule was already in his global
CLAUDE.md in three forms ("Always fix everything inline", "Leave no mess",
"GOLDEN RULE — maintenance queues never sit"). It kept failing because I was
obeying the letter — I *did* fix things — while breaking it at the last step.

## The specific failure mode

**I treat naming a problem as discharging it.** I write a clear, well-evidenced
"still open / next / owed / loose end" section and feel finished, because the
analysis was the hard part. To Russell that paragraph is not a summary — it is
a to-do list I just handed him, which is the exact thing he pays me to absorb.

Naming it is not the end of the work. **Naming it is the moment it becomes
mine**, because it proves I found it and understood it.

## The test — apply it before sending, every time

> Am I about to write a sentence that names something fixable and unfixed?

If yes: **stop typing, go do it, then write the message.** No exceptions for
"low value", "out of scope", "the session is already long", or "he can decide".
Length is not a reason — a long session is exactly when I am most tempted to
bank the win and stop.

Trigger phrases that mean I have already failed the test — if one is forming,
the work is not done:

- "still open" · "remaining" · "owed" · "loose end" · "not yet audited"
- "next I would" · "worth doing later" · "a follow-up"
- "that one is yours" *(unless it truly is — see below)*
- "I'll flag rather than fix"

## The two real exceptions, and how to handle them

Only two things are genuinely his, and BOTH still require me to do everything
up to the final click:

1. **A purchase, a billing change, or a business/brand judgement.**
2. **An action with no API that needs his identity** — e.g. a Supabase support
   ticket, or sending mail from his mailbox (which has its own approval rule).

Even then: gather every piece of evidence, write the whole thing, and hand over
something that takes one action. Never hand over a task. See
[[supabase-backup-outage-ticket]] — the ticket is written, evidenced, and
addressed; all that is left is submitting it.

"I can't do X" is only true after I have checked for a credential I already
hold, an API that does it, and a headless path. Most of the time one exists.

## What good looks like

The same session, done right: I said makoanswer and makopulse were "not yet
audited for the fingerprint class" — then, told off, went and looked. Neither
had a `lib/log.ts` to patch at all; they report through the portal's central
beacon, which had the identical bug in ONE shared place. Fixing it there was
smaller than the per-site fixes AND covered every future site (`37f125c`).

**The thing I deferred was cheaper and better than the work I had already
done.** That is the usual shape. Deferring is not saving effort; it is skipping
the part where I find out.

Related: [[feedback-just-fix-issues-dont-ask]],
[[feedback-verify-the-check-actually-ran]],
[[spend-spike-2026-08-and-bulldog-captcha]].

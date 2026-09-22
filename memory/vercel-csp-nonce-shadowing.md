---
name: vercel-csp-nonce-shadowing
description: "On Vercel, an enforced CSP without a nonce SHADOWS the report-only one that has it, so Next stamps no nonces — report-only-first is not a valid rollout for a nonce policy."
metadata: 
  node_type: memory
  type: project
  originSessionId: cc0cd53e-6e22-4492-8f78-7c422d332f3e
  modified: 2026-07-31T12:14:46.994Z
---

# Report-Only-first does NOT work for a nonce CSP on Vercel

Shipping a nonce policy as `Content-Security-Policy-Report-Only` first — the
normal, careful rollout — **silently prevents the nonce from ever being
applied**, so the audit shows hundreds of would-be violations and looks like the
policy is impossible. It is not. The rollout order is the bug.

## Why

Next reads the nonce out of the **request** headers:

```js
const csp = headers['content-security-policy'] || headers['content-security-policy-report-only']
```
(`next/dist/server/app-render/app-render.js`)

**Vercel reflects the RESPONSE `Content-Security-Policy` back into the request
headers the renderer sees.** So if an enforced policy without a nonce is present
— from `next.config.ts` `headers()` OR set on the response in `proxy.ts` — it
lands first in that `||` chain, `getScriptNonceFromHeader` finds no nonce, and
Next stamps nothing. The report-only policy carrying the nonce is never
consulted.

**The enforced header must itself carry the nonce.** There is no safe
"report-only soak" step for this specific change.

## How it presented (Bulldog, 2026-07-31)

- Production: **0 nonce attributes** across 22–49 `<script>` tags.
- The **same production build run locally**: 24 nonce attributes. So the code was
  never wrong.
- bndtrentals.com, same Vercel team, same Next 16.2.12: nonces fine — because its
  proxy sets the ENFORCED header with the nonce and has no config CSP.
- A wrong theory was tested and disproven first: removing the `next.config.ts`
  CSP alone did nothing, because the proxy was then set to emit the same
  nonce-less enforced header. Same shadowing, new source.

## How to prove it in five minutes

Add a temporary route on a **preview branch** that echoes what the renderer
receives — never on production:

```ts
const h = await headers();
return NextResponse.json({ nonce: h.get("x-nonce"), csp: h.get("content-security-policy") });
```

Two traps doing this:
- **`_`-prefixed app folders are PRIVATE/unroutable** in App Router. `app/api/_csp-debug` returns HTML, not your JSON.
- Preview deployments sit behind deployment protection and 302. Mint an
  automation bypass via `PATCH /v1/projects/{id}/protection-bypass {generate:{}}`,
  send it as `x-vercel-protection-bypass`, and revoke it after with
  `{revoke:{secret}}`.

## Safe way to flip

Do the whole thing on a preview branch: enforce the nonce policy there, confirm
every script tag is nonced and a real browser reports zero
`securitypolicyviolation` events across the risky pages, then merge. That is what
caught nothing being broken before Bulldog's live Birdeye webchat was touched.

Also: drop `'unsafe-inline'` from `script-src` when adding a nonce — CSP3
browsers ignore it once a nonce is present, so leaving it is decoration. Keep it
in `style-src`, because React inline style attributes cannot carry a nonce.

Related: [[rotation-blockers-and-vercel-env-gotchas]], [[feedback-verify-the-check-actually-ran]].

---
name: Never use `echo` to pipe values into `vercel env add` — always `printf "%s"`
description: The `echo` command appends a trailing newline, which Vercel preserves in the stored env var value. At build time Next.js inlines that newline into the client bundle (as literal `\n`) and downstream APIs like Cloudflare Turnstile reject the malformed value. Use `printf "%s"` instead — no trailing newline.
type: reference
originSessionId: 9eaeca22-65db-4465-a51a-301c8e0f18c0
---
**Rule.** When setting Vercel environment variables via stdin, use:

```bash
printf "%s" "value" | vercel env add NAME production
```

Never:

```bash
echo "value" | vercel env add NAME production
```

**Why:** `echo` on bash/zsh appends `\n` (0x0A) to its output. Vercel's CLI reads the full stdin including the newline and stores the value as `value\n`. Pulling it back with `vercel env pull` shows:

```
NAME="value\n"
```

Next.js, during build, interprets the `.env` file's escape sequences — so `\n` in the quoted value becomes a literal newline character embedded in the inlined string. The built bundle contains `const X = "value\n"`. Any API that format-checks the value (Cloudflare Turnstile's sitekey validator was the first case we hit) rejects it because it doesn't match the expected pattern.

**The symptom looks like a wrong value, not a formatting issue.** Cloudflare Turnstile returned:

```
TurnstileError: Invalid input for parameter "sitekey", got "0x4AAAAAADAGhYQ0Peg-dO2G"
```

— the visible portion looked correct, but the actual string had an extra `\n` at the end.

**How to diagnose when suspect:**

```bash
vercel env pull .env.tmp --environment=production --yes
grep YOUR_VAR .env.tmp | od -c | head -3
awk -F= '/YOUR_VAR/ {gsub(/"/,"",$2); print length($2)}' .env.tmp
rm .env.tmp
```

If length is 2 more than you expect, or `od -c` shows `\n` before the closing `"`, you have the echo bug.

**How to fix:**

```bash
vercel env rm YOUR_VAR production --yes
printf "%s" "clean-value" | vercel env add YOUR_VAR production
vercel --prod --yes    # redeploy so the clean value gets inlined
```

**Sensitive env vars:** `--sensitive` flag still works with `printf`:

```bash
printf "%s" "secret" | vercel env add YOUR_SECRET production --sensitive
```

**Not just Vercel.** The same rule applies anywhere I pipe a value into a CLI that reads stdin — Supabase CLI secrets, Cloudflare wrangler, gh secret set, etc. **Default: `printf "%s"` for any value-piping.** Reserve `echo` for human-readable log lines where the trailing newline is what I actually want.

**Applies globally** — every project, every session, every platform. Saved after hitting it live on makoai.studio 2026-04-20.

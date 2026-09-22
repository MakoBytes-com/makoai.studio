---
name: Use 6-digit OTP for password reset, not magic links
description: Password reset flows should always use a typed 6-digit code, not a clickable magic link. Email scanners pre-consume one-time link tokens before the user manually clicks, breaking the flow silently. OTP bypasses the entire class of problem.
type: feedback
originSessionId: e68abf5d-4212-4bd8-a996-d7710efc71a7
---
**Rule.** For any password-reset or email-based auth verification flow, default to a **6-digit OTP that the user TYPES INTO A FORM**, not a clickable magic link. This applies to password reset, email verification, passwordless sign-in — anywhere a magic link might be used.

**Why:** Built the Mako Studio Portal password reset flow using Supabase's default magic-link recovery. Russell tried reset multiple times. Clicking the email link always dumped him onto `/login` instead of `/auth/reset`. Every time. The culprit: email scanners (his mail server, Gmail's safe-browsing, corporate Microsoft ATP, Proofpoint, Mimecast, Resend's own click-tracking, etc.) pre-fetch the URL the moment the email arrives. Those HTTP GETs hit Supabase's `/auth/v1/verify` endpoint and **consume the one-time recovery token**. By the time the human manually clicked, the token was already invalidated — Supabase fell back to `site_url`, which redirected the user to login. Looked like a completely broken flow but was actually working exactly as designed; the design just doesn't survive modern email security.

We lost ~2 hours chasing this: swapped SMTP ports (465/587/2587), swapped senders (default vs Resend vs Resend API direct), fiddled URL allowlists, rebuilt the `/auth/reset` page three times to handle every permutation of PKCE/hash/session timing. None of it helped because the token was already dead before the page ever loaded. OTP (6-digit code the user types) is immune — scanners can pre-fetch URLs but can't type into forms.

**How to apply:**

For password reset specifically:
- `/auth/forgot` form → POST `/api/reset-password` (server generates 6-digit code, stores hash + expiry in a dedicated `password_reset_codes` table, sends email with code in a big monospace block via Resend API directly)
- Redirect to `/auth/verify-code?email=...`
- User enters email + code + new password in one form → POST `/api/verify-reset`
- Server validates code (hash + not expired + not used), looks up user by email, calls `supabase.auth.admin.updateUserById(id, { password })`, marks code used
- Response → redirect to `/login`

For email verification / passwordless login: same pattern — `signInWithOtp` sends a code (Supabase's OTP emails include both a code and a link; use the code, ignore the link).

**Specific mistakes to avoid:**
- Do not use Supabase's default `resetPasswordForEmail` → `redirectTo: /auth/reset` flow. It relies on a magic link.
- Do not use Supabase's default `inviteUserByEmail` → magic link. For admin-invited clients, set a temp password directly via `admin.auth.admin.createUser({ email, password, email_confirm: true })` and hand the password to the client through a channel admin controls.
- Do not send Resend emails from the Supabase SMTP relay for auth flows — go through the Resend API directly. Supabase SMTP to Resend adds another hop + rate-limit surface that pays no benefit when we control both ends.

**Applies globally** to every future auth-touching project.

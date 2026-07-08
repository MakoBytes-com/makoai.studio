export type TurnstileResult =
  | { ok: true; dormant?: boolean }
  | { ok: false; reason: string; codes?: string[] };

const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export function turnstileEnabled(): boolean {
  return Boolean(process.env.TURNSTILE_SECRET_KEY?.trim());
}

export async function verifyTurnstile(
  token: string | undefined | null,
  ip: string
): Promise<TurnstileResult> {
  // trim: guards against pasted env values with trailing newlines
  const secret = process.env.TURNSTILE_SECRET_KEY?.trim();
  if (!secret) {
    console.warn(
      "[turnstile] TURNSTILE_SECRET_KEY not set — skipping verification (dormant)."
    );
    return { ok: true, dormant: true };
  }

  if (!token) {
    return { ok: false, reason: "Please complete the verification challenge." };
  }

  const form = new URLSearchParams();
  form.set("secret", secret);
  form.set("response", token);
  if (ip && ip !== "unknown") form.set("remoteip", ip);

  try {
    const res = await fetch(VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: form.toString()
    });
    const data: { success?: boolean; "error-codes"?: string[] } = await res.json();
    if (data.success) return { ok: true };
    return {
      ok: false,
      reason: "Verification failed. Please try again.",
      codes: data["error-codes"]
    };
  } catch (err) {
    console.error("[turnstile] verify error:", err);
    return { ok: false, reason: "Verification service unavailable." };
  }
}

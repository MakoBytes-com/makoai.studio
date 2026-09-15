import "server-only";

/**
 * Outbound email through Cloudflare Email Service (the fleet standard —
 * see nautidawgs.com/lib/mail.ts for the reference implementation).
 * makoai.studio is onboarded as a sending domain on the Cloudflare zone.
 *
 * Never throws. A caller that expects a mail to go out gets `ok: false` and
 * a plain-English reason, so it can decide whether the user needs to know.
 *
 * SERVER ONLY.
 */

export function mailEnabled(): boolean {
  return Boolean(
    process.env.CLOUDFLARE_ACCOUNT_ID?.trim() &&
      process.env.CLOUDFLARE_EMAIL_TOKEN?.trim()
  );
}

export interface MailResult {
  ok: boolean;
  error?: string;
  /** Cloudflare's message id, kept on rows that track a send (review asks). */
  id?: string;
}

interface SendResponse {
  success?: boolean;
  errors?: { code?: number; message?: string }[];
  result?: {
    message_id?: string;
    delivered?: string[];
    queued?: string[];
    permanent_bounces?: string[];
    suppressed_recipients?: string[];
  };
}

export async function sendMail(input: {
  to: string;
  subject: string;
  text: string;
  html?: string;
  /** Full "Display Name <address>" or bare address to send from. */
  from: string;
  /** Optional reply-to; omitted entirely when not given. */
  replyTo?: string;
}): Promise<MailResult> {
  const account = process.env.CLOUDFLARE_ACCOUNT_ID?.trim();
  const token = process.env.CLOUDFLARE_EMAIL_TOKEN?.trim();
  if (!account || !token) {
    console.error(
      "[mail] CLOUDFLARE_ACCOUNT_ID / CLOUDFLARE_EMAIL_TOKEN missing. Mail NOT sent:",
      input.subject
    );
    return { ok: false, error: "Email is not configured on this deployment." };
  }

  try {
    const res = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${account}/email/sending/send`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          from: input.from,
          to: input.to,
          ...(input.replyTo ? { reply_to: input.replyTo } : {}),
          subject: input.subject,
          text: input.text,
          ...(input.html ? { html: input.html } : {})
        }),
        cache: "no-store",
        signal: AbortSignal.timeout(20_000)
      }
    );

    const json = (await res.json().catch(() => ({}))) as SendResponse;
    if (!res.ok || !json.success) {
      const why =
        json.errors?.map((e) => e.message).filter(Boolean).join("; ") ||
        `HTTP ${res.status}`;
      console.error("[mail] Cloudflare rejected the message:", why);
      return { ok: false, error: why };
    }

    const bounced = json.result?.permanent_bounces ?? [];
    const suppressed = json.result?.suppressed_recipients ?? [];
    if (bounced.includes(input.to) || suppressed.includes(input.to)) {
      const why = bounced.includes(input.to)
        ? "That address bounced permanently."
        : "That address is on the suppression list.";
      console.error("[mail] not deliverable:", input.to, why);
      return { ok: false, error: why };
    }

    return { ok: true, id: json.result?.message_id };
  } catch (err) {
    console.error("[mail] send failed:", err);
    return {
      ok: false,
      error: err instanceof Error ? err.message : "send failed"
    };
  }
}

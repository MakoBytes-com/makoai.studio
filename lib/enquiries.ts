import "server-only";

import { put } from "@vercel/blob";

/**
 * Durable storage for contact enquiries.
 *
 * The enquiry is written here BEFORE the notification email is attempted, so a
 * mail outage can never destroy a message. Until 2026-09-21 this site only
 * emailed enquiries, and the route answered `{ ok: true, devFallback: true }`
 * whenever mail was unconfigured — so during the Cloudflare email-token outage
 * a prospect saw "your message is in" while the message existed nowhere but a
 * console line. This is the form people use to HIRE us; losing one is the most
 * expensive bug on the site.
 *
 * Records live in the PRIVATE Vercel Blob store `makoai-enquiries`
 * (store_sTkh243RhlMcC0ge, iad1). They contain personal data, so the store must
 * stay private — a public store would make every enquiry readable by anyone
 * holding the URL. BLOB_READ_WRITE_TOKEN is scoped to Production only on
 * purpose: a preview is a preview, and a PR branch has no business being able
 * to list or read the real enquiry pile.
 *
 * SERVER ONLY — do not import from client components.
 */

export interface Enquiry {
  name: string;
  email: string;
  company?: string;
  budget?: string;
  message: string;
  ip: string;
  userAgent: string | null;
}

/** What is actually written to the store: the enquiry plus when it arrived. */
export interface EnquiryRecord extends Enquiry {
  receivedAt: string;
  /**
   * How the notification email went, stamped on after the send attempt. A
   * record with `sent: false` is an enquiry nobody has been told about —
   * scripts/unsent-enquiries.mjs lists them. Records stored before 2026-09-25
   * have no `notification` field at all, so their outcome is unknown, not
   * failed. Not called `email`: that field is the sender's address.
   */
  notification?: EmailOutcome;
}

export interface EmailOutcome {
  sent: boolean;
  messageId: string | null;
  error: string | null;
  attemptedAt: string;
}

export interface StoreResult {
  ok: boolean;
  /** Blob pathname of the stored record — quote this when recovering one. */
  key?: string;
  /** The exact record written, so the send outcome can be added without a read-back. */
  record?: EnquiryRecord;
  error?: string;
}

/** Keeps preview and local submissions out of the real pile. */
function environment(): string {
  return process.env.VERCEL_ENV ?? "development";
}

/**
 * Writes the enquiry to durable storage. Never throws: the caller decides what
 * the visitor sees, and it needs to weigh this result against the mail result.
 */
export async function storeEnquiry(enquiry: Enquiry): Promise<StoreResult> {
  // .trim() for the same reason as every other env read in this project — a
  // pasted value with a trailing newline broke every send for 79 days.
  const token = process.env.BLOB_READ_WRITE_TOKEN?.trim();
  if (!token) {
    return {
      ok: false,
      error: "BLOB_READ_WRITE_TOKEN is not set on this deployment."
    };
  }

  const receivedAt = new Date();
  const stamp = receivedAt.toISOString().replace(/[:.]/g, "-");
  // The UUID segment means two submissions in the same millisecond cannot
  // collide — `put` rejects a duplicate pathname rather than overwriting.
  const key = `enquiries/${environment()}/${receivedAt
    .toISOString()
    .slice(0, 10)}/${stamp}-${crypto.randomUUID().slice(0, 8)}.json`;

  const record: EnquiryRecord = { receivedAt: receivedAt.toISOString(), ...enquiry };

  try {
    const blob = await put(key, JSON.stringify(record, null, 2), {
      access: "private",
      contentType: "application/json",
      addRandomSuffix: false,
      token,
      abortSignal: AbortSignal.timeout(15_000)
    });
    return { ok: true, key: blob.pathname, record };
  } catch (err) {
    console.error("[enquiry] could not store enquiry:", err);
    return {
      ok: false,
      error: err instanceof Error ? err.message : "store failed"
    };
  }
}

/**
 * Stamps the notification outcome onto a stored enquiry, so a failed email is
 * self-identifying in the store instead of relying on an alert that may never
 * arrive. Same pattern as govsprint's markContactMessageSent.
 *
 * Rewrites the same pathname. A Blob `put` replaces the object atomically, so
 * if this rewrite fails the original record is still there, intact — it just
 * lacks the `notification` field, which the recovery script reports as "unknown".
 *
 * Never throws: the enquiry is already safe by the time this runs, and failing
 * the visitor's request over a bookkeeping update would undo the point of
 * storing first.
 */
export async function markEnquiryEmailed(
  key: string,
  record: EnquiryRecord,
  outcome: { sent: boolean; messageId?: string | null; error?: string | null }
): Promise<void> {
  const token = process.env.BLOB_READ_WRITE_TOKEN?.trim();
  if (!token) return;

  const notification: EmailOutcome = {
    sent: outcome.sent,
    messageId: outcome.messageId ?? null,
    error: outcome.sent ? null : outcome.error ?? "send failed",
    attemptedAt: new Date().toISOString()
  };

  try {
    await put(key, JSON.stringify({ ...record, notification }, null, 2), {
      access: "private",
      contentType: "application/json",
      addRandomSuffix: false,
      allowOverwrite: true,
      token,
      abortSignal: AbortSignal.timeout(15_000)
    });
  } catch (err) {
    console.error(`[enquiry] could not record email outcome on ${key}:`, err);
  }
}

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

export interface StoreResult {
  ok: boolean;
  /** Blob pathname of the stored record — quote this when recovering one. */
  key?: string;
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

  try {
    const blob = await put(
      key,
      JSON.stringify({ receivedAt: receivedAt.toISOString(), ...enquiry }, null, 2),
      {
        access: "private",
        contentType: "application/json",
        addRandomSuffix: false,
        token,
        abortSignal: AbortSignal.timeout(15_000)
      }
    );
    return { ok: true, key: blob.pathname };
  } catch (err) {
    console.error("[enquiry] could not store enquiry:", err);
    return {
      ok: false,
      error: err instanceof Error ? err.message : "store failed"
    };
  }
}

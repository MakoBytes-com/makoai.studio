import "server-only";

/**
 * Operational alerts → the Mako fleet portal, the same board `instrumentation.ts`
 * and `app/error.tsx` report this site's errors to (slug `makoai-studio`).
 *
 * For problems that would otherwise pass unnoticed: a contact email that failed
 * to send, a storage write that failed. A caught error nobody is told about is
 * the same as no error handling at all — that is precisely how the contact form
 * sat broken for 79 days.
 *
 * Two rules: it never throws, and it never carries personal data. Send the fact
 * and the record key so the enquiry can be recovered — never the enquiry body.
 *
 * SERVER ONLY — do not import from client components.
 */
const SITE_SLUG = "makoai-studio";
const ENDPOINT = "https://portal.makoai.studio/api/err";

export async function reportProblem(message: string, where: string): Promise<void> {
  // Same policy as instrumentation.ts: only the real production deployment
  // reports, so preview branches and local dev never spam the board.
  if (process.env.VERCEL_ENV !== "production") {
    console.warn(`[alert] (not production, not reported) ${where}: ${message}`);
    return;
  }

  try {
    await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        slug: SITE_SLUG,
        message: message.slice(0, 500),
        url: where,
        kind: "server"
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(5_000)
    });
  } catch {
    /* an alert that fails must never affect the visitor's request */
  }
}

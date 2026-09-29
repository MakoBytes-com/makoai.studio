import "server-only";
import { sendMail } from "@/lib/mail";

/**
 * Operational alerts → an email to the ops inbox.
 *
 * For problems that would otherwise pass unnoticed: a contact email that failed
 * to send, a storage write that failed. A caught error nobody is told about is
 * the same as no error handling at all — that is precisely how the contact form
 * sat broken for 79 days.
 *
 * This used to post to the fleet portal's /api/err. The portal was rebuilt on
 * 2026-08-24 as a view that stores nothing and that collector was not brought
 * back, so from then until 2026-09-28 every alert here landed on a login
 * redirect and reached nobody. Email needs no central service: it uses this
 * site's own Cloudflare sender.
 *
 * Rules: it never throws, it never carries personal data (send the fact and
 * the record key so the enquiry can be recovered, never the enquiry body), and
 * the same problem is emailed at most once an hour per server instance so a
 * failure loop cannot flood the inbox. Everything also goes to the log.
 *
 * SERVER ONLY — do not import from client components.
 */
const SUPPORT_EMAIL = "admin@makoai.studio";
const ONCE_PER_MS = 60 * 60_000;
const lastSent = new Map<string, number>();

export async function reportProblem(message: string, where: string, detail?: string): Promise<void> {
  // `detail` (a stack trace, say) rides along in the email and the log but is
  // not part of the once-an-hour key, so the same error from two browsers with
  // slightly different stacks is still one email.
  console.error(`[alert] ${where}: ${message}${detail ? `\n${detail}` : ""}`);
  // Only the real production deployment emails, so preview branches and local
  // dev never reach the inbox.
  if (process.env.VERCEL_ENV !== "production") return;

  const key = `${where}|${message}`.slice(0, 300);
  const now = Date.now();
  if (now - (lastSent.get(key) ?? 0) < ONCE_PER_MS) return;
  lastSent.set(key, now);
  if (lastSent.size > 500) lastSent.clear();

  try {
    const to = (process.env.ALERT_TO_EMAIL ?? process.env.CONTACT_TO_EMAIL ?? SUPPORT_EMAIL).trim();
    const from = (process.env.CONTACT_FROM_EMAIL ?? SUPPORT_EMAIL).trim();
    await sendMail({
      from: `Mako Studio alerts <${from}>`,
      to,
      // Control characters out of the subject: some messages now come from a
      // visitor's browser (app/api/client-error), so never trust them in a header.
      subject: `⚠️ makoai.studio: ${message.replace(/[\x00-\x1f\x7f]+/g, " ").slice(0, 80)}`,
      text: `Something on makoai.studio needs a look.\n\nWhere: ${where}\nWhat: ${message.slice(0, 1000)}${detail ? `\n\nDetail:\n${detail.slice(0, 2000)}` : ""}\n\nThis alert is sent at most once an hour for the same problem.`,
    });
  } catch {
    /* an alert that fails must never affect the visitor's request */
  }
}

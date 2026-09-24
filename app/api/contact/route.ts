import { NextResponse } from "next/server";
import { mailEnabled, sendMail, type MailResult } from "@/lib/mail";
import { renderInquiryEmail } from "@/lib/email";
import { verifyTurnstile } from "@/lib/turnstile";
import { storeEnquiry } from "@/lib/enquiries";
import { reportProblem } from "@/lib/alert";

export const runtime = "nodejs";

/** Shown to a visitor only when we could neither store nor send their message. */
const SUPPORT_EMAIL = "admin@makoai.studio";

type Body = {
  name?: string;
  email?: string;
  company?: string;
  budget?: string;
  message?: string;
  website?: string;
  "cf-turnstile-response"?: string;
};

const rateMap = new Map<string, number[]>();
const RATE_MAX = 3;
const RATE_WINDOW_MS = 10 * 60 * 1000;

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const hits = (rateMap.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (hits.length >= RATE_MAX) return false;
  hits.push(now);
  rateMap.set(ip, hits);
  return true;
}

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  let body: Body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "We couldn't read that submission. Please reload the page and try again." },
      { status: 400 }
    );
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const message = (body.message ?? "").trim();
  const company = (body.company ?? "").trim() || undefined;
  const budget = (body.budget ?? "").trim() || undefined;

  // Validation runs BEFORE the rate limit on purpose. The budget is 3 attempts
  // per 10 minutes, so counting typos against it would lock a real prospect out
  // for ten minutes over three mistyped email addresses.
  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Please fill in your name, email, and a note about the project." },
      { status: 400 }
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "That email doesn't look right — please check it and try again." },
      { status: 400 }
    );
  }

  // Honeypot: a hidden field no human ever sees. Answer as though it worked so
  // the bot learns nothing, and store nothing — the pile stays clean.
  if (body.website) {
    return NextResponse.json({ ok: true });
  }

  if (!rateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many messages from this connection. Please try again in a few minutes." },
      { status: 429 }
    );
  }

  const captcha = await verifyTurnstile(body["cf-turnstile-response"], ip);
  if (!captcha.ok) {
    return NextResponse.json({ error: captcha.reason }, { status: 400 });
  }

  const userAgent = req.headers.get("user-agent");
  const { subject, html, text } = renderInquiryEmail({
    name,
    email,
    company,
    budget,
    message,
    ip,
    userAgent: userAgent ?? undefined
  });

  // 1. PERSIST FIRST. The enquiry is the thing of value; the email is only a
  //    notification. Emailing first means a mail outage destroys the message —
  //    which is exactly what this route used to do, while cheerfully telling
  //    the visitor it had gone through.
  const stored = await storeEnquiry({
    name,
    email,
    company,
    budget,
    message,
    ip,
    userAgent
  });

  // 2. Notify by email. Non-fatal from here on: the enquiry is already safe.
  //
  // .trim() everywhere: a pasted env var with a trailing newline broke
  // every send for 79 days (invalid Authorization header). Never again.
  let mail: MailResult = { ok: false, error: "Email is not configured on this deployment." };
  if (mailEnabled()) {
    const to = (process.env.CONTACT_TO_EMAIL ?? SUPPORT_EMAIL).trim();
    const from = (process.env.CONTACT_FROM_EMAIL ?? SUPPORT_EMAIL).trim();
    mail = await sendMail({
      from: `Mako Studio <${from}>`,
      to,
      replyTo: email,
      subject,
      html,
      text
    });
  }

  // 3. Decide what the visitor sees, based on what actually survived.
  if (stored.ok) {
    if (!mail.ok) {
      // Saved, but nobody has been told yet — raise it so it doesn't sit unread.
      console.error(`[contact] mail failed (${mail.error}); enquiry saved at ${stored.key}`);
      await reportProblem(
        `Contact email failed (${mail.error}). The enquiry IS SAVED at blob "${stored.key}" — recover it from the makoai-enquiries store.`,
        "/api/contact"
      );
    }
    return NextResponse.json({ ok: true });
  }

  if (mail.ok) {
    // Not stored, but it did reach the inbox, so nothing is lost.
    console.error(`[contact] storage failed (${stored.error}); email was sent`);
    await reportProblem(
      `Contact enquiry could not be stored (${stored.error}). The email was sent, so it is not lost — but the store is broken.`,
      "/api/contact"
    );
    return NextResponse.json({ ok: true });
  }

  if (process.env.NODE_ENV !== "production") {
    // Local dev with neither configured: the console is the delivery, and the
    // form stays testable. Not a lost enquiry, so don't cry wolf.
    console.log(`[contact] (dev — no storage or email configured)\n${text}`);
    return NextResponse.json({ ok: true });
  }

  // Storage AND email both failed — the only case where a message is genuinely
  // at risk. Log the whole thing so it is at least recoverable from the runtime
  // log, and tell the visitor the truth rather than pretending it went through.
  console.error(
    `[contact] LOST ENQUIRY — storage failed (${stored.error}) AND mail failed (${mail.error}). Full message follows:\n${text}`
  );
  await reportProblem(
    `LOST a contact enquiry: storage failed (${stored.error}) AND email failed (${mail.error}). Body is in the runtime log only.`,
    "/api/contact"
  );
  return NextResponse.json(
    {
      error: `We couldn't get your message through. Please email ${SUPPORT_EMAIL} directly — we'd hate to miss it.`
    },
    { status: 500 }
  );
}

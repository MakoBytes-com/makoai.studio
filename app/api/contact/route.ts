import { NextResponse } from "next/server";
import { Resend } from "resend";
import { renderInquiryEmail } from "@/lib/email";
import { verifyTurnstile } from "@/lib/turnstile";

export const runtime = "nodejs";

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

  if (!rateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Try again in a few minutes." },
      { status: 429 }
    );
  }

  let body: Body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (body.website) {
    return NextResponse.json({ ok: true });
  }

  const captcha = await verifyTurnstile(body["cf-turnstile-response"], ip);
  if (!captcha.ok) {
    return NextResponse.json({ error: captcha.reason }, { status: 400 });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const message = (body.message ?? "").trim();
  const company = (body.company ?? "").trim() || undefined;
  const budget = (body.budget ?? "").trim() || undefined;

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 400 }
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "That email doesn't look right." },
      { status: 400 }
    );
  }

  // .trim() everywhere: a pasted env var with a trailing newline broke
  // every send for 79 days (invalid Authorization header). Never again.
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const to = (process.env.CONTACT_TO_EMAIL ?? "admin@makoai.studio").trim();
  const from = (process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev").trim();

  const userAgent = req.headers.get("user-agent") ?? undefined;
  const { subject, html, text } = renderInquiryEmail({
    name,
    email,
    company,
    budget,
    message,
    ip,
    userAgent
  });

  if (!apiKey) {
    console.warn(
      "[contact] RESEND_API_KEY is not set — dropping submission to console only."
    );
    console.log("[contact] Submission:", { name, email, company, budget });
    return NextResponse.json({ ok: true, devFallback: true });
  }

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from: `Mako Studio <${from}>`,
    to: [to],
    replyTo: email,
    subject,
    html,
    text
  });

  if (error) {
    console.error("[contact] Resend error:", error);
    return NextResponse.json(
      { error: "Email provider rejected the send." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}

import { reportProblem } from "@/lib/alert";
import { isForeignError } from "@/lib/client-error-noise";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Where a visitor's browser reports an error (components/FleetBeacon for
// uncaught errors and rejections, app/error.tsx for render errors React caught).
//
// These used to go to the fleet portal's /api/err, which was not rebuilt when
// the portal was deleted on 2026-08-24: every beacon since has landed on a
// login redirect, so a crash in a visitor's browser reached nobody. This site
// has no database, so a report goes to the runtime log and, through
// reportProblem(), to the ops inbox, at most once an hour per distinct error.
//
// It is PUBLIC and can send email, so it is fenced: our own pages only, 5 per
// minute per visitor, at most 20 logged and 5 emailed per hour per server
// instance, and browser noise that is not ours (extensions, injected history
// hooks, the opaque "Script error.") dropped. It always answers 204 so a
// caller learns nothing either way.

const ORIGINS = ["https://makoai.studio", "https://www.makoai.studio"];
const PER_IP_PER_MIN = 5;
const LOGGED_PER_HOUR = 20;
const EMAILED_PER_HOUR = 5;

const hits = new Map<string, { count: number; ts: number }>();
let hour = { start: 0, logged: 0, emailed: 0 };

function throttled(ip: string): boolean {
  const now = Date.now();
  const rec = hits.get(ip);
  if (!rec || now - rec.ts > 60_000) {
    hits.set(ip, { count: 1, ts: now });
    if (hits.size > 5000) hits.clear();
    return false;
  }
  rec.count += 1;
  return rec.count > PER_IP_PER_MIN;
}

const done = () => new Response(null, { status: 204 });
const clean = (s: string) => s.replace(/[\x00-\x08\x0b-\x1f\x7f]+/g, " ");

export async function POST(req: Request): Promise<Response> {
  const origin = req.headers.get("origin");
  if (origin && !ORIGINS.includes(origin)) return done();

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (throttled(ip)) return done();

  let body: { message?: unknown; stack?: unknown; url?: unknown };
  try {
    // sendBeacon posts text/plain, so parse the text rather than req.json().
    body = JSON.parse((await req.text()).slice(0, 5000));
  } catch {
    return done();
  }

  const message = typeof body.message === "string" ? clean(body.message).slice(0, 500).trim() : "";
  const stack = typeof body.stack === "string" ? clean(body.stack).slice(0, 2000) : undefined;
  let page = "";
  try {
    const u = new URL(typeof body.url === "string" ? body.url : "");
    // Path only: a query string could carry something personal.
    if (ORIGINS.includes(u.origin)) page = u.pathname;
  } catch {
    /* not a URL */
  }
  if (!message || !page) return done();
  if (isForeignError(message, stack)) return done();

  const now = Date.now();
  if (now - hour.start > 60 * 60_000) hour = { start: now, logged: 0, emailed: 0 };
  if (hour.logged >= LOGGED_PER_HOUR) return done();
  hour.logged += 1;

  if (hour.emailed >= EMAILED_PER_HOUR) {
    console.error(`[client-error] ${page}: ${message}${stack ? `\n${stack}` : ""}`);
    return done();
  }
  hour.emailed += 1;
  await reportProblem(`Browser error: ${message}`, `${page} (visitor's browser)`, stack);
  return done();
}

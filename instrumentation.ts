// Server-side error reporting → an email via lib/alert.ts. This site has no
// error table of its own; uncaught server errors (route handlers, server
// components, actions) used to beacon to the fleet portal's /api/err, which was
// not rebuilt after 2026-08-24, so they reached nobody. reportProblem() emails
// the ops inbox instead, at most once an hour per distinct problem. Reporting
// can never affect the response to a real visitor.

export function register() {
  // no-op — required export for Next.js instrumentation.
}

export async function onRequestError(
  err: unknown,
  request: { path: string },
) {
  if (process.env.NODE_ENV !== "production" || process.env.NEXT_RUNTIME !== "nodejs") return;
  try {
    const e = err instanceof Error ? err : new Error(String(err));
    const { reportProblem } = await import("@/lib/alert");
    await reportProblem(`Uncaught server error: ${e.message.slice(0, 400)}`, request.path);
  } catch {
    // never let error reporting cause an error
  }
}

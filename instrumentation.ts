// Server-side error reporting → the fleet duty officer. This site has no
// error table of its own; uncaught server errors (route handlers, server
// components, actions) beacon to the portal's /api/err collector and show
// up on the AI Triage board. Reporting is fire-and-forget — it can never
// affect the response to a real visitor.

export function register() {
  // no-op — required export for Next.js instrumentation.
}

export async function onRequestError(
  err: unknown,
  request: { path: string },
) {
  if (process.env.NODE_ENV !== "production") return;
  try {
    const e = err instanceof Error ? err : new Error(String(err));
    await fetch("https://portal.makoai.studio/api/err", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        slug: "makoai-studio",
        message: e.message.slice(0, 500),
        stack: e.stack?.slice(0, 2000),
        url: request.path,
        kind: "server",
      }),
    });
  } catch {
    // never let error reporting cause an error
  }
}

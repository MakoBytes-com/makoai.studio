"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { isForeignError } from "@/lib/client-error-noise";

export const PROD_HOSTS = ["makoai.studio", "www.makoai.studio"];
export const ERROR_ENDPOINT = "/api/client-error";

// Anonymous page-view beacon → the Mako Studio fleet portal. Reports only
// the path, a random per-session id (sessionStorage), and referrer — no PII.
// This lets makoai.studio's traffic surface on the fleet board without a
// database of its own. It's analytics collection, not the ops dashboard —
// the monitor still lives only at portal.makoai.studio.
export default function FleetBeacon({ site }: { site: string }) {
  const pathname = usePathname();
  useEffect(() => {
    if (typeof window === "undefined") return;
    let sid = "";
    try {
      sid = sessionStorage.getItem("mako_sid") || "";
      if (!sid) {
        sid =
          (crypto.randomUUID && crypto.randomUUID()) ||
          String(Math.random()).slice(2);
        sessionStorage.setItem("mako_sid", sid);
      }
    } catch {
      /* sessionStorage may be unavailable — beacon still fires without a sid */
    }
    const body = JSON.stringify({
      site,
      path: pathname || location.pathname,
      sid,
      ref: document.referrer || "",
    });
    try {
      const url = "https://portal.makoai.studio/api/pv";
      // sendBeacon posts as text/plain (no CORS preflight); collector parses text.
      if (navigator.sendBeacon) navigator.sendBeacon(url, body);
      else fetch(url, { method: "POST", body, keepalive: true }).catch(() => {});
    } catch {
      /* never let analytics break a page */
    }
  }, [pathname, site]);

  // Client-side error beacon → this site's own /api/client-error, which logs
  // it and emails the ops inbox (the fleet portal's /api/err collector no
  // longer exists). Only on the production domain (skips localhost and
  // preview deploys), each unique message reported once per page load, errors
  // that are not ours (browser extensions, injected history hooks, opaque
  // "Script error.") dropped, and reporting itself can never throw into the page.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!PROD_HOSTS.includes(location.hostname)) return;
    const sent = new Set<string>();
    const report = (message: string, stack?: string, filename?: string) => {
      try {
        const msg = String(message || "").slice(0, 500);
        if (!msg || sent.has(msg) || sent.size >= 10) return;
        if (isForeignError(msg, stack, filename)) return;
        sent.add(msg);
        const payload = JSON.stringify({
          slug: site,
          message: msg,
          stack: stack ? String(stack).slice(0, 2000) : undefined,
          url: location.href,
          kind: "client",
        });
        if (navigator.sendBeacon) navigator.sendBeacon(ERROR_ENDPOINT, payload);
        else
          fetch(ERROR_ENDPOINT, { method: "POST", body: payload, keepalive: true }).catch(
            () => {},
          );
      } catch {
        /* reporting must never hurt the page */
      }
    };
    const onError = (e: ErrorEvent) =>
      report(e.message, e.error instanceof Error ? e.error.stack : undefined, e.filename);
    const onRejection = (e: PromiseRejectionEvent) => {
      const r = e.reason;
      report(
        r instanceof Error ? r.message : String(r ?? "unhandled rejection"),
        r instanceof Error ? r.stack : undefined,
      );
    };
    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onRejection);
    return () => {
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onRejection);
    };
  }, [site]);

  return null;
}

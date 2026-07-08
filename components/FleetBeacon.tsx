"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

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
  return null;
}

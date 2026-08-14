"use client";

import { useEffect } from "react";
import Link from "next/link";

/**
 * Route-level error boundary.
 *
 * WHY THIS EXISTS: this site renders a WebGL hero, GSAP scroll animation and
 * a smooth-scroll layer on the client. Any one of those throwing on an
 * unusual GPU, a lost canvas context or a blocked third-party script used to
 * take the whole route down to Next's default crash screen — an unbranded
 * white page with no way forward. A visitor cannot tell that apart from the
 * site being dead.
 *
 * Note this is deliberately plain HTML and inline handlers: an error boundary
 * that itself depends on the animation stack can fail for the same reason the
 * page did.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // The global listener in FleetBeacon only sees uncaught errors; React has
    // already caught this one, so report it explicitly or it goes unrecorded.
    try {
      if (!/(^|\.)makoai\.studio$/.test(location.hostname)) return;
      const payload = JSON.stringify({
        slug: "makoai-studio",
        message: String(error?.message || "render error").slice(0, 500),
        stack: error?.stack ? String(error.stack).slice(0, 2000) : undefined,
        url: location.href,
        kind: "client",
        digest: error?.digest,
      });
      const url = "https://portal.makoai.studio/api/err";
      if (navigator.sendBeacon) navigator.sendBeacon(url, payload);
      else fetch(url, { method: "POST", body: payload, keepalive: true }).catch(() => {});
    } catch {
      /* reporting must never replace the error screen with a worse one */
    }
  }, [error]);

  return (
    <main id="main-content" className="relative min-h-screen flex items-center">
      <div className="container-narrow py-24">
        <span className="section-label">Something broke</span>
        <h1 className="mt-5 font-display font-medium text-[32px] md:text-[46px] leading-[1.08] tracking-tight">
          This page didn&rsquo;t load properly.
        </h1>
        <p className="mt-5 text-[15px] text-mist-300 leading-relaxed max-w-2xl">
          That&rsquo;s our fault, not yours. The error has been reported to us
          automatically. Trying again usually works — it&rsquo;s often a one-off.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-tide-600 hover:bg-tide-500 text-white font-medium text-[15px] transition-colors duration-300"
          >
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-mist-300/15 hover:border-mist-300/30 text-mist-200 font-medium text-[15px] transition-colors duration-300"
          >
            Back to the homepage
          </Link>
        </div>

        <p className="mt-10 text-[13px] text-mist-400">
          If it keeps happening, email{" "}
          <a href="mailto:admin@makoai.studio" className="text-lumen-300">
            admin@makoai.studio
          </a>
          {error?.digest ? ` and quote reference ${error.digest}.` : "."}
        </p>
      </div>
    </main>
  );
}

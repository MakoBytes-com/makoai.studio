"use client";

import { useEffect } from "react";

// After we ship a new deployment, a browser that still has the old page
// open can try to fetch a JavaScript chunk that the new build replaced —
// which throws a ChunkLoadError (fleet duty-officer finding, issue #23).
// The recovery a visitor would do by hand — refresh once — we do for them
// so the new build's assets load cleanly and the failure stays invisible.
//
// Guarded by sessionStorage so a genuinely broken build (a chunk that is
// still missing after the reload) can never trap a visitor in a refresh
// loop; if storage is unavailable we simply don't auto-reload, leaving the
// old manual-refresh behaviour untouched.
const RELOAD_KEY = "mako_chunk_reload_at";
const RELOAD_COOLDOWN_MS = 10_000;

function isChunkLoadError(value: unknown): boolean {
  if (!value) return false;
  const name = value instanceof Error ? value.name : "";
  const message = value instanceof Error ? value.message : String(value);
  return (
    name === "ChunkLoadError" ||
    /ChunkLoadError|Loading chunk [\w-]+ failed|Failed to load chunk/i.test(
      message,
    )
  );
}

export default function ChunkReloadGuard() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const reloadOnce = () => {
      let last = 0;
      try {
        last = Number(sessionStorage.getItem(RELOAD_KEY) || 0);
        sessionStorage.setItem(RELOAD_KEY, String(Date.now()));
      } catch {
        // sessionStorage unavailable (e.g. hardened privacy mode): without
        // it we can't guard against a loop, so leave manual refresh to the
        // visitor rather than risk reloading endlessly.
        return;
      }
      if (Date.now() - last < RELOAD_COOLDOWN_MS) return; // already tried
      window.location.reload();
    };

    const onError = (e: ErrorEvent) => {
      if (isChunkLoadError(e.error) || isChunkLoadError(e.message)) reloadOnce();
    };
    const onRejection = (e: PromiseRejectionEvent) => {
      if (isChunkLoadError(e.reason)) reloadOnce();
    };

    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onRejection);
    return () => {
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onRejection);
    };
  }, []);

  return null;
}

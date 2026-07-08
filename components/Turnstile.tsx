"use client";

import { useCallback, useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    turnstile?: {
      ready: (cb: () => void) => void;
      render: (
        el: HTMLElement,
        opts: {
          sitekey: string;
          theme?: "light" | "dark" | "auto";
          appearance?: "always" | "execute" | "interaction-only";
          callback?: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: (code?: string) => void;
          "timeout-callback"?: () => void;
        }
      ) => string;
      remove: (id: string) => void;
      reset: (id?: string) => void;
    };
  }
}

const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
const RENDER_TIMEOUT_MS = 12_000;

type Props = {
  onToken: (token: string) => void;
  onExpire?: () => void;
};

type WidgetState = "loading" | "ready" | "error";

export default function Turnstile({ onToken, onExpire }: Props) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const mountRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [state, setState] = useState<WidgetState>("loading");
  const [attempt, setAttempt] = useState(0);

  const retry = useCallback(() => {
    setState("loading");
    setAttempt((n) => n + 1);
  }, []);

  useEffect(() => {
    if (!siteKey || !mountRef.current) return;

    let cancelled = false;
    const el = mountRef.current;
    el.innerHTML = "";

    const timeout = setTimeout(() => {
      if (cancelled) return;
      setState((s) => (s === "ready" ? s : "error"));
    }, RENDER_TIMEOUT_MS);

    function ensureScript(): Promise<void> {
      if (window.turnstile) return Promise.resolve();
      const existing = document.querySelector<HTMLScriptElement>(
        `script[src="${SCRIPT_SRC}"]`
      );
      if (existing) {
        return new Promise((resolve, reject) => {
          existing.addEventListener("load", () => resolve(), { once: true });
          existing.addEventListener(
            "error",
            () => reject(new Error("script error")),
            { once: true }
          );
        });
      }
      const s = document.createElement("script");
      s.src = SCRIPT_SRC;
      s.async = true;
      s.defer = true;
      document.head.appendChild(s);
      return new Promise((resolve, reject) => {
        s.addEventListener("load", () => resolve(), { once: true });
        s.addEventListener(
          "error",
          () => reject(new Error("script load failed")),
          { once: true }
        );
      });
    }

    ensureScript()
      .then(() => {
        if (cancelled || !mountRef.current || !window.turnstile) return;
        try {
          widgetIdRef.current = window.turnstile.render(mountRef.current, {
            sitekey: siteKey!,
            theme: "dark",
            appearance: "always",
            callback: (token) => {
              clearTimeout(timeout);
              setState("ready");
              onToken(token);
            },
            "expired-callback": () => {
              onExpire?.();
            },
            "error-callback": (code) => {
              clearTimeout(timeout);
              setState("error");
              onExpire?.();
              console.error("[turnstile] error-callback:", code);
            }
          });
          // Widget rendered — switch to "ready" even before challenge resolves so the user sees it.
          setState("ready");
        } catch (err) {
          clearTimeout(timeout);
          setState("error");
          console.error("[turnstile] render threw:", err);
        }
      })
      .catch((err) => {
        if (cancelled) return;
        clearTimeout(timeout);
        setState("error");
        console.error("[turnstile] script load failed:", err);
      });

    return () => {
      cancelled = true;
      clearTimeout(timeout);
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch {
          /* ignore */
        }
        widgetIdRef.current = null;
      }
    };
  }, [siteKey, onToken, onExpire, attempt]);

  if (!siteKey) return null;

  return (
    <div className="min-h-[70px]">
      {state === "loading" && (
        <div className="flex items-center gap-2 text-[12px] text-mist-400">
          <span className="inline-block w-3 h-3 border-2 border-mist-500 border-t-lumen-300 rounded-full animate-spin" />
          Loading verification…
        </div>
      )}
      {state === "error" && (
        <div className="text-[12px] text-amber-300/90 space-y-1">
          <div>
            Couldn't load the bot-check. An extension or strict privacy setting may be blocking
            <span className="opacity-70"> challenges.cloudflare.com</span>.
          </div>
          <button
            type="button"
            onClick={retry}
            className="underline hover:no-underline text-amber-200"
          >
            Try again
          </button>
          <span className="opacity-70"> · or email </span>
          <a
            href="mailto:admin@makoai.studio"
            className="underline hover:no-underline text-amber-200"
          >
            admin@makoai.studio
          </a>
        </div>
      )}
      <div ref={mountRef} className="cf-turnstile-mount" />
    </div>
  );
}

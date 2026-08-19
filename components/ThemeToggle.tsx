"use client";

import { useSyncExternalStore } from "react";

export type Theme = "dark" | "light";

export const THEME_STORAGE_KEY = "mako-theme";

/**
 * Dark ⇄ light switch.
 *
 * The theme is already on <html data-theme> before React runs — see the
 * blocking script in app/layout.tsx — so this component never decides the
 * theme, it only reflects and changes it. Deciding it here (in an effect)
 * would repaint after first paint, which is the white flash every themed
 * site is known for.
 *
 * The <html> attribute IS the source of truth, so this reads it through
 * useSyncExternalStore rather than mirroring it into React state. That is
 * what the hook is for, it satisfies the compiler's rule against setState in
 * an effect, and it means a change in one tab shows up in the others for
 * free via the storage event.
 */
const listeners = new Set<() => void>();

function subscribe(onChange: () => void): () => void {
  listeners.add(onChange);
  // Fires when ANOTHER tab writes the key — keeps windows in step.
  window.addEventListener("storage", onChange);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onChange);
  };
}

function readTheme(): Theme {
  if (typeof document === "undefined") return "dark";
  const stored = document.documentElement.dataset.theme;
  if (stored === "light" || stored === "dark") return stored;
  // Another tab may have changed the stored value without touching this DOM.
  try {
    const fromStorage = localStorage.getItem(THEME_STORAGE_KEY);
    if (fromStorage === "light" || fromStorage === "dark") return fromStorage;
  } catch {
    /* storage unavailable — fall through to the brand default */
  }
  return "dark";
}

/** Matches the server-rendered <html data-theme="dark">. */
function serverTheme(): Theme {
  return "dark";
}

export function applyTheme(next: Theme): void {
  document.documentElement.dataset.theme = next;
  try {
    localStorage.setItem(THEME_STORAGE_KEY, next);
  } catch {
    // Private mode or storage disabled: the switch still works for this
    // visit, it just will not be remembered. Not worth telling anyone.
  }
  // Keep the mobile browser chrome in step with the page.
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", next === "light" ? "#f8f9fb" : "#020509");
  listeners.forEach((l) => l());
}

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const theme = useSyncExternalStore(subscribe, readTheme, serverTheme);
  const isLight = theme === "light";

  return (
    <button
      type="button"
      onClick={() => applyTheme(isLight ? "dark" : "light")}
      aria-pressed={isLight}
      aria-label={isLight ? "Switch to dark theme" : "Switch to light theme"}
      title={isLight ? "Switch to dark theme" : "Switch to light theme"}
      className={
        "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border " +
        "border-mist-300/20 text-mist-300 transition-colors duration-300 " +
        "hover:border-lumen-400/50 hover:text-lumen-300 " +
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lumen-400 " +
        className
      }
    >
      <span aria-hidden>
        {isLight ? (
          // Moon — the thing this button would switch you TO.
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
          </svg>
        )}
      </span>
    </button>
  );
}

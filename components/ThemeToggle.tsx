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

/**
 * Read the current theme from anywhere in the tree.
 *
 * Needed by the handful of things that cannot be themed with CSS because a
 * third party paints them — the Turnstile widget is the one that matters, as
 * it takes its colour scheme as a render option and lives in the contact form.
 */
export function useTheme(): Theme {
  return useSyncExternalStore(subscribe, readTheme, serverTheme);
}

function SunIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

/**
 * WHY THIS IS A LABELLED PILL AND NOT A NEAT LITTLE ICON.
 *
 * The first version was a 36px circle with a hairline border and a thin icon,
 * parked past the primary CTA at the far right of the bar. It shipped, it
 * worked, and Russell's response to being told the site had a light theme was
 * "I dont see it" — which is the only review that counts. An icon-only control
 * asks the visitor to already know what it is AND to spot it; a low-contrast
 * one asks them to hunt.
 *
 * So: a real word next to the icon, a border you can see, and the label says
 * where the button TAKES you ("Light" while you are in dark), because that is
 * what someone reaching for it is looking for. The icon alone stays on small
 * screens, where the word will not fit, but keeps the same visible border.
 */
export default function ThemeToggle({
  className = "",
  /**
   * Drop the word and keep the icon. For the copy that lives INSIDE the nav
   * row at medium widths, where the full bar (six links plus two buttons) is
   * already close to the edge — the labelled pill pushed it 58px off-screen at
   * 800px. The corner copy on wide screens keeps its label.
   */
  compact = false
}: {
  className?: string;
  compact?: boolean;
}) {
  const theme = useTheme();
  const isLight = theme === "light";
  const label = isLight ? "Dark" : "Light";

  return (
    <button
      type="button"
      onClick={() => applyTheme(isLight ? "dark" : "light")}
      aria-pressed={isLight}
      aria-label={`Switch to ${label.toLowerCase()} theme`}
      title={`Switch to ${label.toLowerCase()} theme`}
      className={
        "inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-full border-2 " +
        (compact ? "w-10 " : "px-3.5 sm:px-4 ") +
        "border-mist-300/45 text-mist-100 text-[13px] font-semibold " +
        "transition-colors duration-300 " +
        "hover:border-lumen-400 hover:text-lumen-300 " +
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lumen-400 " +
        className
      }
    >
      <span aria-hidden className="shrink-0">
        {isLight ? <MoonIcon /> : <SunIcon />}
      </span>
      {/* Hidden on phones and in the compact copy — the icon carries it. */}
      {!compact && (
        <span aria-hidden className="hidden sm:inline">
          {label}
        </span>
      )}
    </button>
  );
}

/**
 * Browser errors that are not ours and that we cannot fix, shared by the
 * client senders (components/FleetBeacon, app/error.tsx) and the route that
 * receives them (app/api/client-error), so a report dropped in one place is
 * dropped in both.
 *
 * Kept deliberately narrow: only signatures that can never come from this
 * site's own bundle.
 */

// Injected scripts from browser extensions and in-app browsers (ad blockers,
// privacy tools, translators, coupon widgets) carry an extension-scheme URL in
// the error's filename or stack.
const EXTENSION_ORIGIN =
  /(?:chrome|moz|ms-browser|safari(?:-web)?)-extension:\/\/|webkit-masked-url:\/\//i;

// Attempts to reassign the browser's read-only native History navigation
// methods come from injected navigation hooks; our code never assigns these
// (first diagnosed on localaibox.com, localaibox-site issue #26).
const FOREIGN_NAV_HOOK = /Cannot assign to read only property '(?:push|replace)State'/i;

// Cross-origin script failures surface as an opaque "Script error." with no
// stack: the browser hides the details, so there is nothing to act on.
const OPAQUE_SCRIPT_ERROR = /^script error\.?$/i;

export function isForeignError(message: string, stack?: string | null, filename?: string | null): boolean {
  const msg = message.trim();
  if (!stack && OPAQUE_SCRIPT_ERROR.test(msg)) return true;
  if (FOREIGN_NAV_HOOK.test(msg)) return true;
  if (filename && EXTENSION_ORIGIN.test(filename)) return true;
  if (stack && EXTENSION_ORIGIN.test(stack)) return true;
  return false;
}

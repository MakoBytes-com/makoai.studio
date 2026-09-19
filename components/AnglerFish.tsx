/**
 * The pricing page's resident anglerfish — real footage, not a drawing.
 * A CrazyRouter-generated photoreal anglerfish on a pure black frame,
 * boomerang-looped with ffmpeg (forward + reverse concat) so it swims
 * seamlessly forever. The black frame disappears into the abyss
 * background via `mix-blend-mode: screen` (see `.angler-video` in
 * globals.css) — only the fish and its lure-glow exist on the page.
 *
 * Dark theme only (`[data-theme='light'] .angler-wrap` hides it), and
 * users with reduced motion get the still poster instead of the video.
 * Pointer-inert and aria-hidden throughout.
 */
export default function AnglerFish() {
  return (
    <>
      <video
        className="angler-video w-full h-auto"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/videos/anglerfish-poster-v2.webp"
        aria-hidden="true"
        tabIndex={-1}
      >
        {/* Versioned filename: /videos/* is cached immutable for a year,
            so any re-encode must ship under a NEW name or the CDN keeps
            serving the old bytes forever. */}
        <source src="/videos/anglerfish-v2.mp4" type="video/mp4" />
      </video>
      {/* Reduced-motion fallback: same fish, holding still */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/videos/anglerfish-poster-v2.webp"
        alt=""
        className="angler-still hidden w-full h-auto"
        aria-hidden="true"
        loading="lazy"
      />
    </>
  );
}

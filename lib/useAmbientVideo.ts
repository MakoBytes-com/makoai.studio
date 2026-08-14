"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeToMotionPreference(onChange: () => void) {
  if (typeof window === "undefined" || !window.matchMedia) return () => {};
  const mq = window.matchMedia(MOTION_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

/** True when the visitor has NOT asked for reduced motion. */
const readMotionOk = () =>
  typeof window === "undefined" || !window.matchMedia
    ? false
    : !window.matchMedia(MOTION_QUERY).matches;

/**
 * On the server we cannot know the setting, so report "reduced". The markup
 * then hydrates to whatever the visitor actually asked for, and someone who
 * wants stillness never sees a frame of movement first.
 */
const readMotionOkOnServer = () => false;

/**
 * Shared behaviour for the site's decorative background videos (the Process
 * and Testimonials sections), which each crossfade one clip against a second
 * copy of itself to loop seamlessly.
 *
 * Two problems this exists to solve, both of which were present when the
 * pattern was copy-pasted into a second component:
 *
 *  1. ACCESSIBILITY. Every other motion component on this site checks
 *     prefersReducedMotion() — these two did not. Auto-starting motion that
 *     runs longer than five seconds with no way to stop it fails WCAG 2.2.2
 *     (Pause, Stop, Hide, Level A). Under reduced motion we now hold a single
 *     still frame instead, which keeps the design intact.
 *
 *  2. BANDWIDTH. Both sections sit well below the fold, but rendered with
 *     `preload="auto"` and autoplay, so 1.1MB of video — doubled by the
 *     two-element crossfade — began downloading on page load and competed
 *     with the LCP. Nothing is requested now until the section is nearly in
 *     view, matching what the hero canvas already does.
 *
 * Keeping it in one hook means the next section that wants a video backdrop
 * inherits both guards instead of re-introducing both bugs.
 */
export function useAmbientVideo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoA = useRef<HTMLVideoElement>(null);
  const videoB = useRef<HTMLVideoElement>(null);

  const [active, setActive] = useState<"a" | "b">("a");
  const [hasVideo, setHasVideo] = useState(true);
  const [inView, setInView] = useState(false);

  // Subscribed rather than read once, so someone who changes the setting mid
  // visit gets the change immediately — and so state is never assigned
  // synchronously inside an effect, which React 19 rightly rejects.
  const motionOk = useSyncExternalStore(
    subscribeToMotionPreference,
    readMotionOk,
    readMotionOkOnServer,
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el || inView) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          io.disconnect();
        }
      },
      // Start fetching just before it scrolls into view so it isn't visibly
      // blank when it arrives.
      { rootMargin: "300px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [inView]);

  const playing = inView && motionOk;

  useEffect(() => {
    if (!playing) return;
    const a = videoA.current;
    const b = videoB.current;
    if (!a || !b) return;

    const FADE = 1.2;

    const onTimeA = () => {
      if (!a.duration) return;
      if (a.currentTime >= a.duration - FADE && active === "a") {
        b.currentTime = 0;
        b.play().catch(() => {});
        setActive("b");
      }
    };

    const onTimeB = () => {
      if (!b.duration) return;
      if (b.currentTime >= b.duration - FADE && active === "b") {
        a.currentTime = 0;
        a.play().catch(() => {});
        setActive("a");
      }
    };

    a.addEventListener("timeupdate", onTimeA);
    b.addEventListener("timeupdate", onTimeB);
    (active === "a" ? a : b).play().catch(() => {});

    return () => {
      a.removeEventListener("timeupdate", onTimeA);
      b.removeEventListener("timeupdate", onTimeB);
    };
  }, [active, playing]);

  return {
    containerRef,
    videoA,
    videoB,
    active,
    hasVideo,
    onVideoError: () => setHasVideo(false),
    /** Render the <video> elements at all? False until nearly on screen. */
    ready: inView && hasVideo,
    /** Under reduced motion we still want the first frame, just frozen. */
    autoPlay: motionOk,
    preload: motionOk ? "auto" : "metadata",
  } as const;
}

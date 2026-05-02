"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Hero plays a looping background video. If `/hero.mp4` is missing, it falls
 * back to a CSS "underwater" background. To hide the hard-cut on non-seamless
 * AI-generated videos, the component stacks two <video> elements and crossfades
 * between them: the second copy starts playing when the first nears its end,
 * then they swap opacity. The visible "restart" becomes invisible.
 */
export default function Hero() {
  const videoA = useRef<HTMLVideoElement>(null);
  const videoB = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState<"a" | "b">("a");
  const [hasVideo, setHasVideo] = useState(true);

  useEffect(() => {
    const a = videoA.current;
    const b = videoB.current;
    if (!a || !b) return;

    // crossfade duration (seconds) — how long before end we start the other clip
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
    a.play().catch(() => {});
    return () => {
      a.removeEventListener("timeupdate", onTimeA);
      b.removeEventListener("timeupdate", onTimeB);
    };
  }, [active]);

  return (
    <section
      id="top"
      className="relative min-h-[100svh] flex items-center overflow-hidden"
    >
      {/* Video layer (two staggered copies for seamless crossfade loop) */}
      <div className="absolute inset-0">
        {hasVideo && (
          <>
            <video
              ref={videoA}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1200ms] ${
                active === "a" ? "opacity-100" : "opacity-0"
              }`}
              style={{ filter: "brightness(0.7) saturate(1.05)" }}
              src="/hero.mp4"
              autoPlay
              muted
              playsInline
              preload="auto"
              onError={() => setHasVideo(false)}
            />
            <video
              ref={videoB}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1200ms] ${
                active === "b" ? "opacity-100" : "opacity-0"
              }`}
              style={{ filter: "brightness(0.7) saturate(1.05)" }}
              src="/hero.mp4"
              muted
              playsInline
              preload="auto"
              onError={() => setHasVideo(false)}
            />
          </>
        )}

        {/* Animated fallback — also serves as under-video tint */}
        {!hasVideo && (
          <>
            <div className="water-bg" />
            <div className="caustics" />
            <div className="particles" />
            <div className="shadow-swim" />
          </>
        )}

        {/* God rays sit above both video + fallback for consistent mood */}
        <div className="god-rays" />

        {/* Left-weighted dark pane so text stays readable on busy footage.
            Right side stays bright to show off the video. */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink-900 via-ink-900/75 to-ink-900/10" />
        {/* Top + bottom fade — softens navbar edge and transitions into next section */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink-900/60 via-transparent to-ink-900" />
        {/* Subtle blue atmosphere at top */}
        <div className="absolute inset-0 bg-hero-radial opacity-60" />
      </div>

      {/* Content */}
      <div className="container-narrow relative z-10 pt-28 pb-20 md:pt-0 md:pb-0">
        <div className="max-w-3xl">
          <span className="section-label">Mako Studio — Montgomery, TX</span>

          <h1 className="mt-6 font-display font-semibold text-[40px] md:text-[68px] leading-[1.02] tracking-tight">
            AI-native design
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-tide-300 to-steel-200">
              and engineering.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-[16px] md:text-[18px] text-steel-300 leading-relaxed">
            Mako Studio is the in-house web team at Mako Logics. Every site
            we ship is designed, built, and deployed with AI-native workflows —
            premium quality at a fraction of traditional agency timelines.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#work"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-tide-500 hover:bg-tide-400 text-white font-medium text-[14px] transition-all shadow-glow hover:-translate-y-0.5"
            >
              See the work
              <Arrow />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full glass hover:bg-white/10 text-steel-100 font-medium text-[14px] transition-all"
            >
              Start a project
            </a>
          </div>

          <div className="mt-14 flex items-center gap-8 text-[12px] tracking-[0.2em] uppercase text-steel-400">
            <span>Next.js</span>
            <span className="w-1 h-1 rounded-full bg-steel-400/50" />
            <span>Vercel</span>
            <span className="w-1 h-1 rounded-full bg-steel-400/50" />
            <span>Cloudflare</span>
            <span className="hidden md:inline w-1 h-1 rounded-full bg-steel-400/50" />
            <span className="hidden md:inline">Resend</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#services"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-steel-400 hover:text-steel-100 transition-colors"
        aria-label="Scroll down"
      >
        <svg width="24" height="38" viewBox="0 0 24 38" fill="none">
          <rect
            x="1"
            y="1"
            width="22"
            height="36"
            rx="11"
            stroke="currentColor"
            strokeOpacity="0.6"
          />
          <circle cx="12" cy="10" r="3" fill="currentColor">
            <animate
              attributeName="cy"
              values="10;22;10"
              dur="2s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>
      </a>
    </section>
  );
}

function Arrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M3 8h10m0 0l-4-4m4 4l-4 4"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

"use client";

import dynamic from "next/dynamic";
import Magnetic from "@/components/motion/Magnetic";
import { Reveal, RevealLines } from "@/components/motion/Reveal";

/**
 * DEPTH 00 — THE SURFACE.
 *
 * The hero is the top of a dive: god-light from above, the abyss
 * below, and the studio's mako — tens of thousands of bioluminescent
 * particles — assembling itself out of the current. The 3D layer is
 * client-only (ssr:false) and sits behind the copy; the H1 stays
 * plain HTML so LCP and crawlers never wait on WebGL.
 */
const MakoHeroCanvas = dynamic(
  () => import("@/components/three/MakoHeroCanvas"),
  { ssr: false }
);

export default function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-[100svh] flex items-center overflow-hidden bg-abyss-950"
    >
      {/* ── the water column ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        {/* God-light breaking the surface */}
        <div className="absolute inset-0 bg-surface-light" />
        {/* Deep-blue mid-water tint */}
        <div className="absolute inset-0 bg-water-column" />
      </div>

      {/* ── the mako ── */}
      <MakoHeroCanvas />

      {/* Left reading pane so copy floats calm above the light.
          pointer-events-none — decorative layers must never eat the
          pointermove stream the shark listens to. */}
      <div
        className="absolute inset-0 pointer-events-none bg-gradient-to-r from-abyss-950/80 via-abyss-950/30 to-transparent"
        aria-hidden
      />

      {/* ── content ── */}
      <div className="container-narrow relative z-10 pt-28 pb-24 md:pt-0 md:pb-0 w-full">
        <div className="max-w-3xl">
          <Reveal delay={0.15} y={18}>
            <span className="section-label">
              Mako Studio — Montgomery, TX
            </span>
          </Reveal>

          <RevealLines
            as="h1"
            delay={0.3}
            className="mt-8 font-display font-medium text-[46px] md:text-[84px] leading-[1.02] tracking-tight text-mist-100 headline-glow"
          >
            <>AI-native design</>
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-lumen-300 via-tide-300 to-mist-200 pr-2">
              and engineering.
            </span>
          </RevealLines>

          <Reveal delay={0.75} y={26}>
            <p className="mt-7 max-w-xl text-[17px] md:text-[19px] text-mist-300 leading-relaxed">
              Mako Studio is the in-house web team at Mako Logics. Every site
              we ship is designed, built, and deployed with AI-native workflows —
              premium quality at a fraction of traditional agency timelines.
            </p>
          </Reveal>

          <Reveal delay={0.95} y={26}>
            <div className="mt-11 flex flex-wrap items-center gap-4">
              <Magnetic>
                <a
                  href="#work"
                  className="group inline-flex items-center gap-2.5 px-7 py-4 rounded-full bg-tide-500 hover:bg-tide-400 text-white font-medium text-[15px] transition-colors duration-300 shadow-glow hover:shadow-glow-lumen"
                >
                  See the work
                  <Arrow />
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-7 py-4 rounded-full glass-deep text-mist-100 font-medium text-[15px]"
                >
                  Start a project
                </a>
              </Magnetic>
            </div>
          </Reveal>

          <Reveal delay={1.2} y={16}>
            <div className="mt-16 flex items-center gap-8 telemetry">
              <span>Next.js</span>
              <span className="w-1 h-1 rounded-full bg-mist-500/50" aria-hidden />
              <span>Vercel</span>
              <span className="w-1 h-1 rounded-full bg-mist-500/50" aria-hidden />
              <span>Cloudflare</span>
              <span
                className="hidden md:inline w-1 h-1 rounded-full bg-mist-500/50"
                aria-hidden
              />
              <span className="hidden md:inline">Resend</span>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Dive coordinates — the instrument panel's corner stamp */}
      <div
        className="hidden lg:block absolute bottom-10 right-10 z-10 text-right telemetry"
        aria-hidden
      >
        <div>30.3877° N · 95.6966° W</div>
        <div className="mt-1 text-lumen-400/80">DEPTH 00 — SURFACE</div>
      </div>

      {/* Scroll indicator — the dive line */}
      <a
        href="#services"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3 text-mist-500 hover:text-lumen-300 transition-colors"
        aria-label="Scroll down"
      >
        <span className="telemetry text-current">Dive</span>
        <span className="relative block w-px h-12 bg-mist-500/30 overflow-hidden">
          <span className="absolute left-0 top-0 w-px h-4 bg-lumen-400 animate-dive-line" />
        </span>
      </a>
    </section>
  );
}

function Arrow() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className="transition-transform duration-300 group-hover:translate-x-1"
      aria-hidden
    >
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

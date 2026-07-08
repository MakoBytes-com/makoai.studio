"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal, RevealLines } from "@/components/motion/Reveal";

const pillars = [
  {
    title: "Built with Claude — every site, every line",
    body: "We use Claude Code as our primary build partner. Not a plugin, not a helper — the core of the development pipeline. No WordPress, no visual page builders, no templates-as-products."
  },
  {
    title: "Design and build run in parallel",
    body: "Traditional agencies hand off a design to a developer and lose two weeks in translation. AI-native workflows compress design + code into one motion — you see working pages sooner."
  },
  {
    title: "One engineer, full pipeline",
    body: "Discovery, design, engineering, deployment, maintenance — each project runs through one engineer with AI leverage, end-to-end. What used to take a five-person team now takes one. Nothing gets lost between specialists because there are no specialists to hand off to."
  },
  {
    title: "Premium quality at startup speed",
    body: "What used to take 6 weeks ships in 2. Not because we cut corners — because the overhead that a traditional agency bills for (meetings, hand-offs, review cycles) doesn't exist here."
  }
];

export default function Process() {
  const videoA = useRef<HTMLVideoElement>(null);
  const videoB = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState<"a" | "b">("a");
  const [hasVideo, setHasVideo] = useState(true);

  useEffect(() => {
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
    a.play().catch(() => {});
    return () => {
      a.removeEventListener("timeupdate", onTimeA);
      b.removeEventListener("timeupdate", onTimeB);
    };
  }, [active]);

  return (
    <section id="process" className="relative py-28 md:py-40 overflow-hidden">
      <div className="absolute inset-0">
        {hasVideo && (
          <>
            <video
              ref={videoA}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1200ms] ${
                active === "a" ? "opacity-100" : "opacity-0"
              }`}
              style={{ filter: "brightness(0.4) saturate(1.1)" }}
              src="/process.mp4"
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
              style={{ filter: "brightness(0.4) saturate(1.1)" }}
              src="/process.mp4"
              muted
              playsInline
              preload="auto"
              onError={() => setHasVideo(false)}
            />
          </>
        )}
        <div className="absolute inset-0 bg-abyss-950/40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(94,234,255,0.06),transparent_60%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[28rem] md:h-[34rem] bg-[linear-gradient(to_bottom,#020509_0%,#020509_28%,rgba(2,5,9,0.88)_52%,rgba(2,5,9,0.55)_72%,rgba(2,5,9,0.2)_88%,transparent_100%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[28rem] md:h-[34rem] bg-[linear-gradient(to_top,#020509_0%,#020509_28%,rgba(2,5,9,0.88)_52%,rgba(2,5,9,0.55)_72%,rgba(2,5,9,0.2)_88%,transparent_100%)]" />
      </div>
      <div className="container-narrow relative">
        <div className="grid md:grid-cols-12 gap-10 mb-16">
          <div className="md:col-span-5">
            <Reveal y={18}>
              <span className="section-label">How we build</span>
            </Reveal>
            <RevealLines
              as="h2"
              className="mt-6 font-display font-medium text-[38px] md:text-[56px] leading-[1.04] tracking-tight text-mist-100"
            >
              <>AI-native.</>
              <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-lumen-300 via-tide-300 to-mist-200 pr-1.5">
                Not AI-assisted.
              </span>
            </RevealLines>
          </div>
          <div className="md:col-span-6 md:col-start-7 flex items-end">
            <Reveal delay={0.25}>
              <p className="text-[16px] text-mist-300 leading-relaxed">
                &quot;AI-assisted&quot; means someone&apos;s hand-coding with
                autocomplete. &quot;AI-native&quot; means the AI IS the engineer
                — and the studio is built around that. It&apos;s a fundamentally
                different shape, and it&apos;s how every Mako Studio project
                ships.
              </p>
            </Reveal>
          </div>
        </div>

        <Reveal stagger={0.08} className="grid md:grid-cols-2 gap-4">
          {pillars.map((p, i) => (
            <article key={p.title} className="glass-deep rounded-2xl p-8">
              <div className="flex items-start gap-5">
                <div className="telemetry text-lumen-400 mt-1">0{i + 1}</div>
                <div className="flex-1">
                  <h3 className="font-display text-[19px] font-medium text-mist-100">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-[14px] text-mist-300 leading-relaxed">
                    {p.body}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

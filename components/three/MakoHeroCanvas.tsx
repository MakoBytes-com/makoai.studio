"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsapClient";
import MakoParticles from "./MakoParticles";

/**
 * Hero canvas shell. Owns everything that is not art:
 *  - intro choreography (plankton coalesce into the shark over ~3s)
 *  - scroll choreography (the form disperses as the visitor dives)
 *  - IntersectionObserver pause (zero GPU work once scrolled past)
 *  - DPR cap, mobile particle budget, additive-friendly GL flags
 *  - reduced-motion: renders ONE still frame of the fully-formed
 *    shark — present and beautiful, perfectly motionless
 *
 * WebGL-unavailable clients simply see the hero's CSS abyss backdrop;
 * the canvas mounts nothing on failure.
 */
export default function MakoHeroCanvas() {
  const container = useRef<HTMLDivElement>(null);
  const intro = useRef(0); // 0→1 once, on load
  const disperse = useRef(0); // 0→1 with scroll, scrubbed
  const [active, setActive] = useState(true);
  const [reduced, setReduced] = useState<boolean | null>(null);

  // Composite driver read by the shader every frame
  const formed = useMemo(
    () => ({
      get current() {
        return intro.current * (1 - disperse.current);
      }
    }),
    []
  );

  const count = useMemo(() => {
    if (typeof window === "undefined") return 30000;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const small = window.innerWidth < 768;
    return coarse || small ? 16000 : 42000;
  }, []);

  useEffect(() => {
    setReduced(prefersReducedMotion());
  }, []);

  useEffect(() => {
    if (reduced === null) return;
    if (reduced) {
      intro.current = 1; // still frame of the formed shark
      return;
    }

    // ── intro: the ocean assembles itself ──
    const tween = gsap.to(intro, {
      current: 1,
      duration: 3.2,
      delay: 0.45,
      ease: "power2.inOut"
    });

    // ── dive: scrolling past the hero returns the shark to the current ──
    const el = container.current;
    let st: ScrollTrigger | undefined;
    if (el) {
      st = ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: "bottom top",
        scrub: 0.6,
        onUpdate: (self) => {
          disperse.current = self.progress;
          el.style.opacity = String(1 - self.progress * 0.85);
        }
      });
    }

    return () => {
      tween.kill();
      st?.kill();
    };
  }, [reduced]);

  // Park the GPU entirely once the hero is out of view
  useEffect(() => {
    const el = container.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { rootMargin: "80px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  if (reduced === null) {
    // First paint: hold the layer, decide motion policy after hydration
    return <div ref={container} className="absolute inset-0" aria-hidden />;
  }

  return (
    <div ref={container} className="absolute inset-0" aria-hidden>
      <Canvas
        camera={{ fov: 42, position: [0, 0, 6.8] }}
        dpr={[1, 2]}
        frameloop={reduced ? "demand" : active ? "always" : "never"}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance"
        }}
        fallback={null}
        flat
      >
        <group position={[0.85, -0.1, 0]}>
          <MakoParticles count={count} formed={formed} />
        </group>
      </Canvas>
    </div>
  );
}

"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsapClient";
import MakoParticles from "./MakoParticles";

/** Can this browser actually create a WebGL context? Probed once on a
 *  throwaway canvas so we never hand @react-three/fiber a context it
 *  can't make — that throw surfaces as
 *  "THREE.WebGLRenderer: Error creating WebGL context." */
function supportsWebGL(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl2") || canvas.getContext("webgl"))
    );
  } catch {
    return false;
  }
}

/**
 * Hero canvas shell. Owns everything that is not art:
 *  - intro choreography (plankton coalesce into the shark over ~3s)
 *  - scroll choreography (the form disperses as the visitor dives)
 *  - WINDOW-level pointer tracking, mapped into the canvas' NDC space —
 *    overlays and copy above the canvas can never block the shark's
 *    awareness of the cursor
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
  // NDC pointer (-1..1), tracked on window against the container rect
  const pointerNdc = useRef({ x: -10, y: -10 });
  const [active, setActive] = useState(true);
  const [reduced, setReduced] = useState<boolean | null>(null);
  // null → not yet probed; false → no WebGL, keep the canvas unmounted
  const [webglOk, setWebglOk] = useState<boolean | null>(null);

  // Composite driver read by the shader every frame
  const formed = useMemo(
    () => ({
      get current() {
        return intro.current * (1 - disperse.current);
      }
    }),
    []
  );

  const { count, offset } = useMemo(() => {
    if (typeof window === "undefined")
      return { count: 30000, offset: [0.85, -0.1, 0] as const };
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const small = window.innerWidth < 768;
    return small || coarse
      ? // phones: fewer particles, shark centered low beneath the copy
        { count: 16000, offset: [0, -1.15, 0] as const }
      : { count: 42000, offset: [0.85, -0.1, 0] as const };
  }, []);

  useEffect(() => {
    setReduced(prefersReducedMotion());
    setWebglOk(supportsWebGL());
  }, []);

  // Window-level pointer → container-relative NDC. Listening on window
  // (not the canvas) means the reading-pane gradient, headline, and CTAs
  // sitting above the canvas can't starve the shark of pointer events.
  useEffect(() => {
    if (reduced) return;
    const onMove = (e: PointerEvent) => {
      const el = container.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      pointerNdc.current.x = ((e.clientX - r.left) / r.width) * 2 - 1;
      pointerNdc.current.y = -(((e.clientY - r.top) / r.height) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduced]);

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

  if (reduced === null || webglOk === null) {
    // First paint: hold the layer, decide motion + capability after hydration
    return <div ref={container} className="absolute inset-0" aria-hidden />;
  }

  if (!webglOk) {
    // No WebGL context available on this client — mount nothing and let the
    // hero's CSS abyss backdrop stand in, instead of letting THREE throw.
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
        <group position={[offset[0], offset[1], offset[2]]}>
          <MakoParticles
            count={count}
            formed={formed}
            pointerNdc={pointerNdc}
            groupOffset={offset}
          />
        </group>
      </Canvas>
    </div>
  );
}

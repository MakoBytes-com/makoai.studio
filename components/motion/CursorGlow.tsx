"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsapClient";

/**
 * The diver's lamp — a soft bioluminescent halo that trails the cursor
 * across the whole site, screen-blended so it reads as light in the
 * water rather than a sticker on top of it.
 *
 * Desktop (pointer: fine) only; hidden for touch and reduced-motion.
 * pointer-events-none, so it can never interfere with anything.
 */
export default function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    gsap.set(el, { x: -1000, y: -1000 }); // offstage until first move
    el.style.display = "block";

    const xTo = gsap.quickTo(el, "x", { duration: 0.55, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.55, ease: "power3.out" });

    const onMove = (e: PointerEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="hidden fixed left-0 top-0 z-40 pointer-events-none"
    >
      <div className="w-[560px] h-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-lamp-glow mix-blend-screen" />
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";

export default function TestimonialsVideoBackground() {
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

  if (!hasVideo) return null;

  return (
    <>
      <video
        ref={videoA}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1200ms] ${
          active === "a" ? "opacity-100" : "opacity-0"
        }`}
        style={{ filter: "brightness(0.75) saturate(1.05)" }}
        src="/testimonials.mp4"
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
        style={{ filter: "brightness(0.75) saturate(1.05)" }}
        src="/testimonials.mp4"
        muted
        playsInline
        preload="auto"
        onError={() => setHasVideo(false)}
      />
    </>
  );
}

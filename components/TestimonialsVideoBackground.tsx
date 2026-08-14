"use client";

import { useAmbientVideo } from "@/lib/useAmbientVideo";

export default function TestimonialsVideoBackground() {
  const {
    containerRef,
    videoA,
    videoB,
    active,
    onVideoError,
    ready,
    autoPlay,
    preload,
  } = useAmbientVideo();

  return (
    <div ref={containerRef} className="absolute inset-0" aria-hidden>
      {ready && (
        <>
          <video
            ref={videoA}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1200 ${
              active === "a" ? "opacity-100" : "opacity-0"
            }`}
            style={{ filter: "brightness(0.75) saturate(1.05)" }}
            src="/testimonials.mp4"
            autoPlay={autoPlay}
            muted
            playsInline
            preload={preload}
            onError={onVideoError}
          />
          <video
            ref={videoB}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1200 ${
              active === "b" ? "opacity-100" : "opacity-0"
            }`}
            style={{ filter: "brightness(0.75) saturate(1.05)" }}
            src="/testimonials.mp4"
            muted
            playsInline
            preload={preload}
            onError={onVideoError}
          />
        </>
      )}
    </div>
  );
}

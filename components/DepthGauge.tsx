"use client";

import { useEffect, useState } from "react";

/**
 * The dive instrument — a fixed vertical gauge on the right edge
 * (xl screens only) tracking how deep into the page the visitor is.
 * Each home section is a depth station; ticks are clickable.
 *
 * Purely presentational chrome: hidden from small screens, invisible
 * to crawlers' layout, aria-labelled for keyboard users who tab in.
 */
const STATIONS = [
  { id: "top", n: "00", label: "Surface", ft: "0 FT" },
  { id: "services", n: "01", label: "What we do", ft: "−180 FT" },
  { id: "process", n: "02", label: "How we build", ft: "−600 FT" },
  { id: "work", n: "03", label: "The work", ft: "−1,500 FT" },
  { id: "testimonials", n: "04", label: "Signals", ft: "−2,400 FT" },
  { id: "about", n: "05", label: "The studio", ft: "−3,300 FT" },
  { id: "contact", n: "06", label: "The floor", ft: "−3,900 FT" }
];

export default function DepthGauge() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const idx = STATIONS.findIndex((s) => s.id === e.target.id);
          if (idx !== -1) setActive(idx);
        }
      },
      // A slim band across the viewport's middle decides the station
      { rootMargin: "-45% 0px -45% 0px" }
    );
    for (const s of STATIONS) {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    }
    return () => io.disconnect();
  }, []);

  const station = STATIONS[active];

  return (
    <nav
      aria-label="Page depth"
      className="hidden xl:flex fixed right-8 top-1/2 -translate-y-1/2 z-40 flex-col items-end gap-5"
    >
      <div className="flex flex-col items-end gap-2.5">
        {STATIONS.map((s, i) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            aria-label={`${s.label} section`}
            className="group flex items-center gap-2 py-0.5"
          >
            <span
              className={`telemetry transition-all duration-500 ${
                i === active
                  ? "text-lumen-300 opacity-100"
                  : "opacity-0 group-hover:opacity-60 text-mist-400"
              }`}
            >
              {s.n}
            </span>
            <span
              className={`block h-px transition-all duration-500 ${
                i === active
                  ? "w-7 bg-lumen-400 shadow-glow-lumen-sm"
                  : "w-4 bg-mist-500/40 group-hover:bg-mist-300/60"
              }`}
            />
          </a>
        ))}
      </div>
      <div className="text-right telemetry select-none" aria-hidden>
        <div className="text-lumen-400/90">{station.label}</div>
        <div className="mt-0.5 text-mist-500">{station.ft}</div>
      </div>
    </nav>
  );
}

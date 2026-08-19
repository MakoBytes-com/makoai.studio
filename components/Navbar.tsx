"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";

const links = [
  { href: "/#work", label: "Work" },
  { href: "/#services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/seo", label: "SEO" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" }
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      // Unscrolled, the bar is transparent and floats over the hero — which
      // stays dark in BOTH themes. So it borrows the deep palette there, or
      // in light mode its navy links would sit on a near-black hero and
      // effectively vanish. Once scrolled it gets its own glass background
      // (white in light mode) and goes back to the page palette.
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-xl bg-abyss-950/70 border-b border-mist-300/6"
          : "surface-deep bg-transparent border-b border-transparent"
      }`}
    >
      {/*
        Pinned to the actual top-right CORNER of the window, not the corner of
        the nav.

        Everything else in the bar lives in .container-narrow, which is capped
        at max-w-6xl and centred — so on a wide monitor the "right-hand end of
        the nav" is a few hundred pixels short of the edge of the screen, and
        the switch was sitting out in the middle. Russell looked at the corner,
        which is where a theme switch belongs, and there was nothing there.

        Only from xl up. Below that the container has no spare margin left and
        an absolutely-positioned button would land on top of "Start a project",
        so the copy inside the nav takes over.
      */}
      <div className="hidden xl:block absolute right-6 top-1/2 -translate-y-1/2">
        <ThemeToggle />
      </div>

      <div className="container-narrow flex items-center justify-between h-16 md:h-20">
        <Link href="/" className="flex items-center gap-3 group">
          <MakoMark />
          <span className="font-display font-medium text-[19px] tracking-tight text-mist-100">
            Mako <span className="italic text-lumen-400">Studio</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[14px] text-mist-300 hover:text-lumen-300 transition-colors duration-300"
            >
              {l.label}
            </a>
          ))}
          <a
            href="https://portal.makoai.studio"
            className="text-[13px] px-4 py-2 rounded-full border border-mist-300/15 hover:border-lumen-400/50 text-mist-100 hover:text-white font-medium transition-colors duration-300"
          >
            Client Portal
          </a>
          <Link
            href="/#contact"
            className="text-[13px] px-4 py-2 rounded-full bg-tide-500 hover:bg-tide-400 text-white font-medium transition-all duration-300 shadow-glow hover:shadow-glow-lumen"
          >
            Start a project
          </Link>
          {/* md → xl only; from xl the corner copy above takes over. */}
          <ThemeToggle compact className="xl:hidden" />
        </nav>

        {/* On mobile the switch sits outside the drawer, so it is reachable
            without opening the menu first. */}
        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
            aria-label="Toggle menu"
            className="text-mist-100 p-2"
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              {open ? (
                <path
                  d="M6 6l12 12M6 18L18 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-abyss-950/95 backdrop-blur-xl border-b border-mist-300/6">
          <div className="container-narrow flex flex-col py-4 gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-3 text-[15px] text-mist-200 hover:text-lumen-300"
              >
                {l.label}
              </a>
            ))}
            <a
              href="https://portal.makoai.studio"
              onClick={() => setOpen(false)}
              className="mt-3 text-center text-[14px] px-4 py-3 rounded-full border border-mist-300/15 text-mist-100 font-medium"
            >
              Client Portal
            </a>
            <Link
              href="/#contact"
              onClick={() => setOpen(false)}
              className="mt-2 text-center text-[14px] px-4 py-3 rounded-full bg-tide-500 text-white font-medium"
            >
              Start a project
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

function MakoMark() {
  return (
    <Image
      src="/mako-fin.png"
      alt="Mako Studio"
      width={40}
      height={40}
      priority
      className="w-10 h-10 object-contain logo-glow"
    />
  );
}

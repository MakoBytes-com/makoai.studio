"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const links = [
  { href: "/#work", label: "Work" },
  { href: "/#services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
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
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-xl bg-ink-900/70"
          : "bg-transparent"
      }`}
    >
      <div className="container-narrow flex items-center justify-between h-16 md:h-20">
        <a href="/" className="flex items-center gap-3 group">
          <MakoMark />
          <span className="font-display font-semibold text-[17px] tracking-tight">
            Mako <span className="text-tide-400">Studio</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[14px] text-steel-300 hover:text-white transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="https://portal.makoai.studio"
            className="text-[13px] px-4 py-2 rounded-full border border-white/15 hover:border-tide-400/60 text-steel-100 hover:text-white font-medium transition-colors"
          >
            Client Portal
          </a>
          <a
            href="/#contact"
            className="text-[13px] px-4 py-2 rounded-full bg-tide-500 hover:bg-tide-400 text-white font-medium transition-colors shadow-glow"
          >
            Start a project
          </a>
        </nav>

        <button
          aria-label="Toggle menu"
          className="md:hidden text-steel-100 p-2"
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

      {open && (
        <div className="md:hidden bg-ink-900/95 backdrop-blur-xl">
          <div className="container-narrow flex flex-col py-4 gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-3 text-[15px] text-steel-200 hover:text-white"
              >
                {l.label}
              </a>
            ))}
            <a
              href="https://portal.makoai.studio"
              onClick={() => setOpen(false)}
              className="mt-3 text-center text-[14px] px-4 py-3 rounded-full border border-white/15 text-steel-100 font-medium"
            >
              Client Portal
            </a>
            <a
              href="/#contact"
              onClick={() => setOpen(false)}
              className="mt-2 text-center text-[14px] px-4 py-3 rounded-full bg-tide-500 text-white font-medium"
            >
              Start a project
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

function MakoMark() {
  return (
    <Image
      src="/mako-whale.png"
      alt="Mako Studio"
      width={40}
      height={40}
      priority
      className="w-10 h-10 object-contain"
    />
  );
}

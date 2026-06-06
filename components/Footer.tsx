export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative py-16 bg-ink-900">
      <div className="container-narrow">
        <div className="grid md:grid-cols-12 gap-8 pb-10 border-b border-white/5">
          <div className="md:col-span-4">
            <div className="font-display font-semibold text-[22px] tracking-tight">
              Mako <span className="text-tide-400">Studio</span>
            </div>
            <p className="mt-3 text-[13px] text-steel-400 max-w-sm leading-relaxed">
              The in-house web team at Mako Logics LLC. We design, build, and
              ship modern websites for small businesses in The Woodlands,
              Montgomery, Conroe, and the greater Houston area.
            </p>
            <address className="mt-5 not-italic text-[12px] text-steel-400 leading-relaxed space-y-0.5">
              <div className="text-steel-300">Mako Logics LLC</div>
              <div>550 Club Dr #264</div>
              <div>Montgomery, TX 77316</div>
              <div className="mt-1.5">
                <a
                  href="tel:+12812064848"
                  className="hover:text-steel-200 transition-colors"
                >
                  (281) 206-4848
                </a>
                <span className="mx-2 text-steel-500/50">·</span>
                <a
                  href="mailto:admin@makoai.studio"
                  className="hover:text-steel-200 transition-colors"
                >
                  admin@makoai.studio
                </a>
              </div>
            </address>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-[11px] tracking-[0.2em] uppercase text-steel-400 mb-4">
              Studio
            </h4>
            <ul className="space-y-2 text-[13px]">
              <li>
                <a href="/#work" className="text-steel-300 hover:text-white">
                  Work
                </a>
              </li>
              <li>
                <a href="/#services" className="text-steel-300 hover:text-white">
                  Services
                </a>
              </li>
              <li>
                <a href="/pricing" className="text-steel-300 hover:text-white">
                  Pricing
                </a>
              </li>
              <li>
                <a href="/seo" className="text-steel-300 hover:text-white">
                  Honest SEO
                </a>
              </li>
              <li>
                <a href="/#about" className="text-steel-300 hover:text-white">
                  About
                </a>
              </li>
              <li>
                <a href="/#contact" className="text-steel-300 hover:text-white">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-[11px] tracking-[0.2em] uppercase text-steel-400 mb-4">
              Service Areas
            </h4>
            <ul className="space-y-2 text-[13px]">
              <li>
                <a
                  href="/serving/the-woodlands-tx"
                  className="text-steel-300 hover:text-white"
                >
                  The Woodlands, TX
                </a>
              </li>
              <li>
                <a
                  href="/serving/conroe-tx"
                  className="text-steel-300 hover:text-white"
                >
                  Conroe, TX
                </a>
              </li>
              <li>
                <a
                  href="/serving/houston-tx"
                  className="text-steel-300 hover:text-white"
                >
                  Greater Houston, TX
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-[11px] tracking-[0.2em] uppercase text-steel-400 mb-4">
              Elsewhere
            </h4>
            <ul className="space-y-2 text-[13px]">
              <li>
                <a
                  href="https://makologics.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-steel-300 hover:text-white"
                >
                  Mako Logics →
                </a>
              </li>
              <li>
                <a
                  href="https://makobytes.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-steel-300 hover:text-white"
                >
                  MakoBytes →
                </a>
              </li>
              <li>
                <a
                  href="mailto:admin@makoai.studio"
                  className="text-steel-300 hover:text-white"
                >
                  Email us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-[12px] text-steel-400">
          <div>© {year} Mako Logics LLC. Mako Studio is the in-house web team.</div>
          <div className="flex items-center gap-4">
            <a href="/privacy" className="hover:text-steel-200">Privacy</a>
            <a href="/terms" className="hover:text-steel-200">Terms</a>
            <span className="font-mono tracking-wider">Montgomery, TX · Serving Greater Houston</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

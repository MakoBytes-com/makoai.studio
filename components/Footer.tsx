export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative py-16 bg-abyss-950">
      {/* The benthic line — a faint lumen horizon above the floor */}
      <div
        className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-lumen-400/25 to-transparent"
        aria-hidden
      />
      <div className="container-narrow">
        <div className="grid md:grid-cols-12 gap-8 pb-10 border-b border-mist-300/5">
          <div className="md:col-span-4">
            <div className="font-display font-medium text-[24px] tracking-tight text-mist-100">
              Mako <span className="italic text-lumen-400">Studio</span>
            </div>
            <p className="mt-3 text-[13px] text-mist-400 max-w-sm leading-relaxed">
              The in-house web team at Mako Logics LLC. We design, build, and
              ship modern websites for small businesses in The Woodlands,
              Montgomery, Conroe, and the greater Houston area.
            </p>
            <address className="mt-5 not-italic text-[12px] text-mist-400 leading-relaxed space-y-0.5">
              <div className="text-mist-300">Mako Logics LLC</div>
              <div>550 Club Dr #264</div>
              <div>Montgomery, TX 77316</div>
              <div className="mt-1.5">
                <a
                  href="tel:+12812064848"
                  className="hover:text-mist-200 transition-colors"
                >
                  (281) 206-4848
                </a>
                <span className="mx-2 text-mist-500/50">·</span>
                <a
                  href="mailto:admin@makoai.studio"
                  className="hover:text-mist-200 transition-colors"
                >
                  admin@makoai.studio
                </a>
              </div>
            </address>
          </div>

          <div className="md:col-span-2">
            <h4 className="telemetry mb-4">Studio</h4>
            <ul className="space-y-2 text-[13px]">
              <li>
                <a href="/#work" className="text-mist-300 hover:text-lumen-300">
                  Work
                </a>
              </li>
              <li>
                <a href="/#services" className="text-mist-300 hover:text-lumen-300">
                  Services
                </a>
              </li>
              <li>
                <a href="/pricing" className="text-mist-300 hover:text-lumen-300">
                  Pricing
                </a>
              </li>
              <li>
                <a href="/seo" className="text-mist-300 hover:text-lumen-300">
                  Honest SEO
                </a>
              </li>
              <li>
                <a href="/#about" className="text-mist-300 hover:text-lumen-300">
                  About
                </a>
              </li>
              <li>
                <a href="/#contact" className="text-mist-300 hover:text-lumen-300">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="telemetry mb-4">Service Areas</h4>
            <ul className="space-y-2 text-[13px]">
              <li>
                <a
                  href="/serving/the-woodlands-tx"
                  className="text-mist-300 hover:text-lumen-300"
                >
                  The Woodlands, TX
                </a>
              </li>
              <li>
                <a
                  href="/serving/conroe-tx"
                  className="text-mist-300 hover:text-lumen-300"
                >
                  Conroe, TX
                </a>
              </li>
              <li>
                <a
                  href="/serving/houston-tx"
                  className="text-mist-300 hover:text-lumen-300"
                >
                  Greater Houston, TX
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="telemetry mb-4">Elsewhere</h4>
            <ul className="space-y-2 text-[13px]">
              <li>
                <a
                  href="https://makologics.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-mist-300 hover:text-lumen-300"
                >
                  Mako Logics →
                </a>
              </li>
              <li>
                <a
                  href="https://makobytes.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-mist-300 hover:text-lumen-300"
                >
                  MakoBytes →
                </a>
              </li>
              <li>
                <a
                  href="mailto:admin@makoai.studio"
                  className="text-mist-300 hover:text-lumen-300"
                >
                  Email us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-[12px] text-mist-400">
          <div>© {year} Mako Logics LLC. Mako Studio is the in-house web team.</div>
          <div className="flex items-center gap-4">
            <a href="/privacy" className="hover:text-mist-200">Privacy</a>
            <a href="/terms" className="hover:text-mist-200">Terms</a>
            <span className="font-mono tracking-wider">Montgomery, TX · Serving Greater Houston</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

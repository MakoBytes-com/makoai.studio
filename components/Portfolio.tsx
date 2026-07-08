import { portfolio } from "@/lib/portfolio";
import PortfolioCard from "./PortfolioCard";
import { Reveal, RevealLines } from "@/components/motion/Reveal";

export default function Portfolio() {
  const currentWork = portfolio.filter(
    (p) => p.tier === "product" || p.tier === "client-build"
  );
  const earlierWork = portfolio.filter((p) => p.tier === "earlier-work");

  return (
    <section id="work" className="relative py-28 md:py-40">
      <div className="container-narrow">
        <div className="mb-14">
          <Reveal y={18}>
            <span className="section-label">Selected work</span>
          </Reveal>
          <RevealLines
            as="h2"
            className="mt-6 font-display font-medium text-[38px] md:text-[56px] leading-[1.04] tracking-tight text-mist-100"
          >
            <>The current</>
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-lumen-300 via-tide-300 to-mist-200 pr-1.5">
              pack.
            </span>
          </RevealLines>
          <Reveal delay={0.25}>
            <p className="mt-6 max-w-xl text-[15px] text-mist-300 leading-relaxed">
              Products we own, and client sites we built. Every project here was
              designed and shipped AI-native, start to finish.
            </p>
          </Reveal>
        </div>

        <Reveal stagger={0.1} className="grid md:grid-cols-2 gap-6">
          {currentWork.map((item) => (
            <PortfolioCard key={item.slug} item={item} />
          ))}
        </Reveal>

        {earlierWork.length > 0 ? (
          <div className="mt-24">
            <Reveal>
              <div className="mb-8 flex items-end justify-between gap-8">
                <div>
                  <span className="section-label">Earlier work</span>
                  <h3 className="mt-4 font-display font-medium text-[26px] md:text-[30px] leading-tight tracking-tight text-mist-100">
                    Builds from the archive
                  </h3>
                  <p className="mt-3 max-w-xl text-[13px] text-mist-400 leading-relaxed">
                    Sites we designed and built before the current chapter. Shown
                    as originally shipped. Some clients remain active under
                    Makologics MSP; some have since modified the frontend.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal stagger={0.1} className="grid md:grid-cols-3 gap-5">
              {earlierWork.map((item) => (
                <PortfolioCard key={item.slug} item={item} />
              ))}
            </Reveal>
          </div>
        ) : null}

        <Reveal>
          <div className="mt-20 text-center">
            <p className="text-[14px] text-mist-400 mb-4">
              Your project could be next.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full glass-deep text-mist-100 text-[14px] font-medium"
            >
              Let&apos;s talk
              <svg viewBox="0 0 16 16" className="w-4 h-4" fill="none">
                <path
                  d="M3 8h10m0 0l-4-4m4 4l-4 4"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

import { portfolio } from "@/lib/portfolio";
import PortfolioCard from "./PortfolioCard";

export default function Portfolio() {
  const currentWork = portfolio.filter(
    (p) => p.tier === "product" || p.tier === "client-build"
  );
  const earlierWork = portfolio.filter((p) => p.tier === "earlier-work");

  return (
    <section
      id="work"
      className="relative py-28 md:py-36"
    >
      <div className="container-narrow">
        <div className="mb-14">
          <span className="section-label">Selected work</span>
          <h2 className="mt-5 font-display font-semibold text-[36px] md:text-[52px] leading-[1.05] tracking-tight">
            The current
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-tide-300 to-steel-200">
              pack.
            </span>
          </h2>
          <p className="mt-5 max-w-xl text-[15px] text-steel-300 leading-relaxed">
            Products we own, and client sites we built. Every project here was
            designed and shipped AI-native, start to finish.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {currentWork.map((item) => (
            <PortfolioCard key={item.slug} item={item} />
          ))}
        </div>

        {earlierWork.length > 0 ? (
          <div className="mt-24">
            <div className="mb-8 flex items-end justify-between gap-8">
              <div>
                <span className="section-label">Earlier work</span>
                <h3 className="mt-3 font-display font-semibold text-[24px] md:text-[28px] leading-tight tracking-tight text-steel-100">
                  Builds from the archive
                </h3>
                <p className="mt-3 max-w-xl text-[13px] text-steel-400 leading-relaxed">
                  Sites we designed and built before the current chapter. Shown
                  as originally shipped. Some clients remain active under
                  Makologics MSP; some have since modified the frontend.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              {earlierWork.map((item) => (
                <PortfolioCard key={item.slug} item={item} />
              ))}
            </div>
          </div>
        ) : null}

        <div className="mt-20 text-center">
          <p className="text-[14px] text-steel-400 mb-4">
            Your project could be next.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass hover:bg-white/10 text-steel-100 text-[14px] font-medium transition-all"
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
      </div>
    </section>
  );
}

const stats = [
  { n: "2010", l: "Shipping Since" },
  { n: "10+", l: "Selected Works" },
  { n: "<2s", l: "Typical LCP" },
  { n: "1", l: "Point of Contact" }
];

const process = [
  {
    n: "01",
    t: "Discovery",
    d: "One call. We map the goal, audience, constraints, and a honest timeline. No 6-page questionnaires."
  },
  {
    n: "02",
    t: "Design",
    d: "Live Figma + working HTML iterations. You see real pages, not static mockups that lie about motion and scale."
  },
  {
    n: "03",
    t: "Build",
    d: "Next.js on Vercel. Real analytics. Real forms. Real SEO. You approve on the staging URL before it goes live."
  },
  {
    n: "04",
    t: "Launch & Ongoing",
    d: "Domain, DNS, email, monitoring — all handled. After launch, you get a partner, not a ghost."
  }
];

export default function About() {
  return (
    <section
      id="about"
      className="relative py-28 md:py-36"
    >
      <div className="container-narrow">
        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <span className="section-label">About the studio</span>
            <h2 className="mt-5 font-display font-semibold text-[36px] md:text-[52px] leading-[1.05] tracking-tight">
              One partner.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-tide-300 to-steel-200">
                Start to finish.
              </span>
            </h2>
            <p className="mt-6 text-[15px] text-steel-300 leading-relaxed">
              Mako Studio is the in-house AI-native web team at{" "}
              <span className="text-steel-100">Mako Logics LLC</span>, based in
              Montgomery, TX. We serve small businesses across{" "}
              <span className="text-steel-100">
                The Woodlands, Montgomery, Conroe, Spring, and the greater
                Houston area
              </span>
              . We&apos;ve shipped AI platforms, client sites, commercial
              software, and a Windows-signed desktop app. Every project is
              built with Claude as the core development partner. No WordPress,
              no page builders, no templates — custom code, production-grade,
              end-to-end.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-6">
              {stats.map((s) => (
                <div
                  key={s.l}
                  className="border-l border-tide-500/30 pl-4"
                >
                  <div className="font-display text-[36px] font-semibold text-steel-100 leading-none">
                    {s.n}
                  </div>
                  <div className="mt-1.5 text-[11px] tracking-[0.2em] uppercase text-steel-400">
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="md:col-span-6 md:col-start-7">
            <div className="space-y-3">
              {process.map((p, i) => (
                <div
                  key={p.n}
                  className="glass rounded-2xl p-6 hover:border-tide-500/30 transition-colors flex gap-6"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <div className="font-mono text-[13px] text-tide-300 mt-0.5">
                    {p.n}
                  </div>
                  <div>
                    <h3 className="font-display text-[18px] font-semibold text-steel-100">
                      {p.t}
                    </h3>
                    <p className="mt-1.5 text-[14px] text-steel-300 leading-relaxed">
                      {p.d}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

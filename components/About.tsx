import { Reveal, RevealLines } from "@/components/motion/Reveal";

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
    <section id="about" className="relative py-28 md:py-40">
      <div className="absolute inset-0 bg-lumen-radial opacity-40" aria-hidden />
      <div className="container-narrow relative">
        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <Reveal y={18}>
              <span className="section-label">About the studio</span>
            </Reveal>
            <RevealLines
              as="h2"
              className="mt-6 font-display font-medium text-[38px] md:text-[56px] leading-[1.04] tracking-tight text-mist-100"
            >
              <>One partner.</>
              <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-lumen-300 via-tide-300 to-mist-200 pr-1.5">
                Start to finish.
              </span>
            </RevealLines>
            <Reveal delay={0.25}>
              <p className="mt-6 text-[15px] text-mist-300 leading-relaxed">
                Mako Studio is the in-house AI-native web team at{" "}
                <span className="text-mist-100">Mako Logics LLC</span>, based in
                Montgomery, TX. We serve small businesses across{" "}
                <span className="text-mist-100">
                  The Woodlands, Montgomery, Conroe, Spring, and the greater
                  Houston area
                </span>
                . We&apos;ve shipped AI platforms, client sites, commercial
                software, and a Windows-signed desktop app. Every project is
                built with Claude as the core development partner. No WordPress,
                no page builders, no templates — custom code, production-grade,
                end-to-end.
              </p>
            </Reveal>

            <Reveal stagger={0.08} className="mt-10 grid grid-cols-2 gap-6">
              {stats.map((s) => (
                <div key={s.l} className="border-l border-lumen-400/30 pl-4">
                  <div className="font-display text-[38px] font-medium text-mist-100 leading-none">
                    {s.n}
                  </div>
                  <div className="mt-2 telemetry">{s.l}</div>
                </div>
              ))}
            </Reveal>
          </div>

          <div className="md:col-span-6 md:col-start-7">
            <Reveal stagger={0.1} className="space-y-3">
              {process.map((p) => (
                <div
                  key={p.n}
                  className="glass-deep rounded-2xl p-6 flex gap-6"
                >
                  <div className="telemetry text-lumen-400 mt-1">{p.n}</div>
                  <div>
                    <h3 className="font-display text-[19px] font-medium text-mist-100">
                      {p.t}
                    </h3>
                    <p className="mt-1.5 text-[14px] text-mist-300 leading-relaxed">
                      {p.d}
                    </p>
                  </div>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

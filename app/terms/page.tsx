import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms of Service — Mako Studio",
  description:
    "Plain-language terms of service for the Mako Studio marketing site.",
  alternates: { canonical: "https://makoai.studio/terms" }
};

export default function Terms() {
  return (
    <main className="relative">
      <Navbar />
      <article className="pt-32 pb-20 container-narrow">
        <span className="section-label">Legal</span>
        <h1 className="mt-5 font-display font-medium text-[36px] md:text-[52px] leading-[1.05] tracking-tight">
          Terms of Service
        </h1>
        <p className="mt-3 text-[13px] text-mist-400">
          Last updated: April 2026
        </p>

        <div className="mt-10 space-y-6 text-[15px] text-mist-300 leading-relaxed max-w-3xl">
          <p>
            These terms govern your use of <strong>makoai.studio</strong>,
            the marketing website for Mako Studio, a practice of{" "}
            <strong>Mako Logics LLC</strong>. By using this site, you agree
            to the terms below. They do not cover separate client engagement
            contracts — those are negotiated directly and governed by their
            own signed agreement executed with Mako Logics LLC.
          </p>

          <h2 className="font-display text-[22px] font-medium text-mist-100 mt-10">
            Who we are
          </h2>
          <p>
            <strong>Mako Logics LLC</strong> is a Texas limited liability
            company based at 550 Club Dr #264, Montgomery, TX 77316. Mako
            Studio is the web design and engineering practice inside the LLC.
            Contact:{" "}
            <a href="mailto:admin@makoai.studio" className="text-lumen-300">
              admin@makoai.studio
            </a>{" "}
            ·{" "}
            <a href="tel:+12812064848" className="text-lumen-300">
              (281) 206-4848
            </a>
            .
          </p>

          <h2 className="font-display text-[22px] font-medium text-mist-100 mt-10">
            Content on this site
          </h2>
          <p>
            The writing, design, code, and imagery on this site are owned by
            Mako Logics LLC unless otherwise attributed.
            Screenshots of client work appear with the client&rsquo;s implicit
            permission as part of a standard portfolio relationship. If
            you&rsquo;re one of those clients and want a screenshot removed
            or updated, email us and we&rsquo;ll handle it within 5 business
            days.
          </p>
          <p>
            Portfolio cards on this site may link to &ldquo;showcase&rdquo;
            snapshots deployed separately from our client&rsquo;s live sites.
            Those snapshots are for demonstration only, are marked with a
            &ldquo;Portfolio Demo&rdquo; badge, and are not crawlable by
            search engines.
          </p>

          <h2 className="font-display text-[22px] font-medium text-mist-100 mt-10">
            What you can expect
          </h2>
          <p>
            We&rsquo;ll respond to inquiries sent through the contact form
            within one business day. If we take on a project, you&rsquo;ll
            get a separate statement of work with scope, timeline, and
            price. Nothing on this site is a binding offer or commitment.
          </p>

          <h2 className="font-display text-[22px] font-medium text-mist-100 mt-10">
            What we don&rsquo;t guarantee
          </h2>
          <p>
            We do our best to keep this site accurate and available, but we
            can&rsquo;t promise it will always be up, error-free, or free of
            bugs. If something on this site matters to your decision-making,
            confirm it with us directly before acting on it.
          </p>
          <p>
            External links on this site (to client sites, GitHub, service
            providers, etc.) go to pages we don&rsquo;t control. We&rsquo;re
            not responsible for their content or privacy practices.
          </p>

          <h2 className="font-display text-[22px] font-medium text-mist-100 mt-10">
            Governing law
          </h2>
          <p>
            These terms are governed by the laws of the State of Texas,
            United States, without regard to conflict-of-law principles.
          </p>

          <h2 className="font-display text-[22px] font-medium text-mist-100 mt-10">
            Changes
          </h2>
          <p>
            We may update these terms as the business evolves. The
            &ldquo;Last updated&rdquo; date at the top always reflects the
            current version.
          </p>
        </div>
      </article>
      <Footer />
    </main>
  );
}

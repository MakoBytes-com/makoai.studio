import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Page not found — Mako Studio",
  description: "That page doesn't exist. Here's the way back.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main id="main-content" className="relative">
      <Navbar />
      <article className="pt-32 pb-20 container-narrow">
        <span className="section-label">404</span>
        <h1 className="mt-5 font-display font-medium text-[36px] md:text-[52px] leading-[1.05] tracking-tight">
          That page doesn&rsquo;t exist.
        </h1>
        <p className="mt-5 text-[15px] text-mist-300 leading-relaxed max-w-2xl">
          The link may be out of date, or the address may have a typo in it.
          Nothing is broken on your end.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-tide-600 hover:bg-tide-500 text-white font-medium text-[15px] transition-colors duration-300"
          >
            Back to the homepage
          </Link>
          <Link
            href="/work"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-mist-300/15 hover:border-mist-300/30 text-mist-200 font-medium text-[15px] transition-colors duration-300"
          >
            See the work
          </Link>
        </div>

        <p className="mt-10 text-[13px] text-mist-400">
          Looking for something specific? Email{" "}
          <a href="mailto:admin@makoai.studio" className="text-lumen-300">
            admin@makoai.studio
          </a>{" "}
          and we&rsquo;ll point you at it.
        </p>
      </article>
      <Footer />
    </main>
  );
}

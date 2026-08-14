import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy — Mako Studio",
  description:
    "How Mako Studio handles the limited personal information we collect through this website.",
  alternates: { canonical: "https://makoai.studio/privacy" }
};

export default function Privacy() {
  return (
    <main id="main-content" className="relative">
      <Navbar />
      <article className="pt-32 pb-20 container-narrow">
        <span className="section-label">Legal</span>
        <h1 className="mt-5 font-display font-medium text-[36px] md:text-[52px] leading-[1.05] tracking-tight">
          Privacy Policy
        </h1>
        <p className="mt-3 text-[13px] text-mist-400">
          Last updated: August 2026
        </p>

        <div className="mt-10 space-y-6 text-[15px] text-mist-300 leading-relaxed max-w-3xl">
          <p>
            Mako Studio is a practice of <strong>Mako Logics LLC</strong>, a Texas
            limited liability company (&ldquo;we,&rdquo; &ldquo;us&rdquo;),
            which operates <strong>makoai.studio</strong> as its marketing site.
            This page explains what information we collect, why, and how we
            handle it. We try to keep this simple and honest — if you have a
            question, email{" "}
            <a href="mailto:admin@makoai.studio" className="text-lumen-300">
              admin@makoai.studio
            </a>
            .
          </p>

          <h2 className="font-display text-[22px] font-medium text-mist-100 mt-10">
            What we collect
          </h2>
          <p>
            When you fill out the contact form on this site, we collect the
            name, email address, optional company name, optional budget range,
            and message content you provide. We do not ask for, and do not
            want, any other personal information.
          </p>
          <p>
            We use <strong>Vercel Analytics</strong> to measure aggregate
            site traffic (page views, referrer, device type). Vercel Analytics
            is privacy-friendly by default: no cookies, no fingerprinting, no
            personally identifiable information collected.
          </p>
          <p>
            We also run our own small page-view counter, which sends the page
            you viewed, the site that referred you, and a randomly generated
            session id to our own server at{" "}
            <code className="text-lumen-300">portal.makoai.studio</code>. The
            session id is a random string, is not linked to your name or email,
            and is discarded when you close the tab. Separately, if a technical
            error occurs in your browser, we send ourselves the error message
            and the address of the page it happened on, so we can find and fix
            it. Neither of these collects personally identifiable information,
            and both go only to us — never to an advertising network.
          </p>

          <h2 className="font-display text-[22px] font-medium text-mist-100 mt-10">
            How we use it
          </h2>
          <p>
            Contact-form submissions are delivered to{" "}
            <code className="text-lumen-300">admin@makoai.studio</code> via{" "}
            <strong>Resend</strong>. We read them, reply to them, and keep
            them in our inbox for as long as the conversation is active. We
            do not add submissions to a mailing list, do not share them with
            third parties, and do not sell them.
          </p>

          <h2 className="font-display text-[22px] font-medium text-mist-100 mt-10">
            Cookies
          </h2>
          <p>
            This site does not set advertising or cross-site tracking cookies,
            and nothing here follows you to other websites. Two things are
            stored in your own browser: a random session id kept in session
            storage for the page-view counter described above, which is erased
            when you close the tab, and whatever the chat widget needs to keep
            your conversation open while you read. Embedded services may also
            set their own cookies if you interact with them — for example the
            Google Maps embed, or the Cloudflare check on the contact form —
            and those are governed by their own privacy policies.
          </p>

          <h2 className="font-display text-[22px] font-medium text-mist-100 mt-10">
            Third-party services on this site
          </h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Vercel</strong> — hosting + edge delivery
            </li>
            <li>
              <strong>Cloudflare</strong> — DNS and domain management, plus the
              Turnstile bot check on the contact form, which looks at browser
              and device signals to tell a person from a spam script
            </li>
            <li>
              <strong>Resend</strong> — transactional email (contact form)
            </li>
            <li>
              <strong>Google Maps</strong> — embedded map on the contact
              section
            </li>
            <li>
              <strong>MakoChat</strong> — the chat widget in the corner of the
              page. If you open it, what you type is sent to MakoChat so we can
              answer you
            </li>
            <li>
              <strong>Web fonts</strong> (Inter, Fraunces, JetBrains Mono) —
              these come from Google Fonts, but we download them when the site
              is built and serve them from our own server. Your browser never
              contacts Google for them, so your IP address is not shared
            </li>
          </ul>

          <h2 className="font-display text-[22px] font-medium text-mist-100 mt-10">
            Your choices
          </h2>
          <p>
            You can request deletion of any information you&rsquo;ve sent us
            by emailing{" "}
            <a href="mailto:admin@makoai.studio" className="text-lumen-300">
              admin@makoai.studio
            </a>{" "}
            with &ldquo;delete my data&rdquo; in the subject line. We&rsquo;ll
            remove it and confirm within 5 business days.
          </p>

          <h2 className="font-display text-[22px] font-medium text-mist-100 mt-10">
            Changes
          </h2>
          <p>
            If this policy changes, the &ldquo;Last updated&rdquo; date at
            the top reflects when. Material changes will also be noted at
            the bottom of the homepage for at least 30 days.
          </p>
        </div>
      </article>
      <Footer />
    </main>
  );
}

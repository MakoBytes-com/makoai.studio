import type { Metadata } from "next";
import { Inter, Fraunces, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import SmoothScroll from "@/components/motion/SmoothScroll";
import CursorGlow from "@/components/motion/CursorGlow";
import FleetBeacon from "@/components/FleetBeacon";
import ChunkReloadGuard from "@/components/ChunkReloadGuard";
import "./globals.css";

// Self-hosted Google Fonts via next/font. Downloaded at build time
// and served from same origin — no runtime request to Google, which
// keeps visitor IPs out of Google's hands (GDPR / privacy hygiene
// baseline per CLAUDE.md).
//
// Type system (BIOLUMINANCE):
//  - Fraunces        display serif — variable, with italics; the voice
//  - Inter           body — disappears, as body text should
//  - JetBrains Mono  telemetry — the submersible-instrument voice
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["SOFT", "WONK", "opsz"],
  variable: "--font-fraunces",
  display: "swap"
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://makoai.studio"),
  title: "Mako Studio — AI-Native Web Design · The Woodlands, TX",
  description:
    "AI-native web design and development for small businesses in The Woodlands, Montgomery, Conroe, and the greater Houston area. Custom Next.js sites from $2,500. Based in Montgomery, TX.",
  alternates: { canonical: "https://makoai.studio" },
  openGraph: {
    title: "Mako Studio — Web Design & Development",
    description:
      "Modern, premium websites designed and shipped fast. Mako Studio.",
    url: "https://makoai.studio",
    siteName: "Mako Studio",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Mako Studio",
    description: "Modern, premium websites designed and shipped fast."
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Mako Studio",
  alternateName: "MakoAI Studio",
  description:
    "AI-native web design and engineering team. The in-house web shop at Mako Logics LLC.",
  url: "https://makoai.studio",
  telephone: "+1-281-206-4848",
  email: "admin@makoai.studio",
  parentOrganization: {
    "@type": "Organization",
    name: "Mako Logics",
    legalName: "Mako Logics LLC",
    url: "https://makologics.com"
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "550 Club Dr #264",
    addressLocality: "Montgomery",
    addressRegion: "TX",
    postalCode: "77316",
    addressCountry: "US"
  },
  areaServed: [
    { "@type": "City", name: "The Woodlands", "@id": "https://www.wikidata.org/wiki/Q49315" },
    { "@type": "City", name: "Montgomery", sameAs: "https://www.wikidata.org/wiki/Q2143449" },
    { "@type": "City", name: "Conroe", sameAs: "https://www.wikidata.org/wiki/Q385584" },
    { "@type": "City", name: "Spring", sameAs: "https://www.wikidata.org/wiki/Q987466" },
    { "@type": "City", name: "Houston", sameAs: "https://www.wikidata.org/wiki/Q16555" },
    { "@type": "AdministrativeArea", name: "Montgomery County, Texas" },
    { "@type": "AdministrativeArea", name: "Harris County, Texas" },
    { "@type": "Country", name: "United States" }
  ],
  serviceType: [
    "Web Design",
    "Web Development",
    "AI Integration",
    "SEO",
    "Web Hosting"
  ],
  knowsAbout: [
    "Web Design",
    "Web Development",
    "Next.js",
    "AI-native development",
    "SEO",
    "Managed Hosting"
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00"
    }
  ],
  sameAs: ["https://github.com/MakoBytes-com"]
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-theme="dark"
      // The blocking script below rewrites data-theme before React hydrates,
      // so the server's "dark" and the client's value can legitimately differ.
      suppressHydrationWarning
      className={`${inter.variable} ${fraunces.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <meta name="theme-color" content="#020509" />
        {/*
          Theme, applied BEFORE first paint.

          This has to be a blocking inline script in <head>. Deciding the theme
          in a React effect means the browser paints the default first and then
          repaints — the white flash every themed site is known for, and it is
          worst on the slow connections we least want to punish.

          Dark stays the default when nobody has chosen: it is the brand, and
          it keeps today's behaviour for every visitor who never touches the
          switch. An explicit choice always wins over the system setting.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('mako-theme');if(t!=='light'&&t!=='dark')t='dark';document.documentElement.dataset.theme=t;var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute('content',t==='light'?'#f8f9fb':'#020509');}catch(e){}})();`
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {/* Keyboard users land here first and can jump past the nav. Hidden
            until focused, so it costs the visual design nothing. */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-tide-600 focus:px-4 focus:py-2 focus:text-[14px] focus:font-medium focus:text-white focus:outline-2 focus:outline-offset-2 focus:outline-lumen-400"
        >
          Skip to content
        </a>
        <SmoothScroll />
        {children}
        <CursorGlow />
        <div className="grain" aria-hidden />
        <Analytics />
        <ChunkReloadGuard />
        <FleetBeacon site="makoai-studio" />
        {/* MakoChat widget (makochat.app) */}
        <script src="https://makochat.app/embed.js" data-makochat="makoai-studio" defer />
      </body>
    </html>
  );
}

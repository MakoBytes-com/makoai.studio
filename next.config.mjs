import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  outputFileTracingRoot: __dirname,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**" }]
  },
  async headers() {
    // Content Security Policy — Report-Only mode (observe, don't enforce).
    // Tuned for the actual stack on makoai.studio:
    //   - Vercel Analytics (va.vercel-scripts.com, vitals.vercel-insights.com,
    //     vercel.live)
    //   - Google review avatars (lh3.googleusercontent.com) in the
    //     Testimonials section that pulls live Google reviews via Places API
    //   - Cloudflare Turnstile captcha on the contact form
    //     (challenges.cloudflare.com — script + iframe + form action target)
    //   - Google Maps embed in the Contact section (www.google.com /
    //     maps.google.com in frame-src) — the iframe at the bottom of the
    //     homepage that shows the Mako Logics HQ pin.
    // Flip the header key from "Content-Security-Policy" to
    // "Content-Security-Policy" once an audit confirms zero violations.
    const csp = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com https://vercel.live https://challenges.cloudflare.com https://makochat.app",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https://lh3.googleusercontent.com",
      "font-src 'self' data:",
      "connect-src 'self' https://va.vercel-scripts.com https://vitals.vercel-insights.com https://vercel.live https://portal.makoai.studio",
      "media-src 'self'",
      "frame-src 'self' https://challenges.cloudflare.com https://www.google.com https://maps.google.com https://makochat.app",
      "form-action 'self' https://challenges.cloudflare.com",
      "object-src 'none'",
      "base-uri 'self'",
      "frame-ancestors 'none'",
      "upgrade-insecure-requests",
    ].join("; ");

    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()"
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload"
          },
          {
            key: "Content-Security-Policy",
            value: csp
          }
        ]
      }
    ];
  }
};

export default nextConfig;

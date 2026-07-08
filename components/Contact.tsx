"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import Turnstile from "./Turnstile";
import { Reveal, RevealLines } from "@/components/motion/Reveal";

type Status = "idle" | "loading" | "success" | "error";

const TURNSTILE_ENABLED = Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY);

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const handleToken = useCallback((token: string) => setCaptchaToken(token), []);
  const handleExpire = useCallback(() => setCaptchaToken(null), []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError(null);

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;

    if (TURNSTILE_ENABLED) {
      if (!captchaToken) {
        setStatus("error");
        setError("Please complete the verification challenge below.");
        return;
      }
      data["cf-turnstile-response"] = captchaToken;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      if (!res.ok) {
        const { error: errMsg } = await res.json().catch(() => ({}));
        throw new Error(errMsg ?? "Submission failed");
      }

      setStatus("success");
      form.reset();
      setCaptchaToken(null);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Submission failed");
    }
  }

  return (
    <section
      id="contact"
      className="relative py-28 md:py-40 overflow-hidden"
    >
      <div className="absolute inset-0">
        <Image
          src="/contact-bg.jpg"
          alt=""
          aria-hidden
          fill
          sizes="100vw"
          quality={80}
          className="object-cover object-center"
          style={{ filter: "saturate(1.1) contrast(1.05)" }}
        />
        <div className="absolute inset-0 bg-abyss-950/30" />
        <div className="absolute inset-0 bg-gradient-to-l from-abyss-950/85 via-abyss-950/35 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[28rem] md:h-[34rem] bg-[linear-gradient(to_bottom,#020509_0%,#020509_28%,rgba(2,5,9,0.88)_52%,rgba(2,5,9,0.55)_72%,rgba(2,5,9,0.2)_88%,transparent_100%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-abyss-950 to-transparent" />
      </div>
      <div className="container-narrow relative">
        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <Reveal y={18}>
              <span className="section-label">Start a project</span>
            </Reveal>
            <RevealLines
              as="h2"
              className="mt-6 font-display font-medium text-[38px] md:text-[56px] leading-[1.04] tracking-tight text-mist-100"
            >
              <>Tell us</>
              <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-lumen-300 via-tide-300 to-mist-200 pr-1.5">
                what you need.
              </span>
            </RevealLines>
            <Reveal delay={0.25}>
              <p className="mt-6 text-[15px] text-mist-300 leading-relaxed">
                Send a few sentences about the site you want, your timeline, and
                what &quot;done&quot; looks like to you. You&apos;ll hear back
                within one business day.
              </p>
            </Reveal>

            <Reveal delay={0.35}>
              <div className="mt-10 space-y-4 text-[14px]">
                <div className="flex items-center gap-3">
                  <IconMail />
                  <a
                    href="mailto:admin@makoai.studio"
                    className="text-mist-200 hover:text-lumen-300"
                  >
                    admin@makoai.studio
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <IconPhone />
                  <a
                    href="tel:+12812064848"
                    className="text-mist-200 hover:text-lumen-300"
                  >
                    (281) 206-4848
                  </a>
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-0.5"><IconPin /></span>
                  <div className="text-mist-300 leading-relaxed">
                    <div className="text-mist-100 font-medium">Mako Logics HQ</div>
                    <div>550 Club Dr #264</div>
                    <div>Montgomery, TX 77316</div>
                    <a
                      href="https://maps.google.com/?q=550+Club+Dr+%23264+Montgomery+TX+77316"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-block text-lumen-300 hover:text-lumen-200 text-[13px]"
                    >
                      Get directions →
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.45}>
              <div className="mt-8 relative rounded-2xl overflow-hidden border border-mist-300/10 shadow-card aspect-[16/10]">
                <iframe
                  title="Mako Logics HQ — 550 Club Dr #264, Montgomery, TX 77316"
                  src="https://www.google.com/maps?q=550+Club+Dr+%23264+Montgomery+TX+77316&z=15&output=embed"
                  className="absolute inset-0 w-full h-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  style={{
                    border: 0,
                    // Dark-water map: invert + hue-rotate turns Google's light
                    // tiles into a deep navy chart that sits in the abyss
                    filter:
                      "invert(0.92) hue-rotate(195deg) saturate(0.7) brightness(0.9) contrast(0.95)"
                  }}
                />
                <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-lumen-400/10 rounded-2xl" />
              </div>
            </Reveal>
          </div>

          <div className="md:col-span-6 md:col-start-7">
            <Reveal delay={0.2}>
              <form
                onSubmit={handleSubmit}
                className="glass-deep rounded-2xl p-6 md:p-8 space-y-4"
              >
                <div className="grid md:grid-cols-2 gap-4">
                  <Field label="Name" name="name" required />
                  <Field
                    label="Email"
                    name="email"
                    type="email"
                    required
                  />
                </div>
                <Field
                  label="Company (optional)"
                  name="company"
                />
                <Field
                  label="Budget range"
                  name="budget"
                  placeholder="e.g. $3k-5k, or not sure yet"
                />
                <Field
                  label="Tell us about the project"
                  name="message"
                  as="textarea"
                  required
                />

                {/* Honeypot — hidden field to catch bots. aria-hidden + tabIndex
                    -1 keep humans and screen readers away; bots that fill every
                    field still trip it. */}
                <input
                  type="text"
                  name="website"
                  title="Leave this field blank"
                  aria-hidden="true"
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                {TURNSTILE_ENABLED && (
                  <div className="pt-1">
                    <Turnstile onToken={handleToken} onExpire={handleExpire} />
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "loading" || (TURNSTILE_ENABLED && !captchaToken)}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-tide-500 hover:bg-tide-400 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium text-[15px] transition-all duration-300 shadow-glow hover:shadow-glow-lumen"
                >
                  {status === "loading" ? "Sending…" : "Send message"}
                  {status !== "loading" && (
                    <svg viewBox="0 0 16 16" className="w-4 h-4" fill="none">
                      <path
                        d="M3 8h10m0 0l-4-4m4 4l-4 4"
                        stroke="currentColor"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </button>

                {status === "success" && (
                  <p className="text-[13px] text-emerald-300 text-center">
                    Thanks — your message is in. You&apos;ll hear back within a
                    business day.
                  </p>
                )}
                {status === "error" && (
                  <p className="text-[13px] text-red-300 text-center">
                    Something went wrong
                    {error ? ` — ${error}` : ""}. Try emailing directly.
                  </p>
                )}
              </form>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  as = "input",
  required,
  placeholder
}: {
  label: string;
  name: string;
  type?: string;
  as?: "input" | "textarea";
  required?: boolean;
  placeholder?: string;
}) {
  const baseClass =
    "w-full bg-abyss-800/60 border border-mist-300/5 focus:border-lumen-400/50 focus:outline-none rounded-xl px-4 py-3 text-[14px] text-mist-100 placeholder-mist-400/60 transition-colors";
  return (
    <label className="block">
      <span className="block text-[12px] tracking-wide uppercase text-mist-400 mb-1.5">
        {label}
        {required && <span className="text-lumen-400 ml-1">*</span>}
      </span>
      {as === "textarea" ? (
        <textarea
          name={name}
          required={required}
          rows={5}
          placeholder={placeholder}
          className={baseClass + " resize-y"}
        />
      ) : (
        <input
          type={type}
          name={name}
          required={required}
          placeholder={placeholder}
          className={baseClass}
        />
      )}
    </label>
  );
}

function IconMail() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 text-lumen-300" fill="none">
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 7l9 7 9-7" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function IconPhone() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 text-lumen-300" fill="none">
      <path
        d="M5 4h3l2 5-2.5 1.5a11 11 0 006 6L15 14l5 2v3a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconPin() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 text-lumen-300" fill="none">
      <path
        d="M12 22s7-7.5 7-13a7 7 0 10-14 0c0 5.5 7 13 7 13z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import Turnstile from "./Turnstile";

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
      className="relative py-28 md:py-36 overflow-hidden"
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
        <div className="absolute inset-0 bg-ink-900/25" />
        <div className="absolute inset-0 bg-gradient-to-l from-ink-900/85 via-ink-900/35 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-80 md:h-96 bg-gradient-to-b from-ink-900 via-ink-900/90 via-50% to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-ink-900 to-transparent" />
      </div>
      <div className="container-narrow relative">
        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <span className="section-label">Start a project</span>
            <h2 className="mt-5 font-display font-semibold text-[36px] md:text-[52px] leading-[1.05] tracking-tight">
              Tell us
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-tide-300 to-steel-200">
                what you need.
              </span>
            </h2>
            <p className="mt-6 text-[15px] text-steel-300 leading-relaxed">
              Send a few sentences about the site you want, your timeline, and
              what "done" looks like to you. You'll hear back within one
              business day.
            </p>

            <div className="mt-10 space-y-4 text-[14px]">
              <div className="flex items-center gap-3">
                <IconMail />
                <a
                  href="mailto:admin@makoai.studio"
                  className="text-steel-200 hover:text-tide-300"
                >
                  admin@makoai.studio
                </a>
              </div>
              <div className="flex items-center gap-3">
                <IconPhone />
                <a
                  href="tel:+12812064848"
                  className="text-steel-200 hover:text-tide-300"
                >
                  (281) 206-4848
                </a>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-0.5"><IconPin /></span>
                <div className="text-steel-300 leading-relaxed">
                  <div className="text-steel-100 font-medium">Mako Logics HQ</div>
                  <div>550 Club Dr #264</div>
                  <div>Montgomery, TX 77316</div>
                  <a
                    href="https://maps.google.com/?q=550+Club+Dr+%23264+Montgomery+TX+77316"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-block text-tide-300 hover:text-tide-400 text-[13px]"
                  >
                    Get directions →
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-8 relative rounded-2xl overflow-hidden border border-white/10 shadow-card aspect-[16/10]">
              <iframe
                title="Mako Logics HQ — 550 Club Dr #264, Montgomery, TX 77316"
                src="https://www.google.com/maps?q=550+Club+Dr+%23264+Montgomery+TX+77316&z=15&output=embed"
                className="absolute inset-0 w-full h-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                style={{ border: 0, filter: "grayscale(0.3) brightness(0.9) contrast(1.05)" }}
              />
              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-tide-500/10 rounded-2xl" />
            </div>
          </div>

          <div className="md:col-span-6 md:col-start-7">
            <form
              onSubmit={handleSubmit}
              className="glass rounded-2xl p-6 md:p-8 space-y-4"
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
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-tide-500 hover:bg-tide-400 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium text-[14px] transition-all shadow-glow"
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
                  Thanks — your message is in. You'll hear back within a
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
    "w-full bg-ink-800/60 border border-white/5 focus:border-tide-500/50 focus:outline-none rounded-xl px-4 py-3 text-[14px] text-steel-100 placeholder-steel-400/60 transition-colors";
  return (
    <label className="block">
      <span className="block text-[12px] tracking-wide uppercase text-steel-400 mb-1.5">
        {label}
        {required && <span className="text-tide-400 ml-1">*</span>}
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
    <svg viewBox="0 0 24 24" className="w-5 h-5 text-tide-300" fill="none">
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 7l9 7 9-7" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function IconPhone() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 text-tide-300" fill="none">
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
    <svg viewBox="0 0 24 24" className="w-5 h-5 text-tide-300" fill="none">
      <path
        d="M12 22s7-7.5 7-13a7 7 0 10-14 0c0 5.5 7 13 7 13z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

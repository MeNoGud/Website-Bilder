"use client";

import { useState } from "react";
import { site } from "@/lib/site";

const email = "marchiorelloalberto20@gmail.com";
const linkedin = site.social.find((s) => s.label === "LinkedIn")?.href ?? "";

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate a brief loading state, then open the mail client
    await new Promise((r) => setTimeout(r, 700));

    const subject = encodeURIComponent(`Message from ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    );
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;

    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="scroll-mt-20 border-t border-void-border px-6 py-24 sm:px-10 sm:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <p className="reveal font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
          — Connect
        </p>

        <h2 className="reveal mt-6 max-w-3xl font-display text-4xl font-light italic leading-[1.05] text-cream sm:text-5xl lg:text-6xl">
          Let&apos;s create something&nbsp;remarkable.
        </h2>

        <div className="reveal mt-6 gold-rule w-16" />

        <p className="reveal mt-8 max-w-lg font-sans text-base leading-relaxed text-cream-muted sm:text-lg">
          Open to collaborations, consulting, and conversations about the future
          of luxury hospitality. Based in London — working globally.
        </p>

        <div className="reveal mt-14 grid gap-14 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
          {/* Form */}
          <div>
            {submitted ? (
              <div className="flex flex-col items-start gap-4 rounded-2xl border border-gold-border bg-gold-faint p-10">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
                  Message ready
                </span>
                <p className="font-display text-2xl font-light italic text-cream">
                  Your email client should open shortly with the message pre-filled.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: "", email: "", message: "" }); }}
                  className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-cream-dim underline underline-offset-4 hover:text-gold transition-colors"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-[0.25em] text-cream-dim mb-3">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className="form-input"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-[0.25em] text-cream-dim mb-3">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="form-input"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-[0.25em] text-cream-dim mb-3">
                    Message
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell me what you're working on..."
                    className="form-input resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-3 rounded-full bg-gold px-8 py-3 font-sans text-[13px] font-medium text-void shadow-lg shadow-gold/20 transition-all duration-300 hover:bg-gold-light hover:shadow-gold/30 disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <span className="h-3 w-3 rounded-full border border-void border-t-transparent animate-spin" />
                      Preparing…
                    </>
                  ) : (
                    <>Send message <span aria-hidden>→</span></>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Contact details */}
          <div className="space-y-8">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-cream-dim">
                Email
              </span>
              <a
                href={`mailto:${email}`}
                className="group mt-3 block font-display text-xl font-light text-cream transition-colors hover:text-gold sm:text-2xl"
              >
                <span className="relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-gold after:transition-all after:duration-500 group-hover:after:w-full">
                  {email}
                </span>
              </a>
            </div>

            <div className="border-t border-void-border pt-8">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-cream-dim">
                LinkedIn
              </span>
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex items-center gap-3 font-sans text-sm text-cream-muted transition-colors hover:text-gold"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                Alberto Marchiorello
              </a>
            </div>

            <div className="border-t border-void-border pt-8">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-cream-dim">
                Location
              </span>
              <p className="mt-2 font-sans text-sm text-cream-muted">
                {site.location} · Working globally
              </p>
            </div>

            <div className="border-t border-void-border pt-8">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-cream-dim">
                Open to
              </span>
              <div className="mt-3 flex flex-wrap gap-2">
                {site.currently.openTo.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-void-border bg-void-surface px-3 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-cream-dim"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

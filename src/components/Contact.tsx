import { site } from "@/lib/site";

const email = site.social.find((s) => s.label === "Email")?.href ?? "";
const linkedin = site.social.find((s) => s.label === "LinkedIn")?.href ?? "";

export function Contact() {
  return (
    <section
      id="contact"
      className="scroll-mt-20 border-t border-void-border px-6 py-24 sm:px-10 sm:py-32"
    >
      <div className="mx-auto max-w-6xl">
        {/* Label */}
        <p className="reveal font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
          — Connect
        </p>

        {/* Headline */}
        <h2 className="reveal mt-6 max-w-3xl font-display text-4xl font-light italic leading-[1.1] text-cream sm:text-5xl lg:text-6xl">
          Let&apos;s create something remarkable.
        </h2>

        <div className="reveal mt-6 gold-rule w-16" />

        <p className="reveal mt-8 max-w-xl font-sans text-base leading-relaxed text-cream-muted sm:text-lg">
          Open to collaborations, consulting engagements, and conversations about
          the future of luxury hospitality. Based in London — working globally.
        </p>

        {/* Email */}
        <div className="reveal mt-12">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-cream-dim">
            Email
          </span>
          <a
            href={email}
            className="group mt-3 block font-display text-2xl font-light text-cream transition-colors hover:text-gold sm:text-3xl lg:text-4xl"
          >
            <span className="relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-gold after:transition-all after:duration-500 group-hover:after:w-full">
              marchiorelloalberto20@gmail.com
            </span>
          </a>
        </div>

        {/* Social links */}
        <div className="reveal mt-12 flex flex-wrap items-center gap-4">
          {linkedin && (
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full border border-void-border bg-void-surface px-6 py-3 font-sans text-[13px] text-cream-muted transition-all duration-300 hover:border-gold-border hover:bg-gold-faint hover:text-cream"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </a>
          )}

          <a
            href={email}
            className="inline-flex items-center gap-2.5 rounded-full bg-gold px-6 py-3 font-sans text-[13px] font-medium text-void shadow-lg shadow-gold/20 transition-all duration-300 hover:bg-gold-light hover:shadow-gold/30"
          >
            Send an email
            <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

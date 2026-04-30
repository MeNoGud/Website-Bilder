import { site } from "@/lib/site";

const email = "marchiorelloalberto20@gmail.com";
const linkedin = site.social.find((s) => s.label === "LinkedIn")?.href ?? "";

export function Contact() {
  return (
    <section
      id="contact-form"
      className="scroll-mt-20 border-t border-void-border px-6 py-24 sm:px-10 sm:py-32"
    >
      <div className="mx-auto max-w-6xl" id="contact">
        <div className="reveal grid gap-px bg-void-border sm:grid-cols-2 lg:grid-cols-4">

          {/* Email */}
          <div className="bg-void px-8 py-10">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-cream-dim">
              Email
            </span>
            <a
              href={`mailto:${email}`}
              className="group mt-4 block font-display text-lg font-light text-cream transition-colors hover:text-gold"
            >
              <span className="relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-gold after:transition-all after:duration-500 group-hover:after:w-full">
                {email}
              </span>
            </a>
          </div>

          {/* LinkedIn */}
          <div className="bg-void px-8 py-10">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-cream-dim">
              LinkedIn
            </span>
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-center gap-3 font-sans text-sm text-cream-muted transition-colors hover:text-gold"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              Alberto Marchiorello
            </a>
          </div>

          {/* Location */}
          <div className="bg-void px-8 py-10">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-cream-dim">
              Location
            </span>
            <p className="mt-4 font-sans text-sm text-cream-muted">
              {site.location}
            </p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.15em] text-cream-dim">
              Working globally
            </p>
          </div>

          {/* Availability */}
          <div className="bg-void px-8 py-10">
            <div className="flex items-center gap-2 mb-4">
              <span className="status-dot h-1.5 w-1.5 rounded-full bg-emerald-light" />
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-light">
                Available
              </span>
            </div>
            <p className="font-sans text-sm leading-relaxed text-cream-muted">
              Taking new website projects. Responds within 24 hours.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}

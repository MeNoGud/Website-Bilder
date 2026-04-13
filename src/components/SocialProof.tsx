import { site } from "@/lib/site";

export function SocialProof() {
  return (
    <section className="border-t border-void-border px-6 py-20 sm:px-10 sm:py-28">
      <div className="mx-auto max-w-6xl">
        {/* Label */}
        <p className="reveal font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
          — Affiliations
        </p>

        {/* Logo / affiliation strip */}
        <div className="reveal mt-10 flex flex-wrap items-stretch gap-px border border-void-border">
          {site.affiliations.map((a) => (
            <a
              key={a.name}
              href={a.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex-1 min-w-[160px] flex flex-col items-center justify-center px-8 py-8 bg-void-surface transition-colors duration-300 hover:bg-void-elevated text-center"
            >
              <span className="font-display text-2xl font-light tracking-[0.12em] uppercase text-cream transition-colors group-hover:text-gold">
                {a.name}
              </span>
              <span className="mt-1 font-mono text-[9px] uppercase tracking-[0.2em] text-cream-dim">
                {a.subtitle}
              </span>
            </a>
          ))}
          {/* Placeholder slot */}
          <div className="flex-1 min-w-[160px] flex flex-col items-center justify-center px-8 py-8 bg-void-surface border-l border-void-border text-center opacity-30">
            <span className="font-display text-xl font-light tracking-widest uppercase text-cream-dim">
              + Add
            </span>
            <span className="mt-1 font-mono text-[9px] uppercase tracking-[0.2em] text-cream-dim">
              Affiliation
            </span>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mt-16">
          <p className="reveal font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
            — What people say
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {site.testimonials.map((t, i) => (
              <figure
                key={i}
                className="reveal rounded-2xl border border-void-border bg-void-surface p-8"
              >
                <blockquote>
                  <span className="block font-display text-3xl text-gold/40 leading-none mb-4">
                    &ldquo;
                  </span>
                  <p className="font-display text-lg italic font-light leading-relaxed text-cream-muted">
                    {t.quote}
                  </p>
                </blockquote>
                <figcaption className="mt-6 border-t border-void-border pt-5">
                  <span className="block font-sans text-sm font-medium text-cream">
                    {t.author}
                  </span>
                  <span className="block font-mono text-[11px] text-cream-dim mt-0.5">
                    {t.role}
                  </span>
                </figcaption>
              </figure>
            ))}

            {/* Prompt to add more */}
            <div className="reveal rounded-2xl border border-dashed border-void-border flex flex-col items-center justify-center p-8 text-center opacity-40">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-cream-dim">
                Add a testimonial in
              </span>
              <code className="mt-2 font-mono text-[10px] text-gold">
                src/lib/site.ts
              </code>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

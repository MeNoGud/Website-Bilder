import { site } from "@/lib/site";

export function About() {
  return (
    <section id="about" className="scroll-mt-20 px-6 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto max-w-6xl">
        {/* Label */}
        <p className="reveal font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
          — About
        </p>

        {/* Positioning statement */}
        <h2 className="reveal mt-6 max-w-3xl font-display text-3xl font-light italic leading-[1.2] text-cream sm:text-4xl lg:text-5xl">
          {site.positioning}
        </h2>

        <div className="reveal mt-1 gold-rule w-16" />

        {/* Two-column layout */}
        <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_320px] lg:gap-20">
          {/* Bio */}
          <div className="space-y-6">
            {site.about.map((para, i) => (
              <p
                key={i}
                className="reveal font-sans text-base leading-[1.8] text-cream-muted sm:text-[17px]"
              >
                {para}
              </p>
            ))}
          </div>

          {/* Facts card */}
          <div className="reveal rounded-2xl border border-void-border bg-void-surface p-7">
            <ul className="space-y-6">
              <li>
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold">
                  Current role
                </span>
                <p className="mt-1 font-sans text-[13px] leading-relaxed text-cream-muted">
                  {site.role}
                </p>
                <p className="font-sans text-[13px] text-cream-dim">
                  {site.company}
                </p>
              </li>

              <li className="border-t border-void-border pt-6">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold">
                  Education
                </span>
                <p className="mt-1 font-sans text-[13px] leading-relaxed text-cream-muted">
                  {site.education.degree}
                </p>
                <p className="font-sans text-[13px] text-cream-dim">
                  {site.education.school}
                </p>
              </li>

              <li className="border-t border-void-border pt-6">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold">
                  Based in
                </span>
                <p className="mt-1 font-sans text-[13px] text-cream-muted">
                  {site.location}
                </p>
              </li>

              <li className="border-t border-void-border pt-6">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold">
                  Industries
                </span>
                <div className="mt-2 flex flex-wrap gap-2">
                  {["Luxury Hospitality", "AI", "Blockchain", "Marketing"].map(
                    (tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-gold-border bg-gold-faint px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-gold"
                      >
                        {tag}
                      </span>
                    )
                  )}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

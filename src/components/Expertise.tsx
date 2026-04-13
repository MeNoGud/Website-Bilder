import { site } from "@/lib/site";

export function Expertise() {
  return (
    <section
      id="expertise"
      className="scroll-mt-20 border-t border-void-border px-6 py-24 sm:px-10 sm:py-32"
    >
      <div className="mx-auto max-w-6xl">
        {/* Label + intro */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="reveal font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
              — Expertise
            </p>
            <h2 className="reveal mt-4 font-display text-3xl font-light text-cream sm:text-4xl">
              Four pillars of practice
            </h2>
          </div>
          <p className="reveal max-w-sm font-sans text-sm leading-relaxed text-cream-dim lg:text-right">
            A rare combination of luxury service heritage and emerging technology
            fluency.
          </p>
        </div>

        {/* Cards grid */}
        <div className="mt-14 grid gap-px bg-void-border sm:grid-cols-2 lg:grid-cols-4">
          {site.expertise.map((item) => (
            <div
              key={item.number}
              className="expertise-card reveal relative bg-void-surface p-8 transition-colors duration-300 hover:bg-void-elevated"
            >
              {/* Number */}
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-cream-dim">
                {item.number}
              </span>

              {/* Divider */}
              <div className="gold-rule my-5 w-8" />

              {/* Title */}
              <h3 className="font-display text-xl font-medium text-cream sm:text-2xl">
                {item.title}
              </h3>

              {/* Description */}
              <p className="mt-4 font-sans text-[13px] leading-[1.75] text-cream-muted">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

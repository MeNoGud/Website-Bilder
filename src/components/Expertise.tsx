import { site } from "@/lib/site";

const ExpertiseIcon = ({ number }: { number: string }) => {
  const icons: Record<string, React.ReactNode> = {
    "01": (
      // Hotel / Hospitality
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
        <path d="M3 22h18M6 22V7l6-4 6 4v15M9 22v-6h6v6M9 11h1m4 0h1M9 14h1m4 0h1" />
      </svg>
    ),
    "02": (
      // AI / Neural
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
        <circle cx="12" cy="12" r="2" />
        <circle cx="12" cy="4" r="1.5" />
        <circle cx="12" cy="20" r="1.5" />
        <circle cx="4" cy="12" r="1.5" />
        <circle cx="20" cy="12" r="1.5" />
        <circle cx="5.6" cy="5.6" r="1.5" />
        <circle cx="18.4" cy="18.4" r="1.5" />
        <circle cx="18.4" cy="5.6" r="1.5" />
        <circle cx="5.6" cy="18.4" r="1.5" />
        <path d="M12 6v4M12 14v4M6 12h4M14 12h4M7.1 7.1l2.2 2.2M14.7 14.7l2.2 2.2M16.9 7.1l-2.2 2.2M7.1 16.9l2.2-2.2" />
      </svg>
    ),
    "03": (
      // Blockchain / Chain
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
        <rect x="2" y="8" width="6" height="8" rx="1.5" />
        <rect x="9" y="8" width="6" height="8" rx="1.5" />
        <rect x="16" y="8" width="6" height="8" rx="1.5" />
        <path d="M8 12h1M15 12h1" />
      </svg>
    ),
    "04": (
      // Brand / Marketing - concentric circles (target)
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
  };

  return <>{icons[number] ?? null}</>;
};

export function Expertise() {
  return (
    <section
      id="expertise"
      className="scroll-mt-20 border-t border-void-border px-6 py-24 sm:px-10 sm:py-32"
    >
      <div className="mx-auto max-w-6xl">
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
            A rare combination of luxury service heritage and emerging technology fluency.
          </p>
        </div>

        <div className="mt-14 grid gap-px bg-void-border sm:grid-cols-2 lg:grid-cols-4">
          {site.expertise.map((item) => (
            <div
              key={item.number}
              className="expertise-card reveal relative bg-void-surface p-8 transition-colors duration-300 hover:bg-void-elevated"
            >
              {/* Icon */}
              <div className="mb-6 text-gold/60 transition-colors duration-300 group-hover:text-gold">
                <ExpertiseIcon number={item.number} />
              </div>

              {/* Number */}
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-cream-dim">
                {item.number}
              </span>

              <div className="gold-rule my-4 w-8" />

              <h3 className="font-display text-xl font-medium text-cream sm:text-2xl">
                {item.title}
              </h3>

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

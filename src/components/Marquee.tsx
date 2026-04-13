import { site } from "@/lib/site";

export function Marquee() {
  // Duplicate items so the loop is seamless
  const items = [...site.marquee, ...site.marquee];

  return (
    <div className="relative border-y border-void-border bg-void-surface overflow-hidden py-4 select-none">
      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-void-surface to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-void-surface to-transparent" />

      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {items.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-0 font-mono text-[11px] uppercase tracking-[0.22em]"
          >
            <span className="text-cream-dim whitespace-nowrap">{item}</span>
            <span className="mx-6 text-gold/50 text-base leading-none">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}

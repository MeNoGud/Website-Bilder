import { site } from "@/lib/site";

const SYMBOL_A = "✦";
const SYMBOL_B = "◆";

function MarqueeRow({
  items,
  direction = "left",
  speed = "normal",
  size = "small",
  symbol = SYMBOL_A,
}: {
  items: readonly string[] | string[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  size?: "small" | "large";
  symbol?: string;
}) {
  const doubled = [...items, ...items];
  const animClass =
    direction === "right"
      ? "animate-marquee-reverse"
      : speed === "slow"
      ? "animate-marquee-slow"
      : "animate-marquee";

  return (
    <div className="relative overflow-hidden py-3 select-none">
      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-void-surface to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-void-surface to-transparent" />

      <div className={`flex w-max ${animClass} hover:[animation-play-state:paused]`}>
        {doubled.map((item, i) => (
          <span
            key={i}
            className={`flex items-center gap-0 ${
              size === "large"
                ? "font-display text-2xl font-light italic text-cream-muted sm:text-3xl"
                : "font-mono text-[14px] uppercase tracking-[0.22em] text-cream-dim"
            }`}
          >
            <span className="whitespace-nowrap">{item}</span>
            <span
              className={`mx-5 text-gold ${
                size === "large" ? "text-xl" : "text-sm"
              } leading-none`}
            >
              {symbol}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function Marquee() {
  return (
    <div className="border-y border-void-border bg-void-surface">
      <MarqueeRow items={site.marquee} direction="right" speed="normal" size="small" symbol={SYMBOL_B} />
    </div>
  );
}

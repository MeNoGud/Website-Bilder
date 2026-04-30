import { site } from "@/lib/site";

const SYMBOL_A = "✦";
const SYMBOL_B = "◆";

// Row 1 — individual tech/skill terms (left, fast)
const rowOneItems = site.marquee;

// Row 2 — full-phrase style, display font (right, medium)
const rowTwoItems = [
  "Web Design",
  "Strategy & Discovery",
  "Development",
  "Brand Identity",
  "Launch & Growth",
  "Premium Websites",
  "Digital Presence",
  "Conversion",
];

// Row 3 — same as row 1 but shifted offset (left, slow)
const rowThreeItems = [...site.marquee].reverse();

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
                : "font-mono text-[11px] uppercase tracking-[0.22em] text-cream-dim"
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
      {/* Row 1 — left, fast, small mono */}
      <div className="border-b border-void-border">
        <MarqueeRow items={rowOneItems} direction="left" speed="fast" size="small" symbol={SYMBOL_A} />
      </div>

      {/* Row 2 — right, medium, large display */}
      <div className="border-b border-void-border">
        <MarqueeRow items={rowTwoItems} direction="right" speed="normal" size="large" symbol={SYMBOL_B} />
      </div>

      {/* Row 3 — left, slow, small mono */}
      <MarqueeRow items={rowThreeItems} direction="left" speed="slow" size="small" symbol={SYMBOL_A} />
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";

function useCountUp(target: number, duration = 1600, active: boolean) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
      else setValue(target);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);
  return value;
}

function StatCounter({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setActive(true); obs.disconnect(); } },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Parse "15+" → { num: 15, suffix: "+" }
  const match = value.match(/^(\d+)(.*)$/);
  const num    = match ? parseInt(match[1]) : 0;
  const suffix = match ? match[2] : value;
  const count  = useCountUp(num, 1400, active);

  return (
    <div ref={ref} className="flex flex-col gap-1 text-center lg:text-left">
      <span
        className="font-display font-light text-cream tabular-nums leading-none"
        style={{ fontSize: "clamp(2.2rem, 4vw, 3.2rem)" }}
      >
        {active ? count : 0}{suffix}
      </span>
      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-cream-dim">
        {label}
      </span>
    </div>
  );
}

export function Stats() {
  return (
    <div className="border-b border-t border-void-border bg-void-surface">
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <div className="flex flex-col items-center justify-center gap-8 py-20 text-center sm:py-28 lg:flex-row lg:items-center lg:justify-between lg:text-left lg:gap-16">

          {/* Main promise */}
          <div className="flex-1">
            <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-gold mb-5">
              — The price promise
            </p>
            <h2
              className="reveal-clip font-display font-light text-cream leading-[1.0]"
              style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.5rem)" }}
            >
              I will beat any competitor&apos;s quote —{" "}
              <em className="not-italic text-gold">guaranteed.</em>
            </h2>
          </div>

          {/* Divider */}
          <div className="hidden lg:block w-px self-stretch bg-void-border" aria-hidden />

          {/* Right column */}
          <div className="flex-1 max-w-md flex flex-col gap-10">
            {/* Counters */}
            <div className="grid grid-cols-2 gap-6">
              {site.stats.map((s) => (
                <StatCounter key={s.label} value={s.value} label={s.label} />
              ))}
            </div>

            {/* Supporting points */}
            <div className="flex flex-col gap-3">
              {[
                "Better design than the competition",
                "Faster delivery, every time",
                "Full transparency on pricing",
              ].map((point) => (
                <span
                  key={point}
                  className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-cream-dim"
                >
                  <span className="text-gold text-base leading-none" aria-hidden>✦</span>
                  {point}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

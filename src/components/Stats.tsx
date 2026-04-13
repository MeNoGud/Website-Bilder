"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";

function AnimatedNumber({
  value,
  shouldStart,
}: {
  value: string;
  shouldStart: boolean;
}) {
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!shouldStart) return;

    // Try to extract a leading integer from the value
    const match = value.match(/^(\d+)/);
    if (!match) {
      setDisplay(value);
      return;
    }

    const target = parseInt(match[1], 10);
    const suffix = value.slice(match[1].length);
    const prefix = value.slice(0, 0);
    const duration = 1200;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      setDisplay(`${prefix}${current}${suffix}`);
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [shouldStart, value]);

  return <>{shouldStart ? display : "—"}</>;
}

export function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="border-b border-void-border bg-void-surface">
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <div className="grid grid-cols-2 divide-x divide-void-border lg:grid-cols-4">
          {site.stats.map((stat, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center px-6 py-10 text-center lg:py-12"
            >
              <span className="font-display text-4xl font-light text-cream sm:text-5xl lg:text-6xl">
                <AnimatedNumber value={stat.value} shouldStart={visible} />
              </span>
              <div className="gold-rule mx-auto my-4 w-8" />
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-cream-dim">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

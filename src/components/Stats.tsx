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

  const match  = value.match(/^(\d+)(.*)$/);
  const num    = match ? parseInt(match[1]) : 0;
  const suffix = match ? match[2] : value;
  const count  = useCountUp(num, 1400, active);

  return (
    <div ref={ref} className="flex flex-col items-center gap-1 text-center">
      <span
        className="font-display font-light tabular-nums leading-none text-white"
        style={{ fontSize: "clamp(2rem, 6vw, 3.75rem)" }}
      >
        {active ? count : 0}{suffix}
      </span>
      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/40 leading-tight">
        {label}
      </span>
    </div>
  );
}

const BADGES = [
  "Better Design",
  "Faster Delivery",
  "Full Transparency",
];

export function Stats() {
  return (
    <div
      className="relative border-b border-t border-void-border overflow-hidden flex flex-col lg:block min-h-screen lg:min-h-0"
      style={{ background: "#1A110E" }}
    >
      {/* Dot-grid texture */}
      <div
        className="pointer-events-none absolute inset-0 bg-dot-grid bg-[length:24px_24px] opacity-[0.07]"
        aria-hidden
      />

      {/* Red radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(232,36,0,0.13) 0%, transparent 70%)",
        }}
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-6xl px-6 sm:px-10 flex-1 flex flex-col lg:block">

        {/* ── Mobile layout ─────────────────────────────── */}
        <div className="flex-1 flex flex-col justify-evenly py-14 lg:hidden">

          {/* Label + heading */}
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-gold mb-4">
              — The price promise
            </p>
            <p
              className="font-display font-light text-white/80 leading-[1.1]"
              style={{ fontSize: "clamp(1.35rem, 5.5vw, 2rem)" }}
            >
              I will beat any competitor&apos;s quote —
            </p>
            <p
              className="font-display font-light text-gold leading-[0.95]"
              style={{ fontSize: "clamp(3.5rem, 18vw, 7rem)" }}
            >
              guaranteed.
            </p>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-4 gap-0">
            {site.stats.map((s, i) => (
              <div key={s.label} className="flex">
                <StatCounter value={s.value} label={s.label} />
                {i < site.stats.length - 1 && (
                  <div className="w-px self-stretch bg-white/10 mx-auto" />
                )}
              </div>
            ))}
          </div>

          {/* Badge row */}
          <div className="flex flex-wrap justify-center gap-2">
            {BADGES.map((b) => (
              <span
                key={b}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-white/50"
              >
                <span className="text-gold text-[8px]">✦</span>
                {b}
              </span>
            ))}
          </div>

        </div>

        {/* ── Desktop layout ────────────────────────────── */}
        <div className="hidden lg:flex flex-col justify-center py-28 gap-16">

          {/* Top: label + split heading */}
          <div className="flex items-end justify-between gap-16">
            <div className="flex-1">
              <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-gold mb-5">
                — The price promise
              </p>
              <p
                className="font-display font-light text-white/80 leading-[1.1]"
                style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.5rem)" }}
              >
                I will beat any competitor&apos;s quote —
              </p>
              <p
                className="font-display font-light text-gold leading-[0.9]"
                style={{ fontSize: "clamp(4rem, 9vw, 11rem)" }}
              >
                guaranteed.
              </p>
            </div>

            {/* Desktop badge column */}
            <div className="flex flex-col gap-3 pb-3">
              {BADGES.map((b) => (
                <span
                  key={b}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-white/50"
                >
                  <span className="text-gold text-[9px]">✦</span>
                  {b}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom: stats in horizontal row with dividers */}
          <div className="flex items-center border-t border-white/10 pt-10 gap-0">
            {site.stats.map((s, i) => (
              <div key={s.label} className="flex flex-1 items-center">
                <StatCounter value={s.value} label={s.label} />
                {i < site.stats.length - 1 && (
                  <div className="w-px h-12 bg-white/10 ml-auto" />
                )}
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
}

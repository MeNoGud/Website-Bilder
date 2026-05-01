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
    <div ref={ref} className="flex items-center justify-between py-4 border-b border-white/15 last:border-b-0">
      <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/55 leading-tight">
        {label}
      </span>
      <span
        className="font-display font-light tabular-nums leading-none text-white"
        style={{ fontSize: "clamp(1.8rem, 5vw, 2.75rem)" }}
      >
        {active ? count : 0}{suffix}
      </span>
    </div>
  );
}

/* Desktop-only horizontal counter (number on top, label below) */
function StatCounterDesktop({ value, label }: { value: string; label: string }) {
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
    <div ref={ref} className="flex flex-col gap-1">
      <span
        className="font-display font-light tabular-nums leading-none text-white"
        style={{ fontSize: "clamp(2.5rem, 5vw, 3.75rem)" }}
      >
        {active ? count : 0}{suffix}
      </span>
      <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/50 leading-tight">
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
      style={{ background: "#F5A200" }}
    >
      {/* Subtle dot-grid texture */}
      <div
        className="pointer-events-none absolute inset-0 bg-dot-grid bg-[length:24px_24px] opacity-[0.06]"
        aria-hidden
      />

      {/* Soft dark vignette at edges */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 80% at 50% 50%, transparent 40%, rgba(0,0,0,0.18) 100%)",
        }}
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-6xl px-6 sm:px-10 flex-1 flex flex-col lg:block">

        {/* ── Mobile layout ─────────────────────────────── */}
        <div className="flex-1 flex flex-col justify-evenly py-14 lg:hidden">

          {/* Label + heading */}
          <div>
            <p className="section-label text-white/60 mb-4">
              — The price promise
            </p>
            <p
              className="font-display font-light text-white/80 leading-[1.1]"
              style={{ fontSize: "clamp(1.35rem, 5.5vw, 2rem)" }}
            >
              I will beat any competitor&apos;s quote —
            </p>
            <p
              className="font-display font-semibold text-display-xl leading-[0.95]"
              style={{ color: "#E82400" }}
            >
              guaranteed.
            </p>
          </div>

          {/* Stats — vertical stack */}
          <div className="flex flex-col">
            {site.stats.map((s) => (
              <StatCounter key={s.label} value={s.value} label={s.label} />
            ))}
          </div>

          {/* Badge row */}
          <div className="flex flex-wrap justify-start gap-2">
            {BADGES.map((b) => (
              <span
                key={b}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-white/70"
              >
                <span style={{ color: "#E82400", fontSize: "8px" }}>✦</span>
                {b}
              </span>
            ))}
          </div>

        </div>

        {/* ── Desktop layout ────────────────────────────── */}
        <div className="hidden lg:flex flex-col justify-center py-28 gap-16">

          {/* Top: label + split heading + badges */}
          <div className="flex items-end justify-between gap-16">
            <div className="flex-1">
              <p className="section-label text-white/60 mb-5">
                — The price promise
              </p>
              <p
                className="font-display font-light text-white/80 text-display-sm leading-[1.1]"
              >
                I will beat any competitor&apos;s quote —
              </p>
              <p
                className="font-display font-semibold text-display-xl leading-[0.9]"
                style={{ color: "#E82400" }}
              >
                guaranteed.
              </p>
            </div>

            {/* Badge column */}
            <div className="flex flex-col gap-3 pb-3">
              {BADGES.map((b) => (
                <span
                  key={b}
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-white/70"
                >
                  <span style={{ color: "#E82400", fontSize: "9px" }}>✦</span>
                  {b}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom: stats in horizontal row */}
          <div className="flex items-center pt-10 gap-0">
            {site.stats.map((s) => (
              <div key={s.label} className="flex flex-1 items-center">
                <StatCounterDesktop value={s.value} label={s.label} />
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
}

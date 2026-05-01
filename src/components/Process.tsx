"use client";

import { useEffect, useRef } from "react";
import { site } from "@/lib/site";

const AUTO_SPEED  = 0.3;   // px per frame → ~18 px/s at 60 fps
const RESUME_DELAY = 1400; // ms of inactivity before auto-scroll restarts

export function Process() {
  const trackRef     = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const posRef       = useRef(0);     // current translateX in px
  const pausedRef    = useRef(false);
  const rafRef       = useRef(0);
  const timerRef     = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const halfWidthRef = useRef(0);
  const dragRef      = useRef({ active: false, startX: 0, startPos: 0 });

  // ── rAF animation loop ────────────────────────────
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Measure after first paint so scrollWidth is accurate
    const init = requestAnimationFrame(() => {
      halfWidthRef.current = track.scrollWidth / 2;
      posRef.current       = -halfWidthRef.current; // start at second set of cards
    });

    const tick = () => {
      if (!pausedRef.current) {
        posRef.current -= AUTO_SPEED; // left-to-right scroll
      }

      // Infinite wrap
      const hw = halfWidthRef.current;
      if (hw > 0) {
        if (posRef.current >= 0)   posRef.current -= hw;
        if (posRef.current < -hw)  posRef.current += hw;
      }

      track.style.transform = `translateX(${posRef.current}px)`;
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(init);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // ── Native wheel listener (non-passive so we can preventDefault) ──
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onWheel = (e: WheelEvent) => {
      // Only intercept when horizontal scroll is intentional
      if (Math.abs(e.deltaX) < 4 && Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;

      e.preventDefault(); // stop page/browser from reacting to horizontal scroll

      pausedRef.current = true;
      posRef.current   -= e.deltaX; // deltaX > 0 = finger/wheel moved left = content left

      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        pausedRef.current = false;
      }, RESUME_DELAY);
    };

    container.addEventListener("wheel", onWheel, { passive: false });
    return () => container.removeEventListener("wheel", onWheel);
  }, []);

  // Duplicate for seamless loop
  const cards = [...site.process, ...site.process];

  return (
    <section
      id="process"
      className="scroll-mt-20 border-t border-void-border py-24 sm:py-32"
      style={{
        background:
          "radial-gradient(ellipse at 50% 0%, rgba(232,36,0,0.04) 0%, transparent 60%), #F4EEE4",
      }}
    >
      {/* Header */}
      <div className="mx-auto max-w-6xl px-6 sm:px-10 mb-14">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="reveal section-label text-gold">
              — How it works
            </p>
            <h2 className="reveal-clip mt-4 font-display text-3xl font-light text-cream sm:text-5xl">
              From idea to live in four steps
            </h2>
          </div>
          <p className="reveal max-w-sm font-sans text-base leading-relaxed text-cream-dim lg:text-right">
            Scroll sideways to explore each step
          </p>
        </div>
      </div>

      {/* Carousel */}
      <div
        ref={containerRef}
        className="relative overflow-hidden cursor-grab active:cursor-grabbing select-none"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, black 7%, black 93%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 7%, black 93%, transparent 100%)",
        }}
        onPointerDown={(e) => {
          dragRef.current = { active: true, startX: e.clientX, startPos: posRef.current };
          pausedRef.current = true;
          containerRef.current?.setPointerCapture(e.pointerId);
        }}
        onPointerMove={(e) => {
          if (!dragRef.current.active) return;
          posRef.current = dragRef.current.startPos + (e.clientX - dragRef.current.startX);
        }}
        onPointerUp={() => {
          if (!dragRef.current.active) return;
          dragRef.current.active = false;
          clearTimeout(timerRef.current);
          timerRef.current = setTimeout(() => { pausedRef.current = false; }, RESUME_DELAY);
        }}
        onPointerCancel={() => {
          dragRef.current.active = false;
          clearTimeout(timerRef.current);
          timerRef.current = setTimeout(() => { pausedRef.current = false; }, RESUME_DELAY);
        }}
      >
        <div
          ref={trackRef}
          className="flex gap-5 py-2"
          style={{ width: "max-content", willChange: "transform" }}
        >
          {cards.map((item, i) => (
            <div
              key={i}
              className="group relative flex-shrink-0 w-[460px] lg:w-[580px] p-12 lg:p-16 border border-void-border bg-void-surface transition-colors duration-300 hover:bg-void-elevated"
            >
              {/* Step badge */}
              <div className="mb-6 inline-flex h-[52px] w-[52px] lg:h-[60px] lg:w-[60px] items-center justify-center rounded-full border border-gold/25 bg-gold-faint">
                <span className="font-mono text-[13px] lg:text-[14px] uppercase tracking-[0.15em] text-gold">
                  {item.step}
                </span>
              </div>

              <h3 className="font-display text-2xl lg:text-3xl font-medium text-cream">
                {item.title}
              </h3>

              <div className="gold-rule my-4 lg:my-5 w-8 lg:w-10" />

              <p className="font-sans text-[15px] lg:text-[16px] leading-[1.75] text-cream-muted">
                {item.description}
              </p>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

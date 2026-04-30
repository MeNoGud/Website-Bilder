"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "@/lib/site";

// ─── Clock constants ──────────────────────────────
const CX = 150, CY = 150, R = 100, C = 2 * Math.PI * R, SIZE = 300;
const CLOCK_STAGES = [
  { week: 4, label: "4", sub: "WEEKS TO GO", fill: 1    },
  { week: 3, label: "3", sub: "WEEKS TO GO", fill: 0.75 },
  { week: 2, label: "2", sub: "WEEKS TO GO", fill: 0.5  },
  { week: 1, label: "1", sub: "WEEK TO GO",  fill: 0.25 },
  { week: 0, label: "✦", sub: "LAUNCH DAY",  fill: 0    },
];

// 12 ticks like a clock face — chunky & graphic
const TICK_COUNT = 12;

function LaunchClock({ stepIndex }: { stepIndex: number }) {
  const stage      = CLOCK_STAGES[Math.min(stepIndex, CLOCK_STAGES.length - 1)];
  const { fill }   = stage;
  const dashOffset = C * (1 - fill);
  const endAngle   = -Math.PI / 2 + fill * 2 * Math.PI;
  const dotX       = CX + R * Math.cos(endAngle);
  const dotY       = CY + R * Math.sin(endAngle);
  const isLaunch   = stage.week === 0;

  const ticks = Array.from({ length: TICK_COUNT }, (_, i) => {
    const angle   = (i / TICK_COUNT) * 2 * Math.PI - Math.PI / 2;
    const isMajor = i % 3 === 0;
    const innerR  = R + 14;
    const outerR  = R + (isMajor ? 30 : 22);
    return {
      x1: CX + innerR * Math.cos(angle), y1: CY + innerR * Math.sin(angle),
      x2: CX + outerR * Math.cos(angle), y2: CY + outerR * Math.sin(angle), isMajor,
    };
  });

  const cardinalLabels = [
    { label: "4W", angle: -Math.PI / 2, active: stage.week === 4 },
    { label: "1W", angle: 0,            active: stage.week === 1 },
    { label: "2W", angle: Math.PI / 2,  active: stage.week === 2 },
    { label: "3W", angle: Math.PI,      active: stage.week === 3 },
  ];

  return (
    <div className="flex flex-col items-center gap-4">
      <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} className="overflow-visible">
        <defs>
          <filter id="clock-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#E82400" floodOpacity="0.18" />
          </filter>
          <filter id="dot-shadow" x="-60%" y="-60%" width="220%" height="220%">
            <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#E82400" floodOpacity="0.4" />
          </filter>
        </defs>

        {/* Outer dashed decorative ring */}
        <circle cx={CX} cy={CY} r={R + 44} fill="none"
          stroke="#F5A200" strokeWidth="2" strokeDasharray="4 8" opacity="0.5"
          transform={`rotate(-90 ${CX} ${CY})`} />

        {/* Tick marks — chunky */}
        {ticks.map((t, i) => (
          <line key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2}
            stroke={t.isMajor ? "#F5A200" : "rgba(245,162,0,0.4)"}
            strokeWidth={t.isMajor ? "4" : "2.5"}
            strokeLinecap="round" />
        ))}

        {/* Cardinal week labels */}
        {cardinalLabels.map(({ label, angle, active }) => {
          const lr = R + 52;
          return (
            <text key={label} x={CX + lr * Math.cos(angle)} y={CY + lr * Math.sin(angle)}
              textAnchor="middle" dominantBaseline="middle" fontSize="10" letterSpacing="0.12em"
              fontWeight="700"
              fill={active ? "#E82400" : "rgba(245,162,0,0.55)"}
              style={{ transition: "fill 0.5s ease", fontFamily: "var(--font-geist-mono, monospace)" }}>
              {label}
            </text>
          );
        })}

        {/* Track ring — thick orange */}
        <circle cx={CX} cy={CY} r={R} fill="none" stroke="#F5A200" strokeWidth="14" opacity="0.22" />

        {/* Progress arc — thick red */}
        <circle cx={CX} cy={CY} r={R} fill="none" stroke="#E82400" strokeWidth="14"
          strokeDasharray={C} strokeDashoffset={dashOffset} strokeLinecap="round"
          transform={`rotate(-90 ${CX} ${CY})`}
          filter="url(#clock-shadow)"
          style={{ transition: "stroke-dashoffset 0.9s cubic-bezier(0.4,0,0.2,1)" }} />

        {/* Progress dot — large with white ring */}
        {!isLaunch && (
          <g filter="url(#dot-shadow)"
            style={{ transition: "transform 0.9s cubic-bezier(0.4,0,0.2,1)" }}>
            <circle cx={dotX} cy={dotY} r="13" fill="#E82400" />
            <circle cx={dotX} cy={dotY} r="5"  fill="white" />
          </g>
        )}

        {/* Clock face — warm orange tint */}
        <circle cx={CX} cy={CY} r={R - 16} fill="#FEF6E4" />
        <circle cx={CX} cy={CY} r={R - 16} fill="none" stroke="#F5A200" strokeWidth="3" opacity="0.45" />

        {/* Center number */}
        <text x={CX} y={isLaunch ? CY + 8 : CY - 6} textAnchor="middle" dominantBaseline="middle"
          fontSize={isLaunch ? "36" : "64"} fontWeight="300" fill="#E82400"
          style={{ fontFamily: "var(--font-cormorant, Georgia, serif)", transition: "all 0.5s ease" }}>
          {stage.label}
        </text>

        {/* Sub label */}
        <text x={CX} y={CY + 30} textAnchor="middle" dominantBaseline="middle"
          fontSize="7.5" letterSpacing="0.22em" fontWeight="700"
          fill={isLaunch ? "#E82400" : "#F5A200"}
          style={{ fontFamily: "var(--font-geist-mono, monospace)", transition: "fill 0.5s ease" }}>
          {stage.sub}
        </text>
      </svg>
      <p className="font-mono text-[9px] uppercase tracking-[0.28em] text-cream-dim text-center max-w-[200px]">
        Average time from discovery to launch
      </p>
    </div>
  );
}

// ─── Section constants ────────────────────────────
const STEPS = site.expertise.length; // 5

export function Expertise() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [isMobile,   setIsMobile]   = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const handleScroll = () => {
      const el = wrapperRef.current;
      if (!el) return;
      const rect        = el.getBoundingClientRect();
      const scrolled    = -rect.top;
      const totalScroll = rect.height - window.innerHeight;
      if (totalScroll <= 0) return;
      const progress = Math.max(0, Math.min(0.9999, scrolled / totalScroll));
      const step     = Math.min(Math.floor(progress * STEPS), STEPS - 1);
      setActiveStep(step);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  // ── Mobile fallback ────────────────────────────
  if (isMobile) {
    return (
      <section id="services" className="scroll-mt-20 border-t border-void-border px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">— Services</p>
          <h2 className="reveal-clip mt-4 mb-12 font-display text-3xl font-light text-cream">
            Everything you need to launch
          </h2>
          <div className="flex justify-center mb-12">
            <LaunchClock stepIndex={STEPS - 1} />
          </div>
          <div className="border-t border-void-border">
            {site.expertise.map((item) => (
              <div key={item.number} className="border-b border-void-border py-8">
                <span className="font-mono text-[10px] text-cream-dim">{item.number}</span>
                <h3 className="mt-3 font-display text-2xl font-light text-cream">{item.title}</h3>
                <div className="gold-rule my-3 w-14" />
                <p className="font-sans text-sm leading-relaxed text-cream-muted">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ── Desktop: scroll-jacked steps ──────────────
  return (
    <div
      id="services"
      ref={wrapperRef}
      style={{ height: `${(STEPS + 1) * 100}vh` }}
    >
      <div
        className="border-t border-void-border bg-void"
        style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}
      >
        <div className="flex flex-col justify-center h-full px-6 sm:px-10">
          <div className="mx-auto w-full max-w-6xl">

            {/* Header */}
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">— Services</p>
                <h2 className="reveal-clip mt-3 font-display text-3xl font-light text-cream sm:text-4xl">
                  Everything you need to launch
                </h2>
              </div>
              <p className="hidden lg:block font-sans text-sm text-cream-dim text-right max-w-xs">
                Scroll to explore each step →
              </p>
            </div>

            {/* Clock + animated step */}
            <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: "4rem", alignItems: "center" }}>
              <LaunchClock stepIndex={activeStep} />

              <div className="relative" style={{ minHeight: "280px" }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep}
                    initial={{ opacity: 0, y: 36 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -36 }}
                    transition={{ duration: 0.42, ease: [0.4, 0, 0.2, 1] }}
                    className="absolute inset-0 flex flex-col justify-center"
                  >
                    <div className="flex items-center gap-2 mb-7">
                      <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold">
                        {site.expertise[activeStep].number}
                      </span>
                      <span className="font-mono text-[11px] text-cream-dim opacity-30">/</span>
                      <span className="font-mono text-[11px] text-cream-dim opacity-30">0{STEPS}</span>
                    </div>

                    <h3 className="font-display font-light text-cream leading-[1.0]"
                      style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)" }}>
                      {site.expertise[activeStep].title}
                    </h3>

                    <div className="gold-rule my-6 w-12" />

                    <p className="font-sans text-base leading-relaxed text-cream-muted max-w-md">
                      {site.expertise[activeStep].description}
                    </p>

                    <div className="flex items-center gap-2 mt-10">
                      {site.expertise.map((_, i) => (
                        <div key={i} className="rounded-full transition-all duration-500"
                          style={{
                            width:      i === activeStep ? "28px" : "6px",
                            height:     "6px",
                            background: i === activeStep ? "#E82400" : "rgba(26,17,14,0.15)",
                          }} />
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

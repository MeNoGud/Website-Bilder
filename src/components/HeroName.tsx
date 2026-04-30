"use client";

import { useScroll, useTransform, motion } from "framer-motion";

export function HeroName() {
  const { scrollY } = useScroll();
  // Name moves up slower than page scroll — creates depth/parallax
  const y = useTransform(scrollY, [0, 700], [0, -55]);
  // Subtle fade as user scrolls past hero
  const opacity = useTransform(scrollY, [0, 400], [1, 0.6]);

  return (
    <motion.div style={{ y, opacity }} className="relative overflow-hidden">
      {/* Large watermark */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo.svg"
        alt=""
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 select-none"
        style={{
          height: "clamp(22rem, 48vw, 46rem)",
          width: "auto",
          opacity: 0.12,
          mixBlendMode: "multiply",
        }}
      />

      <p className="hero-role mb-4 font-mono text-[10px] uppercase tracking-[0.32em] text-gold">
        Web Design · Development · Brand Strategy
      </p>

      <h1
        className="font-display font-light leading-[0.87] tracking-[-0.02em] text-cream"
        style={{ fontSize: "clamp(4.8rem, 13.5vw, 11.5rem)" }}
      >
        <span className="hero-line-1 block">Alberto</span>
        <span className="hero-line-2 block">Marchiorello</span>
      </h1>
    </motion.div>
  );
}

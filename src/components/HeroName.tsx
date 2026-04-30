"use client";

import { useScroll, useTransform, motion } from "framer-motion";

export function HeroName() {
  const { scrollY } = useScroll();
  // Name moves up slower than page scroll — creates depth/parallax
  const y = useTransform(scrollY, [0, 700], [0, -55]);
  // Subtle fade as user scrolls past hero
  const opacity = useTransform(scrollY, [0, 400], [1, 0.6]);

  return (
    <motion.div style={{ y, opacity }} className="relative">
      {/* Full watermark logo — centered so nothing is clipped */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo.svg"
        alt=""
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none"
        style={{
          width: "clamp(18rem, 42vw, 40rem)",
          height: "auto",
          opacity: 0.1,
          mixBlendMode: "multiply",
        }}
      />

      <p className="hero-role mb-4 text-center font-mono text-[10px] uppercase tracking-[0.32em] text-gold">
        Web Design · Development · Brand Strategy
      </p>

      <h1
        className="font-display font-black leading-[0.9] tracking-[-0.02em] text-cream text-center"
        style={{ fontSize: "clamp(4rem, 14vw, 13rem)" }}
      >
        <span className="hero-line-1 block uppercase">Marchio</span>
      </h1>
    </motion.div>
  );
}

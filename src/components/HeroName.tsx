"use client";

import { useEffect, useRef } from "react";

export function HeroName() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onScroll = () => {
      const y = window.scrollY;
      // Gentle upward drift only — logo stays at full opacity (words fade, logo follows)
      el.style.transform = `translateY(-${Math.min(y * 0.08, 55)}px)`;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div ref={ref} className="relative w-full">
      {/* Full watermark logo — centered so nothing is clipped */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo.svg"
        alt=""
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none"
        style={{
          width: "min(42vw, 38rem)",
          height: "auto",
          opacity: 1,
          mixBlendMode: "normal",
        }}
      />

      <h1
        className="font-tolken w-full text-center text-[#F4EEE4] uppercase leading-none tracking-[0.06em]"
        style={{ fontSize: "clamp(2.5rem, 11vw, 11rem)" }}
      >
        <span className="hero-line-1 block">Marchio</span>
      </h1>
    </div>
  );
}

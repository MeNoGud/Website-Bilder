"use client";

import { useEffect, useRef } from "react";

export function HeroName() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onScroll = () => {
      const y = window.scrollY;
      const translateY = Math.min(y * 0.08, 55);
      const opacity = Math.max(1 - (y / 400) * 0.4, 0.6);
      el.style.transform = `translateY(-${translateY}px)`;
      el.style.opacity = String(opacity);
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
          width: "clamp(7rem, 30vw, 28rem)",
          height: "auto",
          opacity: 0.5,
          mixBlendMode: "multiply",
        }}
      />

      <h1
        className="font-tolken w-full text-center text-cream uppercase leading-none tracking-[0.06em]"
        style={{ fontSize: "clamp(1.8rem, 8vw, 8rem)" }}
      >
        <span className="hero-line-1 block">Marchio</span>
      </h1>
    </div>
  );
}

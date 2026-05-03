"use client";

import { useEffect, useRef } from "react";

export function HeroName() {
  const logoWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = logoWrapRef.current;
    if (!wrap) return;

    const onScroll = () => {
      const y = window.scrollY;
      const drift = Math.min(y * 0.1, 72);
      wrap.style.transform = `translate(-50%, calc(-50% - ${drift}px))`;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="relative w-full">
      <div
        ref={logoWrapRef}
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none"
        aria-hidden
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo.svg"
          alt=""
          className="block"
          style={{
            width: "min(42vw, 38rem)",
            height: "auto",
            opacity: 1,
            mixBlendMode: "normal",
          }}
        />
      </div>

      <h1
        className="font-tolken relative z-[1] w-full text-center uppercase leading-none tracking-[0.06em] text-[#F4EEE4]"
        style={{ fontSize: "clamp(2.5rem, 11vw, 11rem)" }}
      >
        <span className="hero-line-1 block">Marchio</span>
      </h1>
    </div>
  );
}

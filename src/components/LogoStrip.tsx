"use client";

/**
 * LogoStrip
 *
 * Tiles the AM monogram SVG in a brick-offset repeating grid.
 * A scroll listener shifts background-position to recreate the
 * parallax "cut-out window" effect without background-attachment:fixed,
 * which rasterises fixed backgrounds at 1× on HiDPI/mobile and causes
 * visible blurriness regardless of source resolution.
 */

import { useEffect, useRef } from "react";

export function LogoStrip() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onScroll = () => {
      const offset = window.scrollY * 0.3;
      el.style.backgroundPosition = `0 ${offset}px, 80px ${offset + 80}px`;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="logo-strip"
      style={{
        height: "180px",
        backgroundColor: "#F4EEE4",
        borderTop: "1px solid rgba(26,17,14,0.09)",
        borderBottom: "1px solid rgba(26,17,14,0.09)",
      }}
    />
  );
}

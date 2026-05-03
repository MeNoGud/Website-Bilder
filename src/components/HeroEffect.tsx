"use client";

import { useEffect, useRef } from "react";

// Trigger:  scroll
// Purpose:  as the user scrolls away from the hero, text elements (status bar,
//           tagline) fade out — leaving only the watermark logo visible.
//           The logo itself has no opacity fade (see HeroName.tsx).
export function HeroEffect() {
  const rafRef = useRef(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Fade these to 0 over the first 45% of viewport height of scrolling
    const TARGETS = [".hero-meta", ".hero-tag"];
    const fadeDist = window.innerHeight * 0.45;

    const update = () => {
      const y    = window.scrollY;
      const t    = Math.min(y / fadeDist, 1);
      const opac = Math.max(1 - t * 2, 0); // fully gone at t = 0.5

      TARGETS.forEach((sel) =>
        document.querySelectorAll<HTMLElement>(sel).forEach((el) => {
          el.style.opacity = String(opac);
        })
      );
    };

    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
      TARGETS.forEach((sel) =>
        document.querySelectorAll<HTMLElement>(sel).forEach((el) => {
          el.style.opacity = "";
        })
      );
    };
  }, []);

  return null;
}

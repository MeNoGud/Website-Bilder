"use client";

import { useEffect, useRef } from "react";

// Scroll-synced fade inside #hero. Watermark is not in SELECTORS.
// Skips DOM changes at scrollY === 0 until the user has scrolled (so GSAP intro is not overridden).
export function HeroEffect() {
  const rafRef = useRef(0);

  useEffect(() => {
    const root = document.getElementById("hero");
    if (!root) return;

    const SELECTORS = [".hero-meta", ".hero-tag", ".hero-line-1", ".hero-float-decor"];
    const fadeOver = () => window.innerHeight * 0.42;
    const hasLeftTop = { current: false };

    const update = () => {
      const y = window.scrollY;
      if (y > 0) hasLeftTop.current = true;
      if (y <= 0 && !hasLeftTop.current) return;

      const end = fadeOver();
      if (y <= 0) {
        SELECTORS.forEach((sel) => {
          root.querySelectorAll<HTMLElement>(sel).forEach((el) => {
            el.style.opacity = "1";
          });
        });
        return;
      }

      const t = end <= 0 ? 1 : Math.min(y / end, 1);
      const opac = Math.max(1 - t * 1.15, 0);

      SELECTORS.forEach((sel) => {
        root.querySelectorAll<HTMLElement>(sel).forEach((el) => {
          el.style.opacity = String(opac);
        });
      });
    };

    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    // If the browser restores a non-zero scroll (bfcache / reload), sync once after layout.
    requestAnimationFrame(() => {
      requestAnimationFrame(update);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(rafRef.current);
      SELECTORS.forEach((sel) => {
        root.querySelectorAll<HTMLElement>(sel).forEach((el) => {
          el.style.opacity = "";
        });
      });
    };
  }, []);

  return null;
}

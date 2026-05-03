"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** Extra upward drift vs scroll — scenery “falls behind” vs the fixed watermark. */
const SKEW = 0.48;

export function HeroScrollSlew({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const update = () => {
      const hero = document.getElementById("hero");
      if (!hero || !el) return;
      const rect = hero.getBoundingClientRect();
      if (rect.bottom < -50 || rect.top > window.innerHeight + 50) {
        el.style.transform = "";
        return;
      }
      const y = window.scrollY;
      el.style.transform = `translate3d(0, ${-y * SKEW}px, 0)`;
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
      el.style.transform = "";
    };
  }, []);

  return (
    <div ref={ref} className="relative min-h-0 w-full will-change-transform">
      {children}
    </div>
  );
}

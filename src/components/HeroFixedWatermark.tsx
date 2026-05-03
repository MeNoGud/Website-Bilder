"use client";

import { useEffect, useRef } from "react";

/** Logo painted on the “glass” — fixed in the viewport until the hero block scrolls away. */
export function HeroFixedWatermark() {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const sync = () => {
      const hero = document.getElementById("hero");
      if (!hero) return;
      const r = hero.getBoundingClientRect();
      const gone = r.bottom <= 0;
      el.style.opacity = gone ? "0" : "1";
      el.style.visibility = gone ? "hidden" : "visible";
    };

    const onScroll = () => requestAnimationFrame(sync);
    sync();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="pointer-events-none fixed left-1/2 top-1/2 z-[6] max-w-[min(90vw,38rem)] -translate-x-1/2 -translate-y-1/2 select-none transition-opacity duration-500 ease-out"
      style={{ width: "min(42vw, 38rem)" }}
      aria-hidden
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo.svg" alt="" className="block w-full" style={{ mixBlendMode: "normal" }} />
    </div>
  );
}

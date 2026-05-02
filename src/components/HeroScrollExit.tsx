"use client";

import { useEffect, useRef } from "react";

// Hero exit — pure scroll listener, same pattern as HeroName.tsx (proven reliable in Next.js)
// No GSAP, no ScrollTrigger, no pin — just requestAnimationFrame + window.scroll.
//
// Act 1: as the hero scrolls away, each element blurs and drifts left at different
//        speeds (parallax depth). easeInQuad gives a slow-start-then-rush feel.
// Act 2: Work section elements reform from the left using IntersectionObserver
//        + CSS transitions — liquid reassembly impression.
export function HeroScrollExit() {
  const rafRef = useRef(0);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile      = window.innerWidth < 768;

    // Collect Work elements regardless of device (used in both branches)
    const workEls = Array.from(
      document.querySelectorAll<HTMLElement>(".work-reassemble")
    );

    // ── Mobile / reduced-motion: show Work elements immediately ──────────
    if (isMobile || reducedMotion) {
      workEls.forEach((el) => {
        el.style.opacity   = "1";
        el.style.transform = "none";
        el.style.filter    = "none";
      });
      return;
    }

    // ── Work section reassemble — IntersectionObserver + CSS transitions ─
    // Set up transition timing before the observer fires
    workEls.forEach((el, i) => {
      el.style.transition = [
        `opacity  0.75s cubic-bezier(0.16,1,0.3,1) ${i * 0.12}s`,
        `transform 0.75s cubic-bezier(0.16,1,0.3,1) ${i * 0.12}s`,
        `filter   0.75s cubic-bezier(0.16,1,0.3,1) ${i * 0.12}s`,
      ].join(", ");
    });

    const workObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.style.opacity   = "1";
            el.style.transform = "translateX(0px)";
            el.style.filter    = "blur(0px)";
            workObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    workEls.forEach((el) => workObserver.observe(el));

    // ── Hero exit — requestAnimationFrame scroll listener ────────────────
    const heroEl = document.querySelector<HTMLElement>(".hero-section");
    if (!heroEl) return () => workObserver.disconnect();

    // Animate over 80% of the hero's natural height
    const scrollDist = heroEl.offsetHeight * 0.8;

    // selector | target-x | target-y | blur | scale | stagger-offset (0–1)
    const ELEMS = [
      { sel: ".hero-meta",   x: -80,  dy: -14, blur: 28, scale: 0.88, d: 0.00 },
      { sel: ".hero-deco",   x: -55,  dy: -22, blur: 18, scale: 0.70, d: 0.03 },
      { sel: ".hero-tag",    x: -70,  dy: -18, blur: 32, scale: 0.84, d: 0.07 },
      { sel: ".hero-cta",    x: -60,  dy: -12, blur: 24, scale: 0.80, d: 0.10 },
      { sel: ".hero-line-1", x: -110, dy: -28, blur: 52, scale: 0.90, d: 0.16 },
    ] as const;

    const update = () => {
      const y = window.scrollY;
      ELEMS.forEach(({ sel, x, dy, blur, scale, d }) => {
        // Normalise scroll position per-element with stagger offset
        const raw = Math.min(Math.max((y / scrollDist - d) / (1 - d), 0), 1);
        const e   = raw * raw; // easeInQuad — slow start, then rushes off
        document.querySelectorAll<HTMLElement>(sel).forEach((el) => {
          el.style.transform = `translateX(${x * e}px) translateY(${dy * e}px) scale(${1 + (scale - 1) * e})`;
          el.style.opacity   = String(Math.max(1 - e * 1.4, 0));
          el.style.filter    = `blur(${blur * e}px)`;
        });
      });
    };

    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    // If page loads already scrolled (e.g. browser restores scroll position),
    // apply correct state after a short delay so HeroAnimation has started first
    if (window.scrollY > 0) {
      setTimeout(update, 80);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
      workObserver.disconnect();
      // Clear inline styles so nothing stays frozen if component re-mounts
      ELEMS.forEach(({ sel }) =>
        document.querySelectorAll<HTMLElement>(sel).forEach((el) => {
          el.style.transform = "";
          el.style.opacity   = "";
          el.style.filter    = "";
        })
      );
    };
  }, []);

  return null;
}

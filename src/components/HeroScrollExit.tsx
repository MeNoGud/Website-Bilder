"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

// Hero exit — requestAnimationFrame scroll listener (same pattern as HeroName parallax)
// This is the most reliable approach in Next.js — no GSAP pin, no fixed-positioning edge cases.
//
// Act 1: hero elements liquefy and drift left as user scrolls away from the hero.
//        Each element has different x / blur amounts for parallax depth.
//        easeInQuad acceleration makes it feel like matter pulling away slowly then rushing off.
//
// Act 2: Work section elements reform from the left via GSAP ScrollTrigger (no pin).
//        The liquid from Act 1 appears to have reassembled into the portfolio content.
export function HeroScrollExit() {
  const rafRef = useRef(0);

  useEffect(() => {
    const mm = gsap.matchMedia();

    // ── Desktop + full motion ─────────────────────────────────────────
    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      const heroEl = document.querySelector<HTMLElement>(".hero-section");
      if (!heroEl) return;

      // Animation completes over 85% of the hero's natural height
      const scrollDist = (heroEl.offsetHeight || window.innerHeight) * 0.85;

      // Each entry: selector, target x (px), y (px), blur (px), scale, stagger delay (0–1)
      const elements = [
        { sel: ".hero-meta",   x: -80,  dy: -14, blur: 28, scale: 0.88, d: 0.00 },
        { sel: ".hero-deco",   x: -55,  dy: -22, blur: 18, scale: 0.70, d: 0.03 },
        { sel: ".hero-tag",    x: -70,  dy: -18, blur: 32, scale: 0.84, d: 0.07 },
        { sel: ".hero-cta",    x: -60,  dy: -12, blur: 24, scale: 0.80, d: 0.10 },
        // MARCHIO — heaviest blur, last to dissolve, most dramatic
        { sel: ".hero-line-1", x: -110, dy: -28, blur: 52, scale: 0.90, d: 0.16 },
      ];

      const update = () => {
        const y = window.scrollY;
        elements.forEach(({ sel, x, dy, blur, scale, d }) => {
          // Normalise progress per-element with stagger offset
          const raw = Math.min(Math.max((y / scrollDist - d) / (1 - d), 0), 1);
          const e   = raw * raw; // easeInQuad — slow start, then rushes off
          document.querySelectorAll<HTMLElement>(sel).forEach((el) => {
            el.style.transform = `translateX(${x * e}px) translateY(${dy * e}px) scale(${1 + (scale - 1) * e})`;
            el.style.opacity   = `${Math.max(1 - e * 1.4, 0)}`;
            el.style.filter    = `blur(${blur * e}px)`;
          });
        });
      };

      const onScroll = () => {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(update);
      };

      window.addEventListener("scroll", onScroll, { passive: true });
      update(); // set correct state if page loads mid-scroll

      // Act 2 — Work section reforms from the left (GSAP ScrollTrigger, no pin)
      const workTl = gsap.timeline({
        scrollTrigger: {
          id: "work-in",
          trigger: "#work",
          start: "top 85%",
          end: "top 28%",
          scrub: 1.2,
        },
      });
      workTl.fromTo(
        ".work-reassemble",
        { x: -65, opacity: 0, filter: "blur(20px)" },
        { x: 0, opacity: 1, filter: "blur(0px)", ease: "power3.out", stagger: 0.14 }
      );

      return () => {
        window.removeEventListener("scroll", onScroll);
        cancelAnimationFrame(rafRef.current);
        // Reset inline styles so nothing is stuck if component re-mounts
        elements.forEach(({ sel }) =>
          document.querySelectorAll<HTMLElement>(sel).forEach((el) => {
            el.style.transform = "";
            el.style.opacity   = "";
            el.style.filter    = "";
          })
        );
        ScrollTrigger.getById("work-in")?.kill();
        workTl.kill();
      };
    });

    // ── Mobile + reduced motion — show work section immediately ──────
    mm.add("(max-width: 767px)", () => {
      gsap.set(".work-reassemble", { opacity: 1, x: 0, filter: "blur(0px)" });
    });
    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(".work-reassemble", { opacity: 1, x: 0, filter: "blur(0px)" });
    });

    return () => mm.revert();
  }, []);

  return null;
}

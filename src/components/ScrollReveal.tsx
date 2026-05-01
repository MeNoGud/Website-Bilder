"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

// Trigger: scroll — element enters the lower 12% of the viewport
// Purpose: replaces CSS animation-timeline: view() (linear easing) with expo.out
//          across all .reveal and .reveal-clip elements, matching the hero sequence.
// Easing:  expo.out — same deceleration curve used in the hero GSAP timeline.
// Cleanup: mm.revert() removes all ScrollTrigger instances and inline GSAP styles on unmount.
export function ScrollReveal() {
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // .reveal — fade up into view
      const reveals = gsap.utils.toArray<HTMLElement>(".reveal");
      reveals.forEach((el) => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "expo.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            once: true,
          },
        });
      });

      // .reveal-clip — horizontal wipe from left to right
      const clips = gsap.utils.toArray<HTMLElement>(".reveal-clip");
      clips.forEach((el) => {
        gsap.to(el, {
          clipPath: "inset(0 0% 0 0)",
          duration: 0.9,
          ease: "expo.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            once: true,
          },
        });
      });

      return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      // Instant show — same pattern as HeroAnimation.tsx
      gsap.set(".reveal",      { opacity: 1, y: 0,                    clearProps: "all" });
      gsap.set(".reveal-clip", { clipPath: "inset(0 0% 0 0)",          clearProps: "clipPath" });
    });

    return () => mm.revert();
  }, []);

  return null;
}

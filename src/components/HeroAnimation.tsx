"use client";

import { useEffect } from "react";
import { gsap } from "@/lib/gsap";

// Hero intro: meta bar → letters (GSAP stagger) → taglines one per line → float decor.
// prefers-reduced-motion: instant reveals via gsap.set.
export function HeroAnimation() {
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({
        defaults: { ease: "expo.out" },
      });

      tl.fromTo(".hero-meta", { opacity: 0 }, { opacity: 1, duration: 0.55 }).fromTo(
        ".hero-char",
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: { each: 0.042 },
        },
        "-=0.32",
      );

      tl.fromTo(
        ".hero-tag-line",
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.62,
          stagger: 0.14,
          ease: "expo.out",
        },
        "-=0.3",
      );

      tl.fromTo(
        ".hero-float-decor",
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        "-=0.45",
      );
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set([".hero-meta", ".hero-char", ".hero-tag-line", ".hero-float-decor"], {
        opacity: 1,
        y: 0,
      });
    });

    return () => mm.revert();
  }, []);

  return null;
}

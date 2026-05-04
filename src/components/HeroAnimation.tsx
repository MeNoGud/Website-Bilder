"use client";

import { useLayoutEffect } from "react";
import { gsap } from "@/lib/gsap";

// Hero intro scoped to #hero so selectors never miss; gsap.context + matchMedia cleanup
// pairs with React Strict Mode (dev) so timelines are not orphaned or reverted too early.
export function HeroAnimation() {
  useLayoutEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          defaults: { ease: "expo.out" },
        });

        tl.fromTo(".hero-meta", { opacity: 0 }, { opacity: 1, duration: 0.55 })
          .fromTo(
            ".hero-char",
            { opacity: 0, y: 28 },
            {
              opacity: 1,
              y: 0,
              duration: 0.4,
              stagger: { each: 0.042 },
            },
            "-=0.32",
          )
          .fromTo(
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
          )
          .fromTo(
            ".hero-float-decor",
            { opacity: 0 },
            { opacity: 1, duration: 0.5 },
            "-=0.45",
          );
      }, hero);

      return () => ctx.revert();
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.context(() => {
        gsap.set(".hero-meta, .hero-char, .hero-tag-line, .hero-float-decor", {
          opacity: 1,
          y: 0,
        });
      }, hero);
    });

    return () => {
      mm.revert();
    };
  }, []);

  return null;
}

"use client";

import { useLayoutEffect } from "react";
import { gsap } from "@/lib/gsap";

// Hero intro: meta bar → tag lines → décor. Brand tumblers scroll with ScrollTrigger in HeroName.
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
            ".hero-tag-line",
            { opacity: 0, y: 18 },
            {
              opacity: 1,
              y: 0,
              duration: 0.62,
              stagger: 0.14,
              ease: "expo.out",
            },
            "-=0.15",
          )
          .fromTo(
            ".hero-float-decor",
            { opacity: 0 },
            { opacity: 1, duration: 0.5 },
            "-=0.45",
          );

        tl.eventCallback("onComplete", () => {
          gsap.set(".hero-tag-line", { clearProps: "transform" });
        });
      }, hero);

      return () => ctx.revert();
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.context(() => {
        gsap.set(".hero-meta, .hero-tag-line, .hero-float-decor", {
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

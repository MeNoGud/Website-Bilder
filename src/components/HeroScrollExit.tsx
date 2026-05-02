"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

// Trigger:  scroll — fires as the user leaves the hero section
// Purpose:  hero elements dissolve into mist/smoke drifting left, revealing the
//           section below. Each element moves a different distance and carries a
//           different blur amount, creating a parallax depth-of-field / atmospheric feel.
// Tools:    GSAP ScrollTrigger (pin + scrub), gsap.timeline(), gsap.matchMedia()
// Mobile:   pin and scrub disabled on small screens — normal scroll behaviour preserved
export function HeroScrollExit() {
  useEffect(() => {
    const mm = gsap.matchMedia();

    // Desktop + no reduced-motion only
    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          id: "hero-exit",
          trigger: "#top",
          start: "top top",
          end: "+=85%",   // user scrolls ~85% of viewport height while hero is pinned
          pin: true,
          scrub: 1.8,     // animation lags scroll by 1.8s — feels buttery, unhurried
          anticipatePin: 1,
        },
      });

      // Elements dissolve left with increasing blur — ordered by visual weight
      // so lighter UI details disappear first, then the heavy title last

      // Status bar — first to go; small, fast
      tl.to(".hero-meta",
        { x: -72, y: -8,  opacity: 0, filter: "blur(18px)", ease: "power1.in", duration: 0.75 },
        0
      )

      // Decorative symbols — subtle, quick
      .to(".hero-deco",
        { x: -55, y: -14, opacity: 0, filter: "blur(14px)", ease: "power1.in", duration: 0.6 },
        0.04
      )

      // Tagline copy — medium weight
      .to(".hero-tag",
        { x: -65, y: -12, opacity: 0, filter: "blur(22px)", ease: "power1.in", duration: 0.8 },
        0.08
      )

      // CTA button
      .to(".hero-cta",
        { x: -55, y: -8,  opacity: 0, filter: "blur(16px)", ease: "power1.in", duration: 0.7 },
        0.1
      )

      // MARCHIO headline — largest, last to leave, most blur (anchor of the scene)
      .to(".hero-line-1",
        { x: -95, y: -18, scale: 0.97, opacity: 0, filter: "blur(38px)", ease: "power1.in", duration: 1.0 },
        0.14
      );

      return () => {
        ScrollTrigger.getById("hero-exit")?.kill();
      };
    });

    return () => mm.revert();
  }, []);

  return null;
}

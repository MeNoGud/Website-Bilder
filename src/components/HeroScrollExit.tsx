"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

// Trigger:  scroll from hero section
// Purpose:  two-act transition —
//   Act 1: hero elements liquefy (heavy blur + drift left + scale collapse)
//           pinned so the next section reveals underneath as the liquid clears
//   Act 2: Work section elements reform from the left (decreasing blur, sliding in)
//           giving the impression the hero liquid reassembled into new content
// Tools:    gsap.timeline(), gsap.fromTo(), gsap.matchMedia(), ScrollTrigger
// Mobile:   pin + scrub disabled; work-reassemble elements shown instantly
export function HeroScrollExit() {
  useEffect(() => {
    const mm = gsap.matchMedia();

    // ── Desktop + full motion ─────────────────────────────────────────
    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      // Act 1 — hero liquefies and exits to the left
      // Trigger: .hero-section (unique class — avoids the duplicate #top on page.tsx)
      // Each element has a different x / blur amount for parallax depth
      const heroTl = gsap.timeline({
        scrollTrigger: {
          id: "hero-exit",
          trigger: ".hero-section",
          start: "top top",
          end: "+=90%",
          pin: true,
          scrub: 2,
          anticipatePin: 1,
        },
      });

      heroTl
        // Status bar — small, first to dissolve
        .fromTo(".hero-meta",
          { x: 0, y: 0, scale: 1, opacity: 1, filter: "blur(0px)" },
          { x: -80,  y: -14, scale: 0.88, opacity: 0, filter: "blur(28px)", ease: "power1.in", duration: 0.8 },
          0
        )
        // Decorative symbols — lightest, fastest
        .fromTo(".hero-deco",
          { x: 0, y: 0, scale: 1, opacity: 1, filter: "blur(0px)" },
          { x: -55,  y: -22, scale: 0.70, opacity: 0, filter: "blur(18px)", ease: "power1.in", duration: 0.65 },
          0.02
        )
        // Tagline copy
        .fromTo(".hero-tag",
          { x: 0, y: 0, scale: 1, opacity: 1, filter: "blur(0px)" },
          { x: -70,  y: -18, scale: 0.84, opacity: 0, filter: "blur(32px)", ease: "power1.in", duration: 0.85 },
          0.06
        )
        // CTA button
        .fromTo(".hero-cta",
          { x: 0, y: 0, scale: 1, opacity: 1, filter: "blur(0px)" },
          { x: -60,  y: -12, scale: 0.80, opacity: 0, filter: "blur(24px)", ease: "power1.in", duration: 0.75 },
          0.09
        )
        // MARCHIO headline — heaviest, most blur, last to leave (anchor of the scene)
        .fromTo(".hero-line-1",
          { x: 0, y: 0, scale: 1, opacity: 1, filter: "blur(0px)" },
          { x: -110, y: -28, scale: 0.90, opacity: 0, filter: "blur(52px)", ease: "power1.in", duration: 1.0 },
          0.14
        );

      // Act 2 — Work section reforms from the left (liquid reassembly)
      const workTl = gsap.timeline({
        scrollTrigger: {
          id: "work-reassemble",
          trigger: "#work",
          start: "top 82%",
          end: "top 18%",
          scrub: 1.5,
        },
      });

      workTl.fromTo(
        ".work-reassemble",
        { x: -65, opacity: 0, filter: "blur(20px)" },
        { x: 0, opacity: 1, filter: "blur(0px)", ease: "power3.out", stagger: 0.14, duration: 1 }
      );

      return () => {
        heroTl.scrollTrigger?.kill();
        heroTl.kill();
        workTl.scrollTrigger?.kill();
        workTl.kill();
      };
    });

    // ── Mobile + reduced motion — show work-reassemble elements immediately ─
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

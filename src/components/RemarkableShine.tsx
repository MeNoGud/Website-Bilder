"use client";

import { useEffect, useRef } from "react";

const BASE  = "linear-gradient(#E82400, #E82400)";
const SWEEP_MS = 1000;
const PAUSE_MS = 3500;

function buildGradient(x: number) {
  return `linear-gradient(90deg,
    #E82400 0%,
    #E82400 ${x - 20}%,
    #ff7a45 ${x - 10}%,
    #ffe8dc ${x}%,
    #ff7a45 ${x + 10}%,
    #E82400 ${x + 20}%,
    #E82400 100%)`;
}

export function RemarkableShine() {
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const span = spanRef.current;
    if (!span) return;

    const isTouch = window.matchMedia("(pointer: coarse)").matches;

    if (isTouch) {
      // ── Auto wave on mobile ──────────────────────
      let rafId: number;
      const start = performance.now();

      const tick = (now: number) => {
        const elapsed = (now - start) % (SWEEP_MS + PAUSE_MS);
        if (elapsed < SWEEP_MS) {
          const t = elapsed / SWEEP_MS;
          // ease-in-out: smooth start and end
          const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
          span.style.backgroundImage = buildGradient(-20 + ease * 140);
        } else {
          span.style.backgroundImage = BASE;
        }
        rafId = requestAnimationFrame(tick);
      };

      rafId = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(rafId);
    } else {
      // ── Mouse tracking on desktop ────────────────
      const onMouseMove = (e: MouseEvent) => {
        const rect = span.getBoundingClientRect();
        const x = Math.min(100, Math.max(0, ((e.clientX - rect.left) / rect.width) * 100));
        span.style.backgroundImage = buildGradient(x);
      };
      const onMouseLeave = () => {
        span.style.backgroundImage = BASE;
      };

      span.addEventListener("mousemove", onMouseMove);
      span.addEventListener("mouseleave", onMouseLeave);
      return () => {
        span.removeEventListener("mousemove", onMouseMove);
        span.removeEventListener("mouseleave", onMouseLeave);
      };
    }
  }, []);

  return (
    <span
      ref={spanRef}
      className="not-italic cursor-default font-semibold"
      style={{
        backgroundImage: BASE,
        backgroundColor: "transparent",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}
    >
      remarkable?
    </span>
  );
}

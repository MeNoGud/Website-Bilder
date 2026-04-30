"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

export function CalendlyEmbed() {
  const url =
    process.env.NEXT_PUBLIC_CALENDLY_URL ??
    "https://calendly.com/YOUR_USERNAME/30min";

  const sentinelRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" } // start loading 200px before it enters view
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sentinelRef}>
      {visible ? (
        <>
          <Script
            src="https://assets.calendly.com/assets/external/widget.js"
            strategy="lazyOnload"
          />
          <div
            className="calendly-inline-widget w-full rounded-2xl overflow-hidden border border-void-border"
            data-url={`${url}?hide_gdpr_banner=1&background_color=F4EEE4&text_color=1A110E&primary_color=E82400`}
            style={{ minWidth: "320px", height: "700px" }}
          />
        </>
      ) : (
        /* Placeholder keeps the layout stable while Calendly hasn't loaded */
        <div
          className="w-full rounded-2xl border border-void-border bg-void-surface flex items-center justify-center"
          style={{ minWidth: "320px", height: "700px" }}
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cream-dim animate-pulse">
            Loading calendar…
          </p>
        </div>
      )}
    </div>
  );
}

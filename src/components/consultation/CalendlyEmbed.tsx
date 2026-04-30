"use client";

import Script from "next/script";

export function CalendlyEmbed() {
  const url =
    process.env.NEXT_PUBLIC_CALENDLY_URL ??
    "https://calendly.com/YOUR_USERNAME/30min";

  return (
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
  );
}

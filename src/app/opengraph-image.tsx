import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#1A110E",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          padding: "80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Ambient red glow bottom-left */}
        <div
          style={{
            position: "absolute",
            bottom: -100,
            left: -100,
            width: 600,
            height: 600,
            background:
              "radial-gradient(circle, rgba(232,36,0,0.18) 0%, transparent 70%)",
          }}
        />

        {/* Ambient glow top-right */}
        <div
          style={{
            position: "absolute",
            top: -80,
            right: -80,
            width: 400,
            height: 400,
            background:
              "radial-gradient(circle, rgba(232,36,0,0.07) 0%, transparent 70%)",
          }}
        />

        {/* Top label */}
        <div
          style={{
            position: "absolute",
            top: 80,
            left: 80,
            color: "rgba(244,238,228,0.4)",
            fontSize: 12,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            fontFamily: "monospace",
          }}
        >
          marchio.design
        </div>

        {/* ✦ top-right */}
        <div
          style={{
            position: "absolute",
            top: 70,
            right: 80,
            color: "rgba(232,36,0,0.25)",
            fontSize: 48,
          }}
        >
          ✦
        </div>

        {/* Red rule */}
        <div
          style={{
            width: 48,
            height: 2,
            background: "#E82400",
            marginBottom: 28,
          }}
        />

        {/* Mono label */}
        <div
          style={{
            color: "#E82400",
            fontSize: 12,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            fontFamily: "monospace",
            marginBottom: 20,
          }}
        >
          {site.role} · {site.location}
        </div>

        {/* Name */}
        <div
          style={{
            color: "#F4EEE4",
            fontSize: 72,
            fontWeight: 300,
            lineHeight: 0.9,
            marginBottom: 32,
            fontFamily: "serif",
          }}
        >
          {site.name}
        </div>

        {/* Hook */}
        <div
          style={{
            color: "rgba(244,238,228,0.55)",
            fontSize: 20,
            lineHeight: 1.5,
            maxWidth: 680,
            fontFamily: "sans-serif",
          }}
        >
          {site.hook}
        </div>
      </div>
    ),
    { ...size }
  );
}

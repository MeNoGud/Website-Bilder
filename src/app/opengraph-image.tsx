import { ImageResponse } from "next/og";

export const alt = "Alberto Marchiorello — Head of AI & Blockchain Integration";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#080810",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          padding: "80px",
          fontFamily: "serif",
          position: "relative",
        }}
      >
        {/* Background glow */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "500px",
            height: "500px",
            background: "radial-gradient(circle, rgba(196,151,90,0.06) 0%, transparent 70%)",
          }}
        />

        {/* Dot pattern row (decorative) */}
        <div
          style={{
            position: "absolute",
            top: 80,
            right: 80,
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          {[0, 1, 2].map((row) => (
            <div key={row} style={{ display: "flex", gap: 12 }}>
              {[0, 1, 2, 3, 4].map((col) => (
                <div
                  key={col}
                  style={{
                    width: 4,
                    height: 4,
                    borderRadius: "50%",
                    background: "rgba(232,228,220,0.08)",
                  }}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Gold rule */}
        <div
          style={{
            width: 60,
            height: 1,
            background: "linear-gradient(to right, #C4975A, transparent)",
            marginBottom: 32,
          }}
        />

        {/* Label */}
        <div
          style={{
            color: "#C4975A",
            fontSize: 13,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            fontFamily: "monospace",
            marginBottom: 20,
          }}
        >
          Personal Brand · London
        </div>

        {/* Name */}
        <div
          style={{
            color: "#E8E4DC",
            fontSize: 76,
            fontWeight: 300,
            lineHeight: 0.88,
            marginBottom: 36,
          }}
        >
          Alberto Marchiorello
        </div>

        {/* Role */}
        <div
          style={{
            color: "#8A8680",
            fontSize: 22,
            marginBottom: 16,
          }}
        >
          Head of AI & Blockchain Integration · Marketing
        </div>

        {/* Company */}
        <div
          style={{
            color: "#55534F",
            fontSize: 15,
            letterSpacing: "0.1em",
            fontFamily: "monospace",
          }}
        >
          Jashita Hotel & Luxury Villas · Tulum
        </div>
      </div>
    ),
    { ...size }
  );
}

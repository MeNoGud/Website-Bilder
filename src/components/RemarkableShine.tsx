"use client";

import { useState } from "react";

export function RemarkableShine() {
  const [shineX, setShineX] = useState<number | null>(null);

  function handleMouseMove(e: React.MouseEvent<HTMLSpanElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    setShineX(Math.min(100, Math.max(0, x)));
  }

  function handleMouseLeave() {
    setShineX(null);
  }

  const gradient =
    shineX !== null
      ? `linear-gradient(90deg,
          #E82400 0%,
          #E82400 ${shineX - 20}%,
          #ff7a45 ${shineX - 10}%,
          #ffe8dc ${shineX}%,
          #ff7a45 ${shineX + 10}%,
          #E82400 ${shineX + 20}%,
          #E82400 100%
        )`
      : "linear-gradient(#E82400, #E82400)";

  const shineStyle: React.CSSProperties = {
    backgroundImage: gradient,
    backgroundColor: "transparent",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  };

  return (
    <span
      className="not-italic cursor-default font-semibold"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={shineStyle}
    >
      remarkable?
    </span>
  );
}

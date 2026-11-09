"use client";

import React from "react";

export interface DataPulsePathProps {
  id: string;
  start: { x: number; y: number }; // Percentage 0 - 100
  end: { x: number; y: number }; // Percentage 0 - 100
  controlPoint?: { x: number; y: number };
  isPaused?: boolean;
  speedMultiplier?: number;
  color?: string;
  direction?: "forward" | "reverse";
}

export const DataPulsePath: React.FC<DataPulsePathProps> = ({
  id,
  start,
  end,
  controlPoint,
  isPaused = false,
  speedMultiplier = 1,
  color = "#4A65DC",
  direction = "forward",
}) => {
  // Compute quadratic bezier curve in viewBox 0 0 100 100
  const sx = start.x;
  const sy = start.y;
  const ex = end.x;
  const ey = end.y;

  // Midpoint with curve curvature if controlPoint not provided
  const cx = controlPoint ? controlPoint.x : (sx + ex) / 2 + (sy - ey) * 0.12;
  const cy = controlPoint ? controlPoint.y : (sy + ey) / 2 + (ex - sx) * 0.12;

  const pathD = `M ${sx} ${sy} Q ${cx} ${cy} ${ex} ${ey}`;
  const reversePathD = `M ${ex} ${ey} Q ${cx} ${cy} ${sx} ${sy}`;

  const activePathD = direction === "reverse" ? reversePathD : pathD;

  // Base duration in seconds, scaled by speed multiplier
  const duration = Math.max(1, 3 / speedMultiplier);

  return (
    <g className="data-pulse-group select-none">
      <defs>
        <linearGradient id={`grad-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4A65DC" stopOpacity="0.2" />
          <stop offset="50%" stopColor={color} stopOpacity="0.8" />
          <stop offset="100%" stopColor="#36A783" stopOpacity="0.2" />
        </linearGradient>

        <filter id={`glow-${id}`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="0.8" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Background Static Connection Track */}
      <path
        d={pathD}
        fill="none"
        stroke="rgba(163, 177, 198, 0.45)"
        strokeWidth="1.2"
        strokeDasharray="2 3"
        strokeLinecap="round"
        className="transition-colors duration-300"
      />

      {/* Highlighted Vector Path */}
      <path
        d={pathD}
        fill="none"
        stroke={`url(#grad-${id})`}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity={isPaused ? 0.4 : 0.75}
      />

      {/* Animated Traveling Data Packet (SVG animateMotion) */}
      {!isPaused && (
        <circle r="1.4" fill={color} filter={`url(#glow-${id})`}>
          <animateMotion
            path={activePathD}
            dur={`${duration}s`}
            repeatCount="indefinite"
            rotate="auto"
          />
        </circle>
      )}

      {/* Secondary Packet Offset for continuous flow */}
      {!isPaused && (
        <circle r="1.1" fill="#36A783" opacity="0.85">
          <animateMotion
            path={activePathD}
            dur={`${duration}s`}
            begin={`${duration / 2}s`}
            repeatCount="indefinite"
            rotate="auto"
          />
        </circle>
      )}
    </g>
  );
};

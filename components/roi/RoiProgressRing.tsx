"use client";

import type { ReactNode } from "react";

const SIZE = 192;
const STROKE = 8;
const RADIUS = (SIZE - STROKE) / 2;
const CENTER = SIZE / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const ROI_RING_CAP = 250;

function arcRatio(roi: number): number {
  if (roi === 0) return 0;
  const normalized = Math.min(Math.abs(roi) / ROI_RING_CAP, 1);
  return Math.max(normalized, 0.07);
}

type RoiProgressRingProps = {
  roi: number;
  children: ReactNode;
};

export function RoiProgressRing({ roi, children }: RoiProgressRingProps) {
  const ratio = arcRatio(roi);
  const dashOffset = CIRCUMFERENCE * (1 - ratio);
  const strokeColor = roi < 0 ? "#2ba7f6" : "#f7c500";

  return (
    <div className="roi-ring-wrap">
      <svg
        className="roi-ring-svg"
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        aria-hidden
      >
        <circle
          cx={CENTER}
          cy={CENTER}
          r={RADIUS}
          fill="none"
          stroke="#353438"
          strokeWidth={STROKE}
        />
        <circle
          cx={CENTER}
          cy={CENTER}
          r={RADIUS}
          fill="none"
          stroke={strokeColor}
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={dashOffset}
          transform={`rotate(-90 ${CENTER} ${CENTER})`}
        />
      </svg>
      <div className="roi-ring-label">{children}</div>
    </div>
  );
}

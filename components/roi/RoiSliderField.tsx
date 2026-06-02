"use client";

import { formatUsd } from "@/lib/roi/state";
import { cn } from "@/lib/shared/utils";

type RoiSliderFieldProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  formatValue?: (value: number) => string;
};

export function RoiSliderField({
  label,
  value,
  min,
  max,
  step,
  onChange,
  formatValue = formatUsd,
}: RoiSliderFieldProps) {
  return (
    <div className="flex flex-col gap-4">
      <label className="flex justify-between text-base font-semibold text-[var(--roi-on-surface)]">
        <span>{label}</span>
        <span className="font-medium text-[var(--roi-cyan)]">
          {formatValue(value)}
        </span>
      </label>
      <input
        type="range"
        className={cn("roi-slider")}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
      />
    </div>
  );
}

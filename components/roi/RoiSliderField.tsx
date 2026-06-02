"use client";

import { formatUsd } from "@/lib/roi/state";

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
    <div className="roi-field">
      <label className="roi-field-head">
        <span>{label}</span>
        <span className="roi-field-value">{formatValue(value)}</span>
      </label>
      <input
        type="range"
        className="roi-slider"
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

"use client";

import { formatMxn } from "@/lib/roi/currency";

type RoiSliderFieldProps = {
  label: string;
  hint?: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  formatValue?: (value: number) => string;
};

export function RoiSliderField({
  label,
  hint,
  value,
  min,
  max,
  step,
  onChange,
  formatValue = formatMxn,
}: RoiSliderFieldProps) {
  return (
    <div className="roi-field">
      <label className="roi-field-head">
        <span>{label}</span>
        <span className="roi-field-value">{formatValue(value)}</span>
      </label>
      {hint ? <p className="roi-field-hint">{hint}</p> : null}
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

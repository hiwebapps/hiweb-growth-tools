"use client";

type RoiPercentFieldProps = {
  label: string;
  hint?: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
};

export function RoiPercentField({
  label,
  hint,
  value,
  min,
  max,
  step,
  onChange,
}: RoiPercentFieldProps) {
  return (
    <div className="roi-field">
      <label className="roi-field-head">
        <span>{label}</span>
        <span className="roi-field-value">{value}%</span>
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

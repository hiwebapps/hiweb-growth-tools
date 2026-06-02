"use client";

import { ROI_INDUSTRIES, type RoiIndustryId } from "@/lib/roi/industry";

type RoiIndustrySelectProps = {
  value: RoiIndustryId;
  onChange: (value: RoiIndustryId) => void;
};

export function RoiIndustrySelect({ value, onChange }: RoiIndustrySelectProps) {
  const label =
    ROI_INDUSTRIES.find((i) => i.id === value)?.label ?? "SaaS";

  return (
    <div className="flex flex-col gap-4">
      <label className="roi-text-on flex justify-between text-base font-semibold">
        <span>Industria</span>
        <span className="roi-text-cyan font-medium">{label}</span>
      </label>
      <div className="relative">
        <select
          className="roi-select"
          value={value}
          onChange={(e) => onChange(e.target.value as RoiIndustryId)}
        >
          {ROI_INDUSTRIES.map((industry) => (
            <option key={industry.id} value={industry.id}>
              {industry.label}
            </option>
          ))}
        </select>
        <span
          className="roi-text-muted pointer-events-none absolute right-6 top-1/2 -translate-y-1/2"
          aria-hidden
        >
          v
        </span>
      </div>
    </div>
  );
}

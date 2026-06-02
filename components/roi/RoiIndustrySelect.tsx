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
    <div className="roi-field">
      <label className="roi-field-head">
        <span>Industria</span>
        <span className="roi-field-value">{label}</span>
      </label>
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
    </div>
  );
}

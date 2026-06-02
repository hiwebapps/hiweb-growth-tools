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
      <label className="flex justify-between text-base font-semibold text-[var(--roi-on-surface)]">
        <span>Industria</span>
        <span className="font-medium text-[var(--roi-cyan)]">{label}</span>
      </label>
      <div className="relative">
        <select
          className="roi-select w-full px-6 py-4 text-base focus:border-[var(--roi-cyan)] focus:outline-none"
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
          className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 text-[var(--roi-muted)]"
          aria-hidden
        >
          ▾
        </span>
      </div>
    </div>
  );
}

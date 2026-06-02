"use client";

import type { RoiCalculatorState } from "@/lib/roi/types";
import { RoiIndustrySelect } from "./RoiIndustrySelect";
import { RoiSliderField } from "./RoiSliderField";

type RoiInputFormProps = {
  state: RoiCalculatorState;
  onChange: <K extends keyof RoiCalculatorState>(
    key: K,
    value: RoiCalculatorState[K],
  ) => void;
  error?: string;
};

export function RoiInputForm({ state, onChange, error }: RoiInputFormProps) {
  return (
    <div className="roi-stack">
      {error ? (
        <p className="roi-error" role="alert">
          {error}
        </p>
      ) : null}
      <RoiIndustrySelect
        value={state.industry}
        onChange={(v) => onChange("industry", v)}
      />
      <RoiSliderField
        label="Presupuesto mensual"
        value={state.monthlyBudget}
        min={1000}
        max={50000}
        step={1000}
        onChange={(v) => onChange("monthlyBudget", v)}
      />
      <RoiSliderField
        label="Ticket promedio"
        value={state.averageLeadValue}
        min={100}
        max={10000}
        step={100}
        onChange={(v) => onChange("averageLeadValue", v)}
      />
      <RoiSliderField
        label="Leads para cerrar venta"
        value={state.leadsToCloseSale}
        min={1}
        max={100}
        step={1}
        onChange={(v) => onChange("leadsToCloseSale", v)}
        formatValue={(v) => String(Math.round(v))}
      />
    </div>
  );
}

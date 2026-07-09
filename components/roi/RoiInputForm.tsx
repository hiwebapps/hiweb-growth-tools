"use client";

import { ROI_BUDGET, ROI_TICKET } from "@/lib/roi/currency";
import type { RoiCalculatorState } from "@/lib/roi/types";
import { RoiIndustrySelect } from "./RoiIndustrySelect";
import { RoiSliderField } from "./RoiSliderField";

const INPUT_HINTS = {
  industry:
    "Sector de tu negocio; define los benchmarks del cálculo.",
  monthlyBudget:
    "Inversión mensual estimada en marketing digital (ads, agencia, herramientas).",
  averageLeadValue:
    "Valor económico medio de cada venta que cierras.",
  leadsToCloseSale:
    "Cuántos leads necesitas en promedio para lograr una venta.",
} as const;

type RoiInputFormProps = {
  state: RoiCalculatorState;
  minMonthlyBudget: number;
  onChange: <K extends keyof RoiCalculatorState>(
    key: K,
    value: RoiCalculatorState[K],
  ) => void;
  error?: string;
  resultsButtonLabel: string;
  onShowResults: () => void;
};

export function RoiInputForm({
  state,
  minMonthlyBudget,
  onChange,
  error,
  resultsButtonLabel,
  onShowResults,
}: RoiInputFormProps) {
  return (
    <div className="roi-step roi-step-inputs">
      {error ? (
        <p className="roi-error" role="alert">
          {error}
        </p>
      ) : null}
      <div className="roi-stack">
        <RoiIndustrySelect
          value={state.industry}
          hint={INPUT_HINTS.industry}
          onChange={(v) => onChange("industry", v)}
        />
        <RoiSliderField
          label="Presupuesto mensual"
          hint={INPUT_HINTS.monthlyBudget}
          value={state.monthlyBudget}
          min={minMonthlyBudget}
          max={ROI_BUDGET.max}
          step={ROI_BUDGET.step}
          onChange={(v) => onChange("monthlyBudget", v)}
        />
        <RoiSliderField
          label="Ticket promedio"
          hint={INPUT_HINTS.averageLeadValue}
          value={state.averageLeadValue}
          min={ROI_TICKET.min}
          max={ROI_TICKET.max}
          step={ROI_TICKET.step}
          onChange={(v) => onChange("averageLeadValue", v)}
        />
        <RoiSliderField
          label="Leads para cerrar venta"
          hint={INPUT_HINTS.leadsToCloseSale}
          value={state.leadsToCloseSale}
          min={1}
          max={100}
          step={1}
          onChange={(v) => onChange("leadsToCloseSale", v)}
          formatValue={(v) => String(Math.round(v))}
        />
      </div>
      <button
        type="button"
        className="roi-btn-primary"
        onClick={onShowResults}
      >
        {resultsButtonLabel}
        <span aria-hidden> →</span>
      </button>
    </div>
  );
}

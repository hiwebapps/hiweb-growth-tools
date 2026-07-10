"use client";

import { formatMxn, formatUsd } from "@/lib/roi/currency";
import { ROI_BUDGET } from "@/lib/roi/currency";
import type { RoiCalculatorState } from "@/lib/roi/types";
import { RoiIndustrySelect } from "./RoiIndustrySelect";
import { RoiPercentField } from "./RoiPercentField";
import { RoiSliderField } from "./RoiSliderField";

const HINTS = {
  industry: "Cada industria usa inputs y fórmulas distintas.",
  monthlyBudget:
    "Inversión mensual estimada en marketing digital (ads, agencia, herramientas).",
  ticketPromedio: "Valor promedio de cada pedido (AOV).",
  tasaConversion: "Porcentaje de visitantes que completan una compra.",
  mesesCampana: "Meses que proyectas mantener la inversión en ads.",
  valorPropiedad: "Precio promedio de la propiedad que comercializas.",
  porcentajeComision: "Tu comisión sobre el valor de cierre.",
  tasaCierre: "Porcentaje de leads totales que terminan comprando.",
  suscripcionMensualUsd: "Ingreso mensual recurrente por cliente (MRR).",
  mesesPermanencia: "Meses promedio que un cliente permanece activo.",
  leadsParaCierre: "Registros o leads necesarios para un cliente de pago.",
  averageLeadValue: "Valor económico medio de cada venta que cierras.",
  leadsToCloseSale: "Cuántos leads necesitas en promedio para lograr una venta.",
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
          hint={HINTS.industry}
          onChange={(v) => onChange("industry", v)}
        />
        <RoiSliderField
          label="Presupuesto mensual"
          hint={HINTS.monthlyBudget}
          value={state.monthlyBudget}
          min={minMonthlyBudget}
          max={ROI_BUDGET.max}
          step={ROI_BUDGET.step}
          onChange={(v) => onChange("monthlyBudget", v)}
        />

        {state.industry === "ecommerce" ? (
          <>
            <RoiSliderField
              label="Ticket promedio"
              hint={HINTS.ticketPromedio}
              value={state.ticketPromedio}
              min={200}
              max={50_000}
              step={100}
              onChange={(v) => onChange("ticketPromedio", v)}
            />
            <RoiPercentField
              label="Tasa de conversión"
              hint={HINTS.tasaConversion}
              value={state.tasaConversion}
              min={0.5}
              max={15}
              step={0.5}
              onChange={(v) => onChange("tasaConversion", v)}
            />
          </>
        ) : null}

        {state.industry === "real-estate" ? (
          <>
            <RoiSliderField
              label="Meses de campaña"
              hint={HINTS.mesesCampana}
              value={state.mesesCampana}
              min={1}
              max={24}
              step={1}
              onChange={(v) => onChange("mesesCampana", v)}
              formatValue={(v) => `${Math.round(v)} meses`}
            />
            <RoiSliderField
              label="Valor de propiedad"
              hint={HINTS.valorPropiedad}
              value={state.valorPropiedad}
              min={500_000}
              max={20_000_000}
              step={100_000}
              onChange={(v) => onChange("valorPropiedad", v)}
            />
            <RoiPercentField
              label="Porcentaje de comisión"
              hint={HINTS.porcentajeComision}
              value={state.porcentajeComision}
              min={1}
              max={10}
              step={0.5}
              onChange={(v) => onChange("porcentajeComision", v)}
            />
            <RoiPercentField
              label="Tasa de cierre"
              hint={HINTS.tasaCierre}
              value={state.tasaCierre}
              min={0.1}
              max={10}
              step={0.1}
              onChange={(v) => onChange("tasaCierre", v)}
            />
          </>
        ) : null}

        {state.industry === "saas" ? (
          <>
            <RoiSliderField
              label="Suscripción mensual"
              hint={HINTS.suscripcionMensualUsd}
              value={state.suscripcionMensualUsd}
              min={5}
              max={500}
              step={5}
              onChange={(v) => onChange("suscripcionMensualUsd", v)}
              formatValue={formatUsd}
            />
            <RoiSliderField
              label="Meses de permanencia"
              hint={HINTS.mesesPermanencia}
              value={state.mesesPermanencia}
              min={3}
              max={36}
              step={1}
              onChange={(v) => onChange("mesesPermanencia", v)}
              formatValue={(v) => `${Math.round(v)} meses`}
            />
            <RoiSliderField
              label="Leads para cerrar venta"
              hint={HINTS.leadsParaCierre}
              value={state.leadsParaCierre}
              min={5}
              max={100}
              step={1}
              onChange={(v) => onChange("leadsParaCierre", v)}
              formatValue={(v) => String(Math.round(v))}
            />
          </>
        ) : null}

        {state.industry === "b2b-services" ? (
          <>
            <RoiSliderField
              label="Ticket promedio"
              hint={HINTS.averageLeadValue}
              value={state.averageLeadValue}
              min={2_000}
              max={180_000}
              step={1_000}
              onChange={(v) => onChange("averageLeadValue", v)}
            />
            <RoiSliderField
              label="Leads para cerrar venta"
              hint={HINTS.leadsToCloseSale}
              value={state.leadsToCloseSale}
              min={1}
              max={100}
              step={1}
              onChange={(v) => onChange("leadsToCloseSale", v)}
              formatValue={(v) => String(Math.round(v))}
            />
          </>
        ) : null}
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

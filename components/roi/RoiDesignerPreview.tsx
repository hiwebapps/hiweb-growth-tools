"use client";

import { calculateRoi } from "@/lib/roi/calculator";
import { ROI_INDUSTRIES } from "@/lib/roi/industry";
import { ROI_BUDGET, ROI_TICKET, formatMxn } from "@/lib/roi/currency";
import { createDefaultRoiState } from "@/lib/roi/state";
import { RoiNativeStyles } from "./RoiNativeStyles";

export type RoiDesignerPreviewProps = {
  defaultMonthlyBudget: number;
  minMonthlyBudget: number;
  defaultLeadValue: number;
  defaultLeadsToClose: number;
  resultsButtonLabel: string;
};

/** Vista estática del paso 1 para Webflow Designer. */
export function RoiDesignerPreview({
  defaultMonthlyBudget,
  minMonthlyBudget,
  defaultLeadValue,
  defaultLeadsToClose,
  resultsButtonLabel,
}: RoiDesignerPreviewProps) {
  const state = createDefaultRoiState(
    Math.max(minMonthlyBudget, defaultMonthlyBudget),
    defaultLeadValue,
    defaultLeadsToClose,
  );
  const industryLabel =
    ROI_INDUSTRIES.find((i) => i.id === state.industry)?.label ?? "SaaS";

  const pct = (value: number, min: number, max: number) =>
    `${Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100))}%`;

  return (
    <div className="roi-root roi-root--card">
      <RoiNativeStyles />
      <p className="roi-designer-badge">
        Vista previa en Designer — en el sitio publicado la calculadora es interactiva.
      </p>
      <div className="roi-card">
        <div className="roi-glow-dot" aria-hidden />
        <div className="roi-card-pad">
          <div className="roi-step roi-step-inputs">
            <div className="roi-stack">
              <div className="roi-field">
                <div className="roi-field-head">
                  <span>Industria</span>
                  <span className="roi-field-value">{industryLabel}</span>
                </div>
                <p className="roi-field-hint">
                  Sector de tu negocio; define los benchmarks del cálculo.
                </p>
                <div className="roi-select" aria-hidden>
                  {industryLabel}
                </div>
              </div>
              <div className="roi-field">
                <div className="roi-field-head">
                  <span>Presupuesto mensual</span>
                  <span className="roi-field-value">{formatMxn(state.monthlyBudget)}</span>
                </div>
                <p className="roi-field-hint">
                  Inversión mensual estimada en marketing digital.
                </p>
                <div className="roi-track">
                  <div
                    className="roi-track-fill"
                    style={{
                      width: pct(state.monthlyBudget, minMonthlyBudget, ROI_BUDGET.max),
                    }}
                  />
                </div>
              </div>
              <div className="roi-field">
                <div className="roi-field-head">
                  <span>Ticket promedio</span>
                  <span className="roi-field-value">{formatMxn(state.averageLeadValue)}</span>
                </div>
                <p className="roi-field-hint">
                  Valor económico medio de cada venta que cierras.
                </p>
                <div className="roi-track">
                  <div
                    className="roi-track-fill"
                    style={{ width: pct(state.averageLeadValue, ROI_TICKET.min, ROI_TICKET.max) }}
                  />
                </div>
              </div>
              <div className="roi-field">
                <div className="roi-field-head">
                  <span>Leads para cerrar venta</span>
                  <span className="roi-field-value">{state.leadsToCloseSale}</span>
                </div>
                <p className="roi-field-hint">
                  Cuántos leads necesitas en promedio para lograr una venta.
                </p>
                <div className="roi-track">
                  <div
                    className="roi-track-fill"
                    style={{ width: pct(state.leadsToCloseSale, 1, 100) }}
                  />
                </div>
              </div>
            </div>
            <button type="button" className="roi-btn-primary" disabled>
              {resultsButtonLabel} →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

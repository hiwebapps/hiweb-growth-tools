"use client";

import { ROI_BUDGET } from "@/lib/roi/currency";
import { createDefaultRoiState } from "@/lib/roi/defaults";
import { ROI_INDUSTRIES } from "@/lib/roi/industry";
import { formatMxn } from "@/lib/roi/currency";
import { RoiNativeStyles } from "./RoiNativeStyles";

export type RoiDesignerPreviewProps = {
  defaultMonthlyBudget: number;
  minMonthlyBudget: number;
  cardTitle?: string;
};

export function RoiDesignerPreview({
  defaultMonthlyBudget,
  minMonthlyBudget,
  cardTitle = "Calculadora de ROI",
}: RoiDesignerPreviewProps) {
  const state = createDefaultRoiState(
    { monthlyBudget: Math.max(minMonthlyBudget, defaultMonthlyBudget) },
    "ecommerce",
  );
  const industryLabel =
    ROI_INDUSTRIES.find((i) => i.id === state.industry)?.label ?? "E-commerce";

  const pct = (value: number, min: number, max: number) =>
    `${Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100))}%`;

  return (
    <div className="roi-root roi-root--card">
      <RoiNativeStyles />
      <div className="roi-card">
        <div className="roi-glow-dot" aria-hidden />
        <div className="roi-card-pad">
          <h2 className="roi-card-title">{cardTitle}</h2>
          <div className="roi-step roi-step-inputs">
            <div className="roi-stack">
              <div className="roi-field">
                <div className="roi-field-head">
                  <span>Industria</span>
                  <span className="roi-field-value">{industryLabel}</span>
                </div>
                <div className="roi-select" aria-hidden>
                  {industryLabel}
                </div>
              </div>
              <div className="roi-field">
                <div className="roi-field-head">
                  <span>Presupuesto mensual</span>
                  <span className="roi-field-value">{formatMxn(state.monthlyBudget)}</span>
                </div>
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
                  <span className="roi-field-value">{formatMxn(state.ticketPromedio)}</span>
                </div>
                <div className="roi-track">
                  <div
                    className="roi-track-fill"
                    style={{ width: pct(state.ticketPromedio, 200, 50_000) }}
                  />
                </div>
              </div>
            </div>
            <button type="button" className="roi-btn-primary" disabled>
              Ver resultados →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

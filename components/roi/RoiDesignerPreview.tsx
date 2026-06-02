"use client";

import { calculateRoi } from "@/lib/roi/calculator";
import { ROI_INDUSTRIES } from "@/lib/roi/industry";
import { createDefaultRoiState, formatUsd, stateToRoiInputs } from "@/lib/roi/state";
import { RoiNativeStyles } from "./RoiNativeStyles";
import { RoiProgressRing } from "./RoiProgressRing";

export type RoiDesignerPreviewProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  defaultMonthlyBudget: number;
  defaultLeadValue: number;
  defaultLeadsToClose: number;
  ctaLabel: string;
};

/** Vista estatica para Webflow Designer (sin hooks pesados ni Tailwind). */
export function RoiDesignerPreview({
  eyebrow,
  title,
  description,
  defaultMonthlyBudget,
  defaultLeadValue,
  defaultLeadsToClose,
  ctaLabel,
}: RoiDesignerPreviewProps) {
  const state = createDefaultRoiState(
    defaultMonthlyBudget,
    defaultLeadValue,
    defaultLeadsToClose,
  );
  const result = calculateRoi(stateToRoiInputs(state));
  const industryLabel =
    ROI_INDUSTRIES.find((i) => i.id === state.industry)?.label ?? "SaaS";
  const roiDisplay = Math.round(result.estimatedRoi);
  const roiPositive = roiDisplay >= 0;

  const pct = (value: number, min: number, max: number) =>
    `${Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100))}%`;

  return (
    <div className="roi-stitch roi-bg-page roi-page">
      <RoiNativeStyles />
      <div className="roi-ambient roi-ambient-cyan" aria-hidden />
      <div className="roi-ambient roi-ambient-violet" aria-hidden />
      <div className="roi-wrap">
        <p className="roi-designer-badge">
          Vista previa en Designer — en el sitio publicado la calculadora es interactiva.
        </p>
        {eyebrow ? <p className="roi-eyebrow">{eyebrow}</p> : null}
        <header className="roi-hero">
          <div className="roi-hero-glow" aria-hidden />
          <h2 className="roi-hero-title">{title}</h2>
          {description ? <p className="roi-hero-desc">{description}</p> : null}
        </header>
        <div className="roi-card">
          <div className="roi-glow-dot" aria-hidden />
          <div className="roi-card-pad">
            <div className="roi-grid">
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
                    <span className="roi-field-value">{formatUsd(state.monthlyBudget)}</span>
                  </div>
                  <div className="roi-track">
                    <div
                      className="roi-track-fill"
                      style={{ width: pct(state.monthlyBudget, 1000, 50000) }}
                    />
                  </div>
                </div>
                <div className="roi-field">
                  <div className="roi-field-head">
                    <span>Ticket promedio</span>
                    <span className="roi-field-value">{formatUsd(state.averageLeadValue)}</span>
                  </div>
                  <div className="roi-track">
                    <div
                      className="roi-track-fill"
                      style={{ width: pct(state.averageLeadValue, 100, 10000) }}
                    />
                  </div>
                </div>
                <div className="roi-field">
                  <div className="roi-field-head">
                    <span>Leads para cerrar venta</span>
                    <span className="roi-field-value">{state.leadsToCloseSale}</span>
                  </div>
                  <div className="roi-track">
                    <div
                      className="roi-track-fill"
                      style={{ width: pct(state.leadsToCloseSale, 1, 100) }}
                    />
                  </div>
                </div>
              </div>
              <div className="roi-panel">
                <div className="roi-panel-glow" aria-hidden />
                <div className="roi-panel-body">
                  <RoiProgressRing roi={result.estimatedRoi}>
                    <p className="roi-ring-kicker">ROI estimado</p>
                    <p className="roi-ring-value">
                      {roiPositive ? "" : "-"}
                      {Math.abs(roiDisplay)}
                      <span className={`roi-ring-pct ${roiPositive ? "roi-text-gold" : "roi-text-cyan"}`}>
                        %
                      </span>
                    </p>
                  </RoiProgressRing>
                  <div className="roi-metrics">
                    <div className="roi-metric">
                      <span className="roi-metric-kicker">Leads estimados</span>
                      <span className="roi-metric-val">
                        {Math.round(result.estimatedLeads).toLocaleString("es-MX")}
                      </span>
                    </div>
                    <div className="roi-metric">
                      <span className="roi-metric-kicker">Ingresos estimados</span>
                      <span className="roi-metric-val roi-text-cyan">
                        {formatUsd(result.estimatedRevenue)}
                      </span>
                    </div>
                  </div>
                  <button type="button" className="roi-btn-cta" disabled>
                    {ctaLabel} &gt;
                  </button>
                  <p className="roi-footnote">
                    {result.resultLevelLabel} · {result.resultSummary}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

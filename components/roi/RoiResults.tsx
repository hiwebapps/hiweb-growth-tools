"use client";

import { formatMxn } from "@/lib/roi/currency";
import type { RoiCalculationResult } from "@/lib/roi/types";
import { RoiProgressRing } from "./RoiProgressRing";

type RoiResultsProps = {
  result: RoiCalculationResult;
  ctaLabel: string;
  retryLabel: string;
  disclaimer: string;
  onCtaClick: () => void;
  onRetry: () => void;
  isLoading?: boolean;
};

function formatCount(value: number): string {
  const rounded =
    Math.abs(value - Math.round(value)) < 0.01
      ? Math.round(value)
      : Math.round(value * 10) / 10;
  return rounded.toLocaleString("es-MX");
}

export function RoiResults({
  result,
  ctaLabel,
  retryLabel,
  disclaimer,
  onCtaClick,
  onRetry,
  isLoading,
}: RoiResultsProps) {
  const roiDisplay = Math.round(result.estimatedRoi);
  const roiPositive = roiDisplay >= 0;

  const metrics = [
    {
      label: "CPL estimado",
      value: formatMxn(result.costPerLead),
      accent: false,
    },
    {
      label: "Leads totales",
      value: formatCount(result.estimatedLeads),
      accent: false,
    },
    {
      label: "Ventas estimadas",
      value: formatCount(result.estimatedSales),
      accent: false,
    },
    {
      label: "Ingresos estimados",
      value: formatMxn(result.estimatedRevenue),
      accent: true,
    },
  ];

  return (
    <div className="roi-step roi-step-results">
      <div className="roi-panel">
        <div className="roi-panel-glow" aria-hidden />
        <div className="roi-panel-body">
          <RoiProgressRing roi={result.estimatedRoi}>
            <p className="roi-ring-kicker">ROI estimado</p>
            <p className="roi-ring-value">
              {roiPositive ? "" : "-"}
              {Math.abs(roiDisplay)}
              <span
                className={`roi-ring-pct ${roiPositive ? "roi-text-gold" : "roi-text-cyan"}`}
              >
                %
              </span>
            </p>
          </RoiProgressRing>

          <div className="roi-metrics roi-metrics-4">
            {metrics.map((metric) => (
              <div key={metric.label} className="roi-metric">
                <span className="roi-metric-kicker">{metric.label}</span>
                <span
                  className={`roi-metric-val${metric.accent ? " roi-text-cyan" : ""}`}
                >
                  {metric.value}
                </span>
              </div>
            ))}
          </div>

          <p className="roi-disclaimer">{disclaimer}</p>
        </div>
      </div>

      <div className="roi-step-actions">
        <button
          type="button"
          className="roi-btn-secondary"
          disabled={isLoading}
          onClick={onRetry}
        >
          {retryLabel}
        </button>
        <button
          type="button"
          className="roi-btn-cta"
          disabled={isLoading}
          onClick={onCtaClick}
        >
          <span>{ctaLabel}</span>
          <span aria-hidden> →</span>
        </button>
      </div>
    </div>
  );
}

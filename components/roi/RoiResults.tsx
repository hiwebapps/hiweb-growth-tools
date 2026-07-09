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
                {formatMxn(result.estimatedRevenue)}
              </span>
            </div>
          </div>

          <p className="roi-footnote">
            {result.resultLevelLabel} · {result.resultSummary}
          </p>

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

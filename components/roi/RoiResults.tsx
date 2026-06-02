"use client";

import { formatUsd } from "@/lib/roi/state";
import type { RoiCalculationResult } from "@/lib/roi/types";
import { RoiProgressRing } from "./RoiProgressRing";

type RoiResultsProps = {
  result: RoiCalculationResult;
  ctaLabel: string;
  onCtaClick: () => void;
  isLoading?: boolean;
};

export function RoiResults({
  result,
  ctaLabel,
  onCtaClick,
  isLoading,
}: RoiResultsProps) {
  const roiDisplay = Math.round(result.estimatedRoi);
  const roiPositive = roiDisplay >= 0;

  return (
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

        <button
          type="button"
          disabled={isLoading}
          onClick={onCtaClick}
          className="roi-btn-cta"
        >
          <span>{ctaLabel}</span>
          <span aria-hidden> &gt;</span>
        </button>

        <p className="roi-footnote">
          {result.resultLevelLabel} · {result.resultSummary}
        </p>
      </div>
    </div>
  );
}

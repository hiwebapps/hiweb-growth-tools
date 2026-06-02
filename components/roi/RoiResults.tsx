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
    <div className="roi-panel relative flex flex-col items-center justify-center overflow-hidden rounded-xl p-6 sm:p-8">
      <div className="roi-panel-glow absolute inset-0 -z-10" aria-hidden />

      <div className="flex w-full flex-col items-center gap-10">
        <RoiProgressRing roi={result.estimatedRoi}>
          <span className="roi-text-muted mb-2 text-xs font-medium tracking-widest uppercase">
            ROI estimado
          </span>
          <span className="text-5xl leading-none font-bold text-white">
            {roiPositive ? "" : "-"}
            {Math.abs(roiDisplay)}
            <span
              className={
                roiPositive ? "roi-text-gold text-3xl" : "roi-text-cyan text-3xl"
              }
            >
              %
            </span>
          </span>
        </RoiProgressRing>

        <div className="grid w-full grid-cols-2 gap-6 text-center sm:gap-8">
          <div className="roi-border flex flex-col border-r pr-4 sm:pr-6">
            <span className="roi-text-muted mb-2 text-xs font-medium tracking-widest uppercase">
              Leads estimados
            </span>
            <span className="text-2xl font-bold text-white sm:text-3xl">
              {Math.round(result.estimatedLeads).toLocaleString("es-MX")}
            </span>
          </div>
          <div className="flex flex-col pl-4 sm:pl-6">
            <span className="roi-text-muted mb-2 text-xs font-medium tracking-widest uppercase">
              Ingresos estimados
            </span>
            <span className="roi-text-cyan text-2xl font-bold sm:text-3xl">
              {formatUsd(result.estimatedRevenue)}
            </span>
          </div>
        </div>

        <button
          type="button"
          disabled={isLoading}
          onClick={onCtaClick}
          className="roi-btn-cta mt-2 flex h-[54px] w-full items-center justify-center gap-2 rounded-full px-8 py-4 text-base font-semibold transition-transform active:scale-95 disabled:opacity-60"
        >
          <span>{ctaLabel}</span>
          <span aria-hidden>{">"}</span>
        </button>

        <p className="roi-text-muted text-center text-xs">
          {result.resultLevelLabel} · {result.resultSummary}
        </p>
      </div>
    </div>
  );
}

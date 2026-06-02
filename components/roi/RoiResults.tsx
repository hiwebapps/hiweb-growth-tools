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
    <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-xl border border-[var(--roi-border)] bg-[var(--roi-surface-lowest)] p-6 sm:p-8">
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-br from-[var(--roi-violet)]/5 to-[var(--roi-cyan)]/5"
        aria-hidden
      />

      <div className="flex w-full flex-col items-center gap-10">
        <RoiProgressRing roi={result.estimatedRoi}>
          <span className="mb-2 text-xs font-medium tracking-widest text-[var(--roi-muted)] uppercase">
            ROI estimado
          </span>
          <span className="text-5xl leading-none font-bold text-white">
            {roiPositive ? "" : "−"}
            {Math.abs(roiDisplay)}
            <span
              className={
                roiPositive
                  ? "text-3xl text-[var(--roi-gold)]"
                  : "text-3xl text-[var(--roi-cyan)]"
              }
            >
              %
            </span>
          </span>
        </RoiProgressRing>

        <div className="grid w-full grid-cols-2 gap-6 text-center sm:gap-8">
          <div className="flex flex-col border-r border-[var(--roi-border)] pr-4 sm:pr-6">
            <span className="mb-2 text-xs font-medium tracking-widest text-[var(--roi-muted)] uppercase">
              Leads estimados
            </span>
            <span className="text-2xl font-bold text-white sm:text-3xl">
              {Math.round(result.estimatedLeads).toLocaleString("es-MX")}
            </span>
          </div>
          <div className="flex flex-col pl-4 sm:pl-6">
            <span className="mb-2 text-xs font-medium tracking-widest text-[var(--roi-muted)] uppercase">
              Ingresos estimados
            </span>
            <span className="text-2xl font-bold text-[var(--roi-cyan)] sm:text-3xl">
              {formatUsd(result.estimatedRevenue)}
            </span>
          </div>
        </div>

        <button
          type="button"
          disabled={isLoading}
          onClick={onCtaClick}
          className="mt-2 flex h-[54px] w-full items-center justify-center gap-2 rounded-full bg-[var(--roi-secondary)] px-8 py-4 text-base font-semibold text-[#0e0e11] transition-transform hover:bg-white active:scale-95 disabled:opacity-60"
        >
          <span>{ctaLabel}</span>
          <span aria-hidden>→</span>
        </button>

        <p className="text-center text-xs text-[var(--roi-muted)]">
          {result.resultLevelLabel} · {result.resultSummary}
        </p>
      </div>
    </div>
  );
}

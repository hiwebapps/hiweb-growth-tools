"use client";

import { useCallback, useMemo, useState } from "react";
import { calculateRoi } from "@/lib/roi/calculator";
import { ROI_BUDGET } from "@/lib/roi/currency";
import { createDefaultRoiState, stateToRoiInputs } from "@/lib/roi/state";
import type { RoiCalculatorState } from "@/lib/roi/types";
import { RoiHero } from "./RoiHero";
import { RoiInputForm } from "./RoiInputForm";
import { RoiNativeStyles } from "./RoiNativeStyles";
import { RoiResults } from "./RoiResults";

export type RoiCalculatorLayout = "page" | "card";
export type RoiCalculatorStep = "inputs" | "results";

const DEFAULT_DISCLAIMER =
  "Esta calculadora ofrece estimaciones orientativas. Los resultados reales pueden variar según tu mercado, canal y ejecución.";

export type RoiCalculatorProps = {
  /** `card` = solo el panel (Webflow). `page` = hero + card (ruta /calculadora-roi). */
  layout?: RoiCalculatorLayout;
  title?: string;
  description?: string;
  defaultMonthlyBudget: number;
  minMonthlyBudget?: number;
  defaultLeadValue: number;
  defaultLeadsToClose?: number;
  resultsButtonLabel?: string;
  retryButtonLabel?: string;
  ctaLabel: string;
  ctaUrl: string;
  disclaimer?: string;
  onError?: (message: string) => void;
};

function clampBudget(value: number, min: number): number {
  return Math.max(min, Math.min(ROI_BUDGET.max, value));
}

function navigateToUrl(url: string) {
  if (typeof window === "undefined" || !url) {
    return;
  }
  window.location.href = url;
}

export function RoiCalculator({
  layout = "page",
  title,
  description,
  defaultMonthlyBudget,
  minMonthlyBudget = ROI_BUDGET.min,
  defaultLeadValue,
  defaultLeadsToClose = 15,
  resultsButtonLabel = "Ver resultados",
  retryButtonLabel = "Volver a intentar",
  ctaLabel,
  ctaUrl,
  disclaimer = DEFAULT_DISCLAIMER,
  onError,
}: RoiCalculatorProps) {
  const [step, setStep] = useState<RoiCalculatorStep>("inputs");
  const [state, setState] = useState<RoiCalculatorState>(() => {
    const initial = createDefaultRoiState(
      defaultMonthlyBudget,
      defaultLeadValue,
      defaultLeadsToClose,
    );
    return {
      ...initial,
      monthlyBudget: clampBudget(initial.monthlyBudget, minMonthlyBudget),
    };
  });
  const [error, setError] = useState<string | null>(null);

  const result = useMemo(
    () => calculateRoi(stateToRoiInputs(state)),
    [state],
  );

  const handleStateChange = <K extends keyof RoiCalculatorState>(
    key: K,
    value: RoiCalculatorState[K],
  ) => {
    setState((prev) => {
      const next = { ...prev, [key]: value };
      if (key === "monthlyBudget") {
        next.monthlyBudget = clampBudget(value as number, minMonthlyBudget);
      }
      return next;
    });
    setError(null);
  };

  const handleShowResults = useCallback(() => {
    setStep("results");
    setError(null);
  }, []);

  const handleRetry = useCallback(() => {
    setStep("inputs");
    setError(null);
  }, []);

  const handleCtaClick = useCallback(() => {
    if (!ctaUrl) {
      const message = "No hay URL configurada para el CTA.";
      setError(message);
      onError?.(message);
      return;
    }
    navigateToUrl(ctaUrl);
  }, [ctaUrl, onError]);

  const rootClass =
    layout === "card" ? "roi-root roi-root--card" : "roi-root roi-root--page";

  return (
    <div className={rootClass}>
      <RoiNativeStyles />
      {layout === "page" ? (
        <>
          <div className="roi-ambient roi-ambient-cyan" aria-hidden />
          <div className="roi-ambient roi-ambient-violet" aria-hidden />
          {title ? (
            <RoiHero title={title} description={description} />
          ) : null}
        </>
      ) : null}
      <div className="roi-card">
        <div className="roi-glow-dot" aria-hidden />
        <div className="roi-card-pad">
          {step === "inputs" ? (
            <RoiInputForm
              state={state}
              minMonthlyBudget={minMonthlyBudget}
              onChange={handleStateChange}
              error={error ?? undefined}
              resultsButtonLabel={resultsButtonLabel}
              onShowResults={handleShowResults}
            />
          ) : (
            <RoiResults
              result={result}
              ctaLabel={ctaLabel}
              retryLabel={retryButtonLabel}
              disclaimer={disclaimer}
              onCtaClick={handleCtaClick}
              onRetry={handleRetry}
            />
          )}
        </div>
      </div>
    </div>
  );
}

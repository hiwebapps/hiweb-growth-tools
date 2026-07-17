"use client";

import { lazy, Suspense, useCallback, useMemo, useState } from "react";
import { calculateRoi } from "@/lib/roi/calculator";
import { ROI_BUDGET } from "@/lib/roi/currency";
import {
  createDefaultRoiState,
  DEFAULT_BENCHMARKS,
  type RoiDefaultInputs,
} from "@/lib/roi/defaults";
import type { RoiBenchmarks, RoiCalculatorState } from "@/lib/roi/types";
import { RoiHero } from "./RoiHero";
import { RoiInputForm } from "./RoiInputForm";
import { RoiNativeStyles } from "./RoiNativeStyles";
import { RoiResults } from "./RoiResults";

const CalendarBookingModalLazy = lazy(() =>
  import("@/components/calendar/CalendarBookingModal").then((m) => ({
    default: m.CalendarBookingModal,
  })),
);

export type RoiCalculatorLayout = "page" | "card";
export type RoiCalculatorStep = "inputs" | "results";

const DEFAULT_DISCLAIMER =
  "Esta calculadora ofrece estimaciones orientativas. Los resultados reales pueden variar según tu mercado, canal y ejecución.";

export type RoiCalculatorProps = {
  layout?: RoiCalculatorLayout;
  title?: string;
  cardTitle?: string;
  description?: string;
  minMonthlyBudget?: number;
  benchmarks?: Partial<RoiBenchmarks>;
  defaultInputs?: Partial<RoiDefaultInputs>;
  resultsButtonLabel?: string;
  retryButtonLabel?: string;
  ctaLabel: string;
  /** Redirección opcional tras confirmar cita en el popup del calendario. */
  ctaUrl?: string;
  calendarService?: string;
  calendarModalTitle?: string;
  calendarSubmitLabel?: string;
  calendarSuccessTitle?: string;
  calendarSuccessMessage?: string;
  disclaimer?: string;
  onError?: (message: string) => void;
};

function clampBudget(value: number, min: number): number {
  return Math.max(min, Math.min(ROI_BUDGET.max, value));
}

export function RoiCalculator({
  layout = "page",
  title,
  cardTitle = "Calculadora de ROI",
  description,
  minMonthlyBudget = ROI_BUDGET.min,
  benchmarks: benchmarkOverrides,
  defaultInputs,
  resultsButtonLabel = "Ver resultados",
  retryButtonLabel = "Volver a intentar",
  ctaLabel,
  ctaUrl,
  calendarService = "seo-audit",
  calendarModalTitle,
  calendarSubmitLabel = "Confirmar cita",
  calendarSuccessTitle = "Cita confirmada",
  calendarSuccessMessage =
    "Hemos registrado tu solicitud. Recibirás un correo con los detalles.",
  disclaimer = DEFAULT_DISCLAIMER,
  onError,
}: RoiCalculatorProps) {
  const benchmarks = useMemo(
    (): RoiBenchmarks => ({
      ...DEFAULT_BENCHMARKS,
      ...benchmarkOverrides,
    }),
    [benchmarkOverrides],
  );

  const [step, setStep] = useState<RoiCalculatorStep>("inputs");
  const [state, setState] = useState<RoiCalculatorState>(() => {
    const initial = createDefaultRoiState(defaultInputs);
    return {
      ...initial,
      monthlyBudget: clampBudget(initial.monthlyBudget, minMonthlyBudget),
    };
  });
  const [error, setError] = useState<string | null>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  const result = useMemo(
    () => calculateRoi(state, benchmarks),
    [state, benchmarks],
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
    setBookingModalOpen(true);
    setError(null);
  }, []);

  const handleCloseBookingModal = useCallback(() => {
    setBookingModalOpen(false);
  }, []);

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
          {layout === "card" && cardTitle ? (
            <h2 className="roi-card-title">{cardTitle}</h2>
          ) : null}
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

      {bookingModalOpen ? (
        <Suspense fallback={null}>
          <CalendarBookingModalLazy
            open={bookingModalOpen}
            onClose={handleCloseBookingModal}
            defaultService={calendarService}
            title={calendarModalTitle ?? ctaLabel}
            submitLabel={calendarSubmitLabel}
            successTitle={calendarSuccessTitle}
            successMessage={calendarSuccessMessage}
            successRedirectUrl={ctaUrl}
          />
        </Suspense>
      ) : null}
    </div>
  );
}

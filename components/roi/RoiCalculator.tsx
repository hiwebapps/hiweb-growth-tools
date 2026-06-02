"use client";

import { useCallback, useMemo, useState } from "react";
import { calculateRoi } from "@/lib/roi/calculator";
import { submitRoiApi } from "@/lib/roi/client";
import { createDefaultRoiState, stateToRoiInputs } from "@/lib/roi/state";
import type {
  RoiCalculationResult,
  RoiCalculatorState,
  RoiLeadInput,
} from "@/lib/roi/types";
import { RoiHero } from "./RoiHero";
import { RoiStitchStyles } from "./RoiStitchStyles";
import { RoiInputForm } from "./RoiInputForm";
import { RoiLeadPanel } from "./RoiLeadPanel";
import { RoiResults } from "./RoiResults";

export type RoiCalculatorProps = {
  title: string;
  description?: string;
  defaultMonthlyBudget: number;
  defaultLeadValue: number;
  defaultLeadsToClose?: number;
  ctaLabel: string;
  ctaUrl: string;
  onLoading?: (loading: boolean) => void;
  onError?: (message: string) => void;
  onSubmitted?: () => void;
};

export function RoiCalculator({
  title,
  description,
  defaultMonthlyBudget,
  defaultLeadValue,
  defaultLeadsToClose = 15,
  ctaLabel,
  ctaUrl,
  onLoading,
  onError,
  onSubmitted,
}: RoiCalculatorProps) {
  const [state, setState] = useState<RoiCalculatorState>(() =>
    createDefaultRoiState(
      defaultMonthlyBudget,
      defaultLeadValue,
      defaultLeadsToClose,
    ),
  );
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lead, setLead] = useState({ name: "", email: "", company: "", phone: "" });
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const previewResult = useMemo<RoiCalculationResult>(() => {
    return calculateRoi(stateToRoiInputs(state));
  }, [state]);

  const handleStateChange = <K extends keyof RoiCalculatorState>(
    key: K,
    value: RoiCalculatorState[K],
  ) => {
    setState((prev) => ({ ...prev, [key]: value }));
    setError(null);
    setSuccessMessage(null);
  };

  const handleCtaClick = useCallback(() => {
    if (ctaUrl && !showLeadForm) {
      setShowLeadForm(true);
      return;
    }
    if (ctaUrl.startsWith("http")) {
      window.open(ctaUrl, "_blank", "noopener,noreferrer");
    } else {
      window.location.href = ctaUrl;
    }
  }, [ctaUrl, showLeadForm]);

  const handleSubmitLead = useCallback(async () => {
    if (!lead.name.trim() || !lead.email.trim()) {
      setError("Nombre y email son obligatorios para enviar el escenario.");
      return;
    }

    onLoading?.(true);
    setIsSubmitting(true);
    setError(null);

    try {
      await submitRoiApi({
        inputs: stateToRoiInputs(state),
        lead: {
          name: lead.name,
          email: lead.email,
          company: lead.company || undefined,
          phone: lead.phone || undefined,
        },
      });
      setSuccessMessage(
        "Escenario guardado. Un asesor puede contactarte con una propuesta personalizada.",
      );
      setShowLeadForm(false);
      onLoading?.(false);
      onSubmitted?.();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "No pudimos guardar el escenario.";
      setError(message);
      onError?.(message);
      onLoading?.(false);
    } finally {
      setIsSubmitting(false);
    }
  }, [state, lead, onLoading, onError, onSubmitted]);

  const handleLeadChange = (field: keyof RoiLeadInput, value: string) => {
    setLead((prev) => ({ ...prev, [field]: value }));
    setError(null);
  };

  return (
    <div className="roi-stitch relative w-full">
      <RoiStitchStyles />
      <div className="roi-ambient roi-ambient-cyan" aria-hidden />
      <div className="roi-ambient roi-ambient-violet" aria-hidden />

      <RoiHero title={title} description={description} />

      <div className="roi-card relative w-full overflow-hidden rounded-2xl p-5 sm:p-8 lg:p-10">
        <div
          className="roi-glow-dot pointer-events-none absolute top-0 right-0 h-64 w-64 rounded-full blur-[80px]"
          aria-hidden
        />

        <div className="relative z-10 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          <RoiInputForm
            state={state}
            onChange={handleStateChange}
            error={error ?? undefined}
          />
          <RoiResults
            result={previewResult}
            ctaLabel={ctaLabel}
            onCtaClick={handleCtaClick}
            isLoading={isSubmitting}
          />
        </div>

        {successMessage ? (
          <p className="hw-border-success-soft hw-bg-success-soft relative z-10 mt-6 rounded-lg border px-4 py-3 text-sm text-emerald-200">
            {successMessage}
          </p>
        ) : null}

        {showLeadForm ? (
          <RoiLeadPanel
            lead={lead}
            onChange={handleLeadChange}
            onSubmit={() => void handleSubmitLead()}
            onClose={() => setShowLeadForm(false)}
            isLoading={isSubmitting}
          />
        ) : null}
      </div>
    </div>
  );
}

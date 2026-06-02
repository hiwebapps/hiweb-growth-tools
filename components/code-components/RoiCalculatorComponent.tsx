"use client";

import { useState } from "react";
import { RoiCalculator } from "@/components/roi";
import { Alert, Spinner } from "@/components/shared";
import type { CodeComponentBaseProps } from "@/lib/shared/code-component";
import { mergeProps } from "@/lib/shared/code-component";
import { cn } from "@/lib/shared/utils";

export type RoiCalculatorComponentProps = CodeComponentBaseProps & {
  defaultMonthlyBudget?: number;
  defaultLeadValue?: number;
  defaultLeadsToClose?: number;
  ctaLabel?: string;
  ctaUrl?: string;
};

const DEFAULTS: RoiCalculatorComponentProps = {
  eyebrow: "ROI",
  title: "Maximiza tu Retorno",
  description:
    "Calcula el impacto real de tu inversión en marketing digital con nuestra herramienta de precisión.",
  themeVariant: "dark",
  defaultMonthlyBudget: 5000,
  defaultLeadValue: 1200,
  defaultLeadsToClose: 15,
  ctaLabel: "Obtener auditoría gratuita",
  ctaUrl: "/calendario",
};

export function RoiCalculatorComponent(
  rawProps: RoiCalculatorComponentProps = {},
) {
  const props = mergeProps(DEFAULTS, rawProps);
  const {
    previewState,
    className,
    title,
    description,
    defaultMonthlyBudget,
    defaultLeadValue,
    defaultLeadsToClose,
    ctaLabel,
    ctaUrl,
  } = props;

  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  if (previewState === "loading") {
    return (
      <div className={cn("roi-stitch flex justify-center py-24", className)}>
        <Spinner size="lg" />
      </div>
    );
  }

  if (previewState === "error") {
    return (
      <div className={cn("roi-stitch p-6", className)}>
        <Alert variant="error" title="Error">
          No pudimos calcular el ROI.
        </Alert>
      </div>
    );
  }

  if (previewState === "success") {
    return (
      <div className={cn("roi-stitch p-6", className)}>
        <Alert variant="success" title="Listo">
          Escenario guardado correctamente.
        </Alert>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "roi-stitch relative w-full bg-[#0e0e11] py-8 sm:py-12",
        className,
      )}
    >
      {props.eyebrow ? (
        <p className="mb-4 text-center text-sm font-medium tracking-wide text-[var(--roi-cyan)] uppercase">
          {props.eyebrow}
        </p>
      ) : null}

      {isLoading ? (
        <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center bg-black/40">
          <Spinner size="lg" />
        </div>
      ) : null}

      {errorMessage ? (
        <div className="relative z-20 mx-auto mb-4 max-w-3xl px-4">
          <Alert variant="error" title="Error">
            {errorMessage}
          </Alert>
        </div>
      ) : null}

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6">
        <RoiCalculator
          title={title ?? DEFAULTS.title!}
          description={description}
          defaultMonthlyBudget={defaultMonthlyBudget ?? DEFAULTS.defaultMonthlyBudget!}
          defaultLeadValue={defaultLeadValue ?? DEFAULTS.defaultLeadValue!}
          defaultLeadsToClose={defaultLeadsToClose ?? DEFAULTS.defaultLeadsToClose}
          ctaLabel={ctaLabel ?? DEFAULTS.ctaLabel!}
          ctaUrl={ctaUrl ?? DEFAULTS.ctaUrl!}
          onLoading={setIsLoading}
          onError={(msg) => {
            setErrorMessage(msg);
            setIsLoading(false);
          }}
          onSubmitted={() => {
            setIsLoading(false);
            setErrorMessage(undefined);
          }}
        />
      </div>
    </div>
  );
}

export default RoiCalculatorComponent;

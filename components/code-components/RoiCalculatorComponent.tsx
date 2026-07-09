"use client";

import { lazy, Suspense, useState } from "react";
import { RoiDesignerPreview } from "@/components/roi/RoiDesignerPreview";
import { RoiErrorBoundary } from "@/components/roi/RoiErrorBoundary";
import { RoiNativeStyles } from "@/components/roi/RoiNativeStyles";
import { ROI_BUDGET, ROI_TICKET } from "@/lib/roi/currency";
import type { CodeComponentBaseProps } from "@/lib/shared/code-component";
import { mergeProps } from "@/lib/shared/code-component";
import { isWebflowDesignerCanvas } from "@/lib/shared/is-webflow-designer";

const RoiCalculatorLazy = lazy(() =>
  import("@/components/roi/RoiCalculator").then((m) => ({
    default: m.RoiCalculator,
  })),
);

export type RoiCalculatorComponentProps = CodeComponentBaseProps & {
  defaultMonthlyBudget?: number;
  minMonthlyBudget?: number;
  defaultLeadValue?: number;
  defaultLeadsToClose?: number;
  resultsButtonLabel?: string;
  retryButtonLabel?: string;
  ctaLabel?: string;
  ctaUrl?: string;
};

const DEFAULTS: RoiCalculatorComponentProps = {
  defaultMonthlyBudget: ROI_BUDGET.default,
  minMonthlyBudget: ROI_BUDGET.min,
  defaultLeadValue: ROI_TICKET.default,
  defaultLeadsToClose: 15,
  resultsButtonLabel: "Ver resultados",
  retryButtonLabel: "Volver a intentar",
  ctaLabel: "Agenda tu auditoría gratuita",
  ctaUrl: "/tools/calendario",
};

export function RoiCalculatorComponent(
  rawProps: RoiCalculatorComponentProps = {},
) {
  const props = mergeProps(DEFAULTS, rawProps);
  const {
    previewState,
    className,
    defaultMonthlyBudget,
    minMonthlyBudget,
    defaultLeadValue,
    defaultLeadsToClose,
    resultsButtonLabel,
    retryButtonLabel,
    ctaLabel,
    ctaUrl,
  } = props;

  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const minBudget = minMonthlyBudget ?? DEFAULTS.minMonthlyBudget!;
  const calculatorProps = {
    defaultMonthlyBudget: defaultMonthlyBudget ?? DEFAULTS.defaultMonthlyBudget!,
    minMonthlyBudget: minBudget,
    defaultLeadValue: defaultLeadValue ?? DEFAULTS.defaultLeadValue!,
    defaultLeadsToClose: defaultLeadsToClose ?? DEFAULTS.defaultLeadsToClose!,
    resultsButtonLabel: resultsButtonLabel ?? DEFAULTS.resultsButtonLabel!,
    retryButtonLabel: retryButtonLabel ?? DEFAULTS.retryButtonLabel!,
    ctaLabel: ctaLabel ?? DEFAULTS.ctaLabel!,
    ctaUrl: ctaUrl ?? DEFAULTS.ctaUrl!,
  };

  const previewProps = {
    ...calculatorProps,
    resultsButtonLabel: calculatorProps.resultsButtonLabel,
  };

  const shellClass = `roi-stitch ${className ?? ""}`.trim();

  if (previewState === "loading") {
    return (
      <div className={shellClass}>
        <RoiNativeStyles />
        <p className="roi-text-muted" style={{ textAlign: "center", padding: "2rem" }}>
          Cargando…
        </p>
      </div>
    );
  }

  if (previewState === "error") {
    return (
      <div className={shellClass}>
        <RoiNativeStyles />
        <p className="roi-error" style={{ textAlign: "center", padding: "2rem" }}>
          No pudimos calcular el ROI.
        </p>
      </div>
    );
  }

  if (previewState === "success") {
    return (
      <div className={shellClass}>
        <RoiNativeStyles />
        <p className="roi-success" style={{ textAlign: "center", padding: "2rem" }}>
          Escenario calculado correctamente.
        </p>
      </div>
    );
  }

  if (isWebflowDesignerCanvas()) {
    return (
      <div className={shellClass}>
        <RoiDesignerPreview {...previewProps} />
      </div>
    );
  }

  return (
    <div className={shellClass}>
      {errorMessage ? (
        <p className="roi-error" style={{ marginBottom: "1rem" }}>
          {errorMessage}
        </p>
      ) : null}
      <RoiErrorBoundary {...previewProps}>
        <Suspense fallback={<RoiDesignerPreview {...previewProps} />}>
          <RoiCalculatorLazy
            layout="card"
            {...calculatorProps}
            onError={(msg) => setErrorMessage(msg)}
          />
        </Suspense>
      </RoiErrorBoundary>
    </div>
  );
}

export default RoiCalculatorComponent;

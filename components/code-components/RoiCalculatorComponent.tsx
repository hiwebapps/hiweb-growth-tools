"use client";

import { lazy, Suspense, useState } from "react";
import { RoiDesignerPreview } from "@/components/roi/RoiDesignerPreview";
import { RoiErrorBoundary } from "@/components/roi/RoiErrorBoundary";
import { RoiNativeStyles } from "@/components/roi/RoiNativeStyles";
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
  defaultLeadValue?: number;
  defaultLeadsToClose?: number;
  ctaLabel?: string;
  ctaUrl?: string;
};

const DEFAULTS: RoiCalculatorComponentProps = {
  defaultMonthlyBudget: 5000,
  defaultLeadValue: 1200,
  defaultLeadsToClose: 15,
  ctaLabel: "Obtener auditoría gratuita",
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
    defaultLeadValue,
    defaultLeadsToClose,
    ctaLabel,
    ctaUrl,
  } = props;

  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const calculatorProps = {
    defaultMonthlyBudget: defaultMonthlyBudget ?? DEFAULTS.defaultMonthlyBudget!,
    defaultLeadValue: defaultLeadValue ?? DEFAULTS.defaultLeadValue!,
    defaultLeadsToClose: defaultLeadsToClose ?? DEFAULTS.defaultLeadsToClose!,
    ctaLabel: ctaLabel ?? DEFAULTS.ctaLabel!,
    ctaUrl: ctaUrl ?? DEFAULTS.ctaUrl!,
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
          Escenario guardado correctamente.
        </p>
      </div>
    );
  }

  if (isWebflowDesignerCanvas()) {
    return (
      <div className={shellClass}>
        <RoiDesignerPreview {...calculatorProps} />
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
      <RoiErrorBoundary {...calculatorProps}>
        <Suspense fallback={<RoiDesignerPreview {...calculatorProps} />}>
          <RoiCalculatorLazy
            layout="card"
            {...calculatorProps}
            onError={(msg) => setErrorMessage(msg)}
            onSubmitted={() => setErrorMessage(undefined)}
          />
        </Suspense>
      </RoiErrorBoundary>
    </div>
  );
}

export default RoiCalculatorComponent;

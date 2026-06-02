"use client";

import { useState } from "react";
import { RoiCalculator } from "@/components/roi";
import { RoiDesignerPreview } from "@/components/roi/RoiDesignerPreview";
import { RoiErrorBoundary } from "@/components/roi/RoiErrorBoundary";
import { RoiNativeStyles } from "@/components/roi/RoiNativeStyles";
import type { CodeComponentBaseProps } from "@/lib/shared/code-component";
import { mergeProps } from "@/lib/shared/code-component";
import { isWebflowDesignerCanvas } from "@/lib/shared/is-webflow-designer";

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
  ctaUrl: "/tools/calendario",
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

  const previewProps = {
    eyebrow: props.eyebrow,
    title: title ?? DEFAULTS.title!,
    description,
    defaultMonthlyBudget: defaultMonthlyBudget ?? DEFAULTS.defaultMonthlyBudget!,
    defaultLeadValue: defaultLeadValue ?? DEFAULTS.defaultLeadValue!,
    defaultLeadsToClose: defaultLeadsToClose ?? DEFAULTS.defaultLeadsToClose!,
    ctaLabel: ctaLabel ?? DEFAULTS.ctaLabel!,
  };

  if (previewState === "loading") {
    return (
      <div className={`roi-stitch roi-bg-page roi-page ${className ?? ""}`}>
        <RoiNativeStyles />
        <p className="roi-text-muted" style={{ textAlign: "center" }}>
          Cargando…
        </p>
      </div>
    );
  }

  if (previewState === "error") {
    return (
      <div className={`roi-stitch roi-bg-page roi-page ${className ?? ""}`}>
        <RoiNativeStyles />
        <p className="roi-error" style={{ textAlign: "center" }}>
          No pudimos calcular el ROI.
        </p>
      </div>
    );
  }

  if (previewState === "success") {
    return (
      <div className={`roi-stitch roi-bg-page roi-page ${className ?? ""}`}>
        <RoiNativeStyles />
        <p className="roi-success" style={{ textAlign: "center" }}>
          Escenario guardado correctamente.
        </p>
      </div>
    );
  }

  if (isWebflowDesignerCanvas()) {
    return (
      <div className={className}>
        <RoiDesignerPreview {...previewProps} />
      </div>
    );
  }

  return (
    <div className={`roi-stitch roi-bg-page roi-page ${className ?? ""}`}>
      <div className="roi-wrap">
        {props.eyebrow ? <p className="roi-eyebrow">{props.eyebrow}</p> : null}
        {errorMessage ? (
          <p className="roi-error" style={{ marginBottom: "1rem" }}>
            {errorMessage}
          </p>
        ) : null}
        <RoiErrorBoundary {...previewProps}>
          <RoiCalculator
            title={previewProps.title}
            description={previewProps.description}
            defaultMonthlyBudget={previewProps.defaultMonthlyBudget}
            defaultLeadValue={previewProps.defaultLeadValue}
            defaultLeadsToClose={previewProps.defaultLeadsToClose}
            ctaLabel={previewProps.ctaLabel}
            ctaUrl={ctaUrl ?? DEFAULTS.ctaUrl!}
            onError={(msg) => setErrorMessage(msg)}
            onSubmitted={() => setErrorMessage(undefined)}
          />
        </RoiErrorBoundary>
      </div>
    </div>
  );
}

export default RoiCalculatorComponent;

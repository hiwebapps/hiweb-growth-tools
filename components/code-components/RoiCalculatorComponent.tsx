"use client";

import { lazy, Suspense, useMemo, useState } from "react";
import { RoiDesignerPreview } from "@/components/roi/RoiDesignerPreview";
import { RoiErrorBoundary } from "@/components/roi/RoiErrorBoundary";
import { RoiNativeStyles } from "@/components/roi/RoiNativeStyles";
import { ROI_BUDGET, ROI_TICKET, ROI_USD_TO_MXN } from "@/lib/roi/currency";
import { DEFAULT_BENCHMARKS, DEFAULT_INPUTS } from "@/lib/roi/defaults";
import type { RoiBenchmarks } from "@/lib/roi/types";
import type { CodeComponentBaseProps } from "@/lib/shared/code-component";
import { mergeProps } from "@/lib/shared/code-component";
import { isWebflowDesignerCanvas } from "@/lib/shared/is-webflow-designer";

const RoiCalculatorLazy = lazy(() =>
  import("@/components/roi/RoiCalculator").then((m) => ({
    default: m.RoiCalculator,
  })),
);

export type RoiCalculatorComponentProps = CodeComponentBaseProps & {
  minMonthlyBudget?: number;
  defaultMonthlyBudget?: number;
  defaultLeadValue?: number;
  defaultLeadsToClose?: number;
  ecommerceCpcMxn?: number;
  realEstateCplMxn?: number;
  realEstateSeriousLeadRate?: number;
  saasCplUsd?: number;
  usdToMxn?: number;
  b2bCplMxn?: number;
  resultsButtonLabel?: string;
  retryButtonLabel?: string;
  ctaLabel?: string;
  ctaUrl?: string;
};

const DEFAULTS: RoiCalculatorComponentProps = {
  minMonthlyBudget: ROI_BUDGET.min,
  defaultMonthlyBudget: ROI_BUDGET.default,
  defaultLeadValue: ROI_TICKET.default,
  defaultLeadsToClose: DEFAULT_INPUTS.leadsToCloseSale,
  ecommerceCpcMxn: DEFAULT_BENCHMARKS.ecommerceCpcMxn,
  realEstateCplMxn: DEFAULT_BENCHMARKS.realEstateCplMxn,
  realEstateSeriousLeadRate: DEFAULT_BENCHMARKS.realEstateSeriousLeadRate,
  saasCplUsd: DEFAULT_BENCHMARKS.saasCplUsd,
  usdToMxn: ROI_USD_TO_MXN,
  b2bCplMxn: DEFAULT_BENCHMARKS.b2bCplMxn,
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
    minMonthlyBudget,
    defaultMonthlyBudget,
    defaultLeadValue,
    defaultLeadsToClose,
    ecommerceCpcMxn,
    realEstateCplMxn,
    realEstateSeriousLeadRate,
    saasCplUsd,
    usdToMxn,
    b2bCplMxn,
    resultsButtonLabel,
    retryButtonLabel,
    ctaLabel,
    ctaUrl,
  } = props;

  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const benchmarks = useMemo(
    (): RoiBenchmarks => ({
      ecommerceCpcMxn: ecommerceCpcMxn ?? DEFAULTS.ecommerceCpcMxn!,
      realEstateCplMxn: realEstateCplMxn ?? DEFAULTS.realEstateCplMxn!,
      realEstateSeriousLeadRate:
        realEstateSeriousLeadRate ?? DEFAULTS.realEstateSeriousLeadRate!,
      saasCplUsd: saasCplUsd ?? DEFAULTS.saasCplUsd!,
      usdToMxn: usdToMxn ?? DEFAULTS.usdToMxn!,
      b2bCplMxn: b2bCplMxn ?? DEFAULTS.b2bCplMxn!,
    }),
    [
      ecommerceCpcMxn,
      realEstateCplMxn,
      realEstateSeriousLeadRate,
      saasCplUsd,
      usdToMxn,
      b2bCplMxn,
    ],
  );

  const calculatorProps = {
    minMonthlyBudget: minMonthlyBudget ?? DEFAULTS.minMonthlyBudget!,
    benchmarks,
    defaultInputs: {
      monthlyBudget: defaultMonthlyBudget ?? DEFAULTS.defaultMonthlyBudget!,
      averageLeadValue: defaultLeadValue ?? DEFAULTS.defaultLeadValue!,
      leadsToCloseSale: defaultLeadsToClose ?? DEFAULTS.defaultLeadsToClose!,
    },
    resultsButtonLabel: resultsButtonLabel ?? DEFAULTS.resultsButtonLabel!,
    retryButtonLabel: retryButtonLabel ?? DEFAULTS.retryButtonLabel!,
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
          Escenario calculado correctamente.
        </p>
      </div>
    );
  }

  if (isWebflowDesignerCanvas()) {
    return (
      <div className={shellClass}>
        <RoiDesignerPreview
          defaultMonthlyBudget={calculatorProps.defaultInputs.monthlyBudget!}
          minMonthlyBudget={calculatorProps.minMonthlyBudget}
        />
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
      <RoiErrorBoundary
        defaultMonthlyBudget={calculatorProps.defaultInputs.monthlyBudget!}
        minMonthlyBudget={calculatorProps.minMonthlyBudget}
      >
        <Suspense
          fallback={
            <RoiDesignerPreview
              defaultMonthlyBudget={calculatorProps.defaultInputs.monthlyBudget!}
              minMonthlyBudget={calculatorProps.minMonthlyBudget}
            />
          }
        >
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

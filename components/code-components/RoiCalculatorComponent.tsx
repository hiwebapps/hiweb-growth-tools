"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Badge, Button } from "@/components/shared";
import { RoiCalculator } from "@/components/roi";
import {
  CodeComponentFrame,
  PlaceholderPanel,
} from "./CodeComponentFrame";
import type { CodeComponentBaseProps, ToolViewState } from "@/lib/shared/code-component";
import { mergeProps } from "@/lib/shared/code-component";

export type RoiCalculatorComponentProps = CodeComponentBaseProps & {
  defaultMonthlyBudget?: number;
  defaultLeadValue?: number;
  ctaLabel?: string;
  ctaUrl?: string;
};

const DEFAULTS: RoiCalculatorComponentProps = {
  eyebrow: "ROI",
  title: "Calcula el retorno de tu inversión en marketing",
  description:
    "Estima leads, ventas e ingresos potenciales según tu presupuesto y ticket medio.",
  themeVariant: "light",
  defaultMonthlyBudget: 3000,
  defaultLeadValue: 500,
  ctaLabel: "Quiero una propuesta",
  ctaUrl: "/calendario",
};

function RoiPreviewMock({
  props,
  resolvedView,
  themeVariant,
  ctaLabel,
  onMockError,
  onMockSubmit,
}: {
  props: RoiCalculatorComponentProps;
  resolvedView: ToolViewState;
  themeVariant: RoiCalculatorComponentProps["themeVariant"];
  ctaLabel?: string;
  onMockError: () => void;
  onMockSubmit: () => void;
}) {
  return (
    <CodeComponentFrame
      {...props}
      viewState={resolvedView}
      footer={
        resolvedView === "intro" ? (
          <Button type="button" onClick={onMockSubmit} fullWidth>
            Calcular estimación
          </Button>
        ) : resolvedView === "active" ? (
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button type="button" variant="secondary" onClick={onMockError}>
              Simular error
            </Button>
            <Button type="button" onClick={onMockSubmit} fullWidth>
              {ctaLabel ?? "Guardar"}
            </Button>
          </div>
        ) : null
      }
    >
      {resolvedView === "intro" ? (
        <Badge variant="brand">Preview</Badge>
      ) : null}
      {resolvedView === "active" ? (
        <PlaceholderPanel title="ROI" themeVariant={themeVariant}>
          <p className="text-sm text-muted">Vista previa del design system.</p>
        </PlaceholderPanel>
      ) : null}
    </CodeComponentFrame>
  );
}

export function RoiCalculatorComponent(
  rawProps: RoiCalculatorComponentProps = {},
) {
  const props = mergeProps(DEFAULTS, rawProps);
  const {
    previewState,
    className,
    defaultMonthlyBudget,
    defaultLeadValue,
    ctaLabel,
    ctaUrl,
  } = props;

  const [viewState, setViewState] = useState<ToolViewState>("intro");
  const [hasResult, setHasResult] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const calculateRef = useRef<(() => Promise<void>) | null>(null);
  const submitRef = useRef<(() => Promise<void>) | null>(null);

  const resolvedView = previewState ?? viewState;

  useEffect(() => {
    if (previewState) {
      setViewState(previewState);
    }
  }, [previewState]);

  const handleLoading = useCallback(
    (loading: boolean) => {
      if (!previewState && loading) {
        setViewState("loading");
      }
    },
    [previewState],
  );

  const handleError = useCallback((message: string) => {
    setErrorMessage(message);
    setViewState("error");
  }, []);

  const handleCalculated = useCallback(() => {
    setHasResult(true);
    setViewState("active");
  }, []);

  const handleSubmitted = useCallback(() => {
    setViewState("success");
  }, []);

  if (previewState) {
    return (
      <RoiPreviewMock
        props={props}
        resolvedView={previewState}
        themeVariant={props.themeVariant}
        ctaLabel={ctaLabel}
        onMockError={() => setViewState("error")}
        onMockSubmit={() =>
          setViewState(previewState === "intro" ? "active" : "success")
        }
      />
    );
  }

  return (
    <CodeComponentFrame
      {...props}
      viewState={resolvedView}
      errorMessage={
        errorMessage ??
        "No pudimos calcular el ROI. Revisa los valores e inténtalo de nuevo."
      }
      successTitle="Estimación guardada"
      successMessage="Hemos registrado tu escenario. Un asesor puede contactarte con una propuesta personalizada."
      className={className}
      footer={
        resolvedView === "intro" ? (
          <Button
            type="button"
            onClick={() => {
              setViewState("active");
            }}
            fullWidth
          >
            Comenzar calculadora
          </Button>
        ) : resolvedView === "active" && !hasResult ? (
          <Button
            type="button"
            fullWidth
            onClick={() => void calculateRef.current?.()}
          >
            Calcular estimación
          </Button>
        ) : resolvedView === "active" && hasResult ? (
          <Button
            type="button"
            fullWidth
            onClick={() => void submitRef.current?.()}
          >
            Enviar escenario
          </Button>
        ) : resolvedView === "error" ? (
          <Button
            type="button"
            variant="secondary"
            fullWidth
            onClick={() => {
              setViewState("intro");
              setHasResult(false);
              setErrorMessage(undefined);
            }}
          >
            Reintentar
          </Button>
        ) : resolvedView === "success" ? (
          <Button
            type="button"
            fullWidth
            onClick={() => {
              const url = ctaUrl ?? "/calendario";
              if (url.startsWith("http")) {
                window.open(url, "_blank", "noopener,noreferrer");
              } else {
                window.location.href = url;
              }
            }}
          >
            {ctaLabel}
          </Button>
        ) : null
      }
    >
      {resolvedView === "intro" ? (
        <div className="flex flex-wrap gap-2">
          <Badge variant="brand">Cálculo en servidor</Badge>
          <Badge variant="neutral">Sin compromiso</Badge>
        </div>
      ) : null}

      {resolvedView === "active" ? (
        <RoiCalculator
          defaultMonthlyBudget={defaultMonthlyBudget ?? DEFAULTS.defaultMonthlyBudget!}
          defaultLeadValue={defaultLeadValue ?? DEFAULTS.defaultLeadValue!}
          onLoading={handleLoading}
          onError={handleError}
          onCalculated={handleCalculated}
          onSubmitted={handleSubmitted}
          onRegisterCalculate={(fn) => {
            calculateRef.current = fn;
          }}
          onRegisterSubmit={(fn) => {
            submitRef.current = fn;
          }}
        />
      ) : null}
    </CodeComponentFrame>
  );
}

export default RoiCalculatorComponent;

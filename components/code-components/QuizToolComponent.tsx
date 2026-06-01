"use client";

import { useCallback, useEffect, useState } from "react";
import { Badge, Button } from "@/components/shared";
import {
  MarketingQuiz,
  QuizResult,
  startQuizSession,
} from "@/components/quiz";
import type { QuizScoreResult } from "@/lib/quiz/types";
import {
  CodeComponentFrame,
  PlaceholderPanel,
} from "./CodeComponentFrame";
import type { CodeComponentBaseProps, ToolViewState } from "@/lib/shared/code-component";
import { mergeProps } from "@/lib/shared/code-component";

export type QuizToolComponentProps = CodeComponentBaseProps & {
  startButtonLabel?: string;
  leadCaptureTitle?: string;
  leadCaptureDescription?: string;
  resultCtaLabel?: string;
  resultCtaUrl?: string;
};

const DEFAULTS: QuizToolComponentProps = {
  eyebrow: "Diagnóstico",
  title: "¿Qué tan maduro es tu marketing digital?",
  description:
    "Responde unas preguntas y recibe un score con recomendaciones personalizadas de Hiweb Marketing.",
  themeVariant: "light",
  startButtonLabel: "Comenzar diagnóstico",
  leadCaptureTitle: "Recibe tu resultado",
  leadCaptureDescription:
    "Déjanos tus datos para enviarte el informe y las recomendaciones.",
  resultCtaLabel: "Agendar llamada",
  resultCtaUrl: "/calendario",
};

function QuizToolPreviewMock({
  props,
  resolvedView,
  themeVariant,
  leadCaptureTitle,
  leadCaptureDescription,
  onMockError,
  onMockSubmit,
}: {
  props: QuizToolComponentProps;
  resolvedView: ToolViewState;
  themeVariant: QuizToolComponentProps["themeVariant"];
  leadCaptureTitle?: string;
  leadCaptureDescription?: string;
  onMockError: () => void;
  onMockSubmit: () => void;
}) {
  return (
    <CodeComponentFrame
      {...props}
      viewState={resolvedView}
      successTitle="Diagnóstico completado"
      successMessage="Tu resultado está listo."
      footer={
        resolvedView === "intro" ? (
          <Button type="button" onClick={onMockSubmit} fullWidth>
            {props.startButtonLabel}
          </Button>
        ) : resolvedView === "active" ? (
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button type="button" variant="secondary" onClick={onMockError}>
              Simular error
            </Button>
            <Button type="button" onClick={onMockSubmit} fullWidth>
              Preview
            </Button>
          </div>
        ) : null
      }
    >
      {resolvedView === "intro" ? (
        <div className="flex flex-wrap gap-2">
          <Badge variant="brand">~5 min</Badge>
          <Badge variant="neutral">Preview</Badge>
        </div>
      ) : null}
      {resolvedView === "active" ? (
        <PlaceholderPanel
          title={leadCaptureTitle ?? "Lead capture"}
          themeVariant={themeVariant}
        >
          <p className="text-sm text-muted">{leadCaptureDescription}</p>
        </PlaceholderPanel>
      ) : null}
    </CodeComponentFrame>
  );
}

export function QuizToolComponent(rawProps: QuizToolComponentProps = {}) {
  const props = mergeProps(DEFAULTS, rawProps);
  const {
    themeVariant,
    previewState,
    className,
    startButtonLabel,
    leadCaptureTitle,
    leadCaptureDescription,
    resultCtaLabel,
    resultCtaUrl,
  } = props;

  const [viewState, setViewState] = useState<ToolViewState>("intro");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [quizResult, setQuizResult] = useState<QuizScoreResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const resolvedView = previewState ?? viewState;

  useEffect(() => {
    if (previewState) {
      setViewState(previewState);
    }
  }, [previewState]);

  const handleStart = useCallback(async () => {
    setViewState("loading");
    setErrorMessage(undefined);

    try {
      const id = await startQuizSession();
      setSessionId(id);
      setViewState("active");
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "No pudimos iniciar el quiz.",
      );
      setViewState("error");
    }
  }, []);

  const handleLoading = useCallback((loading: boolean) => {
    if (!previewState && loading) {
      setViewState("loading");
    }
  }, [previewState]);

  const handleError = useCallback(
    (message: string) => {
      setErrorMessage(message);
      setViewState("error");
    },
    [],
  );

  const handleSubmitted = useCallback((result: QuizScoreResult) => {
    setQuizResult(result);
    setViewState("success");
  }, []);

  if (previewState) {
    return (
      <QuizToolPreviewMock
        props={props}
        resolvedView={previewState}
        themeVariant={themeVariant}
        leadCaptureTitle={leadCaptureTitle}
        leadCaptureDescription={leadCaptureDescription}
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
      errorMessage={errorMessage}
      successTitle="Diagnóstico completado"
      successMessage="Tu resultado está listo. Revisa las recomendaciones abajo o agenda una llamada con nuestro equipo."
      className={className}
      footer={
        resolvedView === "intro" ? (
          <Button type="button" onClick={() => void handleStart()} fullWidth>
            {startButtonLabel}
          </Button>
        ) : resolvedView === "error" ? (
          <Button
            type="button"
            variant="secondary"
            fullWidth
            onClick={() => {
              setViewState("intro");
              setSessionId(null);
            }}
          >
            Reintentar
          </Button>
        ) : resolvedView === "success" ? (
          <Button
            type="button"
            fullWidth
            onClick={() => {
              const url = resultCtaUrl ?? "/calendario";
              if (url.startsWith("http")) {
                window.open(url, "_blank", "noopener,noreferrer");
              } else {
                window.location.href = url;
              }
            }}
          >
            {resultCtaLabel}
          </Button>
        ) : null
      }
    >
      {resolvedView === "intro" ? (
        <div className="flex flex-wrap gap-2">
          <Badge variant="brand">~5 min</Badge>
          <Badge variant="neutral">8 preguntas</Badge>
          <Badge variant="neutral">Score + recomendaciones</Badge>
        </div>
      ) : null}

      {resolvedView === "active" && sessionId ? (
        <MarketingQuiz
          sessionId={sessionId}
          leadCaptureTitle={leadCaptureTitle ?? DEFAULTS.leadCaptureTitle!}
          leadCaptureDescription={leadCaptureDescription}
          onLoading={handleLoading}
          onError={handleError}
          onSubmitted={handleSubmitted}
        />
      ) : null}

      {resolvedView === "success" && quizResult ? (
        <QuizResult result={quizResult} />
      ) : null}
    </CodeComponentFrame>
  );
}

export default QuizToolComponent;

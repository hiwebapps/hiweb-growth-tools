"use client";

import { lazy, Suspense, useCallback, useEffect, useState } from "react";
import { QuizDesignerPreview } from "@/components/quiz/QuizDesignerPreview";
import { QuizNativeStyles } from "@/components/quiz/QuizNativeStyles";
import { QuizResult } from "@/components/quiz/QuizResult";
import type { QuizScoreResult } from "@/lib/quiz/types";
import { startQuizSession } from "@/lib/quiz/session";
import type { CodeComponentBaseProps, ToolViewState } from "@/lib/shared/code-component";
import { mergeProps } from "@/lib/shared/code-component";
import { isWebflowDesignerCanvas } from "@/lib/shared/is-webflow-designer";

const MarketingQuizLazy = lazy(() =>
  import("@/components/quiz/MarketingQuiz").then((m) => ({
    default: m.MarketingQuiz,
  })),
);

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
  startButtonLabel: "Comenzar diagnóstico",
  leadCaptureTitle: "Recibe tu resultado",
  leadCaptureDescription:
    "Déjanos tus datos para enviarte el informe y las recomendaciones.",
  resultCtaLabel: "Agendar diagnóstico gratuito",
  resultCtaUrl: "/tools/calendario",
};

function navigateToUrl(url: string) {
  if (typeof window === "undefined") {
    return;
  }
  if (url.startsWith("http")) {
    window.open(url, "_blank", "noopener,noreferrer");
  } else {
    window.location.href = url;
  }
}

export function QuizToolComponent(rawProps: QuizToolComponentProps = {}) {
  const props = mergeProps(DEFAULTS, rawProps);
  const {
    previewState,
    className,
    eyebrow,
    title,
    description,
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
    if (previewState) {
      return;
    }
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
  }, [previewState]);

  const handleSubmitted = useCallback(
    (result: QuizScoreResult) => {
      setQuizResult(result);
      setViewState("success");
    },
    [],
  );

  const handleCta = useCallback(() => {
    navigateToUrl(resultCtaUrl ?? DEFAULTS.resultCtaUrl!);
  }, [resultCtaUrl]);

  const shellClass = `quiz-stitch quiz-root ${className ?? ""}`.trim();

  if (isWebflowDesignerCanvas() && !previewState) {
    return (
      <div className={shellClass}>
        <QuizDesignerPreview />
      </div>
    );
  }

  return (
    <div className={shellClass}>
      <QuizNativeStyles />
      <div className="quiz-ambient quiz-ambient-violet" aria-hidden />
      <div className="quiz-ambient quiz-ambient-cyan" aria-hidden />

      {resolvedView === "loading" ? (
        <p className="quiz-loading">Preparando tu diagnóstico…</p>
      ) : null}

      {resolvedView === "error" ? (
        <div className="quiz-inner">
          <p className="quiz-error" role="alert">
            {errorMessage ?? "No pudimos completar el diagnóstico."}
          </p>
          <button
            type="button"
            className="quiz-btn-ghost"
            onClick={() => {
              setViewState("intro");
              setSessionId(null);
            }}
          >
            Reintentar
          </button>
        </div>
      ) : null}

      {resolvedView === "intro" ? (
        <div className="quiz-inner">
          <section className="quiz-intro">
            {eyebrow ? <span className="quiz-eyebrow">{eyebrow}</span> : null}
            {title ? <h1 className="quiz-intro-title">{title}</h1> : null}
            {description ? <p className="quiz-intro-desc">{description}</p> : null}
            <div className="quiz-badges">
              <span className="quiz-badge">~5 min</span>
              <span className="quiz-badge">8 preguntas</span>
              <span className="quiz-badge">Score + recomendaciones</span>
            </div>
            <button
              type="button"
              className="quiz-btn-primary"
              onClick={() => void handleStart()}
            >
              {startButtonLabel}
              <span aria-hidden>→</span>
            </button>
          </section>
        </div>
      ) : null}

      {resolvedView === "active" && sessionId ? (
        <Suspense fallback={<p className="quiz-loading">Cargando preguntas…</p>}>
          <MarketingQuizLazy
            sessionId={sessionId}
            leadCaptureTitle={leadCaptureTitle ?? DEFAULTS.leadCaptureTitle!}
            leadCaptureDescription={leadCaptureDescription}
            onError={(message) => {
              setErrorMessage(message);
              setViewState("error");
            }}
            onSubmitted={handleSubmitted}
          />
        </Suspense>
      ) : null}

      {resolvedView === "active" && previewState && !sessionId ? (
        <QuizDesignerPreview />
      ) : null}

      {resolvedView === "success" && quizResult ? (
        <QuizResult
          result={quizResult}
          ctaLabel={resultCtaLabel ?? DEFAULTS.resultCtaLabel!}
          onCtaClick={handleCta}
        />
      ) : null}

      {resolvedView === "success" && previewState && !quizResult ? (
        <div className="quiz-inner">
          <p className="quiz-section-desc">Vista previa: resultado del diagnóstico.</p>
        </div>
      ) : null}
    </div>
  );
}

export default QuizToolComponent;

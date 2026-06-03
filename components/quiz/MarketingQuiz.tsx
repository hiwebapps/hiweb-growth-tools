"use client";

import { useCallback, useState } from "react";
import { QUIZ_QUESTIONS, QUIZ_TOTAL_STEPS } from "@/lib/quiz/questions";
import { updateQuizSession, submitQuiz } from "@/lib/quiz/client";
import type { QuizAnswers, QuizLeadInput, QuizScoreResult } from "@/lib/quiz/types";
import { LeadCaptureStep } from "./LeadCaptureStep";
import { QuizProgressHeader } from "./QuizProgressHeader";
import { QuizStep } from "./QuizStep";

type Phase = "questions" | "lead";

type MarketingQuizProps = {
  sessionId: string;
  leadCaptureTitle: string;
  leadCaptureDescription?: string;
  submitButtonLabel?: string;
  onError?: (message: string) => void;
  onSubmitted?: (payload: {
    result: QuizScoreResult;
    leadId: string;
  }) => void;
};

const emptyLead = (): QuizLeadInput => ({
  name: "",
  email: "",
  company: "",
  phone: "",
  website: "",
  industry: "",
});

export function MarketingQuiz({
  sessionId,
  leadCaptureTitle,
  leadCaptureDescription,
  submitButtonLabel = "Enviar diagnóstico",
  onError,
  onSubmitted,
}: MarketingQuizProps) {
  const [phase, setPhase] = useState<Phase>("questions");
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [lead, setLead] = useState<QuizLeadInput>(emptyLead);
  const [clientError, setClientError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentQuestion = QUIZ_QUESTIONS[stepIndex];
  const totalSteps = QUIZ_TOTAL_STEPS + 1;
  const currentStepNumber =
    phase === "lead" ? QUIZ_TOTAL_STEPS + 1 : stepIndex + 1;
  const progressPercent = Math.round((currentStepNumber / totalSteps) * 100);

  const persistAnswer = useCallback(
    async (questionId: string, optionId: string, nextAnswers: QuizAnswers) => {
      try {
        await updateQuizSession({
          sessionId,
          questionId,
          optionId,
          currentStep: Object.keys(nextAnswers).length,
        });
      } catch {
        // Sin SQLite en Cloud la API puede responder en modo stateless; el estado vive en el cliente.
      }
    },
    [sessionId, onError],
  );

  const handleSelectOption = (optionId: string) => {
    if (!currentQuestion) {
      return;
    }

    const nextAnswers = { ...answers, [currentQuestion.id]: optionId };
    setAnswers(nextAnswers);
    setClientError(null);
    void persistAnswer(currentQuestion.id, optionId, nextAnswers);
  };

  const handleNext = () => {
    if (!currentQuestion || !answers[currentQuestion.id]) {
      setClientError("Selecciona una opción para continuar.");
      return;
    }

    if (stepIndex < QUIZ_TOTAL_STEPS - 1) {
      setStepIndex((i) => i + 1);
      return;
    }

    setPhase("lead");
  };

  const handleBack = () => {
    setClientError(null);
    if (phase === "lead") {
      setPhase("questions");
      setStepIndex(QUIZ_TOTAL_STEPS - 1);
      return;
    }
    if (stepIndex > 0) {
      setStepIndex((i) => i - 1);
    }
  };

  const handleLeadChange = (field: keyof QuizLeadInput, value: string) => {
    setLead((prev) => ({ ...prev, [field]: value }));
    setClientError(null);
  };

  const handleSubmit = async () => {
    if (!lead.name.trim() || !lead.email.trim()) {
      setClientError("Nombre y email son obligatorios.");
      return;
    }

    setIsSubmitting(true);
    setClientError(null);

    try {
      const response = await submitQuiz({ sessionId, lead, answers });
      onSubmitted?.({ result: response.result, leadId: response.leadId });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "No pudimos enviar el quiz.";
      setClientError(message);
      onError?.(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const canGoBack = phase === "lead" || stepIndex > 0;

  return (
    <div className="quiz-inner">
      <QuizProgressHeader
        stepLabel={`Paso ${currentStepNumber}`}
        stepCounter={`${currentStepNumber} de ${totalSteps}`}
        progressPercent={progressPercent}
      />

      {clientError ? (
        <p className="quiz-error" role="alert">
          {clientError}
        </p>
      ) : null}

      {phase === "questions" && currentQuestion ? (
        <QuizStep
          question={currentQuestion}
          selectedOptionId={answers[currentQuestion.id]}
          onSelect={handleSelectOption}
        />
      ) : null}

      {phase === "lead" ? (
        <LeadCaptureStep
          title={leadCaptureTitle}
          description={leadCaptureDescription}
          value={lead}
          onChange={handleLeadChange}
        />
      ) : null}

      <div className="quiz-nav">
        <button
          type="button"
          className="quiz-btn-back"
          onClick={handleBack}
          disabled={!canGoBack}
        >
          <span aria-hidden>←</span> Anterior
        </button>
        {phase === "questions" ? (
          <button type="button" className="quiz-btn-primary" onClick={handleNext}>
            {stepIndex === QUIZ_TOTAL_STEPS - 1 ? "Ver resultado" : "Siguiente"}
            <span aria-hidden>→</span>
          </button>
        ) : (
          <button
            type="button"
            className="quiz-btn-primary"
            disabled={isSubmitting}
            onClick={() => void handleSubmit()}
          >
            {isSubmitting ? "Enviando…" : submitButtonLabel}
            <span aria-hidden>→</span>
          </button>
        )}
      </div>
    </div>
  );
}

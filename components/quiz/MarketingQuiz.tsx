"use client";

import { useCallback, useState } from "react";
import { Button, ProgressBar } from "@/components/shared";
import { QUIZ_QUESTIONS, QUIZ_TOTAL_STEPS } from "@/lib/quiz/questions";
import {
  createQuizSession,
  submitQuiz,
  updateQuizSession,
} from "@/lib/quiz/client";
import type { QuizAnswers, QuizLeadInput, QuizScoreResult } from "@/lib/quiz/types";
import { LeadCaptureStep } from "./LeadCaptureStep";
import { QuizStep } from "./QuizStep";

type Phase = "questions" | "lead";

type MarketingQuizProps = {
  sessionId: string;
  leadCaptureTitle: string;
  leadCaptureDescription?: string;
  onLoading?: (loading: boolean) => void;
  onError?: (message: string) => void;
  onSubmitted?: (result: QuizScoreResult) => void;
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
  sessionId: initialSessionId,
  leadCaptureTitle,
  leadCaptureDescription,
  onLoading,
  onError,
  onSubmitted,
}: MarketingQuizProps) {
  const [sessionId] = useState(initialSessionId);
  const [phase, setPhase] = useState<Phase>("questions");
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [lead, setLead] = useState<QuizLeadInput>(emptyLead);
  const [clientError, setClientError] = useState<string | null>(null);

  const currentQuestion = QUIZ_QUESTIONS[stepIndex];
  const progressValue =
    phase === "questions"
      ? Math.round((stepIndex / QUIZ_TOTAL_STEPS) * 100)
      : phase === "lead"
        ? 92
        : 100;

  const persistAnswer = useCallback(
    async (questionId: string, optionId: string, nextAnswers: QuizAnswers) => {
      try {
        await updateQuizSession({
          sessionId,
          questionId,
          optionId,
          currentStep: Object.keys(nextAnswers).length,
        });
      } catch (error) {
        onError?.(
          error instanceof Error ? error.message : "Error al guardar respuesta.",
        );
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

    onLoading?.(true);
    setClientError(null);

    try {
      const response = await submitQuiz({ sessionId, lead, answers });
      onSubmitted?.(response.result);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "No pudimos enviar el quiz.";
      setClientError(message);
      onError?.(message);
      onLoading?.(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <ProgressBar label="Progreso del diagnóstico" value={progressValue} />

      {clientError ? (
        <p className="text-sm text-error" role="alert">
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

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
        <Button
          type="button"
          variant="secondary"
          onClick={handleBack}
          disabled={stepIndex === 0 && phase === "questions"}
        >
          Atrás
        </Button>
        {phase === "questions" ? (
          <Button type="button" onClick={handleNext}>
            {stepIndex === QUIZ_TOTAL_STEPS - 1 ? "Ver resultado" : "Siguiente"}
          </Button>
        ) : (
          <Button type="button" onClick={() => void handleSubmit()}>
            Enviar diagnóstico
          </Button>
        )}
      </div>
    </div>
  );
}

export async function startQuizSession(): Promise<string> {
  const session = await createQuizSession();
  return session.sessionId;
}

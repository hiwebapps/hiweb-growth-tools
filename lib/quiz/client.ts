import { apiUrl } from "@/lib/shared/api-url";
import type { QuizAnswers, QuizLeadInput, QuizSubmitResponse } from "./types";

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(apiUrl(url), init);
  const data = (await response.json()) as T & { error?: string };

  if (!response.ok) {
    throw new Error(data.error ?? "Error en la solicitud.");
  }

  return data;
}

export async function createQuizSession() {
  return request<{
    sessionId: string;
    currentStep: number;
    totalSteps: number;
    answers: QuizAnswers;
  }>("/api/quiz/session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "create" }),
  });
}

export async function updateQuizSession(input: {
  sessionId: string;
  questionId: string;
  optionId: string;
  currentStep: number;
}) {
  return request<{
    sessionId: string;
    currentStep: number;
    totalSteps: number;
    answers: QuizAnswers;
  }>("/api/quiz/session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      action: "update",
      sessionId: input.sessionId,
      questionId: input.questionId,
      optionId: input.optionId,
      currentStep: input.currentStep,
    }),
  });
}

export async function submitQuiz(input: {
  sessionId: string;
  lead: QuizLeadInput;
  answers: QuizAnswers;
}) {
  return request<QuizSubmitResponse>("/api/quiz/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
}

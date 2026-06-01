import { NextResponse } from "next/server";
import { QUIZ_TOTAL_STEPS } from "@/lib/quiz/questions";
import type { QuizAnswers } from "@/lib/quiz/types";
import { sanitizeSessionId } from "@/lib/quiz/validators";
import {
  createQuizSession,
  getQuizSession,
  updateQuizSession,
} from "@/lib/db/quiz";
import { jsonError } from "@/lib/api/response";
import { AppError } from "@/lib/shared/errors";

type SessionBody = {
  action?: "create" | "update";
  sessionId?: string;
  questionId?: string;
  optionId?: string;
  answers?: QuizAnswers;
  currentStep?: number;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as SessionBody;
    const action = body.action ?? (body.sessionId ? "update" : "create");

    if (action === "create") {
      const session = createQuizSession();
      return NextResponse.json({
        sessionId: session.sessionId,
        currentStep: session.currentStep,
        totalSteps: QUIZ_TOTAL_STEPS,
        answers: session.answers,
      });
    }

    const sessionId = sanitizeSessionId(body.sessionId);
    const existing = getQuizSession(sessionId);

    if (!existing) {
      throw new AppError("Sesión no encontrada.", {
        statusCode: 404,
        code: "SESSION_NOT_FOUND",
      });
    }

    let answers: QuizAnswers = { ...existing.answers };

    if (body.questionId && body.optionId) {
      answers[body.questionId] = body.optionId;
    } else if (body.answers) {
      answers = { ...body.answers };
    }

    const currentStep =
      typeof body.currentStep === "number"
        ? body.currentStep
        : Object.keys(answers).length;

    const session = updateQuizSession(sessionId, answers, currentStep);

    return NextResponse.json({
      sessionId: session.sessionId,
      currentStep: session.currentStep,
      totalSteps: QUIZ_TOTAL_STEPS,
      answers: session.answers,
    });
  } catch (error) {
    return jsonError(error);
  }
}

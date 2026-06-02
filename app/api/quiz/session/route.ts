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
import { createId } from "@/lib/shared/utils";

type SessionBody = {
  action?: "create" | "update";
  sessionId?: string;
  questionId?: string;
  optionId?: string;
  answers?: QuizAnswers;
  currentStep?: number;
};

function mergeAnswersFromBody(
  existing: QuizAnswers,
  body: SessionBody,
): QuizAnswers {
  if (body.questionId && body.optionId) {
    return { ...existing, [body.questionId]: body.optionId };
  }
  if (body.answers) {
    return { ...body.answers };
  }
  return existing;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as SessionBody;
    const action = body.action ?? (body.sessionId ? "update" : "create");

    if (action === "create") {
      const session = await createQuizSession();
      if (session) {
        return NextResponse.json({
          sessionId: session.sessionId,
          currentStep: session.currentStep,
          totalSteps: QUIZ_TOTAL_STEPS,
          answers: session.answers,
        });
      }

      return NextResponse.json({
        sessionId: createId(),
        currentStep: 0,
        totalSteps: QUIZ_TOTAL_STEPS,
        answers: {},
        ephemeral: true,
      });
    }

    const sessionId = sanitizeSessionId(body.sessionId);
    const existing = await getQuizSession(sessionId);

    if (existing) {
      const merged = mergeAnswersFromBody(existing.answers, body);
      const currentStep =
        typeof body.currentStep === "number"
          ? body.currentStep
          : Object.keys(merged).length;

      const session = await updateQuizSession(sessionId, merged, currentStep);
      if (session) {
        return NextResponse.json({
          sessionId: session.sessionId,
          currentStep: session.currentStep,
          totalSteps: QUIZ_TOTAL_STEPS,
          answers: session.answers,
        });
      }
    }

    const answers = mergeAnswersFromBody({}, body);
    const currentStep =
      typeof body.currentStep === "number"
        ? body.currentStep
        : Object.keys(answers).length;

    return NextResponse.json({
      sessionId,
      currentStep,
      totalSteps: QUIZ_TOTAL_STEPS,
      answers,
      ephemeral: true,
    });
  } catch (error) {
    return jsonError(error);
  }
}

import { NextResponse } from "next/server";
import { calculateQuizScore } from "@/lib/quiz/scoring";
import type { QuizAnswers, QuizLeadInput } from "@/lib/quiz/types";
import {
  sanitizeSessionId,
  validateQuizAnswers,
  validateQuizLead,
} from "@/lib/quiz/validators";
import {
  deleteQuizSession,
  getQuizSession,
  insertQuizLead,
} from "@/lib/db/quiz";
import { dispatchQuizWebhook } from "@/lib/n8n/client";
import { buildQuizN8nPayload } from "@/lib/n8n/payloads";
import { jsonError } from "@/lib/api/response";
import { AppError } from "@/lib/shared/errors";
import { createId } from "@/lib/shared/utils";

type SubmitBody = {
  sessionId: string;
  lead: QuizLeadInput;
  answers?: QuizAnswers;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as SubmitBody;
    const sessionId = sanitizeSessionId(body.sessionId);
    const lead = validateQuizLead(body.lead);

    let answers: QuizAnswers | undefined = body.answers;

    if (!answers) {
      const session = await getQuizSession(sessionId);
      if (session) {
        answers = session.answers;
      }
    }

    if (!answers) {
      throw new AppError(
        "Faltan las respuestas del quiz. Vuelve a completar el diagnóstico.",
        { statusCode: 400, code: "ANSWERS_REQUIRED" },
      );
    }

    validateQuizAnswers(answers);

    const result = calculateQuizScore(answers);
    const leadId = (await insertQuizLead(lead, result, answers)) ?? createId();

    try {
      await deleteQuizSession(sessionId);
    } catch {
      // Limpieza no bloqueante.
    }

    try {
      dispatchQuizWebhook(buildQuizN8nPayload({ leadId, lead, result }));
    } catch (webhookError) {
      console.error("[quiz/submit] n8n dispatch failed:", webhookError);
    }

    return NextResponse.json({
      leadId,
      result,
    });
  } catch (error) {
    return jsonError(error);
  }
}

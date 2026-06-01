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

    const session = getQuizSession(sessionId);
    if (!session) {
      throw new AppError("Sesión no encontrada.", {
        statusCode: 404,
        code: "SESSION_NOT_FOUND",
      });
    }

    const answers = body.answers ?? session.answers;
    validateQuizAnswers(answers);

    const result = calculateQuizScore(answers);
    const leadId = insertQuizLead(lead, result, answers);

    dispatchQuizWebhook(buildQuizN8nPayload({ leadId, lead, result }));

    try {
      deleteQuizSession(sessionId);
    } catch {
      // Non-blocking cleanup of ephemeral session.
    }

    return NextResponse.json({
      leadId,
      result,
    });
  } catch (error) {
    return jsonError(error);
  }
}

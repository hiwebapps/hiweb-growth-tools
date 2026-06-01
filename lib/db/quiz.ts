import { createId } from "@/lib/shared/utils";
import type { QuizAnswers, QuizLeadInput, QuizScoreResult } from "@/lib/quiz/types";
import { getDb } from "./client";

export type QuizSessionRow = {
  sessionId: string;
  currentStep: number;
  answers: QuizAnswers;
  updatedAt: string;
};

export function createQuizSession(): QuizSessionRow {
  const sessionId = createId();
  const updatedAt = new Date().toISOString();
  const db = getDb();

  db.prepare(
    `INSERT INTO quiz_sessions (session_id, current_step, answers_json, updated_at)
     VALUES (?, 0, '{}', ?)`,
  ).run(sessionId, updatedAt);

  return { sessionId, currentStep: 0, answers: {}, updatedAt };
}

export function getQuizSession(sessionId: string): QuizSessionRow | null {
  const row = getDb()
    .prepare(
      `SELECT session_id, current_step, answers_json, updated_at
       FROM quiz_sessions WHERE session_id = ?`,
    )
    .get(sessionId) as
    | {
        session_id: string;
        current_step: number;
        answers_json: string;
        updated_at: string;
      }
    | undefined;

  if (!row) {
    return null;
  }

  return {
    sessionId: row.session_id,
    currentStep: row.current_step,
    answers: JSON.parse(row.answers_json) as QuizAnswers,
    updatedAt: row.updated_at,
  };
}

export function updateQuizSession(
  sessionId: string,
  answers: QuizAnswers,
  currentStep: number,
): QuizSessionRow {
  const updatedAt = new Date().toISOString();
  const result = getDb()
    .prepare(
      `UPDATE quiz_sessions
       SET answers_json = ?, current_step = ?, updated_at = ?
       WHERE session_id = ?`,
    )
    .run(JSON.stringify(answers), currentStep, updatedAt, sessionId);

  if (result.changes === 0) {
    throw new Error("SESSION_NOT_FOUND");
  }

  return {
    sessionId,
    currentStep,
    answers,
    updatedAt,
  };
}

export function deleteQuizSession(sessionId: string): void {
  getDb()
    .prepare(`DELETE FROM quiz_sessions WHERE session_id = ?`)
    .run(sessionId);
}

export type QuizLeadRecord = {
  id: string;
  lead: QuizLeadInput;
  result: QuizScoreResult;
  answers: QuizAnswers;
};

export function insertQuizLead(
  lead: QuizLeadInput,
  result: QuizScoreResult,
  answers: QuizAnswers,
): string {
  const id = createId();
  const createdAt = new Date().toISOString();

  getDb()
    .prepare(
      `INSERT INTO quiz_leads (
        id, name, company, email, phone, website, industry,
        score_total, score_percentage, result_level, recommended_services,
        answers_json, category_scores_json, pending_sync, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?)`,
    )
    .run(
      id,
      lead.name,
      lead.company ?? null,
      lead.email,
      lead.phone ?? null,
      lead.website ?? null,
      lead.industry ?? null,
      result.scoreTotal,
      result.scorePercentage,
      result.resultLevel,
      JSON.stringify(result.recommendedServices),
      JSON.stringify(answers),
      JSON.stringify(result.categoryScores),
      createdAt,
    );

  return id;
}

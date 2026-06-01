import type { BookingRecord } from "@/lib/calendar/types";
import type { QuizLeadInput, QuizScoreResult } from "@/lib/quiz/types";
import type {
  RoiCalculationResult,
  RoiInputs,
  RoiLeadInput,
} from "@/lib/roi/types";

export function buildQuizN8nPayload(input: {
  leadId: string;
  lead: QuizLeadInput;
  result: QuizScoreResult;
}) {
  return {
    event: "quiz.submitted",
    leadId: input.leadId,
    lead: input.lead,
    score: {
      total: input.result.scoreTotal,
      max: input.result.scoreMax,
      percentage: input.result.scorePercentage,
      level: input.result.resultLevel,
      levelLabel: input.result.resultLevelLabel,
    },
    categoryScores: input.result.categoryScores,
    recommendedServices: input.result.recommendedServices,
    submittedAt: new Date().toISOString(),
  };
}

export function buildCalendarN8nPayload(input: {
  event: "calendar.booked" | "calendar.cancelled";
  booking: BookingRecord;
}) {
  return {
    event: input.event,
    bookingId: input.booking.id,
    booking: input.booking,
    submittedAt: new Date().toISOString(),
  };
}

export function buildRoiN8nPayload(input: {
  leadId: string;
  inputs: RoiInputs;
  result: RoiCalculationResult;
  lead?: RoiLeadInput;
}) {
  return {
    event: "roi.submitted",
    leadId: input.leadId,
    lead: input.lead,
    inputs: input.inputs,
    result: input.result,
    submittedAt: new Date().toISOString(),
  };
}

import {
  BOOKING_TIMEZONE,
  formatScheduleSummary,
  formatTime12h,
} from "@/lib/calendar/calendar-rules";
import type { BookingRecord } from "@/lib/calendar/types";
import type { QuizLeadInput, QuizScoreResult } from "@/lib/quiz/types";
import type {
  RoiCalculationResult,
  RoiCalculatorState,
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

function buildCalendarSlackText(
  event: "calendar.booked" | "calendar.cancelled",
  booking: BookingRecord,
  scheduleLabel: string,
): string {
  if (event === "calendar.cancelled") {
    return [
      "❌ *Cita cancelada*",
      `• Servicio: ${booking.service}`,
      `• Horario: ${scheduleLabel}`,
      `• Nombre: ${booking.name}`,
      `• Email: ${booking.email}`,
      `• ID: ${booking.id}`,
    ].join("\n");
  }

  const lines = [
    "📅 *Nueva cita agendada*",
    `• Servicio: ${booking.service}`,
    `• Horario: ${scheduleLabel}`,
    `• Nombre: ${booking.name}`,
    `• Email: ${booking.email}`,
  ];

  if (booking.company) {
    lines.push(`• Empresa: ${booking.company}`);
  }
  if (booking.phone) {
    lines.push(`• Teléfono: ${booking.phone}`);
  }

  lines.push(`• ID: ${booking.id}`);
  return lines.join("\n");
}

export function buildCalendarN8nPayload(input: {
  event: "calendar.booked" | "calendar.cancelled";
  booking: BookingRecord;
}) {
  const { booking, event } = input;
  const scheduleLabel = formatScheduleSummary(
    booking.selectedDate,
    booking.selectedTime,
  );

  return {
    event,
    bookingId: booking.id,
    booking,
    summary: {
      service: booking.service,
      scheduleLabel,
      date: booking.selectedDate,
      time: booking.selectedTime,
      timeLabel: formatTime12h(booking.selectedTime),
      timezone: BOOKING_TIMEZONE,
      name: booking.name,
      email: booking.email,
      company: booking.company ?? null,
      phone: booking.phone ?? null,
    },
    slack: {
      channel: "leads-landing-page",
      text: buildCalendarSlackText(event, booking, scheduleLabel),
    },
    submittedAt: new Date().toISOString(),
  };
}

export function buildRoiN8nPayload(input: {
  leadId: string;
  state: RoiCalculatorState;
  result: RoiCalculationResult;
  lead?: RoiLeadInput;
}) {
  return {
    event: "roi.submitted",
    leadId: input.leadId,
    lead: input.lead,
    industry: input.result.industry,
    inputs: input.state,
    metrics: input.result.metrics,
    roi: {
      percentage: input.result.estimatedRoi,
      level: input.result.resultLevel,
      levelLabel: input.result.resultLevelLabel,
    },
    recommendations: input.result.recommendations,
    submittedAt: new Date().toISOString(),
  };
}

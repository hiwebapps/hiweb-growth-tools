import {
  BOOKING_TIMEZONE,
  buildBookingEndIso,
  buildBookingStartIso,
  formatScheduleSummary,
  formatTime12h,
  getServiceLabel,
  SLOT_INTERVAL_MINUTES,
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
  serviceLabel: string,
): string {
  if (event === "calendar.cancelled") {
    return [
      "❌ *Cita cancelada*",
      `• Servicio: ${serviceLabel}`,
      `• Horario: ${scheduleLabel}`,
      `• Nombre: ${booking.name}`,
      `• Email: ${booking.email}`,
      `• ID: ${booking.id}`,
    ].join("\n");
  }

  const lines = [
    "📅 *Nueva cita agendada*",
    `• Servicio: ${serviceLabel}`,
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

function buildCalendarEventDescription(booking: BookingRecord): string {
  const lines = [
    `Reserva ID: ${booking.id}`,
    `Cliente: ${booking.name}`,
    `Email: ${booking.email}`,
  ];
  if (booking.company) {
    lines.push(`Empresa: ${booking.company}`);
  }
  if (booking.phone) {
    lines.push(`Teléfono: ${booking.phone}`);
  }
  return lines.join("\n");
}

export function buildCalendarN8nPayload(input: {
  event: "calendar.booked" | "calendar.cancelled";
  booking: BookingRecord;
}) {
  const { booking, event } = input;
  const serviceLabel = getServiceLabel(booking.service);
  const scheduleLabel = formatScheduleSummary(
    booking.selectedDate,
    booking.selectedTime,
  );

  const payload: {
    event: typeof event;
    bookingId: string;
    booking: BookingRecord;
    summary: {
      service: string;
      serviceLabel: string;
      scheduleLabel: string;
      date: string;
      time: string;
      timeLabel: string;
      timezone: string;
      name: string;
      email: string;
      company: string | null;
      phone: string | null;
    };
    slack: {
      channel: string;
      text: string;
    };
    calendar?: {
      title: string;
      description: string;
      start: string;
      end: string;
      timeZone: string;
      attendeeEmail: string;
      durationMinutes: number;
    };
    submittedAt: string;
  } = {
    event,
    bookingId: booking.id,
    booking,
    summary: {
      service: booking.service,
      serviceLabel,
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
      text: buildCalendarSlackText(
        event,
        booking,
        scheduleLabel,
        serviceLabel,
      ),
    },
    submittedAt: new Date().toISOString(),
  };

  if (event === "calendar.booked") {
    payload.calendar = {
      title: `${serviceLabel} — ${booking.name}`,
      description: buildCalendarEventDescription(booking),
      start: buildBookingStartIso(booking.selectedDate, booking.selectedTime),
      end: buildBookingEndIso(booking.selectedDate, booking.selectedTime),
      timeZone: BOOKING_TIMEZONE,
      attendeeEmail: booking.email,
      durationMinutes: SLOT_INTERVAL_MINUTES,
    };
  }

  return payload;
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

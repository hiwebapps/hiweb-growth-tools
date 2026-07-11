import { NextResponse } from "next/server";
import { cancelBooking } from "@/lib/db/calendar";
import { validateBookingId } from "@/lib/calendar/validators";
import { dispatchCalendarWebhook } from "@/lib/n8n/client";
import { buildCalendarN8nPayload } from "@/lib/n8n/payloads";
import { jsonError } from "@/lib/api/response";
import { AppError } from "@/lib/shared/errors";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { bookingId?: string };
    const bookingId = validateBookingId(body.bookingId);
    const booking = await cancelBooking(bookingId);

    if (!booking) {
      throw new AppError("Reserva no encontrada.", {
        statusCode: 404,
        code: "BOOKING_NOT_FOUND",
      });
    }

    try {
      await dispatchCalendarWebhook(
        buildCalendarN8nPayload({ event: "calendar.cancelled", booking }),
      );
    } catch (webhookError) {
      console.error("[calendar/cancel] n8n dispatch failed:", webhookError);
    }

    return NextResponse.json({ booking });
  } catch (error) {
    return jsonError(error);
  }
}

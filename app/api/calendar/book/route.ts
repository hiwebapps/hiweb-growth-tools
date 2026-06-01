import { NextResponse } from "next/server";
import { createBooking } from "@/lib/calendar/booking";
import type { BookingInput } from "@/lib/calendar/types";
import { dispatchCalendarWebhook } from "@/lib/n8n/client";
import { buildCalendarN8nPayload } from "@/lib/n8n/payloads";
import { jsonError } from "@/lib/api/response";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as BookingInput;
    const booking = createBooking(body);

    dispatchCalendarWebhook(
      buildCalendarN8nPayload({ event: "calendar.booked", booking }),
    );

    return NextResponse.json({ booking });
  } catch (error) {
    return jsonError(error);
  }
}

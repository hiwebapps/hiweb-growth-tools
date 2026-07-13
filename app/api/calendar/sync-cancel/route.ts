import { NextResponse } from "next/server";
import { assertWebhookSecret } from "@/lib/api/webhook-auth";
import { jsonError } from "@/lib/api/response";
import { validateBookingId } from "@/lib/calendar/validators";
import { cancelBooking } from "@/lib/db/calendar";

export async function POST(request: Request) {
  try {
    assertWebhookSecret(request);

    const body = (await request.json()) as { bookingId?: string };
    const bookingId = validateBookingId(body.bookingId);
    const booking = await cancelBooking(bookingId);

    if (!booking) {
      return NextResponse.json(
        {
          ok: false,
          message: "Reserva no encontrada o ya cancelada.",
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      ok: true,
      booking,
      message: "Reserva sincronizada como cancelada en D1.",
    });
  } catch (error) {
    return jsonError(error);
  }
}

import { NextResponse } from "next/server";
import { assertWebhookSecret } from "@/lib/api/webhook-auth";
import { jsonError } from "@/lib/api/response";
import { purgeAllCalendarBookings } from "@/lib/db/calendar";

export async function POST(request: Request) {
  try {
    assertWebhookSecret(request);

    const deleted = await purgeAllCalendarBookings();

    return NextResponse.json({
      ok: true,
      deleted,
      message:
        deleted > 0
          ? `Se eliminaron ${deleted} reservas de prueba.`
          : "La base de reservas ya estaba vacía.",
    });
  } catch (error) {
    return jsonError(error);
  }
}

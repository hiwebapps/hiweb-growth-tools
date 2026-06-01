import { NextResponse } from "next/server";
import { getAvailabilityForDate } from "@/lib/calendar/availability";
import { getServiceLabel } from "@/lib/calendar/calendar-rules";
import { jsonError } from "@/lib/api/response";
import { AppError } from "@/lib/shared/errors";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date")?.trim();
    const service = searchParams.get("service")?.trim();

    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      throw new AppError("Parámetro date inválido.", {
        statusCode: 400,
        code: "INVALID_DATE",
      });
    }

    if (!service) {
      throw new AppError("Parámetro service requerido.", {
        statusCode: 400,
        code: "INVALID_SERVICE",
      });
    }

    const slots = getAvailabilityForDate(date);

    return NextResponse.json({
      date,
      service: getServiceLabel(service),
      slots,
    });
  } catch (error) {
    return jsonError(error);
  }
}

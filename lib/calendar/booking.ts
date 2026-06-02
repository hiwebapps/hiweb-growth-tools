import { validateBookingInput } from "./validators";
import { insertBooking } from "@/lib/db/calendar";
import type { BookingInput, BookingRecord } from "./types";
import { AppError } from "@/lib/shared/errors";

export async function createBooking(
  input: BookingInput,
): Promise<BookingRecord> {
  const validated = await validateBookingInput(input);
  const booking = await insertBooking(validated);

  if (!booking) {
    throw new AppError(
      "No pudimos guardar la reserva. Intenta de nuevo en unos minutos.",
      { statusCode: 503, code: "STORAGE_UNAVAILABLE" },
    );
  }

  return booking;
}

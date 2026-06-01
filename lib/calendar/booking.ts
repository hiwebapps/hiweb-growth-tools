import { validateBookingInput } from "./validators";
import { insertBooking } from "@/lib/db/calendar";
import type { BookingInput, BookingRecord } from "./types";

export function createBooking(input: BookingInput): BookingRecord {
  const validated = validateBookingInput(input);
  return insertBooking(validated);
}

import {
  CALENDAR_SERVICES,
  formatDateIso,
  getBookableDates,
  isWeekday,
  parseDateIso,
} from "./calendar-rules";
import { isSlotAvailable } from "./availability";
import type { BookingInput } from "./types";
import { AppError } from "@/lib/shared/errors";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const TIME_RE = /^([01]\d|2[0-3]):[0-5]\d$/;

export async function validateBookingInput(
  input: BookingInput,
): Promise<BookingInput> {
  const name = input.name?.trim();
  const email = input.email?.trim().toLowerCase();
  const service = input.service?.trim();
  const selectedDate = input.selectedDate?.trim();
  const selectedTime = input.selectedTime?.trim();

  if (!name || name.length < 2) {
    throw new AppError("El nombre es obligatorio.", {
      statusCode: 400,
      code: "INVALID_NAME",
    });
  }

  if (!email || !EMAIL_RE.test(email)) {
    throw new AppError("Introduce un email válido.", {
      statusCode: 400,
      code: "INVALID_EMAIL",
    });
  }

  const validService = CALENDAR_SERVICES.some(
    (s) => s.id === service || s.label === service,
  );
  if (!service || !validService) {
    throw new AppError("Selecciona un servicio válido.", {
      statusCode: 400,
      code: "INVALID_SERVICE",
    });
  }

  if (!selectedDate || !DATE_RE.test(selectedDate)) {
    throw new AppError("Fecha inválida.", {
      statusCode: 400,
      code: "INVALID_DATE",
    });
  }

  if (!selectedTime || !TIME_RE.test(selectedTime)) {
    throw new AppError("Horario inválido.", {
      statusCode: 400,
      code: "INVALID_TIME",
    });
  }

  const bookable = getBookableDates().some((d) => d.iso === selectedDate);
  if (!bookable || !isWeekday(parseDateIso(selectedDate))) {
    throw new AppError("La fecha seleccionada no está disponible.", {
      statusCode: 400,
      code: "DATE_NOT_BOOKABLE",
    });
  }

  if (selectedDate < formatDateIso(new Date())) {
    throw new AppError("No puedes reservar en el pasado.", {
      statusCode: 400,
      code: "DATE_IN_PAST",
    });
  }

  if (!(await isSlotAvailable(selectedDate, selectedTime))) {
    throw new AppError("Ese horario ya no está disponible.", {
      statusCode: 409,
      code: "SLOT_UNAVAILABLE",
    });
  }

  const phone = input.phone?.trim();
  if (phone && phone.length < 7) {
    throw new AppError("El teléfono no parece válido.", {
      statusCode: 400,
      code: "INVALID_PHONE",
    });
  }

  return {
    name,
    email,
    company: input.company?.trim() || undefined,
    phone: phone || undefined,
    service,
    selectedDate,
    selectedTime,
  };
}

export function validateBookingId(bookingId: unknown): string {
  if (typeof bookingId !== "string" || !/^[a-f0-9-]{36}$/i.test(bookingId)) {
    throw new AppError("Reserva inválida.", {
      statusCode: 400,
      code: "INVALID_BOOKING_ID",
    });
  }
  return bookingId;
}

import { apiUrl } from "@/lib/shared/api-url";
import type {
  AvailabilityResponse,
  BookResponse,
  BookingInput,
  BookingRecord,
} from "./types";

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(apiUrl(url), init);
  const data = (await response.json()) as T & { error?: string };

  if (!response.ok) {
    throw new Error(data.error ?? "Error en la solicitud.");
  }

  return data;
}

export async function fetchAvailability(date: string, service: string) {
  const params = new URLSearchParams({ date, service });
  return request<AvailabilityResponse>(
    `/api/calendar/availability?${params.toString()}`,
  );
}

export async function bookAppointment(input: BookingInput) {
  return request<BookResponse>("/api/calendar/book", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
}

export async function cancelAppointment(bookingId: string) {
  return request<{ booking: BookingRecord }>("/api/calendar/cancel", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ bookingId }),
  });
}

import { getServiceLabel } from "@/lib/calendar/calendar-rules";
import type { BookingInput, BookingRecord, BookingStatus } from "@/lib/calendar/types";
import { createId } from "@/lib/shared/utils";
import { getDb } from "./client";

export function getBookedTimesForDate(dateIso: string): string[] {
  const rows = getDb()
    .prepare(
      `SELECT selected_time FROM calendar_bookings
       WHERE selected_date = ? AND status = 'confirmed'`,
    )
    .all(dateIso) as Array<{ selected_time: string }>;

  return rows.map((r) => r.selected_time);
}

export function insertBooking(input: BookingInput): BookingRecord {
  const id = createId();
  const createdAt = new Date().toISOString();
  const serviceLabel = getServiceLabel(input.service);

  getDb()
    .prepare(
      `INSERT INTO calendar_bookings (
        id, name, company, email, phone, service,
        selected_date, selected_time, status, pending_sync, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'confirmed', 1, ?)`,
    )
    .run(
      id,
      input.name,
      input.company ?? null,
      input.email,
      input.phone ?? null,
      serviceLabel,
      input.selectedDate,
      input.selectedTime,
      createdAt,
    );

  return {
    id,
    name: input.name,
    company: input.company,
    email: input.email,
    phone: input.phone,
    service: serviceLabel,
    selectedDate: input.selectedDate,
    selectedTime: input.selectedTime,
    status: "confirmed",
    createdAt,
  };
}

export function getBookingById(id: string): BookingRecord | null {
  const row = getDb()
    .prepare(
      `SELECT id, name, company, email, phone, service,
              selected_date, selected_time, status, created_at
       FROM calendar_bookings WHERE id = ?`,
    )
    .get(id) as
    | {
        id: string;
        name: string;
        company: string | null;
        email: string;
        phone: string | null;
        service: string;
        selected_date: string;
        selected_time: string;
        status: BookingStatus;
        created_at: string;
      }
    | undefined;

  if (!row) {
    return null;
  }

  return {
    id: row.id,
    name: row.name,
    company: row.company ?? undefined,
    email: row.email,
    phone: row.phone ?? undefined,
    service: row.service,
    selectedDate: row.selected_date,
    selectedTime: row.selected_time,
    status: row.status,
    createdAt: row.created_at,
  };
}

export function cancelBooking(id: string): BookingRecord | null {
  const existing = getBookingById(id);
  if (!existing || existing.status === "cancelled") {
    return null;
  }

  getDb()
    .prepare(`UPDATE calendar_bookings SET status = 'cancelled' WHERE id = ?`)
    .run(id);

  return { ...existing, status: "cancelled" };
}

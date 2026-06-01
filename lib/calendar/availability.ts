import {
  ALL_SLOT_TIMES,
  formatDateIso,
  isWeekday,
  parseDateIso,
  SLOT_END_HOUR,
  SLOT_START_HOUR,
} from "./calendar-rules";
import { getBookedTimesForDate } from "@/lib/db/calendar";
import type { TimeSlot } from "./types";

function isPastSlot(dateIso: string, time: string): boolean {
  const now = new Date();
  const todayIso = formatDateIso(now);

  if (dateIso < todayIso) {
    return true;
  }

  if (dateIso > todayIso) {
    return false;
  }

  const [h, m] = time.split(":").map(Number);
  const slotMinutes = h * 60 + m;
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  return slotMinutes <= nowMinutes;
}

export function getAvailabilityForDate(dateIso: string): TimeSlot[] {
  const date = parseDateIso(dateIso);

  if (!isWeekday(date)) {
    return [];
  }

  const booked = new Set(getBookedTimesForDate(dateIso));

  return ALL_SLOT_TIMES.filter((time) => {
    const [h] = time.split(":").map(Number);
    return h >= SLOT_START_HOUR && h < SLOT_END_HOUR;
  }).map((time) => ({
    time,
    available: !booked.has(time) && !isPastSlot(dateIso, time),
  }));
}

export function isSlotAvailable(dateIso: string, time: string): boolean {
  const slots = getAvailabilityForDate(dateIso);
  const slot = slots.find((s) => s.time === time);
  return Boolean(slot?.available);
}

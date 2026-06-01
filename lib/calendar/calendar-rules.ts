import type { CalendarService } from "./types";

export const CALENDAR_SERVICES: CalendarService[] = [
  { id: "consulting", label: "Consultoría de marketing digital" },
  { id: "seo-audit", label: "Auditoría SEO" },
  { id: "content-strategy", label: "Estrategia de contenidos" },
  { id: "paid-ads", label: "Publicidad digital (Ads)" },
];

export const BOOKING_TIMEZONE = "America/Mexico_City";

/** Lunes–viernes, 9:00–17:00, slots cada 30 min. */
export const SLOT_START_HOUR = 9;
export const SLOT_END_HOUR = 17;
export const SLOT_INTERVAL_MINUTES = 30;

/** Días hábiles disponibles hacia adelante (sin contar hoy si ya pasó horario). */
export const BOOKING_HORIZON_DAYS = 21;

export const ALL_SLOT_TIMES: string[] = (() => {
  const slots: string[] = [];
  for (let hour = SLOT_START_HOUR; hour < SLOT_END_HOUR; hour++) {
    for (const minute of [0, 30]) {
      slots.push(
        `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`,
      );
    }
  }
  return slots;
})();

export function getServiceLabel(serviceIdOrLabel: string): string {
  const match = CALENDAR_SERVICES.find(
    (s) => s.id === serviceIdOrLabel || s.label === serviceIdOrLabel,
  );
  return match?.label ?? serviceIdOrLabel;
}

export function resolveServiceId(serviceIdOrLabel: string): string {
  const match = CALENDAR_SERVICES.find(
    (s) => s.id === serviceIdOrLabel || s.label === serviceIdOrLabel,
  );
  return match?.id ?? serviceIdOrLabel;
}

export function isWeekday(date: Date): boolean {
  const day = date.getDay();
  return day >= 1 && day <= 5;
}

export function formatDateIso(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function parseDateIso(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d, 12, 0, 0);
}

export function getBookableDates(): { iso: string; label: string }[] {
  const dates: { iso: string; label: string }[] = [];
  const today = new Date();
  today.setHours(12, 0, 0, 0);

  let cursor = new Date(today);
  let added = 0;
  let guard = 0;

  while (added < 10 && guard < BOOKING_HORIZON_DAYS + 14) {
    if (isWeekday(cursor) && cursor >= today) {
      const iso = formatDateIso(cursor);
      dates.push({
        iso,
        label: cursor.toLocaleDateString("es-MX", {
          weekday: "short",
          day: "numeric",
          month: "short",
        }),
      });
      added++;
    }
    cursor = new Date(cursor);
    cursor.setDate(cursor.getDate() + 1);
    guard++;
  }

  return dates;
}

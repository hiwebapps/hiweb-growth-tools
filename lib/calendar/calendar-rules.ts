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

export const WEEKDAY_LABELS_SHORT = [
  "Lun",
  "Mar",
  "Mié",
  "Jue",
  "Vie",
  "Sáb",
  "Dom",
] as const;

export type CalendarMonthCell = {
  iso: string;
  day: number;
  inCurrentMonth: boolean;
  bookable: boolean;
};

export function getTodayAtNoon(): Date {
  const today = new Date();
  today.setHours(12, 0, 0, 0);
  return today;
}

export function isBookableDate(date: Date): boolean {
  const today = getTodayAtNoon();
  const cursor = new Date(date);
  cursor.setHours(12, 0, 0, 0);

  if (!isWeekday(cursor) || cursor < today) {
    return false;
  }

  const maxDate = new Date(today);
  maxDate.setDate(maxDate.getDate() + BOOKING_HORIZON_DAYS);
  return cursor <= maxDate;
}

export function getBookableDates(): { iso: string; label: string }[] {
  const dates: { iso: string; label: string }[] = [];
  const today = getTodayAtNoon();

  let cursor = new Date(today);
  let added = 0;
  let guard = 0;

  while (added < 10 && guard < BOOKING_HORIZON_DAYS + 14) {
    if (isBookableDate(cursor)) {
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

export function getMonthCells(year: number, month: number): CalendarMonthCell[] {
  const first = new Date(year, month, 1, 12);
  const firstDayOfWeek = (first.getDay() + 6) % 7;
  const gridStart = new Date(first);
  gridStart.setDate(gridStart.getDate() - firstDayOfWeek);

  const cells: CalendarMonthCell[] = [];
  for (let i = 0; i < 42; i++) {
    const date = new Date(gridStart);
    date.setDate(gridStart.getDate() + i);
    cells.push({
      iso: formatDateIso(date),
      day: date.getDate(),
      inCurrentMonth: date.getMonth() === month,
      bookable: isBookableDate(date),
    });
  }

  return cells;
}

export function formatMonthYear(year: number, month: number): string {
  const label = new Date(year, month, 1, 12).toLocaleDateString("es-MX", {
    month: "long",
    year: "numeric",
  });
  return label.charAt(0).toUpperCase() + label.slice(1);
}

export function formatTime12h(time24: string): string {
  const [h, m] = time24.split(":").map(Number);
  const period = h >= 12 ? "p. m." : "a. m.";
  const hour12 = h % 12 || 12;
  return `${hour12}:${String(m).padStart(2, "0")} ${period}`;
}

export function formatScheduleSummary(dateIso: string, time?: string): string {
  const datePart = parseDateIso(dateIso).toLocaleDateString("es-MX", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  if (!time) {
    return datePart;
  }
  return `${datePart} ${formatTime12h(time)}`;
}

export function getBookableMonthBounds(): {
  minYear: number;
  minMonth: number;
  maxYear: number;
  maxMonth: number;
} {
  const today = getTodayAtNoon();
  const maxDate = new Date(today);
  maxDate.setDate(maxDate.getDate() + BOOKING_HORIZON_DAYS);

  return {
    minYear: today.getFullYear(),
    minMonth: today.getMonth(),
    maxYear: maxDate.getFullYear(),
    maxMonth: maxDate.getMonth(),
  };
}

export function canNavigateMonth(
  year: number,
  month: number,
  direction: -1 | 1,
): boolean {
  const bounds = getBookableMonthBounds();
  const target = new Date(year, month + direction, 1, 12);
  const min = new Date(bounds.minYear, bounds.minMonth, 1, 12);
  const max = new Date(bounds.maxYear, bounds.maxMonth, 1, 12);
  return target >= min && target <= max;
}

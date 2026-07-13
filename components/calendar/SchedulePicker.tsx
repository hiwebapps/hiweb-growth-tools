"use client";

import { useEffect, useMemo, useState } from "react";
import {
  canNavigateMonth,
  formatMonthYear,
  formatScheduleSummary,
  formatTime12h,
  getMonthCells,
  parseDateIso,
  WEEKDAY_LABELS_SHORT,
} from "@/lib/calendar/calendar-rules";
import type { TimeSlot } from "@/lib/calendar/types";

type SchedulePickerProps = {
  selectedDate?: string;
  selectedTime?: string;
  slots: TimeSlot[];
  isLoading?: boolean;
  onDateChange: (dateIso: string) => void;
  onTimeChange: (time: string) => void;
  onCancel?: () => void;
};

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
    >
      <path
        d={direction === "left" ? "M10 3L5 8l5 5" : "M6 3l5 5-5 5"}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SchedulePicker({
  selectedDate,
  selectedTime,
  slots,
  isLoading,
  onDateChange,
  onTimeChange,
  onCancel,
}: SchedulePickerProps) {
  const initialMonth = selectedDate
    ? parseDateIso(selectedDate)
    : new Date();

  const [viewYear, setViewYear] = useState(initialMonth.getFullYear());
  const [viewMonth, setViewMonth] = useState(initialMonth.getMonth());

  useEffect(() => {
    if (!selectedDate) {
      return;
    }
    const date = parseDateIso(selectedDate);
    setViewYear(date.getFullYear());
    setViewMonth(date.getMonth());
  }, [selectedDate]);

  const monthCells = useMemo(
    () => getMonthCells(viewYear, viewMonth),
    [viewYear, viewMonth],
  );

  const availableSlots = slots.filter((slot) => slot.available);
  const hasAnySlots = slots.length > 0;
  const canGoPrev = canNavigateMonth(viewYear, viewMonth, -1);
  const canGoNext = canNavigateMonth(viewYear, viewMonth, 1);

  const shiftMonth = (direction: -1 | 1) => {
    if (!canNavigateMonth(viewYear, viewMonth, direction)) {
      return;
    }
    const next = new Date(viewYear, viewMonth + direction, 1, 12);
    setViewYear(next.getFullYear());
    setViewMonth(next.getMonth());
  };

  return (
    <div className="cal-picker">
      <div className="cal-picker-main">
        <div className="cal-picker-calendar">
          <div className="cal-month-header">
            <button
              type="button"
              className="cal-month-nav"
              aria-label="Mes anterior"
              disabled={!canGoPrev}
              onClick={() => shiftMonth(-1)}
            >
              <ChevronIcon direction="left" />
            </button>
            <span className="cal-month-title">
              {formatMonthYear(viewYear, viewMonth)}
            </span>
            <button
              type="button"
              className="cal-month-nav"
              aria-label="Mes siguiente"
              disabled={!canGoNext}
              onClick={() => shiftMonth(1)}
            >
              <ChevronIcon direction="right" />
            </button>
          </div>

          <div className="cal-weekdays" aria-hidden>
            {WEEKDAY_LABELS_SHORT.map((label) => (
              <span key={label} className="cal-weekday">
                {label}
              </span>
            ))}
          </div>

          <div className="cal-month-grid" role="grid" aria-label="Calendario">
            {monthCells.map((cell) => {
              const selected = selectedDate === cell.iso;
              return (
                <button
                  key={cell.iso}
                  type="button"
                  role="gridcell"
                  aria-selected={selected}
                  aria-label={cell.iso}
                  disabled={!cell.bookable}
                  className={[
                    "cal-day",
                    !cell.inCurrentMonth ? " is-outside" : "",
                    cell.bookable ? " is-bookable" : "",
                    selected ? " is-selected" : "",
                  ].join("")}
                  onClick={() => {
                    onDateChange(cell.iso);
                    setViewYear(parseDateIso(cell.iso).getFullYear());
                    setViewMonth(parseDateIso(cell.iso).getMonth());
                  }}
                >
                  <span className="cal-day-num">{cell.day}</span>
                  {cell.bookable ? (
                    <span className="cal-day-dot" aria-hidden />
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>

        <div className="cal-picker-divider" aria-hidden />

        <div className="cal-picker-times">
          {isLoading ? (
            <div className="cal-loading" aria-live="polite">
              <span className="cal-spinner" aria-hidden />
              Cargando horarios…
            </div>
          ) : !hasAnySlots ? (
            <p className="cal-empty">
              No hay horarios disponibles este día. Elige otra fecha.
            </p>
          ) : availableSlots.length === 0 ? (
            <p className="cal-empty">
              Todos los horarios están ocupados este día. Elige otra fecha.
            </p>
          ) : (
            <div
              className="cal-time-list"
              role="listbox"
              aria-label="Horarios"
            >
              {slots.map((slot) => {
                const selected = selectedTime === slot.time;
                const occupied = !slot.available;
                return (
                  <button
                    key={slot.time}
                    type="button"
                    role="option"
                    aria-selected={selected}
                    aria-disabled={occupied}
                    disabled={occupied}
                    className={[
                      "cal-time-item",
                      selected ? "is-selected" : "",
                      occupied ? "is-unavailable" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    onClick={() => {
                      if (!occupied) {
                        onTimeChange(slot.time);
                      }
                    }}
                  >
                    <span>{formatTime12h(slot.time)}</span>
                    {occupied ? (
                      <span className="cal-time-status">Ocupado</span>
                    ) : null}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="cal-picker-footer">
        <button
          type="button"
          className="cal-btn-text"
          onClick={() => onCancel?.()}
        >
          Cancelar
        </button>
        <div className="cal-picker-summary" aria-live="polite">
          {selectedDate
            ? formatScheduleSummary(selectedDate, selectedTime)
            : "Selecciona fecha y hora"}
        </div>
      </div>
    </div>
  );
}

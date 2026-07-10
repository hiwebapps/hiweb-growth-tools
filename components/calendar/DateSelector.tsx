"use client";

import { getBookableDates } from "@/lib/calendar/calendar-rules";

type DateSelectorProps = {
  value?: string;
  hint?: string;
  onChange: (dateIso: string) => void;
};

export function DateSelector({ value, hint, onChange }: DateSelectorProps) {
  const dates = getBookableDates();

  return (
    <div className="cal-field">
      <p className="cal-field-head">
        <span>Fecha</span>
      </p>
      {hint ? <p className="cal-field-hint">{hint}</p> : null}
      <div className="cal-date-row" role="listbox" aria-label="Fechas disponibles">
        {dates.map((date) => {
          const selected = value === date.iso;
          return (
            <button
              key={date.iso}
              type="button"
              role="option"
              aria-selected={selected}
              className={`cal-date-chip${selected ? " is-selected" : ""}`}
              onClick={() => onChange(date.iso)}
            >
              <span style={{ display: "block", textTransform: "capitalize" }}>
                {date.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

"use client";

import type { TimeSlot } from "@/lib/calendar/types";

type TimeSlotSelectorProps = {
  slots: TimeSlot[];
  value?: string;
  hint?: string;
  onChange: (time: string) => void;
  isLoading?: boolean;
};

export function TimeSlotSelector({
  slots,
  value,
  hint,
  onChange,
  isLoading,
}: TimeSlotSelectorProps) {
  if (isLoading) {
    return (
      <div className="cal-field">
        <p className="cal-field-head">
          <span>Hora</span>
        </p>
        <div className="cal-loading" aria-live="polite">
          <span className="cal-spinner" aria-hidden />
          Cargando horarios disponibles…
        </div>
      </div>
    );
  }

  const available = slots.filter((s) => s.available);

  return (
    <div className="cal-field">
      <p className="cal-field-head">
        <span>Hora</span>
        {value ? (
          <span style={{ color: "var(--cal-cyan)", fontWeight: 500, fontSize: "0.875rem" }}>
            {value}
          </span>
        ) : null}
      </p>
      {hint ? <p className="cal-field-hint">{hint}</p> : null}
      {available.length === 0 ? (
        <p className="cal-empty">
          No hay horarios disponibles este día. Elige otra fecha.
        </p>
      ) : (
        <div className="cal-slot-grid" role="listbox" aria-label="Horarios disponibles">
          {available.map((slot) => {
            const selected = value === slot.time;
            return (
              <button
                key={slot.time}
                type="button"
                role="option"
                aria-selected={selected}
                className={`cal-slot${selected ? " is-selected" : ""}`}
                onClick={() => onChange(slot.time)}
              >
                {slot.time}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

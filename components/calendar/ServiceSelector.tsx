"use client";

import { CALENDAR_SERVICES } from "@/lib/calendar/calendar-rules";

type ServiceSelectorProps = {
  value: string;
  hint?: string;
  onChange: (serviceId: string) => void;
};

export function ServiceSelector({
  value,
  hint,
  onChange,
}: ServiceSelectorProps) {
  const label =
    CALENDAR_SERVICES.find((s) => s.id === value)?.label ?? value;

  return (
    <div className="cal-field">
      <label className="cal-field-head" htmlFor="calendar-service">
        <span>Servicio</span>
        <span style={{ color: "var(--cal-cyan)", fontWeight: 500, fontSize: "0.875rem" }}>
          {label.length > 28 ? `${label.slice(0, 28)}…` : label}
        </span>
      </label>
      {hint ? <p className="cal-field-hint">{hint}</p> : null}
      <select
        id="calendar-service"
        className="cal-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {CALENDAR_SERVICES.map((service) => (
          <option key={service.id} value={service.id}>
            {service.label}
          </option>
        ))}
      </select>
    </div>
  );
}

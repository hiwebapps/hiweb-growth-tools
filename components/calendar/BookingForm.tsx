"use client";

import type { BookingInput } from "@/lib/calendar/types";

type BookingFormProps = {
  value: Pick<BookingInput, "name" | "email" | "company" | "phone">;
  error?: string;
  onChange: (field: keyof BookingFormProps["value"], value: string) => void;
};

export function BookingForm({ value, error, onChange }: BookingFormProps) {
  return (
    <div className="cal-step">
      <p className="cal-field-head">
        <span>Tus datos de contacto</span>
      </p>
      {error ? (
        <p className="cal-error" role="alert">
          {error}
        </p>
      ) : null}
      <div className="cal-lead-grid">
        <div className="cal-field">
          <label htmlFor="cal-name">Nombre</label>
          <input
            id="cal-name"
            name="name"
            value={value.name}
            autoComplete="name"
            onChange={(e) => onChange("name", e.target.value)}
          />
        </div>
        <div className="cal-field">
          <label htmlFor="cal-email">Email</label>
          <input
            id="cal-email"
            name="email"
            type="email"
            value={value.email}
            autoComplete="email"
            onChange={(e) => onChange("email", e.target.value)}
          />
        </div>
        <div className="cal-field">
          <label htmlFor="cal-company">Empresa</label>
          <input
            id="cal-company"
            name="company"
            value={value.company ?? ""}
            autoComplete="organization"
            onChange={(e) => onChange("company", e.target.value)}
          />
        </div>
        <div className="cal-field">
          <label htmlFor="cal-phone">Teléfono</label>
          <input
            id="cal-phone"
            name="phone"
            type="tel"
            value={value.phone ?? ""}
            autoComplete="tel"
            onChange={(e) => onChange("phone", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

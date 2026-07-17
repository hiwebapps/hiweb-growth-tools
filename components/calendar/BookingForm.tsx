"use client";

import type { BookingInput } from "@/lib/calendar/types";
import { serviceRequiresWebsite } from "@/lib/calendar/calendar-rules";

type BookingFormProps = {
  service: string;
  value: Pick<BookingInput, "name" | "email" | "company" | "phone" | "website">;
  error?: string;
  onChange: (field: keyof BookingFormProps["value"], value: string) => void;
};

export function BookingForm({ service, value, error, onChange }: BookingFormProps) {
  const showWebsiteField = serviceRequiresWebsite(service);

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
          <label htmlFor="cal-name">
            Nombre <span className="cal-required" aria-hidden="true">*</span>
          </label>
          <input
            id="cal-name"
            name="name"
            value={value.name}
            autoComplete="name"
            required
            aria-required="true"
            onChange={(e) => onChange("name", e.target.value)}
          />
        </div>
        <div className="cal-field">
          <label htmlFor="cal-email">
            Email <span className="cal-required" aria-hidden="true">*</span>
          </label>
          <input
            id="cal-email"
            name="email"
            type="email"
            value={value.email}
            autoComplete="email"
            required
            aria-required="true"
            onChange={(e) => onChange("email", e.target.value)}
          />
        </div>
        <div className="cal-field">
          <label htmlFor="cal-company">Empresa (opcional)</label>
          <input
            id="cal-company"
            name="company"
            value={value.company ?? ""}
            autoComplete="organization"
            onChange={(e) => onChange("company", e.target.value)}
          />
        </div>
        {showWebsiteField ? (
          <div className="cal-field cal-field-span2">
            <label htmlFor="cal-website">
              Sitio web actual{" "}
              <span className="cal-required" aria-hidden="true">*</span>
            </label>
            <input
              id="cal-website"
              name="website"
              type="url"
              inputMode="url"
              placeholder="https://tusitio.com"
              value={value.website ?? ""}
              autoComplete="url"
              required
              aria-required="true"
              onChange={(e) => onChange("website", e.target.value)}
            />
          </div>
        ) : null}
        <div className="cal-field">
          <label htmlFor="cal-phone">
            Teléfono <span className="cal-required" aria-hidden="true">*</span>
          </label>
          <input
            id="cal-phone"
            name="phone"
            type="tel"
            value={value.phone ?? ""}
            autoComplete="tel"
            required
            aria-required="true"
            onChange={(e) => onChange("phone", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

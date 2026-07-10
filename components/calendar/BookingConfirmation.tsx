"use client";

import { getServiceLabel } from "@/lib/calendar/calendar-rules";
import type { BookingRecord } from "@/lib/calendar/types";

type BookingConfirmationProps = {
  booking: BookingRecord;
  title?: string;
  message?: string;
};

export function BookingConfirmation({
  booking,
  title = "Cita confirmada",
  message = "Hemos registrado tu solicitud. Recibirás un correo con los detalles.",
}: BookingConfirmationProps) {
  const dateLabel = new Date(
    `${booking.selectedDate}T12:00:00`,
  ).toLocaleDateString("es-MX", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="cal-success-panel">
      <span className="cal-success-badge">Confirmada</span>
      <h3
        style={{
          margin: "0 0 0.5rem",
          fontSize: "1.25rem",
          fontWeight: 600,
          color: "var(--cal-primary)",
        }}
      >
        {title}
      </h3>
      <p style={{ margin: "0 0 1.25rem", fontSize: "0.9375rem", color: "var(--cal-muted)" }}>
        {message}
      </p>
      <dl className="cal-summary">
        <div>
          <dt>Servicio</dt>
          <dd>{getServiceLabel(booking.service)}</dd>
        </div>
        <div>
          <dt>Fecha</dt>
          <dd style={{ textTransform: "capitalize" }}>{dateLabel}</dd>
        </div>
        <div>
          <dt>Hora</dt>
          <dd>{booking.selectedTime}</dd>
        </div>
        <div>
          <dt>Contacto</dt>
          <dd>
            {booking.name} — {booking.email}
          </dd>
        </div>
      </dl>
    </div>
  );
}

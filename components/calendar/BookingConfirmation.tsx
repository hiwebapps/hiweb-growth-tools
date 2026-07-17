"use client";

import { useState } from "react";
import {
  formatTime12h,
  getServiceLabel,
} from "@/lib/calendar/calendar-rules";
import { cancelAppointment } from "@/lib/calendar/client";
import type { BookingRecord } from "@/lib/calendar/types";

type BookingConfirmationProps = {
  booking: BookingRecord;
  title?: string;
  message?: string;
  cancelLabel?: string;
  onCancelled?: (booking: BookingRecord) => void;
};

export function BookingConfirmation({
  booking,
  title = "Cita confirmada",
  message = "Hemos registrado tu solicitud. Recibirás un correo con los detalles.",
  cancelLabel = "Cancelar cita",
  onCancelled,
}: BookingConfirmationProps) {
  const [isCancelling, setIsCancelling] = useState(false);
  const [cancelError, setCancelError] = useState<string | null>(null);
  const isCancelled = booking.status === "cancelled";

  const dateLabel = new Date(
    `${booking.selectedDate}T12:00:00`,
  ).toLocaleDateString("es-MX", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const handleCancel = async () => {
    if (isCancelled || isCancelling) {
      return;
    }

    const confirmed = window.confirm(
      "¿Seguro que quieres cancelar esta cita? El horario volverá a quedar disponible.",
    );
    if (!confirmed) {
      return;
    }

    setIsCancelling(true);
    setCancelError(null);

    try {
      const { booking: cancelled } = await cancelAppointment(booking.id);
      onCancelled?.(cancelled);
    } catch (error) {
      setCancelError(
        error instanceof Error
          ? error.message
          : "No pudimos cancelar la cita. Inténtalo de nuevo.",
      );
    } finally {
      setIsCancelling(false);
    }
  };

  return (
    <div className="cal-success-panel">
      <span
        className="cal-success-badge"
        style={isCancelled ? { color: "var(--cal-muted)" } : undefined}
      >
        {isCancelled ? "Cancelada" : "Confirmada"}
      </span>
      <h3
        style={{
          margin: "0 0 0.5rem",
          fontSize: "1.25rem",
          fontWeight: 600,
          color: "var(--cal-primary)",
        }}
      >
        {isCancelled ? "Cita cancelada" : title}
      </h3>
      <p
        style={{
          margin: "0 0 1.25rem",
          fontSize: "0.9375rem",
          color: "var(--cal-muted)",
        }}
      >
        {isCancelled
          ? "Tu horario quedó liberado. Puedes agendar otra cita cuando quieras."
          : message}
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
          <dd>{formatTime12h(booking.selectedTime)}</dd>
        </div>
        <div>
          <dt>Contacto</dt>
          <dd>
            {booking.name} — {booking.email}
          </dd>
        </div>
        {booking.website ? (
          <div>
            <dt>Sitio web</dt>
            <dd>{booking.website}</dd>
          </div>
        ) : null}
      </dl>

      {cancelError ? (
        <p className="cal-error" role="alert" style={{ marginTop: "1rem" }}>
          {cancelError}
        </p>
      ) : null}

      {!isCancelled && onCancelled ? (
        <div style={{ marginTop: "1.25rem" }}>
          <button
            type="button"
            className="cal-btn-text"
            disabled={isCancelling}
            onClick={() => void handleCancel()}
          >
            {isCancelling ? "Cancelando…" : cancelLabel}
          </button>
        </div>
      ) : null}
    </div>
  );
}

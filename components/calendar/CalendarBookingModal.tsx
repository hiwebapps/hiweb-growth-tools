"use client";

import { lazy, Suspense, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { BookingRecord } from "@/lib/calendar/types";
import { BookingConfirmation } from "./BookingConfirmation";
import { CalendarNativeStyles } from "./CalendarNativeStyles";

const CalendarToolLazy = lazy(() =>
  import("./CalendarTool").then((m) => ({
    default: m.CalendarTool,
  })),
);

export type CalendarBookingModalProps = {
  open: boolean;
  onClose: () => void;
  defaultService: string;
  title?: string;
  submitLabel?: string;
  successTitle?: string;
  successMessage?: string;
};

export function CalendarBookingModal({
  open,
  onClose,
  defaultService,
  title = "Agenda tu auditoría gratuita",
  submitLabel = "Confirmar cita",
  successTitle = "Cita confirmada",
  successMessage =
    "Hemos registrado tu solicitud. Recibirás un correo con los detalles.",
}: CalendarBookingModalProps) {
  const [booking, setBooking] = useState<BookingRecord | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) {
      setBooking(null);
      setErrorMessage(null);
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  if (!open || !mounted) {
    return null;
  }

  return createPortal(
    <div className="cal-modal-root cal-stitch">
      <CalendarNativeStyles />
      <div
        className="cal-modal-backdrop"
        role="presentation"
        onClick={onClose}
      >
        <div
          className="cal-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cal-modal-title"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="cal-modal-header">
            <h2 id="cal-modal-title" className="cal-modal-title">
              {booking ? successTitle : title}
            </h2>
            <button
              type="button"
              className="cal-modal-close"
              aria-label="Cerrar"
              onClick={onClose}
            >
              ×
            </button>
          </div>

          <div className="cal-modal-body">
            {errorMessage ? (
              <p className="cal-error" role="alert" style={{ marginBottom: "1rem" }}>
                {errorMessage}
              </p>
            ) : null}

            {booking ? (
              <BookingConfirmation
                booking={booking}
                title={successTitle}
                message={successMessage}
              />
            ) : (
              <Suspense
                fallback={
                  <p className="cal-loading-page" style={{ padding: "2rem 0" }}>
                    Cargando calendario…
                  </p>
                }
              >
                <CalendarToolLazy
                  defaultService={defaultService}
                  submitButtonLabel={submitLabel}
                  onError={(message) => setErrorMessage(message)}
                  onBooked={(record) => {
                    setBooking(record);
                    setErrorMessage(null);
                  }}
                />
              </Suspense>
            )}
          </div>

          {booking ? (
            <div className="cal-modal-footer">
              <button
                type="button"
                className="cal-btn-primary"
                onClick={onClose}
              >
                Cerrar
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>,
    document.body,
  );
}

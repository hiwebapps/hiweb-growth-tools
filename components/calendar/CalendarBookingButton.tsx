"use client";

import { lazy, Suspense, useCallback, useState } from "react";
import { CalendarNativeStyles } from "./CalendarNativeStyles";

const CalendarBookingModalLazy = lazy(() =>
  import("./CalendarBookingModal").then((m) => ({
    default: m.CalendarBookingModal,
  })),
);

export type CalendarBookingButtonProps = {
  buttonLabel: string;
  defaultService?: string;
  modalTitle?: string;
  submitLabel?: string;
  successTitle?: string;
  successMessage?: string;
  successRedirectUrl?: string;
  className?: string;
  disabled?: boolean;
};

export function CalendarBookingButton({
  buttonLabel,
  defaultService = "seo-audit",
  modalTitle,
  submitLabel = "Confirmar cita",
  successTitle = "Cita confirmada",
  successMessage =
    "Hemos registrado tu solicitud. Recibirás un correo con los detalles.",
  successRedirectUrl,
  className,
  disabled = false,
}: CalendarBookingButtonProps) {
  const [open, setOpen] = useState(false);

  const handleOpen = useCallback(() => {
    if (disabled) {
      return;
    }
    setOpen(true);
  }, [disabled]);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const rootClass = ["cal-stitch", "cal-booking-trigger-root", className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={rootClass}>
      <CalendarNativeStyles />
      <button
        type="button"
        className="cal-booking-trigger"
        disabled={disabled}
        onClick={handleOpen}
      >
        {buttonLabel}
        <span aria-hidden> →</span>
      </button>

      {open ? (
        <Suspense fallback={null}>
          <CalendarBookingModalLazy
            open={open}
            onClose={handleClose}
            defaultService={defaultService}
            title={modalTitle ?? buttonLabel}
            submitLabel={submitLabel}
            successTitle={successTitle}
            successMessage={successMessage}
            successRedirectUrl={successRedirectUrl}
          />
        </Suspense>
      ) : null}
    </div>
  );
}

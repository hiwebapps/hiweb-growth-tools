"use client";

import { CalendarBookingButton } from "@/components/calendar/CalendarBookingButton";
import { CalendarNativeStyles } from "@/components/calendar/CalendarNativeStyles";
import type { CodeComponentBaseProps } from "@/lib/shared/code-component";
import { mergeProps } from "@/lib/shared/code-component";
import { isWebflowDesignerCanvas } from "@/lib/shared/is-webflow-designer";

export type CalendarBookingButtonComponentProps = CodeComponentBaseProps & {
  buttonLabel?: string;
  defaultService?: string;
  modalTitle?: string;
  submitLabel?: string;
  successTitle?: string;
  successMessage?: string;
  successRedirectUrl?: string;
};

const DEFAULTS: CalendarBookingButtonComponentProps = {
  buttonLabel: "Agenda tu auditoría gratuita",
  defaultService: "seo-audit",
  modalTitle: "Agenda tu auditoría gratuita",
  submitLabel: "Confirmar cita",
  successTitle: "Cita confirmada",
  successMessage:
    "Hemos registrado tu solicitud. Recibirás un correo con los detalles.",
};

export function CalendarBookingButtonComponent(
  rawProps: CalendarBookingButtonComponentProps = {},
) {
  const props = mergeProps(DEFAULTS, rawProps);
  const {
    className,
    buttonLabel,
    defaultService,
    modalTitle,
    submitLabel,
    successTitle,
    successMessage,
    successRedirectUrl,
  } = props;

  const label = buttonLabel ?? DEFAULTS.buttonLabel!;
  const rootClass = `cal-stitch ${className ?? ""}`.trim();

  if (isWebflowDesignerCanvas()) {
    return (
      <div className={rootClass}>
        <CalendarNativeStyles />
        <p className="cal-designer-badge">
          Vista previa en Designer — al publicar, el botón abre el calendario en
          popup.
        </p>
        <button type="button" className="cal-booking-trigger" disabled>
          {label}
          <span aria-hidden> →</span>
        </button>
      </div>
    );
  }

  return (
    <CalendarBookingButton
      className={className}
      buttonLabel={label}
      defaultService={defaultService ?? DEFAULTS.defaultService}
      modalTitle={modalTitle ?? DEFAULTS.modalTitle}
      submitLabel={submitLabel ?? DEFAULTS.submitLabel}
      successTitle={successTitle ?? DEFAULTS.successTitle}
      successMessage={successMessage ?? DEFAULTS.successMessage}
      successRedirectUrl={successRedirectUrl}
    />
  );
}

export default CalendarBookingButtonComponent;

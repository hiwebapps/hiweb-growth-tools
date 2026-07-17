import { declareComponent } from "@webflow/react";
import { props } from "@webflow/data-types";
import CalendarBookingButtonComponent from "./CalendarBookingButtonComponent";

export default declareComponent(CalendarBookingButtonComponent, {
  name: "Calendario — Botón agendar",
  description:
    "Botón CTA que abre el calendario de citas en un popup al hacer clic.",
  group: "Hiweb Growth Tools",
  props: {
    buttonLabel: props.Text({
      name: "Texto del botón",
      defaultValue: "Agenda tu auditoría gratuita",
    }),
    defaultService: props.Variant({
      name: "Servicio por defecto",
      options: [
        "consulting",
        "seo-audit",
        "website-audit",
        "content-strategy",
        "paid-ads",
      ],
      defaultValue: "seo-audit",
    }),
    modalTitle: props.Text({
      name: "Título del popup",
      defaultValue: "Agenda tu auditoría gratuita",
    }),
    submitLabel: props.Text({
      name: "Texto botón confirmar cita",
      defaultValue: "Confirmar cita",
    }),
    successTitle: props.Text({
      name: "Título cita confirmada",
      defaultValue: "Cita confirmada",
    }),
    successMessage: props.Text({
      name: "Mensaje cita confirmada",
      defaultValue:
        "Hemos registrado tu solicitud. Recibirás un correo con los detalles.",
    }),
    successRedirectUrl: props.Text({
      name: "URL redirección al confirmar (opcional)",
      defaultValue: "",
    }),
  },
  options: {
    ssr: false,
    applyTagSelectors: false,
  },
});

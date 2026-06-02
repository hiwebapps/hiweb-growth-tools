import { declareComponent } from "@webflow/react";
import { props } from "@webflow/data-types";
import { contentProps } from "./shared.webflow-props";
import CalendarToolComponent from "./CalendarToolComponent";

export default declareComponent(CalendarToolComponent, {
  name: "Calendario — Agendar llamada",
  description:
    "Calendario para consultar disponibilidad y reservar una llamada con Hiweb.",
  group: "Hiweb Growth Tools",
  props: {
    ...contentProps({
      eyebrow: "Agenda",
      title: "Reserva una llamada con Hiweb",
      description:
        "Elige servicio, fecha y horario disponible. Te confirmaremos por correo.",
    }),
    defaultService: props.Variant({
      name: "Servicio por defecto",
      options: [
        "consulting",
        "seo-audit",
        "content-strategy",
        "paid-ads",
      ],
      defaultValue: "consulting",
    }),
    submitButtonLabel: props.Text({
      name: "Texto botón confirmar",
      defaultValue: "Confirmar cita",
    }),
    successTitle: props.Text({
      name: "Título éxito",
      defaultValue: "Cita confirmada",
    }),
    successMessage: props.Text({
      name: "Mensaje éxito",
      defaultValue:
        "Hemos registrado tu solicitud. Recibirás un correo con los detalles.",
    }),
  },
  options: {
    ssr: false,
    applyTagSelectors: false,
  },
});

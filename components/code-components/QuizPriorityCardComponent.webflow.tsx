import { declareComponent } from "@webflow/react";
import { props } from "@webflow/data-types";
import QuizPriorityCardComponent from "./QuizPriorityCardComponent";

export default declareComponent(QuizPriorityCardComponent, {
  name: "Quiz resultado — Prioridad",
  description:
    "Una tarjeta de prioridad (1, 2 o 3). Arrastra tres instancias en la página de resultados.",
  group: "Hiweb Growth Tools",
  props: {
    priorityIndex: props.Number({
      name: "Numero de prioridad",
      defaultValue: 1,
      min: 1,
      max: 3,
    }),
    titleOverride: props.Text({
      name: "Titulo (opcional)",
      defaultValue: "",
    }),
    descriptionOverride: props.Text({
      name: "Descripcion (opcional)",
      defaultValue: "",
    }),
  },
  options: {
    ssr: false,
    applyTagSelectors: false,
  },
});

import { declareComponent } from "@webflow/react";
import QuizResultPrioritiesComponent from "./QuizResultPrioritiesComponent";

export default declareComponent(QuizResultPrioritiesComponent, {
  name: "Quiz resultado — Prioridades",
  description:
    "Muestra las 3 prioridades digitales automáticamente según el resultado del quiz.",
  group: "Hiweb Growth Tools",
  props: {},
  options: {
    ssr: false,
    applyTagSelectors: false,
  },
});

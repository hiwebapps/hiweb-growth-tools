import { declareComponent } from "@webflow/react";
import QuizResultBreakdownComponent from "./QuizResultBreakdownComponent";

export default declareComponent(QuizResultBreakdownComponent, {
  name: "Quiz resultado — Desglose por area",
  description: "Barras por categoría del diagnóstico. Usa datos del quiz completado.",
  group: "Hiweb Growth Tools",
  props: {},
  options: {
    ssr: false,
    applyTagSelectors: false,
  },
});

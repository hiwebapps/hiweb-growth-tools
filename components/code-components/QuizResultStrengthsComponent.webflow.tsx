import { declareComponent } from "@webflow/react";
import QuizResultStrengthsComponent from "./QuizResultStrengthsComponent";

export default declareComponent(QuizResultStrengthsComponent, {
  name: "Quiz resultado — Fortalezas",
  description: "Lista de fortalezas del diagnóstico.",
  group: "Hiweb Growth Tools",
  props: {},
  options: {
    ssr: false,
    applyTagSelectors: false,
  },
});

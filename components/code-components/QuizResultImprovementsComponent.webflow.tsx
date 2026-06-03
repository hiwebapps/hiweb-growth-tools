import { declareComponent } from "@webflow/react";
import QuizResultImprovementsComponent from "./QuizResultImprovementsComponent";

export default declareComponent(QuizResultImprovementsComponent, {
  name: "Quiz resultado — Oportunidades",
  description: "Lista de áreas a mejorar del diagnóstico.",
  group: "Hiweb Growth Tools",
  props: {},
  options: {
    ssr: false,
    applyTagSelectors: false,
  },
});

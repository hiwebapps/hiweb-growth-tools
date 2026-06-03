import { declareComponent } from "@webflow/react";
import QuizResultInsightsComponent from "./QuizResultInsightsComponent";

export default declareComponent(QuizResultInsightsComponent, {
  name: "Quiz resultado — Fortalezas y mejoras",
  description:
    "Fortalezas (izquierda) y oportunidades de mejora (derecha). En móvil se apilan.",
  group: "Hiweb Growth Tools",
  props: {},
  options: {
    ssr: false,
    applyTagSelectors: false,
  },
});

import { declareComponent } from "@webflow/react";
import QuizResultScoreComponent from "./QuizResultScoreComponent";

export default declareComponent(QuizResultScoreComponent, {
  name: "Quiz resultado — Score general",
  description:
    "Anillo de score y nivel. Lee los datos guardados al completar el quiz (sessionStorage).",
  group: "Hiweb Growth Tools",
  props: {},
  options: {
    ssr: false,
    applyTagSelectors: false,
  },
});

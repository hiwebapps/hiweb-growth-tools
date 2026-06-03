import { declareComponent } from "@webflow/react";
import QuizResultOverviewComponent from "./QuizResultOverviewComponent";

export default declareComponent(QuizResultOverviewComponent, {
  name: "Quiz resultado — Score y desglose",
  description:
    "Score general (izquierda) y desglose por área (derecha). En móvil se apilan.",
  group: "Hiweb Growth Tools",
  props: {},
  options: {
    ssr: false,
    applyTagSelectors: false,
  },
});

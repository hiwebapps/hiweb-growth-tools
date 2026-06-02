import { declareComponent } from "@webflow/react";
import { props } from "@webflow/data-types";
import SmokeTestComponent from "./SmokeTestComponent";

export default declareComponent(SmokeTestComponent, {
  name: "Smoke Test Hiweb",
  description: "Prueba minima de biblioteca. Usar primero en Designer.",
  group: "Hiweb Growth Tools",
  props: {
    label: props.Text({
      name: "Texto",
      defaultValue: "Hiweb OK",
    }),
  },
  options: {
    ssr: false,
    applyTagSelectors: false,
  },
});

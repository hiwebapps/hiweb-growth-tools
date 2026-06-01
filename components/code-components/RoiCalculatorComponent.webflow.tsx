import { declareComponent } from "@webflow/react";
import { props } from "@webflow/data-types";
import { contentProps } from "./shared.webflow-props";
import RoiCalculatorComponent from "./RoiCalculatorComponent";

export default declareComponent(RoiCalculatorComponent, {
  name: "Calculadora — ROI marketing",
  description:
    "Estima leads, ventas, ingresos y ROI según presupuesto y conversión.",
  group: "Hiweb Growth Tools",
  props: {
    ...contentProps({
      eyebrow: "ROI",
      title: "Calcula el retorno de tu inversión en marketing",
      description:
        "Estima leads, ventas e ingresos potenciales según tu presupuesto y ticket medio.",
    }),
    defaultMonthlyBudget: props.Number({
      name: "Presupuesto mensual (USD)",
      defaultValue: 3000,
      min: 100,
      max: 500000,
    }),
    defaultLeadValue: props.Number({
      name: "Valor por lead (USD)",
      defaultValue: 500,
      min: 10,
      max: 1000000,
    }),
    ctaLabel: props.Text({
      name: "Texto CTA",
      defaultValue: "Quiero una propuesta",
    }),
    ctaUrl: props.Text({
      name: "URL CTA",
      defaultValue: "/calendario",
    }),
  },
  options: {
    ssr: true,
    applyTagSelectors: false,
  },
});

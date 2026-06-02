import { declareComponent } from "@webflow/react";
import { props } from "@webflow/data-types";
import { contentProps } from "./shared.webflow-props";
import RoiCalculatorComponent from "./RoiCalculatorComponent";

export default declareComponent(RoiCalculatorComponent, {
  name: "Calculadora ROI marketing",
  description:
    "Estima leads, ingresos y ROI según presupuesto, industria y ticket medio.",
  group: "Hiweb Growth Tools",
  props: {
    ...contentProps({
      eyebrow: "ROI",
      title: "Maximiza tu Retorno",
      description:
        "Calcula el impacto real de tu inversión en marketing digital con nuestra herramienta de precisión.",
    }),
    defaultMonthlyBudget: props.Number({
      name: "Presupuesto mensual (USD)",
      defaultValue: 5000,
      min: 1000,
      max: 50000,
    }),
    defaultLeadValue: props.Number({
      name: "Ticket promedio (USD)",
      defaultValue: 1200,
      min: 100,
      max: 10000,
    }),
    defaultLeadsToClose: props.Number({
      name: "Leads para cerrar venta",
      defaultValue: 15,
      min: 1,
      max: 100,
    }),
    ctaLabel: props.Text({
      name: "Texto CTA",
      defaultValue: "Obtener auditoría gratuita",
    }),
    ctaUrl: props.Text({
      name: "URL CTA",
      defaultValue: "/tools/calendario",
    }),
  },
  options: {
    ssr: false,
    applyTagSelectors: false,
  },
});

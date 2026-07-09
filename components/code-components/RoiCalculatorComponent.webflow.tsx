import { declareComponent } from "@webflow/react";
import { props } from "@webflow/data-types";
import { ROI_BUDGET, ROI_TICKET } from "@/lib/roi/currency";
import RoiCalculatorComponent from "./RoiCalculatorComponent";

export default declareComponent(RoiCalculatorComponent, {
  name: "Calculadora ROI marketing",
  description:
    "Calculadora en dos pasos: inputs y resultados con CTA a auditoría.",
  group: "Hiweb Growth Tools",
  props: {
    minMonthlyBudget: props.Number({
      name: "Mínimo presupuesto mensual (MXN)",
      defaultValue: ROI_BUDGET.min,
      min: ROI_BUDGET.minConfigMin,
      max: ROI_BUDGET.minConfigMax,
    }),
    defaultMonthlyBudget: props.Number({
      name: "Presupuesto mensual inicial (MXN)",
      defaultValue: ROI_BUDGET.default,
      min: ROI_BUDGET.min,
      max: ROI_BUDGET.max,
    }),
    defaultLeadValue: props.Number({
      name: "Ticket promedio (MXN)",
      defaultValue: ROI_TICKET.default,
      min: ROI_TICKET.min,
      max: ROI_TICKET.max,
    }),
    defaultLeadsToClose: props.Number({
      name: "Leads para cerrar venta",
      defaultValue: 15,
      min: 1,
      max: 100,
    }),
    resultsButtonLabel: props.Text({
      name: "Texto botón ver resultados",
      defaultValue: "Ver resultados",
    }),
    retryButtonLabel: props.Text({
      name: "Texto botón volver",
      defaultValue: "Volver a intentar",
    }),
    ctaLabel: props.Text({
      name: "Texto CTA auditoría",
      defaultValue: "Agenda tu auditoría gratuita",
    }),
    ctaUrl: props.Text({
      name: "URL CTA auditoría",
      defaultValue: "/tools/calendario",
    }),
  },
  options: {
    ssr: false,
    applyTagSelectors: false,
  },
});

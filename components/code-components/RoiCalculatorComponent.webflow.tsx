import { declareComponent } from "@webflow/react";
import { props } from "@webflow/data-types";
import { ROI_BUDGET, ROI_TICKET, ROI_USD_TO_MXN } from "@/lib/roi/currency";
import { DEFAULT_BENCHMARKS } from "@/lib/roi/defaults";
import RoiCalculatorComponent from "./RoiCalculatorComponent";

export default declareComponent(RoiCalculatorComponent, {
  name: "Calculadora ROI marketing",
  description:
    "Calculadora por industria (E-commerce, Inmobiliario, SaaS, B2B) en dos pasos.",
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
      name: "Ticket promedio B2B (MXN)",
      defaultValue: ROI_TICKET.default,
      min: ROI_TICKET.min,
      max: ROI_TICKET.max,
    }),
    defaultLeadsToClose: props.Number({
      name: "Leads para cerrar (B2B)",
      defaultValue: 15,
      min: 1,
      max: 100,
    }),
    ecommerceCpcMxn: props.Number({
      name: "Benchmark CPC E-commerce (MXN)",
      defaultValue: DEFAULT_BENCHMARKS.ecommerceCpcMxn,
      min: 1,
      max: 500,
    }),
    realEstateCplMxn: props.Number({
      name: "Benchmark CPL Inmobiliario (MXN)",
      defaultValue: DEFAULT_BENCHMARKS.realEstateCplMxn,
      min: 50,
      max: 5_000,
    }),
    realEstateSeriousLeadRate: props.Number({
      name: "Tasa leads serios Inmobiliario (0-1)",
      defaultValue: DEFAULT_BENCHMARKS.realEstateSeriousLeadRate,
      min: 0.01,
      max: 0.5,
    }),
    saasCplUsd: props.Number({
      name: "Benchmark CPL SaaS (USD)",
      defaultValue: DEFAULT_BENCHMARKS.saasCplUsd,
      min: 1,
      max: 500,
    }),
    usdToMxn: props.Number({
      name: "Tipo de cambio USD a MXN",
      defaultValue: ROI_USD_TO_MXN,
      min: 10,
      max: 30,
    }),
    b2bCplMxn: props.Number({
      name: "Benchmark CPL B2B (MXN)",
      defaultValue: DEFAULT_BENCHMARKS.b2bCplMxn,
      min: 50,
      max: 5_000,
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
      name: "URL CTA externa (opcional)",
      defaultValue: "",
    }),
    calendarService: props.Text({
      name: "Servicio del calendario",
      defaultValue: "seo-audit",
    }),
    calendarModalTitle: props.Text({
      name: "Título del popup",
      defaultValue: "Agenda tu auditoría gratuita",
    }),
    calendarContinueLabel: props.Text({
      name: "Texto botón continuar (calendario)",
      defaultValue: "Continuar",
    }),
    calendarSubmitLabel: props.Text({
      name: "Texto botón confirmar cita",
      defaultValue: "Confirmar cita",
    }),
    calendarSuccessTitle: props.Text({
      name: "Título cita confirmada",
      defaultValue: "Cita confirmada",
    }),
    calendarSuccessMessage: props.Text({
      name: "Mensaje cita confirmada",
      defaultValue:
        "Hemos registrado tu solicitud. Recibirás un correo con los detalles.",
    }),
  },
  options: {
    ssr: false,
    applyTagSelectors: false,
  },
});

import type {
  B2bLegacyMetrics,
  EcommerceMetrics,
  RealEstateMetrics,
  RoiBenchmarks,
  RoiCalculatorState,
  RoiIndustryMetrics,
  SaasMetrics,
} from "./types";

function round2(value: number): number {
  return Math.round(value * 100) / 100;
}

function safeDiv(numerator: number, denominator: number): number {
  if (!Number.isFinite(denominator) || denominator <= 0) {
    return 0;
  }
  return numerator / denominator;
}

export function calculateEcommerce(
  state: RoiCalculatorState,
  benchmarks: RoiBenchmarks,
): EcommerceMetrics {
  const cpc = benchmarks.ecommerceCpcMxn;
  const visitasGeneradas = safeDiv(state.monthlyBudget, cpc);
  const ventasEstimadas = visitasGeneradas * (state.tasaConversion / 100);
  const cac = safeDiv(state.monthlyBudget, ventasEstimadas);
  const ingresosProyectados = ventasEstimadas * state.ticketPromedio;
  const roas = safeDiv(ingresosProyectados, state.monthlyBudget);
  const estimatedRoi =
    state.monthlyBudget > 0
      ? ((ingresosProyectados - state.monthlyBudget) / state.monthlyBudget) * 100
      : 0;

  return {
    industry: "ecommerce",
    visitasGeneradas: round2(visitasGeneradas),
    ventasEstimadas: round2(ventasEstimadas),
    cac: round2(cac),
    ingresosProyectados: round2(ingresosProyectados),
    roas: round2(roas),
    estimatedRoi: round2(estimatedRoi),
  };
}

export function calculateRealEstate(
  state: RoiCalculatorState,
  benchmarks: RoiBenchmarks,
): RealEstateMetrics {
  const inversionAcumulada = state.monthlyBudget * state.mesesCampana;
  const leadsTotales = safeDiv(inversionAcumulada, benchmarks.realEstateCplMxn);
  const citasGeneradas = leadsTotales * benchmarks.realEstateSeriousLeadRate;
  const cierresTotales = leadsTotales * (state.tasaCierre / 100);
  const ingresoPorCierre =
    state.valorPropiedad * (state.porcentajeComision / 100);
  const ingresosGenerados = cierresTotales * ingresoPorCierre;
  const estimatedRoi =
    inversionAcumulada > 0
      ? ((ingresosGenerados - inversionAcumulada) / inversionAcumulada) * 100
      : 0;

  return {
    industry: "real-estate",
    inversionAcumulada: round2(inversionAcumulada),
    leadsTotales: round2(leadsTotales),
    citasGeneradas: round2(citasGeneradas),
    cierresTotales: round2(cierresTotales),
    ingresosGenerados: round2(ingresosGenerados),
    estimatedRoi: round2(estimatedRoi),
  };
}

export function calculateSaas(
  state: RoiCalculatorState,
  benchmarks: RoiBenchmarks,
): SaasMetrics {
  const cplMxn = benchmarks.saasCplUsd * benchmarks.usdToMxn;
  const leadsTotales = safeDiv(state.monthlyBudget, cplMxn);
  const clientesNuevos = safeDiv(leadsTotales, state.leadsParaCierre);
  const cac = safeDiv(state.monthlyBudget, clientesNuevos);
  const ltv = state.suscripcionMensualUsd * state.mesesPermanencia;
  const ingresoTotalProyectado = clientesNuevos * ltv;
  const ingresoTotalProyectadoMxn = ingresoTotalProyectado * benchmarks.usdToMxn;
  const cacUsd = safeDiv(cac, benchmarks.usdToMxn);
  const relacionLtvCac = safeDiv(ltv, cacUsd);
  const estimatedRoi =
    state.monthlyBudget > 0
      ? ((ingresoTotalProyectadoMxn - state.monthlyBudget) / state.monthlyBudget) *
        100
      : 0;

  return {
    industry: "saas",
    leadsTotales: round2(leadsTotales),
    clientesNuevos: round2(clientesNuevos),
    cac: round2(cac),
    ltv: round2(ltv),
    ingresoTotalProyectado: round2(ingresoTotalProyectado),
    relacionLtvCac: round2(relacionLtvCac),
    estimatedRoi: round2(estimatedRoi),
  };
}

export function calculateB2bLegacy(
  state: RoiCalculatorState,
  benchmarks: RoiBenchmarks,
): B2bLegacyMetrics {
  const costPerLead = benchmarks.b2bCplMxn;
  const estimatedLeads = safeDiv(state.monthlyBudget, costPerLead);
  const estimatedSales = safeDiv(estimatedLeads, state.leadsToCloseSale);
  const estimatedCac = costPerLead * state.leadsToCloseSale;
  const estimatedRevenue = estimatedSales * state.averageLeadValue;
  const estimatedRoas = safeDiv(estimatedRevenue, state.monthlyBudget);
  const estimatedRoi =
    state.monthlyBudget > 0
      ? ((estimatedRevenue - state.monthlyBudget) / state.monthlyBudget) * 100
      : 0;

  return {
    industry: "b2b-services",
    costPerLead: round2(costPerLead),
    estimatedLeads: round2(estimatedLeads),
    estimatedSales: round2(estimatedSales),
    estimatedCac: round2(estimatedCac),
    estimatedRevenue: round2(estimatedRevenue),
    estimatedRoas: round2(estimatedRoas),
    estimatedRoi: round2(estimatedRoi),
  };
}

export function calculateIndustryMetrics(
  state: RoiCalculatorState,
  benchmarks: RoiBenchmarks,
): RoiIndustryMetrics {
  switch (state.industry) {
    case "ecommerce":
      return calculateEcommerce(state, benchmarks);
    case "real-estate":
      return calculateRealEstate(state, benchmarks);
    case "saas":
      return calculateSaas(state, benchmarks);
    case "b2b-services":
    default:
      return calculateB2bLegacy(state, benchmarks);
  }
}

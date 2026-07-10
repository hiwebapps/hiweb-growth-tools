import { ROI_BUDGET, ROI_TICKET, ROI_USD_TO_MXN } from "./currency";
import type { RoiBenchmarks, RoiCalculatorState, RoiIndustryId } from "./types";

export const DEFAULT_BENCHMARKS: RoiBenchmarks = {
  ecommerceCpcMxn: 10,
  realEstateCplMxn: 350,
  realEstateSeriousLeadRate: 0.05,
  saasCplUsd: 25,
  usdToMxn: ROI_USD_TO_MXN,
  b2bCplMxn: 500,
};

export type RoiDefaultInputs = {
  monthlyBudget: number;
  ticketPromedio: number;
  tasaConversion: number;
  mesesCampana: number;
  valorPropiedad: number;
  porcentajeComision: number;
  tasaCierre: number;
  suscripcionMensualUsd: number;
  mesesPermanencia: number;
  leadsParaCierre: number;
  averageLeadValue: number;
  leadsToCloseSale: number;
};

export const DEFAULT_INPUTS: RoiDefaultInputs = {
  monthlyBudget: ROI_BUDGET.default,
  ticketPromedio: 800,
  tasaConversion: 2,
  mesesCampana: 3,
  valorPropiedad: 4_000_000,
  porcentajeComision: 4,
  tasaCierre: 1,
  suscripcionMensualUsd: 49,
  mesesPermanencia: 12,
  leadsParaCierre: 20,
  averageLeadValue: ROI_TICKET.default,
  leadsToCloseSale: 15,
};

export function createDefaultRoiState(
  overrides: Partial<RoiDefaultInputs> = {},
  industry: RoiIndustryId = "ecommerce",
): RoiCalculatorState {
  const d = { ...DEFAULT_INPUTS, ...overrides };
  return {
    industry,
    monthlyBudget: d.monthlyBudget,
    ticketPromedio: d.ticketPromedio,
    tasaConversion: d.tasaConversion,
    mesesCampana: d.mesesCampana,
    valorPropiedad: d.valorPropiedad,
    porcentajeComision: d.porcentajeComision,
    tasaCierre: d.tasaCierre,
    suscripcionMensualUsd: d.suscripcionMensualUsd,
    mesesPermanencia: d.mesesPermanencia,
    leadsParaCierre: d.leadsParaCierre,
    averageLeadValue: d.averageLeadValue,
    leadsToCloseSale: d.leadsToCloseSale,
  };
}

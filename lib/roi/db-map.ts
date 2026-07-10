import type { RoiCalculationResult } from "./types";

export function resultToDbFields(
  result: RoiCalculationResult,
  stateMonthlyBudget: number,
): {
  monthlyBudget: number;
  estimatedLeads: number;
  estimatedSales: number;
  estimatedRevenue: number;
  estimatedRoi: number;
} {
  const m = result.metrics;

  switch (m.industry) {
    case "ecommerce":
      return {
        monthlyBudget: stateMonthlyBudget,
        estimatedLeads: m.visitasGeneradas,
        estimatedSales: m.ventasEstimadas,
        estimatedRevenue: m.ingresosProyectados,
        estimatedRoi: m.estimatedRoi,
      };
    case "real-estate":
      return {
        monthlyBudget: m.inversionAcumulada,
        estimatedLeads: m.leadsTotales,
        estimatedSales: m.cierresTotales,
        estimatedRevenue: m.ingresosGenerados,
        estimatedRoi: m.estimatedRoi,
      };
    case "saas":
      return {
        monthlyBudget: stateMonthlyBudget,
        estimatedLeads: m.leadsTotales,
        estimatedSales: m.clientesNuevos,
        estimatedRevenue: m.ingresoTotalProyectado,
        estimatedRoi: m.estimatedRoi,
      };
    case "b2b-services":
    default:
      return {
        monthlyBudget: stateMonthlyBudget,
        estimatedLeads: m.estimatedLeads,
        estimatedSales: m.estimatedSales,
        estimatedRevenue: m.estimatedRevenue,
        estimatedRoi: m.estimatedRoi,
      };
  }
}

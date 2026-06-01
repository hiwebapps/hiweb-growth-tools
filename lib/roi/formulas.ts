import type { RoiInputs } from "./types";

/** CPL estimado cuando el usuario no indica uno (benchmark B2B marketing). */
export function deriveCostPerLead(monthlyBudget: number): number {
  if (monthlyBudget < 1500) {
    return 45;
  }
  if (monthlyBudget < 5000) {
    return 65;
  }
  if (monthlyBudget < 15000) {
    return 85;
  }
  return 110;
}

export function calculateRoiMetrics(inputs: RoiInputs) {
  const costPerLead = inputs.costPerLead ?? deriveCostPerLead(inputs.monthlyBudget);
  const estimatedLeads = inputs.monthlyBudget / costPerLead;
  const conversionDecimal = inputs.conversionRate / 100;
  const estimatedSales = estimatedLeads * conversionDecimal;
  const estimatedRevenue = estimatedSales * inputs.averageLeadValue;
  const estimatedRoi =
    inputs.monthlyBudget > 0
      ? ((estimatedRevenue - inputs.monthlyBudget) / inputs.monthlyBudget) * 100
      : 0;

  return {
    monthlyBudget: inputs.monthlyBudget,
    estimatedLeads: round2(estimatedLeads),
    costPerLead: round2(costPerLead),
    conversionRate: inputs.conversionRate,
    estimatedSales: round2(estimatedSales),
    estimatedRevenue: round2(estimatedRevenue),
    estimatedRoi: round2(estimatedRoi),
  };
}

function round2(value: number): number {
  return Math.round(value * 100) / 100;
}

import { getIndustryEstimatedCpl, type RoiIndustryId } from "./industry";
import type { RoiInputs } from "./types";

export function calculateRoiMetrics(inputs: RoiInputs) {
  const industry: RoiIndustryId = inputs.industry ?? "saas";
  const costPerLead =
    inputs.costPerLead ?? getIndustryEstimatedCpl(industry);

  const estimatedLeads = inputs.monthlyBudget / costPerLead;

  let estimatedSales: number;
  let estimatedCac: number;
  let effectiveConversionRate: number;

  if (inputs.leadsToCloseSale && inputs.leadsToCloseSale > 0) {
    estimatedSales = estimatedLeads / inputs.leadsToCloseSale;
    estimatedCac = costPerLead * inputs.leadsToCloseSale;
    effectiveConversionRate =
      estimatedLeads > 0 ? (estimatedSales / estimatedLeads) * 100 : 0;
  } else {
    const rate = inputs.conversionRate ?? 12;
    effectiveConversionRate = rate;
    estimatedSales = estimatedLeads * (rate / 100);
    estimatedCac =
      estimatedSales > 0 ? inputs.monthlyBudget / estimatedSales : 0;
  }

  const estimatedRevenue = estimatedSales * inputs.averageLeadValue;
  const estimatedRoas =
    inputs.monthlyBudget > 0 ? estimatedRevenue / inputs.monthlyBudget : 0;
  const estimatedRoi =
    inputs.monthlyBudget > 0
      ? ((estimatedRevenue - inputs.monthlyBudget) / inputs.monthlyBudget) * 100
      : 0;

  return {
    monthlyBudget: inputs.monthlyBudget,
    estimatedLeads: round2(estimatedLeads),
    costPerLead: round2(costPerLead),
    estimatedCac: round2(estimatedCac),
    conversionRate: round2(effectiveConversionRate),
    estimatedSales: round2(estimatedSales),
    estimatedRevenue: round2(estimatedRevenue),
    estimatedRoas: round2(estimatedRoas),
    estimatedRoi: round2(estimatedRoi),
  };
}

function round2(value: number): number {
  return Math.round(value * 100) / 100;
}

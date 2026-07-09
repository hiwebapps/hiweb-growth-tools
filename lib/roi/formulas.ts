import { getIndustryCplMultiplier, type RoiIndustryId } from "./industry";
import { ROI_CPL_BUDGET_TIERS } from "./currency";
import type { RoiInputs } from "./types";

/** CPL estimado cuando el usuario no indica uno (benchmark B2B marketing, MXN). */
export function deriveCostPerLead(
  monthlyBudget: number,
  industry: RoiIndustryId = "saas",
): number {
  const tier =
    ROI_CPL_BUDGET_TIERS.find((t) => monthlyBudget < t.budgetBelow) ??
    ROI_CPL_BUDGET_TIERS[ROI_CPL_BUDGET_TIERS.length - 1];
  return tier.baseCpl * getIndustryCplMultiplier(industry);
}

export function calculateRoiMetrics(inputs: RoiInputs) {
  const industry = inputs.industry ?? "saas";
  const costPerLead =
    inputs.costPerLead ?? deriveCostPerLead(inputs.monthlyBudget, industry);
  const estimatedLeads = inputs.monthlyBudget / costPerLead;

  let estimatedSales: number;
  let effectiveConversionRate: number;

  if (inputs.leadsToCloseSale && inputs.leadsToCloseSale > 0) {
    estimatedSales = estimatedLeads / inputs.leadsToCloseSale;
    effectiveConversionRate =
      estimatedLeads > 0 ? (estimatedSales / estimatedLeads) * 100 : 0;
  } else {
    const rate = inputs.conversionRate ?? 12;
    effectiveConversionRate = rate;
    estimatedSales = estimatedLeads * (rate / 100);
  }

  const estimatedRevenue = estimatedSales * inputs.averageLeadValue;
  const estimatedRoi =
    inputs.monthlyBudget > 0
      ? ((estimatedRevenue - inputs.monthlyBudget) / inputs.monthlyBudget) * 100
      : 0;

  return {
    monthlyBudget: inputs.monthlyBudget,
    estimatedLeads: round2(estimatedLeads),
    costPerLead: round2(costPerLead),
    conversionRate: round2(effectiveConversionRate),
    estimatedSales: round2(estimatedSales),
    estimatedRevenue: round2(estimatedRevenue),
    estimatedRoi: round2(estimatedRoi),
  };
}

function round2(value: number): number {
  return Math.round(value * 100) / 100;
}

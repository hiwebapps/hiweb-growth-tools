import type { RoiIndustryId } from "./industry";
import type { RoiCalculatorState, RoiInputs } from "./types";

export function stateToRoiInputs(state: RoiCalculatorState): RoiInputs {
  return {
    monthlyBudget: state.monthlyBudget,
    averageLeadValue: state.averageLeadValue,
    industry: state.industry,
    leadsToCloseSale: state.leadsToCloseSale,
  };
}

export function createDefaultRoiState(
  budget = 5000,
  ticket = 1200,
  leadsToCloseSale = 15,
  industry: RoiIndustryId = "saas",
): RoiCalculatorState {
  return {
    industry,
    monthlyBudget: budget,
    averageLeadValue: ticket,
    leadsToCloseSale,
  };
}

export function formatUsd(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

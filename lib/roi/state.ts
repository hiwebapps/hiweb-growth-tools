import type { RoiIndustryId } from "./industry";
import { ROI_BUDGET, ROI_TICKET } from "./currency";
import type { RoiCalculatorState, RoiInputs } from "./types";

export { formatMxn } from "./currency";

export function stateToRoiInputs(state: RoiCalculatorState): RoiInputs {
  return {
    monthlyBudget: state.monthlyBudget,
    averageLeadValue: state.averageLeadValue,
    industry: state.industry,
    leadsToCloseSale: state.leadsToCloseSale,
  };
}

export function createDefaultRoiState(
  budget: number = ROI_BUDGET.default,
  ticket: number = ROI_TICKET.default,
  leadsToCloseSale: number = 15,
  industry: RoiIndustryId = "saas",
): RoiCalculatorState {
  return {
    industry,
    monthlyBudget: budget,
    averageLeadValue: ticket,
    leadsToCloseSale,
  };
}

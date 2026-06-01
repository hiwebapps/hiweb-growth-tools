export type RoiInputs = {
  monthlyBudget: number;
  averageLeadValue: number;
  conversionRate: number;
  costPerLead?: number;
};

export type RoiResultLevelId = "low" | "moderate" | "strong" | "excellent";

export type RoiCalculationResult = {
  monthlyBudget: number;
  estimatedLeads: number;
  costPerLead: number;
  conversionRate: number;
  estimatedSales: number;
  estimatedRevenue: number;
  estimatedRoi: number;
  resultLevel: RoiResultLevelId;
  resultLevelLabel: string;
  resultSummary: string;
  recommendations: string[];
};

export type RoiLeadInput = {
  name?: string;
  email?: string;
  company?: string;
  phone?: string;
};

export type RoiSubmitResponse = {
  leadId: string;
  result: RoiCalculationResult;
};

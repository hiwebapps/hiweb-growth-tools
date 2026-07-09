import type { RoiIndustryId } from "./industry";

export type { RoiIndustryId };

export type RoiInputs = {
  monthlyBudget: number;
  averageLeadValue: number;
  industry?: RoiIndustryId;
  /** Leads necesarios para cerrar una venta (UI Stitch). */
  leadsToCloseSale?: number;
  /** Tasa lead → venta en % (si no se usa leadsToCloseSale). */
  conversionRate?: number;
  costPerLead?: number;
};

export type RoiResultLevelId = "low" | "moderate" | "strong" | "excellent";

export type RoiCalculationResult = {
  monthlyBudget: number;
  estimatedLeads: number;
  costPerLead: number;
  estimatedCac: number;
  conversionRate: number;
  estimatedSales: number;
  estimatedRevenue: number;
  estimatedRoas: number;
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

export type RoiCalculatorState = {
  industry: RoiIndustryId;
  monthlyBudget: number;
  averageLeadValue: number;
  leadsToCloseSale: number;
};

import type { RoiIndustryId } from "./industry";

export type { RoiIndustryId };

export type RoiBenchmarks = {
  ecommerceCpcMxn: number;
  realEstateCplMxn: number;
  realEstateSeriousLeadRate: number;
  saasCplUsd: number;
  usdToMxn: number;
  b2bCplMxn: number;
};

/** @deprecated API legacy — inputs planos para B2B y rutas antiguas. */
export type RoiInputs = {
  monthlyBudget: number;
  averageLeadValue: number;
  industry?: RoiIndustryId;
  leadsToCloseSale?: number;
  conversionRate?: number;
  costPerLead?: number;
};

export type RoiCalculatorState = {
  industry: RoiIndustryId;
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

export type EcommerceMetrics = {
  industry: "ecommerce";
  visitasGeneradas: number;
  ventasEstimadas: number;
  cac: number;
  ingresosProyectados: number;
  roas: number;
  estimatedRoi: number;
};

export type RealEstateMetrics = {
  industry: "real-estate";
  inversionAcumulada: number;
  leadsTotales: number;
  citasGeneradas: number;
  cierresTotales: number;
  ingresosGenerados: number;
  estimatedRoi: number;
};

export type SaasMetrics = {
  industry: "saas";
  leadsTotales: number;
  clientesNuevos: number;
  cac: number;
  ltv: number;
  ingresoTotalProyectado: number;
  relacionLtvCac: number;
  estimatedRoi: number;
};

export type B2bLegacyMetrics = {
  industry: "b2b-services";
  costPerLead: number;
  estimatedLeads: number;
  estimatedSales: number;
  estimatedCac: number;
  estimatedRevenue: number;
  estimatedRoas: number;
  estimatedRoi: number;
};

export type RoiIndustryMetrics =
  | EcommerceMetrics
  | RealEstateMetrics
  | SaasMetrics
  | B2bLegacyMetrics;

export type RoiResultLevelId = "low" | "moderate" | "strong" | "excellent";

export type RoiCalculationResult = {
  industry: RoiIndustryId;
  estimatedRoi: number;
  metrics: RoiIndustryMetrics;
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

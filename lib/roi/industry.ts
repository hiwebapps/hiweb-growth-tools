export type RoiIndustryId = "saas" | "ecommerce" | "b2b-services" | "real-estate";

export const ROI_INDUSTRIES: Array<{ id: RoiIndustryId; label: string }> = [
  { id: "saas", label: "SaaS" },
  { id: "ecommerce", label: "E-commerce" },
  { id: "b2b-services", label: "Industrial B2B / Manufactura" },
  { id: "real-estate", label: "Desarrollo Inmobiliario" },
];

/** CPL benchmark fijo por industria (MXN). */
const INDUSTRY_CPL_MXN: Record<RoiIndustryId, number> = {
  saas: 300,
  ecommerce: 150,
  "b2b-services": 500,
  "real-estate": 350,
};

export function getIndustryEstimatedCpl(industry: RoiIndustryId): number {
  return INDUSTRY_CPL_MXN[industry] ?? INDUSTRY_CPL_MXN.saas;
}

export function resolveIndustryId(value: string): RoiIndustryId {
  const match = ROI_INDUSTRIES.find((i) => i.id === value || i.label === value);
  return match?.id ?? "saas";
}

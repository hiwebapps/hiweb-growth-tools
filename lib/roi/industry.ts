export type RoiIndustryId = "ecommerce" | "real-estate" | "saas" | "b2b-services";

export const ROI_INDUSTRIES: Array<{ id: RoiIndustryId; label: string }> = [
  { id: "ecommerce", label: "E-commerce" },
  { id: "real-estate", label: "Desarrollo Inmobiliario" },
  { id: "saas", label: "SaaS" },
  { id: "b2b-services", label: "Industrial B2B / Manufactura" },
];

export function resolveIndustryId(value: string): RoiIndustryId {
  const match = ROI_INDUSTRIES.find((i) => i.id === value || i.label === value);
  return match?.id ?? "ecommerce";
}

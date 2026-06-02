export type RoiIndustryId = "saas" | "ecommerce" | "b2b-services" | "real-estate";

export const ROI_INDUSTRIES: Array<{ id: RoiIndustryId; label: string }> = [
  { id: "saas", label: "SaaS" },
  { id: "ecommerce", label: "E-commerce" },
  { id: "b2b-services", label: "Servicios B2B" },
  { id: "real-estate", label: "Real Estate" },
];

/** Multiplier applied to derived CPL (1 = baseline). */
export function getIndustryCplMultiplier(industry: RoiIndustryId): number {
  switch (industry) {
    case "saas":
      return 1;
    case "ecommerce":
      return 0.92;
    case "b2b-services":
      return 1.08;
    case "real-estate":
      return 1.15;
    default:
      return 1;
  }
}

export function resolveIndustryId(value: string): RoiIndustryId {
  const match = ROI_INDUSTRIES.find((i) => i.id === value || i.label === value);
  return match?.id ?? "saas";
}

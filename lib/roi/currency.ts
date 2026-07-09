/** Moneda y rangos de la calculadora ROI (mercado México). */
export const ROI_CURRENCY_CODE = "MXN" as const;
export const ROI_LOCALE = "es-MX";

/** Tipo de cambio de referencia usado al migrar benchmarks de USD a MXN. */
export const ROI_USD_TO_MXN = 18;

export const ROI_BUDGET = {
  min: 18_000,
  default: 90_000,
  max: 900_000,
  step: 5_000,
  /** Límites del prop Webflow «mínimo presupuesto». */
  minConfigMin: 9_000,
  minConfigMax: 450_000,
} as const;

export const ROI_TICKET = {
  min: 2_000,
  default: 22_000,
  max: 180_000,
  step: 1_000,
} as const;

/** Umbrales de presupuesto (MXN) para estimar CPL. */
export const ROI_CPL_BUDGET_TIERS = [
  { budgetBelow: 27_000, baseCpl: 800 },
  { budgetBelow: 90_000, baseCpl: 1_200 },
  { budgetBelow: 270_000, baseCpl: 1_500 },
  { budgetBelow: Number.POSITIVE_INFINITY, baseCpl: 2_000 },
] as const;

export const ROI_VALIDATION = {
  monthlyBudgetMin: 1_800,
  monthlyBudgetMax: 9_000_000,
  averageLeadValueMin: 200,
  averageLeadValueMax: 18_000_000,
  costPerLeadMin: 90,
  costPerLeadMax: 180_000,
} as const;

export function formatMxn(value: number): string {
  return new Intl.NumberFormat(ROI_LOCALE, {
    style: "currency",
    currency: ROI_CURRENCY_CODE,
    maximumFractionDigits: 0,
  }).format(value);
}

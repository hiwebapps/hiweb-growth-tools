import { resolveIndustryId } from "./industry";
import { ROI_VALIDATION } from "./currency";
import type { RoiInputs, RoiLeadInput } from "./types";
import { AppError } from "@/lib/shared/errors";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateRoiInputs(raw: Partial<RoiInputs>): RoiInputs {
  const monthlyBudget = Number(raw.monthlyBudget);
  const averageLeadValue = Number(raw.averageLeadValue);
  const industry = raw.industry
    ? resolveIndustryId(String(raw.industry))
    : "saas";
  const leadsToCloseSale =
    raw.leadsToCloseSale === undefined || raw.leadsToCloseSale === null
      ? undefined
      : Number(raw.leadsToCloseSale);
  const conversionRate =
    raw.conversionRate === undefined || raw.conversionRate === null
      ? undefined
      : Number(raw.conversionRate);
  const costPerLead =
    raw.costPerLead === undefined || raw.costPerLead === null
      ? undefined
      : Number(raw.costPerLead);

  if (
    !Number.isFinite(monthlyBudget) ||
    monthlyBudget < ROI_VALIDATION.monthlyBudgetMin ||
    monthlyBudget > ROI_VALIDATION.monthlyBudgetMax
  ) {
    throw new AppError(
      "El presupuesto mensual debe estar entre 1,800 y 9,000,000 MXN.",
      { statusCode: 400, code: "INVALID_BUDGET" },
    );
  }

  if (
    !Number.isFinite(averageLeadValue) ||
    averageLeadValue < ROI_VALIDATION.averageLeadValueMin ||
    averageLeadValue > ROI_VALIDATION.averageLeadValueMax
  ) {
    throw new AppError(
      "El ticket promedio debe estar entre 200 y 18,000,000 MXN.",
      { statusCode: 400, code: "INVALID_LEAD_VALUE" },
    );
  }

  if (leadsToCloseSale !== undefined) {
    if (
      !Number.isFinite(leadsToCloseSale) ||
      leadsToCloseSale < 1 ||
      leadsToCloseSale > 100
    ) {
      throw new AppError(
        "Los leads para cerrar venta deben estar entre 1 y 100.",
        { statusCode: 400, code: "INVALID_LEADS_TO_CLOSE" },
      );
    }
  }

  if (conversionRate !== undefined) {
    if (
      !Number.isFinite(conversionRate) ||
      conversionRate < 0.5 ||
      conversionRate > 80
    ) {
      throw new AppError(
        "La tasa de conversión debe estar entre 0.5% y 80%.",
        { statusCode: 400, code: "INVALID_CONVERSION" },
      );
    }
  }

  if (
    costPerLead !== undefined &&
    (!Number.isFinite(costPerLead) ||
      costPerLead < ROI_VALIDATION.costPerLeadMin ||
      costPerLead > ROI_VALIDATION.costPerLeadMax)
  ) {
    throw new AppError(
      "El costo por lead debe estar entre 90 y 180,000 MXN.",
      { statusCode: 400, code: "INVALID_CPL" },
    );
  }

  return {
    monthlyBudget,
    averageLeadValue,
    industry,
    leadsToCloseSale,
    conversionRate,
    costPerLead,
  };
}

export function validateRoiLeadOptional(lead?: RoiLeadInput): RoiLeadInput | undefined {
  if (!lead) {
    return undefined;
  }

  const name = lead.name?.trim();
  const email = lead.email?.trim().toLowerCase();
  const phone = lead.phone?.trim();

  if (email && !EMAIL_RE.test(email)) {
    throw new AppError("Introduce un email válido.", {
      statusCode: 400,
      code: "INVALID_EMAIL",
    });
  }

  if (phone && phone.length < 7) {
    throw new AppError("El teléfono no parece válido.", {
      statusCode: 400,
      code: "INVALID_PHONE",
    });
  }

  if ((name || email) && (!name || !email)) {
    throw new AppError(
      "Para guardar el escenario, indica nombre y email.",
      { statusCode: 400, code: "INCOMPLETE_LEAD" },
    );
  }

  if (!name && !email) {
    return undefined;
  }

  return {
    name,
    email,
    company: lead.company?.trim() || undefined,
    phone: phone || undefined,
  };
}

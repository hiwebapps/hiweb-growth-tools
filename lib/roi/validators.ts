import { resolveIndustryId } from "./industry";
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

  if (!Number.isFinite(monthlyBudget) || monthlyBudget < 100 || monthlyBudget > 500_000) {
    throw new AppError(
      "El presupuesto mensual debe estar entre 100 y 500,000 USD.",
      { statusCode: 400, code: "INVALID_BUDGET" },
    );
  }

  if (
    !Number.isFinite(averageLeadValue) ||
    averageLeadValue < 10 ||
    averageLeadValue > 1_000_000
  ) {
    throw new AppError(
      "El valor por lead debe estar entre 10 y 1,000,000 USD.",
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
    (!Number.isFinite(costPerLead) || costPerLead < 5 || costPerLead > 10_000)
  ) {
    throw new AppError(
      "El costo por lead debe estar entre 5 y 10,000 USD.",
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

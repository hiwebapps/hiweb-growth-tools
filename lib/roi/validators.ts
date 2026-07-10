import { ROI_BUDGET, ROI_VALIDATION } from "./currency";
import { createDefaultRoiState } from "./defaults";
import { resolveIndustryId } from "./industry";
import type {
  RoiBenchmarks,
  RoiCalculatorState,
  RoiInputs,
  RoiLeadInput,
} from "./types";
import { AppError } from "@/lib/shared/errors";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function num(value: unknown, field: string): number {
  const n = Number(value);
  if (!Number.isFinite(n)) {
    throw new AppError(`El campo ${field} no es válido.`, {
      statusCode: 400,
      code: "INVALID_NUMBER",
    });
  }
  return n;
}

export function validateRoiCalculatorState(
  raw: Record<string, unknown>,
): RoiCalculatorState {
  const industry = raw.industry
    ? resolveIndustryId(String(raw.industry))
    : "ecommerce";
  const defaults = createDefaultRoiState({}, industry);

  const monthlyBudget = num(
    raw.monthlyBudget ?? raw.presupuestoMensual ?? defaults.monthlyBudget,
    "presupuesto mensual",
  );

  if (
    monthlyBudget < ROI_VALIDATION.monthlyBudgetMin ||
    monthlyBudget > ROI_VALIDATION.monthlyBudgetMax
  ) {
    throw new AppError(
      "El presupuesto mensual debe estar entre 1,800 y 100,000 MXN.",
      { statusCode: 400, code: "INVALID_BUDGET" },
    );
  }

  return {
    industry,
    monthlyBudget,
    ticketPromedio: num(
      raw.ticketPromedio ?? defaults.ticketPromedio,
      "ticket promedio",
    ),
    tasaConversion: num(
      raw.tasaConversion ?? defaults.tasaConversion,
      "tasa de conversión",
    ),
    mesesCampana: num(raw.mesesCampana ?? defaults.mesesCampana, "meses de campaña"),
    valorPropiedad: num(
      raw.valorPropiedad ?? defaults.valorPropiedad,
      "valor de propiedad",
    ),
    porcentajeComision: num(
      raw.porcentajeComision ?? defaults.porcentajeComision,
      "porcentaje de comisión",
    ),
    tasaCierre: num(raw.tasaCierre ?? defaults.tasaCierre, "tasa de cierre"),
    suscripcionMensualUsd: num(
      raw.suscripcionMensualUsd ?? defaults.suscripcionMensualUsd,
      "suscripción mensual",
    ),
    mesesPermanencia: num(
      raw.mesesPermanencia ?? defaults.mesesPermanencia,
      "meses de permanencia",
    ),
    leadsParaCierre: num(
      raw.leadsParaCierre ?? defaults.leadsParaCierre,
      "leads para cierre",
    ),
    averageLeadValue: num(
      raw.averageLeadValue ?? raw.ticketPromedio ?? defaults.averageLeadValue,
      "ticket promedio",
    ),
    leadsToCloseSale: num(
      raw.leadsToCloseSale ?? raw.leadsParaCierre ?? defaults.leadsToCloseSale,
      "leads para cerrar venta",
    ),
  };
}

export function validateRoiBenchmarks(
  raw: Record<string, unknown> | undefined,
): Partial<RoiBenchmarks> | undefined {
  if (!raw) {
    return undefined;
  }

  const out: Partial<RoiBenchmarks> = {};
  if (raw.ecommerceCpcMxn !== undefined) {
    out.ecommerceCpcMxn = num(raw.ecommerceCpcMxn, "CPC e-commerce");
  }
  if (raw.realEstateCplMxn !== undefined) {
    out.realEstateCplMxn = num(raw.realEstateCplMxn, "CPL inmobiliario");
  }
  if (raw.realEstateSeriousLeadRate !== undefined) {
    out.realEstateSeriousLeadRate = num(
      raw.realEstateSeriousLeadRate,
      "tasa leads serios",
    );
  }
  if (raw.saasCplUsd !== undefined) {
    out.saasCplUsd = num(raw.saasCplUsd, "CPL SaaS");
  }
  if (raw.usdToMxn !== undefined) {
    out.usdToMxn = num(raw.usdToMxn, "tipo de cambio USD/MXN");
  }
  if (raw.b2bCplMxn !== undefined) {
    out.b2bCplMxn = num(raw.b2bCplMxn, "CPL B2B");
  }
  return out;
}

/** Compatibilidad con payloads API antiguos. */
export function validateRoiInputs(raw: Partial<RoiInputs>): RoiInputs {
  const state = validateRoiCalculatorState(raw as Record<string, unknown>);
  return {
    monthlyBudget: state.monthlyBudget,
    averageLeadValue: state.averageLeadValue,
    industry: state.industry,
    leadsToCloseSale: state.leadsToCloseSale,
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

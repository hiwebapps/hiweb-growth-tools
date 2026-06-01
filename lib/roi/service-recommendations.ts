import type { RoiResultLevelId } from "./types";

const BY_LEVEL: Record<RoiResultLevelId, string[]> = {
  low: [
    "Auditoría de embudo y landing pages",
    "Optimización de campañas y CPL",
    "Estrategia de contenidos para demanda",
  ],
  moderate: [
    "Gestión de campañas Google Ads y Meta Ads",
    "Automatización de nutrición de leads",
    "Reporting y dashboards de conversión",
  ],
  strong: [
    "Escalamiento de paid media con control de CPA",
    "CRO y experimentación continua",
    "Integración CRM + seguimiento comercial",
  ],
  excellent: [
    "Plan de crecimiento multicanal",
    "Producción de contenido premium",
    "Consultoría estratégica de marketing digital",
  ],
};

export function buildRoiRecommendations(
  resultLevel: RoiResultLevelId,
  estimatedRoi: number,
): string[] {
  const base = [...BY_LEVEL[resultLevel]];

  if (estimatedRoi < 0) {
    base.unshift("Diagnóstico integral de marketing digital");
  }

  return base.slice(0, 5);
}

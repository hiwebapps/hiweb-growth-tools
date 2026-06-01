import type { RoiResultLevelId } from "./types";

type LevelDef = {
  id: RoiResultLevelId;
  label: string;
  minRoi: number;
  summary: string;
};

export const ROI_RESULT_LEVELS: LevelDef[] = [
  {
    id: "low",
    label: "ROI conservador",
    minRoi: -100,
    summary:
      "Con estos parámetros el retorno estimado es bajo. Conviene optimizar CPL, conversión o ticket medio.",
  },
  {
    id: "moderate",
    label: "ROI moderado",
    minRoi: 50,
    summary:
      "Hay potencial de retorno positivo. Afinar embudo y canales puede mejorar el resultado.",
  },
  {
    id: "strong",
    label: "ROI sólido",
    minRoi: 150,
    summary:
      "La inversión podría generar un retorno atractivo. Es buen momento para escalar con estrategia.",
  },
  {
    id: "excellent",
    label: "ROI excelente",
    minRoi: 300,
    summary:
      "Escenario muy favorable. Podemos ayudarte a sostener y escalar estos resultados con operación continua.",
  },
];

export function getRoiResultLevel(estimatedRoi: number): LevelDef {
  const sorted = [...ROI_RESULT_LEVELS].sort((a, b) => b.minRoi - a.minRoi);
  return sorted.find((l) => estimatedRoi >= l.minRoi) ?? ROI_RESULT_LEVELS[0];
}

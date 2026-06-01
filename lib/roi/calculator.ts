import { calculateRoiMetrics } from "./formulas";
import { getRoiResultLevel } from "./result-levels";
import { buildRoiRecommendations } from "./service-recommendations";
import type { RoiCalculationResult, RoiInputs } from "./types";

export function calculateRoi(inputs: RoiInputs): RoiCalculationResult {
  const metrics = calculateRoiMetrics(inputs);
  const level = getRoiResultLevel(metrics.estimatedRoi);

  return {
    ...metrics,
    resultLevel: level.id,
    resultLevelLabel: level.label,
    resultSummary: level.summary,
    recommendations: buildRoiRecommendations(level.id, metrics.estimatedRoi),
  };
}

import { calculateIndustryMetrics } from "./calculate-industry";
import { getRoiResultLevel } from "./result-levels";
import { buildRoiRecommendations } from "./service-recommendations";
import type {
  RoiBenchmarks,
  RoiCalculationResult,
  RoiCalculatorState,
} from "./types";

export function calculateRoi(
  state: RoiCalculatorState,
  benchmarks: RoiBenchmarks,
): RoiCalculationResult {
  const metrics = calculateIndustryMetrics(state, benchmarks);
  const estimatedRoi = metrics.estimatedRoi;
  const level = getRoiResultLevel(estimatedRoi);

  return {
    industry: state.industry,
    estimatedRoi,
    metrics,
    resultLevel: level.id,
    resultLevelLabel: level.label,
    resultSummary: level.summary,
    recommendations: buildRoiRecommendations(level.id, estimatedRoi),
  };
}

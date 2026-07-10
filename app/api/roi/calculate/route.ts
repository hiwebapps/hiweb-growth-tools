import { NextResponse } from "next/server";
import { calculateRoi } from "@/lib/roi/calculator";
import { DEFAULT_BENCHMARKS } from "@/lib/roi/defaults";
import {
  validateRoiBenchmarks,
  validateRoiCalculatorState,
} from "@/lib/roi/validators";
import { jsonError } from "@/lib/api/response";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const state = validateRoiCalculatorState(body);
    const benchmarkOverrides = validateRoiBenchmarks(
      body.benchmarks as Record<string, unknown> | undefined,
    );
    const benchmarks = { ...DEFAULT_BENCHMARKS, ...benchmarkOverrides };
    const result = calculateRoi(state, benchmarks);

    return NextResponse.json({ result });
  } catch (error) {
    return jsonError(error);
  }
}

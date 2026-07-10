import { NextResponse } from "next/server";
import { calculateRoi } from "@/lib/roi/calculator";
import { DEFAULT_BENCHMARKS } from "@/lib/roi/defaults";
import type { RoiCalculatorState, RoiLeadInput } from "@/lib/roi/types";
import {
  validateRoiBenchmarks,
  validateRoiCalculatorState,
  validateRoiLeadOptional,
} from "@/lib/roi/validators";
import { insertRoiLead } from "@/lib/db/roi";
import { dispatchRoiWebhook } from "@/lib/n8n/client";
import { buildRoiN8nPayload } from "@/lib/n8n/payloads";
import { jsonError } from "@/lib/api/response";
import { AppError } from "@/lib/shared/errors";
import { createId } from "@/lib/shared/utils";

type SubmitBody = {
  inputs: Record<string, unknown>;
  lead?: RoiLeadInput;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as SubmitBody;
    const state = validateRoiCalculatorState(body.inputs);
    const benchmarkOverrides = validateRoiBenchmarks(
      body.inputs.benchmarks as Record<string, unknown> | undefined,
    );
    const benchmarks = { ...DEFAULT_BENCHMARKS, ...benchmarkOverrides };
    const lead = validateRoiLeadOptional(body.lead);

    if (!lead) {
      throw new AppError(
        "Indica nombre y email para guardar tu escenario.",
        { statusCode: 400, code: "LEAD_REQUIRED" },
      );
    }

    const result = calculateRoi(state, benchmarks);
    const leadId = (await insertRoiLead(state, result, lead)) ?? createId();

    dispatchRoiWebhook(
      buildRoiN8nPayload({ leadId, state, result, lead }),
    );

    return NextResponse.json({ leadId, result });
  } catch (error) {
    return jsonError(error);
  }
}

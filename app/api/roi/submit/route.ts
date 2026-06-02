import { NextResponse } from "next/server";
import { calculateRoi } from "@/lib/roi/calculator";
import type { RoiLeadInput } from "@/lib/roi/types";
import { validateRoiInputs, validateRoiLeadOptional } from "@/lib/roi/validators";
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
    const inputs = validateRoiInputs(body.inputs);
    const lead = validateRoiLeadOptional(body.lead);

    if (!lead) {
      throw new AppError(
        "Indica nombre y email para guardar tu escenario.",
        { statusCode: 400, code: "LEAD_REQUIRED" },
      );
    }

    const result = calculateRoi(inputs);
    const leadId = (await insertRoiLead(inputs, result, lead)) ?? createId();

    dispatchRoiWebhook(
      buildRoiN8nPayload({ leadId, inputs, result, lead }),
    );

    return NextResponse.json({ leadId, result });
  } catch (error) {
    return jsonError(error);
  }
}

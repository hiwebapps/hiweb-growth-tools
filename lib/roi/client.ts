import { apiRequest } from "@/lib/shared/api-request";
import type {
  RoiCalculationResult,
  RoiInputs,
  RoiLeadInput,
  RoiSubmitResponse,
} from "./types";

export async function calculateRoiApi(inputs: RoiInputs) {
  return apiRequest<{ result: RoiCalculationResult }>("/api/roi/calculate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(inputs),
  });
}

export async function submitRoiApi(input: {
  inputs: RoiInputs;
  lead?: RoiLeadInput;
}) {
  return apiRequest<RoiSubmitResponse>("/api/roi/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
}

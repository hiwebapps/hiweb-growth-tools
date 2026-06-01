import { apiUrl } from "@/lib/shared/api-url";
import type {
  RoiCalculationResult,
  RoiInputs,
  RoiLeadInput,
  RoiSubmitResponse,
} from "./types";

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(apiUrl(url), init);
  const data = (await response.json()) as T & { error?: string };

  if (!response.ok) {
    throw new Error(data.error ?? "Error en la solicitud.");
  }

  return data;
}

export async function calculateRoiApi(inputs: RoiInputs) {
  return request<{ result: RoiCalculationResult }>("/api/roi/calculate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(inputs),
  });
}

export async function submitRoiApi(input: {
  inputs: RoiInputs;
  lead?: RoiLeadInput;
}) {
  return request<RoiSubmitResponse>("/api/roi/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
}

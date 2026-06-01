import type { RoiCalculationResult, RoiInputs, RoiLeadInput } from "@/lib/roi/types";
import { createId } from "@/lib/shared/utils";
import { getDb } from "./client";

export function insertRoiLead(
  inputs: RoiInputs,
  result: RoiCalculationResult,
  lead?: RoiLeadInput,
): string {
  const id = createId();
  const createdAt = new Date().toISOString();

  getDb()
    .prepare(
      `INSERT INTO roi_leads (
        id, name, company, email, phone,
        monthly_budget, estimated_leads, estimated_sales,
        estimated_revenue, estimated_roi,
        inputs_json, recommendations_json, pending_sync, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?)`,
    )
    .run(
      id,
      lead?.name ?? null,
      lead?.company ?? null,
      lead?.email ?? null,
      lead?.phone ?? null,
      result.monthlyBudget,
      result.estimatedLeads,
      result.estimatedSales,
      result.estimatedRevenue,
      result.estimatedRoi,
      JSON.stringify(inputs),
      JSON.stringify(result.recommendations),
      createdAt,
    );

  return id;
}

import type { RoiCalculationResult, RoiInputs, RoiLeadInput } from "@/lib/roi/types";
import { createId } from "@/lib/shared/utils";
import { isSqliteAvailable, getDb } from "./client";
import { d1Run, getD1 } from "./d1";

export async function insertRoiLead(
  inputs: RoiInputs,
  result: RoiCalculationResult,
  lead?: RoiLeadInput,
): Promise<string | null> {
  const id = createId();
  const createdAt = new Date().toISOString();

  const d1 = await getD1();
  if (d1) {
    await d1Run(
      d1,
      `INSERT INTO roi_leads (
        id, name, company, email, phone,
        monthly_budget, estimated_leads, estimated_sales,
        estimated_revenue, estimated_roi,
        inputs_json, recommendations_json, pending_sync, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?)`,
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

  if (!isSqliteAvailable()) {
    return null;
  }

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

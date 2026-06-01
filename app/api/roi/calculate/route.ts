import { NextResponse } from "next/server";
import { calculateRoi } from "@/lib/roi/calculator";
import { validateRoiInputs } from "@/lib/roi/validators";
import { jsonError } from "@/lib/api/response";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const inputs = validateRoiInputs(body);
    const result = calculateRoi(inputs);

    return NextResponse.json({ result });
  } catch (error) {
    return jsonError(error);
  }
}

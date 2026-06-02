import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    ok: true,
    service: "hiweb-growth-tools",
    timestamp: new Date().toISOString(),
  });
}

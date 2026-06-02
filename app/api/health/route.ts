import { NextResponse } from "next/server";
import { getStorageBackend } from "@/lib/db/storage";

export async function GET() {
  const storage = await getStorageBackend();

  return NextResponse.json({
    ok: true,
    service: "hiweb-growth-tools",
    storage,
    timestamp: new Date().toISOString(),
  });
}

import { NextResponse } from "next/server";
import { getStorageBackend } from "@/lib/db/storage";
import { getServerEnv } from "@/lib/shared/env";

export async function GET() {
  const storage = await getStorageBackend();
  const env = getServerEnv();

  return NextResponse.json({
    ok: true,
    service: "hiweb-growth-tools",
    storage,
    n8n: {
      calendarUrlConfigured: Boolean(env.n8nWebhookCalendarUrl.trim()),
      secretConfigured: Boolean(env.n8nWebhookSecret.trim()),
    },
    timestamp: new Date().toISOString(),
  });
}

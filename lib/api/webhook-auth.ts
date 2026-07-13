import { getServerEnv } from "@/lib/shared/env";
import { AppError } from "@/lib/shared/errors";

export function assertWebhookSecret(request: Request): void {
  const expected = getServerEnv().n8nWebhookSecret.trim();
  if (!expected) {
    throw new AppError("Webhook secret no configurado.", {
      statusCode: 503,
      code: "WEBHOOK_SECRET_MISSING",
    });
  }

  const provided =
    request.headers.get("x-webhook-secret") ??
    request.headers.get("X-Webhook-Secret") ??
    "";

  if (provided !== expected) {
    throw new AppError("No autorizado.", {
      statusCode: 401,
      code: "UNAUTHORIZED",
    });
  }
}

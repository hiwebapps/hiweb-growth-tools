export type ServerEnv = {
  n8nWebhookQuizUrl: string;
  n8nWebhookCalendarUrl: string;
  n8nWebhookRoiUrl: string;
  n8nWebhookSecret: string;
  appUrl: string;
};

export function getServerEnv(): ServerEnv {
  return {
    n8nWebhookQuizUrl: process.env.N8N_WEBHOOK_QUIZ_URL ?? "",
    n8nWebhookCalendarUrl: process.env.N8N_WEBHOOK_CALENDAR_URL ?? "",
    n8nWebhookRoiUrl: process.env.N8N_WEBHOOK_ROI_URL ?? "",
    n8nWebhookSecret: process.env.N8N_WEBHOOK_SECRET ?? "",
    appUrl: process.env.APP_URL ?? "http://localhost:3000",
  };
}

/** Validates env vars required for server integrations (n8n, absolute URLs). */
export function requireServerEnv(
  keys: (keyof ServerEnv)[] = [
    "n8nWebhookQuizUrl",
    "n8nWebhookCalendarUrl",
    "n8nWebhookRoiUrl",
    "n8nWebhookSecret",
    "appUrl",
  ],
): ServerEnv {
  const env = getServerEnv();
  const missing = keys.filter((key) => !env[key]?.trim());

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(", ")}`,
    );
  }

  return env;
}

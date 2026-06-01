import { getServerEnv } from "@/lib/shared/env";

export function dispatchN8nWebhook(
  url: string,
  payload: unknown,
  secret?: string,
): void {
  if (!url.trim()) {
    return;
  }

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (secret?.trim()) {
    headers["X-Webhook-Secret"] = secret;
  }

  void fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  }).catch(() => {
    // Fire-and-forget: n8n failures must not break user flow.
  });
}

export function dispatchQuizWebhook(payload: unknown): void {
  const env = getServerEnv();
  dispatchN8nWebhook(
    env.n8nWebhookQuizUrl,
    payload,
    env.n8nWebhookSecret,
  );
}

export function dispatchCalendarWebhook(payload: unknown): void {
  const env = getServerEnv();
  dispatchN8nWebhook(
    env.n8nWebhookCalendarUrl,
    payload,
    env.n8nWebhookSecret,
  );
}

export function dispatchRoiWebhook(payload: unknown): void {
  const env = getServerEnv();
  dispatchN8nWebhook(env.n8nWebhookRoiUrl, payload, env.n8nWebhookSecret);
}

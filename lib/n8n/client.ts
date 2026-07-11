import { getServerEnv } from "@/lib/shared/env";

/** Añade ?secret= si falta — compatible con webhooks n8n que validan query string. */
export function buildN8nWebhookUrl(url: string, secret?: string): string {
  const trimmed = url.trim();
  if (!trimmed || !secret?.trim()) {
    return trimmed;
  }

  try {
    const parsed = new URL(trimmed);
    if (!parsed.searchParams.has("secret")) {
      parsed.searchParams.set("secret", secret.trim());
    }
    return parsed.toString();
  } catch {
    return trimmed;
  }
}

export function dispatchN8nWebhook(
  url: string,
  payload: unknown,
  secret?: string,
): void {
  if (!url.trim()) {
    return;
  }

  const targetUrl = buildN8nWebhookUrl(url, secret);

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (secret?.trim()) {
    headers["X-Webhook-Secret"] = secret;
  }

  void fetch(targetUrl, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  }).catch((error) => {
    // Fire-and-forget: n8n failures must not break user flow.
    console.error("[n8n] webhook dispatch failed:", error);
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

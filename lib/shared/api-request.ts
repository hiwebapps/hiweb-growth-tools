import { apiUrl } from "@/lib/shared/api-url";

const FRIENDLY_NETWORK_ERROR =
  "No pudimos conectar con el servidor. Recarga la página e inténtalo de nuevo.";

const FRIENDLY_REQUEST_ERROR =
  "No pudimos completar la solicitud. Inténtalo de nuevo en unos momentos.";

function isJsonContentType(contentType: string): boolean {
  return contentType.includes("application/json");
}

function friendlyHttpError(status: number): string {
  if (status === 404) {
    return FRIENDLY_NETWORK_ERROR;
  }

  return FRIENDLY_REQUEST_ERROR;
}

async function readJsonBody<T>(response: Response): Promise<T & { error?: string }> {
  const contentType = response.headers.get("content-type") ?? "";

  if (!isJsonContentType(contentType)) {
    throw new Error(friendlyHttpError(response.status));
  }

  try {
    return (await response.json()) as T & { error?: string };
  } catch {
    throw new Error(FRIENDLY_NETWORK_ERROR);
  }
}

export async function apiRequest<T>(
  url: string,
  init?: RequestInit,
): Promise<T> {
  let response: Response;

  try {
    response = await fetch(apiUrl(url), init);
  } catch {
    throw new Error(FRIENDLY_NETWORK_ERROR);
  }

  const data = await readJsonBody<T>(response);

  if (!response.ok) {
    throw new Error(data.error ?? friendlyHttpError(response.status));
  }

  return data;
}

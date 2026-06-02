import type { D1Database } from "@cloudflare/workers-types";

/** Binding declarado en `wrangler.json` → `DATABASE`. */
export async function getD1(): Promise<D1Database | null> {
  try {
    const { getCloudflareContext } = await import("@opennextjs/cloudflare");
    const { env } = getCloudflareContext();
    const db = (env as CloudflareEnv).DATABASE;
    return db ?? null;
  } catch {
    return null;
  }
}

export async function d1Run(
  db: D1Database,
  sql: string,
  ...params: unknown[]
) {
  const stmt = db.prepare(sql);
  return params.length > 0 ? stmt.bind(...params).run() : stmt.run();
}

export async function d1First<T>(
  db: D1Database,
  sql: string,
  ...params: unknown[]
): Promise<T | null> {
  const stmt = db.prepare(sql);
  const result =
    params.length > 0 ? await stmt.bind(...params).first<T>() : await stmt.first<T>();
  return result ?? null;
}

export async function d1All<T>(
  db: D1Database,
  sql: string,
  ...params: unknown[]
): Promise<T[]> {
  const stmt = db.prepare(sql);
  const result =
    params.length > 0 ? await stmt.bind(...params).all<T>() : await stmt.all<T>();
  return (result.results ?? []) as T[];
}

import type { D1Database } from "@cloudflare/workers-types";

declare global {
  type CloudflareEnv = {
    DATABASE: D1Database;
  };
}

export {};

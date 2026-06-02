import { isSqliteAvailable } from "./client";
import { getD1 } from "./d1";

export type StorageBackend = "d1" | "sqlite" | "none";

export async function getStorageBackend(): Promise<StorageBackend> {
  const d1 = await getD1();
  if (d1) {
    return "d1";
  }
  if (isSqliteAvailable()) {
    return "sqlite";
  }
  return "none";
}

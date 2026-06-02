import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";
import { DB_SCHEMA_SQL } from "./schema";

let db: Database.Database | null = null;
let sqliteDisabled = false;

export class SqliteUnavailableError extends Error {
  constructor(cause?: unknown) {
    super("SQLite no disponible en este entorno.");
    this.name = "SqliteUnavailableError";
    if (cause instanceof Error && cause.stack) {
      this.cause = cause;
    }
  }
}

/** Indica si SQLite local está operativo (false en Webflow Cloud sin Storage). */
export function isSqliteAvailable(): boolean {
  if (sqliteDisabled) {
    return false;
  }

  try {
    getDb();
    return true;
  } catch {
    return false;
  }
}

export function getDb(): Database.Database {
  if (sqliteDisabled) {
    throw new SqliteUnavailableError();
  }

  if (!db) {
    try {
      const dataDir = path.join(process.cwd(), "data");
      fs.mkdirSync(dataDir, { recursive: true });
      const dbPath = path.join(dataDir, "app.db");
      db = new Database(dbPath);
      db.pragma("journal_mode = WAL");
      db.exec(DB_SCHEMA_SQL);
    } catch (error) {
      sqliteDisabled = true;
      db = null;
      throw new SqliteUnavailableError(error);
    }
  }

  return db;
}

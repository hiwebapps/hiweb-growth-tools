import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";
import { DB_SCHEMA_SQL } from "./schema";

let db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (!db) {
    const dataDir = path.join(process.cwd(), "data");
    fs.mkdirSync(dataDir, { recursive: true });
    const dbPath = path.join(dataDir, "app.db");
    db = new Database(dbPath);
    db.pragma("journal_mode = WAL");
    db.exec(DB_SCHEMA_SQL);
  }
  return db;
}

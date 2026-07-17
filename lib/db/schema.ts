/**
 * SQLite schema (applied in a later phase when Webflow Cloud DB client is wired).
 * @see docs/HIWEB_GROWTH_TOOLS_SPEC.md §13
 */
export const DB_SCHEMA_SQL = `
CREATE TABLE IF NOT EXISTS quiz_sessions (
  session_id TEXT PRIMARY KEY,
  current_step INTEGER NOT NULL DEFAULT 0,
  answers_json TEXT NOT NULL DEFAULT '{}',
  updated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_quiz_sessions_updated_at ON quiz_sessions(updated_at);

CREATE TABLE IF NOT EXISTS quiz_leads (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  company TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  website TEXT,
  industry TEXT,
  score_total INTEGER NOT NULL,
  score_percentage REAL NOT NULL,
  result_level TEXT NOT NULL,
  recommended_services TEXT NOT NULL,
  answers_json TEXT NOT NULL,
  category_scores_json TEXT NOT NULL,
  pending_sync INTEGER DEFAULT 0,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS calendar_bookings (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  company TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  website TEXT,
  service TEXT NOT NULL,
  selected_date TEXT NOT NULL,
  selected_time TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'confirmed',
  pending_sync INTEGER DEFAULT 0,
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_calendar_bookings_email ON calendar_bookings(email);
CREATE INDEX IF NOT EXISTS idx_calendar_bookings_selected_date ON calendar_bookings(selected_date);
CREATE UNIQUE INDEX IF NOT EXISTS idx_calendar_bookings_confirmed_slot
ON calendar_bookings(selected_date, selected_time)
WHERE status = 'confirmed';

CREATE TABLE IF NOT EXISTS roi_leads (
  id TEXT PRIMARY KEY,
  name TEXT,
  company TEXT,
  email TEXT,
  phone TEXT,
  monthly_budget REAL NOT NULL,
  estimated_leads REAL NOT NULL,
  estimated_sales REAL NOT NULL,
  estimated_revenue REAL NOT NULL,
  estimated_roi REAL NOT NULL,
  inputs_json TEXT NOT NULL,
  recommendations_json TEXT NOT NULL,
  pending_sync INTEGER DEFAULT 0,
  created_at TEXT NOT NULL
);
`.trim();

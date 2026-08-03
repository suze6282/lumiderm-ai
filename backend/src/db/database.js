import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const dataDir = path.resolve(__dirname, '../../data');
export const databaseFile = path.join(dataDir, 'lumiderm.sqlite');

let databasePromise = null;

export const ensureDataDir = () => {
  fs.mkdirSync(dataDir, { recursive: true });
};

const initializeSchema = async (db) => {
  await db.exec(`
    CREATE TABLE IF NOT EXISTS analysis_records (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      analysis_id TEXT NOT NULL UNIQUE,
      image_url TEXT NOT NULL,
      image_file_name TEXT NOT NULL,
      image_original_name TEXT NOT NULL,
      image_mime_type TEXT NOT NULL,
      image_size INTEGER NOT NULL,
      overall_score INTEGER NOT NULL,
      metrics_json TEXT NOT NULL,
      face_mapping_json TEXT NOT NULL,
      insight_json TEXT NOT NULL,
      routine_suggestion_json TEXT NOT NULL,
      disclaimer TEXT NOT NULL,
      zh_disclaimer TEXT NOT NULL,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_analysis_records_analysis_id
      ON analysis_records (analysis_id);

    CREATE INDEX IF NOT EXISTS idx_analysis_records_created_at
      ON analysis_records (created_at);
  `);
};

export const getDatabase = async () => {
  if (!databasePromise) {
    ensureDataDir();
    databasePromise = open({
      filename: databaseFile,
      driver: sqlite3.Database,
    })
      .then(async (db) => {
        await initializeSchema(db);
        return db;
      })
      .catch((error) => {
        databasePromise = null;
        throw error;
      });
  }

  return databasePromise;
};

export const initializeDatabase = async () => {
  await getDatabase();
};

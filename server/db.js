import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pkg;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let fallbackStore = null;
let fallbackNextId = 1;
const fallbackStorePath = process.env.JSON_STORE_PATH
  ? path.resolve(process.cwd(), process.env.JSON_STORE_PATH)
  : path.join(__dirname, 'data', 'users.json');

const ensureFallbackStore = async () => {
  if (fallbackStore) {
    return fallbackStore;
  }

  const storeDir = path.dirname(fallbackStorePath);
  await fs.mkdir(storeDir, { recursive: true });

  try {
    const raw = await fs.readFile(fallbackStorePath, 'utf8');
    const parsed = JSON.parse(raw);
    fallbackStore = Array.isArray(parsed) ? parsed : (parsed.users ?? []);
  } catch (error) {
    if (error.code === 'ENOENT') {
      fallbackStore = [];
      await fs.writeFile(fallbackStorePath, JSON.stringify(fallbackStore, null, 2), 'utf8');
    } else {
      throw error;
    }
  }

  fallbackNextId = fallbackStore.reduce((max, row) => Math.max(max, Number(row.id) || 0), 0) + 1;
  return fallbackStore;
};

const persistFallbackStore = async () => {
  const storeDir = path.dirname(fallbackStorePath);
  await fs.mkdir(storeDir, { recursive: true });
  await fs.writeFile(fallbackStorePath, JSON.stringify(fallbackStore, null, 2), 'utf8');
};

const selectFallbackRows = async (text, params = []) => {
  const rows = await ensureFallbackStore();
  const normalized = rows.map((row) => ({ ...row }));

  if (text.includes('WHERE email = $1')) {
    const email = params[0];
    return normalized.filter((row) => row.email === email);
  }

  if (text.includes('WHERE id = $1')) {
    const id = Number(params[0]);
    return normalized.filter((row) => Number(row.id) === id);
  }

  if (text.includes('ORDER BY created_at DESC')) {
    return normalized.sort((a, b) => String(b.created_at || '').localeCompare(String(a.created_at || '')));
  }

  return normalized;
};

const buildFallbackSelectResult = async (text, params = []) => {
  const rows = await selectFallbackRows(text, params);

  if (text.includes('SELECT id FROM users')) {
    return {
      rows: rows.map((row) => ({ id: row.id })),
      rowCount: rows.length,
    };
  }

  if (text.includes('SELECT id, name, email, role, category, department FROM users')) {
    return {
      rows: rows.map(({ id, name, email, role, category, department }) => ({ id, name, email, role, category, department })),
      rowCount: rows.length,
    };
  }

  return {
    rows: rows.map((row) => ({ ...row })),
    rowCount: rows.length,
  };
};

const createTableFallback = async () => ({ rows: [], rowCount: 0 });

const updateFallbackRow = async (text, params = []) => {
  const rows = await ensureFallbackStore();
  const targetEmail = params[params.length - 1];
  let updatedCount = 0;

  rows.forEach((row) => {
    if (row.email === targetEmail) {
      if (params[0] !== undefined) row.password_hash = params[0];
      if (params[1] !== undefined) row.role = params[1];
      if (params[2] !== undefined) row.department = params[2];
      if (params[3] !== undefined) row.name = params[3];
      updatedCount += 1;
    }
  });

  if (updatedCount > 0) {
    await persistFallbackStore();
  }

  return { rows: [], rowCount: updatedCount };
};

const insertFallbackRow = async (text, params = []) => {
  const rows = await ensureFallbackStore();
  const values = params;
  const row = {
    id: fallbackNextId,
    name: values[0] ?? null,
    email: values[1] ?? null,
    password_hash: values[2] ?? null,
    role: values[3] ?? null,
    category: values[4] ?? null,
    department: values[5] ?? null,
    created_at: new Date().toISOString(),
  };

  rows.push(row);
  fallbackNextId += 1;
  await persistFallbackStore();

  const selectedColumns = text.match(/RETURNING\s+(.+)/i)?.[1]?.trim() ?? 'id, name, email, role, category, department';
  const selectedFields = selectedColumns.split(',').map((field) => field.trim()).filter(Boolean);

  return {
    rows: selectedFields.length
      ? [selectedFields.reduce((acc, field) => ({ ...acc, [field]: row[field] ?? null }), {})]
      : [row],
    rowCount: 1,
  };
};

const useFallbackStore = process.env.DB_MODE !== 'postgres' || !process.env.DATABASE_URL;
let pool = null;

if (!useFallbackStore) {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });
}

export const query = async (text, params = []) => {
  const normalizedText = String(text).trim();

  if (useFallbackStore) {
    if (/^CREATE TABLE/i.test(normalizedText)) {
      return createTableFallback();
    }

    if (/^INSERT INTO users/i.test(normalizedText)) {
      return insertFallbackRow(normalizedText, params);
    }

    if (/^UPDATE users/i.test(normalizedText)) {
      return updateFallbackRow(normalizedText, params);
    }

    if (/^SELECT/i.test(normalizedText)) {
      return buildFallbackSelectResult(normalizedText, params);
    }

    return { rows: [], rowCount: 0 };
  }

  return pool.query(normalizedText, params);
};

export const resetStorageForTests = async () => {
  fallbackStore = [];
  fallbackNextId = 1;
  await persistFallbackStore();
};

export default pool;

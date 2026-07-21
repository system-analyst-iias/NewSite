import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { query, resetStorageForTests } from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

process.env.DATABASE_URL = 'local';
process.env.DB_MODE = 'json';
process.env.JSON_STORE_PATH = path.join(__dirname, 'data', 'test-users.json');

test('falls back to a local JSON store when no Postgres is configured', async () => {
  resetStorageForTests();

  await query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      role VARCHAR(50) NOT NULL,
      category VARCHAR(100),
      department VARCHAR(100),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  const insertResult = await query(
    `INSERT INTO users (name, email, password_hash, role, category, department)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING id, name, email, role, category, department`,
    ['Test User', 'test@example.com', 'hash', 'employee', null, null],
  );

  assert.equal(insertResult.rows[0].email, 'test@example.com');

  const selectResult = await query('SELECT * FROM users WHERE email = $1', ['test@example.com']);
  assert.equal(selectResult.rows[0].role, 'employee');
});

import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import authRoutes from './auth.js';
import { query } from './db.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.join(__dirname, '..', 'dist');

const whatsNewFilePath = path.join(__dirname, 'data', 'whats_new.json');
const cfpFilePath = path.join(__dirname, 'data', 'call_for_papers.json');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/api/auth', authRoutes);

const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const token = authHeader.split(' ')[1];
    const jwt = (await import('jsonwebtoken')).default;
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret-change-me');
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

// ====================================================
// What's New & Call for Papers Data Persistence
// ====================================================
const readJsonFile = async (filePath, defaultData = []) => {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, JSON.stringify(defaultData, null, 2), 'utf8');
    return defaultData;
  }
};

const writeJsonFile = async (filePath, data) => {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
};

// Public GET routes
app.get('/api/content/whats-new', async (_req, res) => {
  try {
    const items = await readJsonFile(whatsNewFilePath, []);
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Failed to load What’s New announcements' });
  }
});

app.get('/api/content/call-for-papers', async (_req, res) => {
  try {
    const items = await readJsonFile(cfpFilePath, []);
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Failed to load Call for Papers announcements' });
  }
});

// Admin management routes for What's New
app.post('/api/admin/whats-new', authenticate, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    const { date, title, isNew } = req.body;
    if (!title || !date) {
      return res.status(400).json({ message: 'Title and date are required' });
    }

    const items = await readJsonFile(whatsNewFilePath, []);
    const newItem = {
      id: Date.now(),
      date: date.trim(),
      title: title.trim(),
      isNew: Boolean(isNew),
    };

    items.unshift(newItem);
    await writeJsonFile(whatsNewFilePath, items);
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to add announcement' });
  }
});

app.delete('/api/admin/whats-new/:id', authenticate, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    const id = Number(req.params.id);
    let items = await readJsonFile(whatsNewFilePath, []);
    items = items.filter((item) => Number(item.id) !== id);

    await writeJsonFile(whatsNewFilePath, items);
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete announcement' });
  }
});

// Admin management routes for Call for Papers
app.post('/api/admin/call-for-papers', authenticate, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    const { badge, title, description, deadline, wordLimit, email } = req.body;
    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required' });
    }

    const items = await readJsonFile(cfpFilePath, []);
    const newItem = {
      id: Date.now(),
      badge: badge ? badge.trim() : 'Journal Volume',
      title: title.trim(),
      description: description.trim(),
      deadline: deadline ? deadline.trim() : 'August 31, 2026',
      wordLimit: wordLimit ? wordLimit.trim() : '6,000 – 8,000 words',
      email: email ? email.trim() : 'publications@iias.ac.in',
    };

    items.unshift(newItem);
    await writeJsonFile(cfpFilePath, items);
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to save Call for Papers' });
  }
});

app.delete('/api/admin/call-for-papers/:id', authenticate, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    const id = Number(req.params.id);
    let items = await readJsonFile(cfpFilePath, []);
    items = items.filter((item) => Number(item.id) !== id);

    await writeJsonFile(cfpFilePath, items);
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete Call for Papers' });
  }
});

// Admin route for Users
app.get('/api/admin/users', authenticate, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    const result = await query('SELECT id, name, email, role, category, department, created_at FROM users ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
});

const ensureAdminUser = async () => {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    return;
  }

  const result = await query('SELECT id, password_hash FROM users WHERE email = $1', [adminEmail]);
  if (result.rowCount > 0) {
    const existingUser = result.rows[0];
    const passwordMatches = existingUser?.password_hash && (await bcrypt.compare(adminPassword, existingUser.password_hash));

    if (passwordMatches) {
      return;
    }

    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    await query(
      `UPDATE users SET password_hash = $1, role = $2, department = $3, name = $4 WHERE email = $5`,
      [hashedPassword, 'admin', 'Administration', 'Administrator', adminEmail],
    );
    return;
  }

  const hashedPassword = await bcrypt.hash(adminPassword, 10);
  await query(
    `INSERT INTO users (name, email, password_hash, role, department)
     VALUES ($1, $2, $3, $4, $5)`,
    ['Administrator', adminEmail, hashedPassword, 'admin', 'Administration'],
  );
};

app.listen(PORT, async () => {
  try {
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
    await ensureAdminUser();
    console.log(`Server listening on port ${PORT}`);
  } catch (error) {
    console.error('DB init failed', error);
  }
});

app.use(express.static(distPath));
app.get(/(.*)/, (req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ message: 'Not found' });
  }
  res.sendFile(path.join(distPath, 'index.html'));
});

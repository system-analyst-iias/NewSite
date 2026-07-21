# IIAS Institutional Website

This project is a React + TypeScript website for an academic institution, with a role-based authentication experience for employees and research fellows.

## Features

- Modern landing page for the institution
- Authentication flow for users and administrators
- Role-based registration and dashboard experience
- Local development server and production build support

## Requirements

Before you start, make sure you have installed:

- Node.js 18 or newer
- npm
- Optional: PostgreSQL if you want to switch from the built-in local fallback storage

## Quick start

1. Clone the repository
2. Install dependencies
3. Start the app

```bash
npm install
npm run build
node server/server.js
```

The backend will run on port 5000.

## Environment variables

Copy the example environment file and update values if needed:

```bash
cp .env.example .env
```

Example values:

```env
DATABASE_URL=
JWT_SECRET=change-this-secret
PORT=5000
DB_MODE=json
JSON_STORE_PATH=./server/data/users.json
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=change-me-please
```

## Local development

Run the frontend build and backend server:

```bash
npm run build
node server/server.js
```

Health check:

```bash
curl http://127.0.0.1:5000/health
```

You should receive:

```json
{"status":"ok"}
```

## Production build

```bash
npm run build
```

## Notes

- The current setup includes a local JSON fallback so the app can run even without PostgreSQL installed.
- If you want to connect a real PostgreSQL database, set a valid `DATABASE_URL` and use `DB_MODE=postgres`.

## Project structure

- `src/` - React frontend pages and styles
- `server/` - Express backend and auth logic
- `public/` - static assets
- `dist/` - production build output


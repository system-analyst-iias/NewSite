# Server deployment notes

1. Copy .env.example to .env on the server and fill in PostgreSQL and JWT values.
2. Run:
   chmod +x server/setup.sh
   ./server/setup.sh
3. Start the app:
   npm install
   npm run build
   pm2 start server/server.js --name iias-portal
4. Ensure GitHub Actions secrets exist:
   - DATABASE_URL
   - JWT_SECRET
   - ADMIN_EMAIL
   - ADMIN_PASSWORD

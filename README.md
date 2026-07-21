# Indian Institute of Advanced Study (IIAS Shimla)

A modern full-stack web application for the **Indian Institute of Advanced Study (IIAS Shimla)**, housed in the historic **Rashtrapati Nivas (Viceregal Lodge)**.

Featuring a heritage aesthetic, 7 complete public pages, interactive digital archives, and a role-based portal for Employees, Research Fellows, and Administrators.

---

## 🏛️ Website Pages & Structure

1. **Home (`/`)**: Heritage hero banner featuring Viceregal Lodge, Chairman/Director welcome, institutional stats strip, research pillars, and portal callouts.
2. **About Us (`/about`)**: Viceregal Lodge (built 1888) history, Dr. S. Radhakrishnan's vision (1964), objectives, and Governing Body structure.
3. **Library & Archives (`/library`)**: IIAS research repository over 200,000 volumes, rare manuscripts, live OPAC catalog search interface, and reading room rules.
4. **Academics & Fellowships (`/academics`)**: Fellowship schemes (National, Tagore, Residential, Associate Fellows), research domains, and application process.
5. **Publications (`/publications`)**: Monograph series catalog, peer-reviewed journals (*Summer Hill* & *Studies in Humanities*), and book purchasing guide.
6. **Administration (`/administration`)**: Institutional leadership (President, Chairman, Director), department contact directory, and statutory committees.
7. **For Tourists (`/tourists`)**: Visitor guide to Rashtrapati Nivas: ticket tariffs, visiting hours, Light & Sound show timings, visitor guidelines, and directions.
8. **Staff & Fellow Portal (`/auth` & `/dashboard`)**:
   - **User Workspace**: Profile credentials, research monograph proposal submission, digital library pass generator, and campus announcements.
   - **Admin Management Panel**: Live user statistics and filterable user registry (`/api/admin/users`).

---

## 🚀 Local Quick Start

### 1. Prerequisites
- Node.js 18 or 22
- npm

### 2. Run Development Server
```bash
npm install
npm run dev
```
- **Frontend App**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:5000](http://localhost:5000)

### 3. Default Login Credentials
- **Admin Email**: `admin@example.com`
- **Admin Password**: `admin123` *(configured in `.env`)*

---

## 🐧 Ubuntu Server & Nginx Deployment Guide

To deploy this repository on an Ubuntu server:

### 1. Clone & Run Setup Script
```bash
git clone <your-repo-url> NewSite
cd NewSite
bash server/setup.sh
```
The script will automatically install Nginx, Node.js 22 LTS, PM2, and configure the Nginx site proxy.

### 2. Configure GitHub Actions Self-Hosted Runner
On your Ubuntu server:
1. Go to your GitHub repository -> **Settings** -> **Actions** -> **Runners**.
2. Click **New self-hosted runner** -> Choose **Linux**.
3. Run the provided commands on your server to download and configure the runner agent.
4. Start the runner service:
   ```bash
   sudo ./svc.sh install
   sudo ./svc.sh start
   ```

### 3. Add GitHub Repository Secrets (Optional)
In your repository settings (**Settings** -> **Secrets and variables** -> **Actions**), you can optionally set:
- `JWT_SECRET`: Secret key for signing JWT tokens.
- `ADMIN_EMAIL`: Custom default admin email.
- `ADMIN_PASSWORD`: Custom default admin password.
- `DATABASE_URL`: (Optional) PostgreSQL connection string if `DB_MODE=postgres`.

Whenever you push to the `main` branch, GitHub Actions will automatically checkout the repository, run `npm ci`, execute `npm run build`, and reload the backend server via PM2!

---

## 📜 License
© Indian Institute of Advanced Study (IIAS Shimla), Rashtrapati Nivas, Observatory Hill, Shimla - 171005.

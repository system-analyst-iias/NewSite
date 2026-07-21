# Indian Institute of Advanced Study (IIAS Shimla)

A modern full-stack web application for the **Indian Institute of Advanced Study (IIAS Shimla)**, housed in the historic **Rashtrapati Nivas (Viceregal Lodge)** atop Observatory Hill, Shimla.

Featuring a heritage aesthetic, 7 complete public pages, interactive digital archives, dynamic admin content management, and a role-based portal for Employees, Research Fellows, and Administrators.

---

## 🏛️ Official Institutional Leadership

- **Chairperson, Governing Body**: Professor ShashiPrabha Kumar
- **Director, IIAS**: Professor Himanshu Kumar Chaturvedi
- **Secretary, IIAS**: Shri Meher Chand Negi
- **Librarian, IIAS**: Dr. Rajiv Kumar Mishra

---

## 🌐 Website Pages & Key Features

1. **Home (`/`)**:
   - **📢 What's New Corner**: Dynamic announcement ticker with blinking "NEW" badges.
   - **✍️ Call for Papers & Monographs**: Academic submissions box with deadlines, word limits, and peer-review links.
   - **🖼️ Media & Heritage Photo Slider**: Interactive photo carousel with auto-play timer and full-screen modal viewer.
   - **📘 Facebook Page Frame Widget**: Live embedded official Facebook feed.
   - **📱 Social Media QR Codes**: Connect section with scan-to-follow cards for **Facebook**, **X (Twitter)**, and **YouTube**.
2. **About Us (`/about`)**: History of Viceregal Lodge (built 1888), Dr. S. Radhakrishnan's vision (1964), objectives, and Governing Body structure.
3. **Library & Archives (`/library`)**: IIAS research repository over 200,000 volumes, rare manuscripts, live OPAC catalog search interface, and reading carrel rules.
4. **Academics & Fellowships (`/academics`)**: Fellowship schemes (National, Tagore, Residential, Associate Fellows), research domains, and application process timeline.
5. **Publications (`/publications`)**: Monograph series catalog, peer-reviewed journals (*Summer Hill* & *Studies in Humanities*), and book purchasing guide.
6. **Administration (`/administration`)**: Institutional leadership hierarchy, administrative department directory, and statutory committees.
7. **For Tourists (`/tourists`)**:
   - **Key Attractions**: Tagore Gallery, Fire Station Gallery, Historical Main Building Galleries, 110-acre Estate Lawns & Gardens, and **Sunset View Cafe**.
   - **Facilities**: **E-Golf Cart Shuttle** running from **Gorkha Gate** to the **Fire Station Ticket Counter**.
   - **Visitor Info**: Ticket tariffs, opening hours (9:30 AM – 5:00 PM, Tue–Sun), and guidelines.
8. **Staff & Fellow Portal (`/auth` & `/dashboard`)**:
   - **User Workspace**: Profile credentials, monograph proposal submission tool, digital library pass generator, and announcements.
   - **Admin Control Panel**:
     - **⚙️ User Management**: Live user statistics and filterable account registry.
     - **📢 Edit What's New**: Post new announcements or delete outdated items in real-time.
     - **✍️ Edit Call for Papers**: Update submission guidelines, deadlines, and journal contact info.

---

## 🚀 Local Development Quick Start

### 1. Prerequisites
- Node.js 18 or 22 LTS
- npm

### 2. Run Development Server
```bash
npm install
npm run dev
```
- **Frontend App**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:5000](http://localhost:5000)

### 3. Default Admin Login Credentials
- **Admin Email**: `admin@example.com`
- **Admin Password**: `admin123` *(configured in `.env`)*

---

## 🐧 Ubuntu Server & Nginx Deployment Guide

### Step 1: Push Changes from Local Machine
On your local computer (inside `d:\Workspace\demo\IIAS\NewSite`):
```bash
git add .
git commit -m "Update IIAS Shimla website and deployment documentation"
git push origin main
```

### Step 2: Configure Ubuntu Server (One-Time Setup)
SSH into your Ubuntu server and run:
```bash
git clone https://github.com/system-analyst-iias/NewSite.git
cd NewSite
bash server/setup.sh
```
*`setup.sh` automatically installs Nginx, Node.js 22 LTS, PM2, and configures Nginx reverse-proxy on Port 80.*

### Step 3: Configure GitHub Actions Self-Hosted Runner
On your Ubuntu server terminal:
1. Go to your GitHub Repository -> **Settings** -> **Actions** -> **Runners** -> **New self-hosted runner** -> **Linux**.
2. Run the provided runner setup commands:
   ```bash
   mkdir actions-runner && cd actions-runner
   curl -o actions-runner-linux-x64.tar.gz -L https://github.com/actions/runner/releases/download/v2.320.0/actions-runner-linux-x64-2.320.0.tar.gz
   tar xzf ./actions-runner-linux-x64.tar.gz
   ./config.sh --url https://github.com/system-analyst-iias/NewSite --token YOUR_RUNNER_TOKEN
   ```
3. Start the runner background service:
   ```bash
   sudo ./svc.sh install
   sudo ./svc.sh start
   ```

### Step 4: Verify Live Application
- Check backend PM2 status: `pm2 status`
- Check Nginx status: `sudo systemctl status nginx`
- Access your live website at: `http://your-server-ip`

---

## 📜 License
© Indian Institute of Advanced Study (IIAS Shimla), Rashtrapati Nivas, Observatory Hill, Shimla - 171005.

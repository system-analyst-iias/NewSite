#!/usr/bin/env bash
set -euo pipefail

echo "==> Updating Ubuntu package list & installing dependencies..."
sudo apt update
sudo apt install -y nginx build-essential curl git

echo "==> Installing Node.js 22 LTS (if not present)..."
if ! command -v node &> /dev/null; then
  curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
  sudo apt install -y nodejs
fi

echo "==> Installing PM2 globally..."
sudo npm install -g pm2

echo "==> Configuring Nginx site..."
sudo tee /etc/nginx/sites-available/iias.conf > /dev/null <<'EOF'
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name _;

    client_max_body_size 20M;

    location / {
        proxy_pass http://127.0.0.1:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
EOF

sudo ln -sf /etc/nginx/sites-available/iias.conf /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl restart nginx

echo "==> Setup Complete! You can now configure GitHub Actions runner."

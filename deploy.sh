#!/bin/bash
set -e

echo "🚀 Deploying SSR Next.js blog to gostudy.ae/blog"

cd /var/www/nextjs-blog

# Pull latest code (if using git)
# git pull origin main

# Install dependencies
echo "📦 Installing dependencies..."
npm ci --production

# Build the SSR app
echo "🔨 Building Next.js SSR app..."
npm run build

# Set permissions
chown -R www-data:www-data /var/www/gostudy-blog

# Restart the service
echo "🔄 Restarting service..."

#restart pm2 process
echo "Restarting PM2 process..."
pm2 restart 2  

echo "✅ SSR Blog deployed! Access at: https://gostudy.ae/blog"
echo "📊 Check status with: sudo systemctl status gostudy-blog.service"
# 🚀 ROYAL SHOPPING - PRODUCTION DEPLOYMENT GUIDE

## COMPLETE SETUP FOR VERCEL + RENDER + POSTGRESQL

This guide will get your site live with working admin panel in **15 minutes**.

---

## 📋 PREREQUISITES

Before starting, have these ready:
1. **GitHub account** - https://github.com (to connect Vercel & Render)
2. **Vercel account** - https://vercel.com (sign up with GitHub)
3. **Render account** - https://render.com (sign up with GitHub)
4. **Cloudinary account** - https://cloudinary.com (for images, free tier)

---

## ⚡ STEP 1: PUSH CODE TO GITHUB (2 minutes)

```bash
# Initialize git (if not already done)
cd royal-shopping
git init

# Add all files
git add .

# Create .gitignore
cat > .gitignore << EOF
node_modules/
.env
.DS_Store
dist/
EOF

# Commit
git commit -m "Initial commit: Royal Shopping v1.0"

# Add remote and push (replace YOUR_USERNAME and YOUR_REPO)
git remote add origin https://github.com/YOUR_USERNAME/royal-shopping.git
git branch -M main
git push -u origin main
```

✅ Your code is now on GitHub

---

## 🗄️ STEP 2: CREATE POSTGRESQL DATABASE ON RENDER (3 minutes)

1. **Go to Render Dashboard**: https://dashboard.render.com

2. **Create PostgreSQL Database**:
   - Click "New +"
   - Select "PostgreSQL"
   - Fill in:
     - **Name**: `royal-shopping-db`
     - **Database**: `royal_shopping`
     - **User**: `royal_user`
     - **Region**: Choose nearest to you
     - **Plan**: Free tier is fine
   - Click "Create Database"

3. **Wait 2-3 minutes** for database to be created

4. **Copy the connection string** - You'll see:
   ```
   postgresql://royal_user:PASSWORD@HOST:5432/royal_shopping
   ```
   - Save this! You need it for backend

✅ Database is live

---

## 🔧 STEP 3: DEPLOY BACKEND TO RENDER (5 minutes)

### 3A: Update server.js for Production

Your `server/server.js` should have this code (already included):

```javascript
import 'dotenv/config'
import express from 'express'
// ... rest of code handles CORS properly
```

### 3B: Create render.yaml (already exists, verify it has):

The file should be in your root directory with:
```yaml
services:
  - type: web
    name: royal-shopping-api
    env: node
    plan: free
    buildCommand: cd server && npm install && npx prisma migrate deploy
    startCommand: cd server && npm start
    envVars:
      - key: DATABASE_URL
        fromDatabase:
          name: royal-shopping-db
          property: connectionString
      - key: JWT_SECRET
        value: your-super-secret-key-min-32-chars-change-this
      - key: NODE_ENV
        value: production
      - key: ACCESS_EXPIRES
        value: 15m
      - key: REFRESH_EXPIRES_DAYS
        value: "30"
      - key: CLIENT_URL
        value: https://royal-shopping.vercel.app # Will update after frontend deploy
      - key: PORT
        value: "10000"

databases:
  - name: royal-shopping-db
    plan: free
```

### 3C: Deploy Backend

1. **Go to Render**: https://dashboard.render.com
2. Click "New +"
3. Select "Web Service"
4. Click "Connect" next to your GitHub repo
5. Enter repository name: `YOUR_GITHUB_USERNAME/royal-shopping`
6. Fill in:
   - **Name**: `royal-shopping-api`
   - **Branch**: `main`
   - **Root Directory**: `server`
   - **Build Command**: `npm install && npx prisma migrate deploy`
   - **Start Command**: `npm start`
   - **Plan**: Free
7. Click "Advanced" and add environment variables:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `JWT_SECRET` | `RoyalShopping2024SecureKey123456789XYZ` |
| `ACCESS_EXPIRES` | `15m` |
| `REFRESH_EXPIRES_DAYS` | `30` |
| `CLIENT_URL` | `https://royal-shopping.vercel.app` |
| `CLOUDINARY_API_KEY` | (Get from your Cloudinary account) |
| `CLOUDINARY_API_SECRET` | (Get from your Cloudinary account) |
| `CLOUDINARY_CLOUD_NAME` | (Get from your Cloudinary account) |

8. Click "Create Web Service"
9. **Wait 5-10 minutes** for deployment

✅ When you see "Live" in green, your backend is deployed!

**Your backend URL will be**: `https://royal-shopping-api.onrender.com` (Render will give you exact URL)

---

## 🎨 STEP 4: DEPLOY FRONTEND TO VERCEL (3 minutes)

### 4A: Create vercel.json in root

```json
{
  "buildCommand": "cd client && npm install && npm run build",
  "outputDirectory": "client/dist",
  "env": {
    "VITE_API_URL": "https://royal-shopping-api.onrender.com/api"
  }
}
```

### 4B: Update client/.env.production

Create file: `client/.env.production`
```env
VITE_API_URL=https://royal-shopping-api.onrender.com/api
```

### 4C: Deploy to Vercel

1. **Go to Vercel**: https://vercel.com
2. Click "New Project"
3. "Import Git Repository"
4. Select your `royal-shopping` repo
5. Fill in:
   - **Framework**: Vite
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. Add Environment Variable:
   - Key: `VITE_API_URL`
   - Value: `https://royal-shopping-api.onrender.com/api`
7. Click "Deploy"
8. **Wait 3-5 minutes**

✅ When you see "Congratulations!", your frontend is live!

**Your frontend URL will be**: `https://royal-shopping.vercel.app` (or custom domain)

---

## 📝 STEP 5: CREATE ADMIN USER (2 minutes)

Your backend is running, but you need an admin account.

### Option A: Using Prisma Studio (Easiest)

```bash
cd server
npx prisma studio
```

This opens visual database manager. Add admin user:

1. Click "User" table
2. Click "Add record"
3. Fill in:
   - `name`: Admin User
   - `email`: admin@royalshopping.com
   - `password`: (it will be hashed by Prisma)
   - `role`: admin

### Option B: Using SQL

Connect to your Render PostgreSQL with:
```bash
psql postgresql://royal_user:PASSWORD@HOST:5432/royal_shopping
```

Then run:
```sql
INSERT INTO "User" (name, email, password, role, "createdAt", "updatedAt")
VALUES ('Admin User', 'admin@royalshopping.com', '$2a$10$...hashed_password...', 'admin', NOW(), NOW());
```

**For now, register a user from the website and manually update:**
```sql
UPDATE "User" SET role = 'admin' WHERE email = 'your@email.com';
```

✅ Admin account created

---

## 🎯 FINAL VERIFICATION

### Test Your Live Website

1. **Open Frontend**: `https://royal-shopping.vercel.app`
2. **Register New User**:
   - Go to /register
   - Email: `test@royalshopping.com`
   - Password: `Test123456`
3. **Verify Features**:
   - Browse products ✓
   - Add to cart ✓
   - Add to wishlist ✓
   - Checkout with COD ✓
4. **Test Admin Panel**:
   - Go to `/admin/login`
   - Email: `admin@royalshopping.com`
   - Password: (what you set)
   - View dashboard, products, orders, customers ✓

---

## 📌 YOUR LIVE CREDENTIALS

### Customer/User Account
```
Email: test@royalshopping.com
Password: Test123456
```

### Admin Account (After Setup)
```
Email: admin@royalshopping.com
Password: (Admin1234 if you set it)
Role: admin
```

### URLs
```
🌐 Frontend:  https://royal-shopping.vercel.app
🔗 Backend:   https://royal-shopping-api.onrender.com
📊 Admin:     https://royal-shopping.vercel.app/admin/login
📦 API Docs:  https://royal-shopping-api.onrender.com/api
```

---

## ⚙️ ENVIRONMENT VARIABLES REFERENCE

### Backend (Render)
| Variable | Value | Notes |
|----------|-------|-------|
| `NODE_ENV` | `production` | - |
| `PORT` | `10000` | Render uses this |
| `DATABASE_URL` | `postgresql://...` | From Render DB |
| `CLIENT_URL` | `https://royal-shopping.vercel.app` | Your frontend URL |
| `JWT_SECRET` | `RoyalShopping2024...` | Min 32 chars, change it |
| `ACCESS_EXPIRES` | `15m` | Token expiry |
| `REFRESH_EXPIRES_DAYS` | `30` | Refresh token days |
| `CLOUDINARY_API_KEY` | From Cloudinary | For image uploads |
| `CLOUDINARY_API_SECRET` | From Cloudinary | For image uploads |
| `CLOUDINARY_CLOUD_NAME` | From Cloudinary | For image uploads |

### Frontend (Vercel)
| Variable | Value | Notes |
|----------|-------|-------|
| `VITE_API_URL` | `https://royal-shopping-api.onrender.com/api` | Backend API URL |

---

## 🐛 TROUBLESHOOTING

### "Database connection failed"
```
✓ Check DATABASE_URL is correct in Render env vars
✓ Wait 5 minutes for database to fully initialize
✓ Check Render PostgreSQL service is "Available"
```

### "CORS error on frontend"
```
✓ Update CLIENT_URL in Render backend env vars
✓ Restart backend service: Dashboard > royal-shopping-api > Restart
✓ Wait 2 minutes
```

### "Images not uploading"
```
✓ Add CLOUDINARY variables to Render
✓ Get them from: https://cloudinary.com/console/settings/keys
✓ Restart backend service
```

### "Admin login doesn't work"
```
✓ Verify admin user exists in database:
   SELECT * FROM "User" WHERE role = 'admin';
✓ If not, create one manually using Prisma Studio
✓ Check password is correct
```

### "Vercel deploy failed"
```
✓ Check client/package.json has all dependencies
✓ Verify VITE_API_URL is set in Vercel env vars
✓ Check build succeeds locally: npm run build
```

---

## ✅ DEPLOYMENT CHECKLIST

- [ ] Code pushed to GitHub
- [ ] PostgreSQL database created on Render
- [ ] Backend deployed to Render (shows "Live")
- [ ] Backend URL working: `https://royal-shopping-api.onrender.com/api/health`
- [ ] Frontend deployed to Vercel
- [ ] Frontend URL accessible: `https://royal-shopping.vercel.app`
- [ ] Admin user created in database
- [ ] Can register and login as regular user
- [ ] Can login as admin and access `/admin`
- [ ] Products load correctly
- [ ] Cart and checkout work
- [ ] Admin can add/edit products
- [ ] Admin can view orders and customers

---

## 📊 LIVE DASHBOARD LINKS

Once deployed, access these:

```
🏠 Home Page
https://royal-shopping.vercel.app

👤 User Login
https://royal-shopping.vercel.app/login

📝 User Registration
https://royal-shopping.vercel.app/register

🛍️ Shop/Products
https://royal-shopping.vercel.app/shop

🛒 Shopping Cart
https://royal-shopping.vercel.app/cart

❤️ Wishlist
https://royal-shopping.vercel.app/wishlist

💳 Checkout
https://royal-shopping.vercel.app/checkout

👤 User Profile
https://royal-shopping.vercel.app/profile

📞 Contact Us
https://royal-shopping.vercel.app/contact

ℹ️ About Us
https://royal-shopping.vercel.app/about

🔐 Admin Login
https://royal-shopping.vercel.app/admin/login

📊 Admin Dashboard
https://royal-shopping.vercel.app/admin

📦 Manage Products
https://royal-shopping.vercel.app/admin/products

📋 Manage Orders
https://royal-shopping.vercel.app/admin/orders

👥 Manage Customers
https://royal-shopping.vercel.app/admin/customers

⚙️ Admin Settings
https://royal-shopping.vercel.app/admin/settings
```

---

## 🎉 YOU'RE LIVE!

Once this is deployed, your e-commerce website will be:
- ✅ **Live and accessible** to anyone on the internet
- ✅ **Professional grade** with admin panel
- ✅ **Scalable** on Render and Vercel free tiers
- ✅ **Secure** with JWT authentication
- ✅ **Database-backed** with PostgreSQL

**Next time someone asks, share:**
```
🌐 Visit: https://royal-shopping.vercel.app
👤 Admin Login: admin@royalshopping.com
🔑 Password: (your secure password)
```

---

## 📞 SUPPORT

If you face issues:
1. Check Render logs: Dashboard > Service > Logs
2. Check Vercel logs: Deployments > Click build > Logs
3. Check database: Use Prisma Studio (`npx prisma studio`)
4. Restart services if needed

**Happy deploying! 🚀**

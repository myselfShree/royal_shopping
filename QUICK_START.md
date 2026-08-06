# Royal Shopping - Quick Start Guide

Get the website running in 5 minutes!

## Prerequisites
- Node.js v16+
- PostgreSQL installed and running
- Cloudinary account (optional, for image uploads)

## Step 1: Backend Setup (2 minutes)

```bash
# Navigate to server
cd server

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env - at minimum set these:
# DATABASE_URL=postgresql://postgres:password@localhost:5432/royal_shopping
# JWT_SECRET=anyThingHere123456789SecureKey

# Create database
createdb royal_shopping

# Run migrations
npx prisma migrate dev --name init

# Start server
npm run dev
```

✅ Server ready at: http://localhost:5000

## Step 2: Frontend Setup (2 minutes)

```bash
# In another terminal, navigate to client
cd client

# Install dependencies
npm install

# Start development server
npm run dev
```

✅ Frontend ready at: http://localhost:5173

## Step 3: Quick Test (1 minute)

### Create a test user:
1. Go to http://localhost:5173
2. Click "Sign up" or navigate to /register
3. Fill in the form with:
   - Name: Test User
   - Email: test@example.com
   - Password: password123
4. Click "Create account"

### Test admin panel:
1. Navigate to http://localhost:5173/admin/login
2. The admin login uses same credentials as user (if you want to be an admin, manually update the role in database)
3. Or test with a user account first

### Add products to cart:
1. Browse products on home page
2. Click "Add to cart" on any product
3. View cart at /cart
4. Proceed to checkout (/checkout)
5. Fill in shipping info
6. Complete order with Cash on Delivery

---

## Key Credentials for First Login

### Regular User Login:
- Email: `test@example.com`
- Password: `password123`

### Admin Login (requires role='admin' in database):
```bash
# SSH into database and manually set admin role:
psql -d royal_shopping -U postgres
UPDATE "User" SET "role" = 'admin' WHERE email = 'test@example.com';
\q
```

---

## File Structure Quick Reference

```
royal-shopping/
├── client/
│   ├── src/
│   │   ├── pages/              # All pages
│   │   ├── components/         # React components
│   │   ├── context/            # Auth & Cart
│   │   ├── services/api.js     # API calls
│   │   └── App.jsx             # Routes
│   └── package.json
│
├── server/
│   ├── controllers/            # Business logic
│   ├── routes/                 # API endpoints
│   ├── prisma/schema.prisma    # Database schema
│   ├── server.js               # Main server
│   └── package.json
│
└── DEPLOYMENT_GUIDE.md         # Full deployment info
```

---

## What's Working (v1.0)

✅ User registration and login
✅ Browse and filter products
✅ Shopping cart with local storage
✅ Wishlist functionality
✅ Checkout with Cash on Delivery
✅ Admin product management (add, edit, delete)
✅ Admin order management and status updates
✅ Admin customer view
✅ User profile management
✅ About and Contact pages
✅ Responsive design

---

## Common Issues & Quick Fixes

### "Cannot connect to database"
```bash
# Make sure PostgreSQL is running
# On Mac:
brew services start postgresql

# On Linux:
sudo systemctl start postgresql

# On Windows:
# Start PostgreSQL from Services
```

### "PORT 5000 already in use"
```bash
# Mac/Linux: Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Windows: 
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### "Cannot find module 'prisma'"
```bash
cd server
rm -rf node_modules package-lock.json
npm install
```

### "Database migration failed"
```bash
# Reset database (only in development!)
npx prisma migrate reset

# Then run migrations again
npx prisma migrate dev --name init
```

---

## Next Steps

1. **Customize the store:**
   - Update `STORE_NAME`, `STORE_EMAIL` in server/.env
   - Modify colors in client/tailwind.config.js
   - Update logo in client/src/components/layout/Navbar.jsx

2. **Add real products:**
   - Login as admin
   - Go to /admin/products
   - Click "Add Product" and fill in details
   - Upload images from Cloudinary

3. **Setup Cloudinary (optional for images):**
   - Create account at cloudinary.com
   - Get your CLOUDINARY_URL from dashboard
   - Add to server/.env
   - Images will now upload properly

4. **Deploy to production:**
   - See DEPLOYMENT_GUIDE.md for detailed steps
   - Recommended: Render.com or Railway.app

---

## Useful Commands

```bash
# View database
psql -d royal_shopping -U postgres
\dt                    # Show tables
SELECT * FROM "User";  # View users
\q                     # Exit

# View Prisma studio (visual database explorer)
cd server
npx prisma studio

# Build frontend for production
cd client
npm run build

# Start production server
cd server
npm start
```

---

## Where to Go From Here?

- **🛠️ Customize:** Edit components in `client/src/components/`
- **📝 Create pages:** Add new pages in `client/src/pages/`
- **⚙️ Modify API:** Update endpoints in `server/controllers/` and `server/routes/`
- **🎨 Design:** Adjust Tailwind config and CSS
- **📦 Deploy:** Follow DEPLOYMENT_GUIDE.md

---

**That's it! Your e-commerce store is ready. Happy coding! 🚀**

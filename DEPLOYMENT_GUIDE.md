# Royal Shopping - Deployment Guide

A complete e-commerce solution with admin panel, cash-on-delivery checkout, and product management. This is **Version 1.0**.

## Features Implemented

✅ **User Features**
- User authentication (Register, Login, Logout)
- Browse products with filters (category, price, color, size)
- Product detail view with ratings
- Shopping cart with local storage persistence
- Wishlist functionality
- Cash on Delivery checkout
- User profile management
- Order history tracking

✅ **Admin Features**
- Secure admin login
- Product management (Create, Read, Update, Delete)
- Order management with status tracking
- Customer management and analytics
- Admin dashboard with statistics
- Store settings configuration

✅ **Pages**
- Home page with featured products
- Shop page with advanced filtering
- Product detail page
- Cart and Wishlist pages
- Checkout page (COD payment)
- User profile and order tracking
- About and Contact pages
- Admin dashboard, products, orders, and customers pages

---

## Project Structure

```
royal-shopping/
├── client/                 # React + Vite frontend
│   ├── src/
│   │   ├── pages/         # All page components
│   │   ├── components/    # Reusable components
│   │   ├── context/       # Auth and Cart context
│   │   ├── services/      # API services
│   │   └── layouts/       # Layout components
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── server/                 # Node.js + Express backend
│   ├── controllers/        # Business logic
│   ├── routes/            # API routes
│   ├── middleware/        # Auth and validation middleware
│   ├── prisma/            # Database schema and migrations
│   ├── services/          # Utility services
│   ├── server.js          # Main server file
│   └── package.json
│
├── docker-compose.yml     # Docker setup
└── render.yaml            # Render deployment config
```

---

## Prerequisites

- **Node.js** v16+ and npm
- **PostgreSQL** database (local or cloud)
- **Cloudinary** account (for image uploads) - optional
- **Git** for version control

---

## Local Development Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd royal-shopping
```

### 2. Setup Backend

```bash
cd server

# Install dependencies
npm install

# Create .env file from .env.example
cp .env.example .env

# Update .env with your configuration
# DATABASE_URL=postgresql://user:password@localhost:5432/royal_shopping
# JWT_SECRET=your-secret-key
# CLOUDINARY_URL=your-cloudinary-url (optional)
```

### 3. Setup Database

```bash
# Create PostgreSQL database
createdb royal_shopping

# Run Prisma migrations
npx prisma migrate dev --name init

# Seed database with sample data (optional)
npm run seed
```

### 4. Start Backend Server

```bash
# Development mode with auto-reload
npm run dev

# Or production mode
npm start
```

Backend runs on: `http://localhost:5000`

### 5. Setup Frontend

```bash
cd ../client

# Install dependencies
npm install

# Create .env file if needed
# VITE_API_URL=http://localhost:5000/api
```

### 6. Start Frontend Development Server

```bash
npm run dev
```

Frontend runs on: `http://localhost:5173`

---

## Environment Variables

### Server (.env)

```env
# Server Configuration
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/royal_shopping

# JWT
JWT_SECRET=your-super-secret-key-min-32-chars
ACCESS_EXPIRES=15m
REFRESH_EXPIRES_DAYS=30

# Cloudinary (for image uploads)
CLOUDINARY_API_KEY=your-key
CLOUDINARY_API_SECRET=your-secret
CLOUDINARY_CLOUD_NAME=your-cloud-name
```

### Client (.env if needed)

```env
VITE_API_URL=http://localhost:5000/api
```

---

## Database Schema

### User
- id, name, email, password, phone, role, createdAt, updatedAt
- Relationships: orders, refreshTokens

### Product
- id, title, slug, description, price, discountPrice, stock, sku, brand
- rating, featured, bestSeller, newArrival, status
- images, colors, sizes, tags, category

### Order
- id, userId, subtotal, shipping, total, status
- shippingAddress, phone, email, paymentMethod, notes
- Relationships: user, items

### OrderItem
- id, orderId, productId, quantity, price
- selectedColor, selectedSize

### Category
- id, name, slug, products

---

## API Endpoints

### Authentication
```
POST   /api/auth/register      - Register user
POST   /api/auth/login         - Login user
POST   /api/auth/logout        - Logout user
POST   /api/auth/refresh       - Refresh token
GET    /api/auth/me            - Get current user
```

### Products
```
GET    /api/products           - Get all products (with filters)
GET    /api/products/:id       - Get product by ID
GET    /api/products/slug/:slug - Get product by slug
POST   /api/products           - Create product (admin only)
PUT    /api/products/:id       - Update product (admin only)
DELETE /api/products/:id       - Delete product (admin only)
```

### Orders
```
POST   /api/orders             - Create order
GET    /api/orders             - Get all orders (admin only)
GET    /api/orders/:id         - Get order by ID
PUT    /api/orders/:id         - Update order status (admin only)
DELETE /api/orders/:id         - Delete order (admin only)
```

### Customers
```
GET    /api/customers          - Get all customers (admin only)
GET    /api/customers/:id      - Get customer by ID (admin only)
PUT    /api/customers/:id      - Update customer (admin only)
```

---

## Deployment Options

### Option 1: Render.com (Recommended for Beginners)

1. **Create Render Account**
   - Sign up at [render.com](https://render.com)
   - Connect your GitHub repository

2. **Create PostgreSQL Database**
   - Create new PostgreSQL service
   - Copy the connection string
   - Add to your backend environment variables

3. **Deploy Backend**
   - Create new Web Service
   - Connect to your GitHub repo
   - Build command: `npm install && npx prisma migrate deploy`
   - Start command: `npm start`
   - Add environment variables
   - Deploy

4. **Deploy Frontend**
   - Create new Static Site
   - Build command: `npm install && npm run build`
   - Publish directory: `dist`
   - Update API URL to your Render backend URL
   - Deploy

5. **Update CORS**
   - Update `CLIENT_URL` in backend environment variables to your frontend URL

### Option 2: Docker + Docker Compose

```bash
# Build images
docker-compose build

# Start services
docker-compose up -d

# Run migrations
docker-compose exec server npx prisma migrate deploy

# Seed database (optional)
docker-compose exec server npm run seed
```

### Option 3: Traditional VPS (AWS, DigitalOcean, Linode)

1. **SSH into server and install dependencies**
   ```bash
   sudo apt update && sudo apt upgrade
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt install -y nodejs postgresql postgresql-contrib nginx
   ```

2. **Clone repository**
   ```bash
   git clone <repo-url>
   cd royal-shopping
   ```

3. **Setup PostgreSQL**
   ```bash
   sudo -u postgres createdb royal_shopping
   sudo -u postgres psql -c "CREATE USER royal_user WITH PASSWORD 'strong_password';"
   ```

4. **Setup Backend**
   ```bash
   cd server
   npm install
   cp .env.example .env
   # Edit .env with production values
   npx prisma migrate deploy
   npm install -g pm2
   pm2 start server.js --name "royal-backend"
   pm2 save
   ```

5. **Setup Frontend**
   ```bash
   cd ../client
   npm install
   npm run build
   # Serve dist/ folder with nginx
   ```

6. **Configure Nginx**
   ```bash
   sudo nano /etc/nginx/sites-available/default
   # Configure to serve frontend and proxy /api to backend
   sudo systemctl restart nginx
   ```

---

## Testing Checklist Before Deployment

### Frontend Tests
- [ ] Browse products
- [ ] Add/remove from cart
- [ ] Add/remove from wishlist
- [ ] User registration and login
- [ ] User logout
- [ ] Complete checkout with COD
- [ ] View order history
- [ ] Admin login
- [ ] Admin add/edit/delete products
- [ ] Admin view orders and update status
- [ ] Admin view customers

### Backend Tests
```bash
# Run health check
curl http://localhost:5000/api/health

# Test authentication
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'

# Test products
curl http://localhost:5000/api/products
```

---

## Production Checklist

- [ ] Set `NODE_ENV=production` in backend
- [ ] Use strong `JWT_SECRET` (min 32 characters)
- [ ] Set up HTTPS/SSL certificate
- [ ] Configure CORS properly for your domain
- [ ] Set up database backups
- [ ] Configure error logging (Sentry, LogRocket, etc.)
- [ ] Enable rate limiting on API
- [ ] Set up monitoring and alerts
- [ ] Configure email service for notifications
- [ ] Test payment method fallback (COD always works)
- [ ] Setup CDN for static assets
- [ ] Configure image optimization

---

## Troubleshooting

### Database Connection Error
```
Error: Cannot find module 'prisma'
Solution: Run `npm install` in server directory
```

### CORS Error
```
Error: Access to XMLHttpRequest blocked by CORS policy
Solution: 
1. Check CLIENT_URL matches frontend URL
2. Verify backend and frontend are on same environment
```

### Images Not Uploading
```
Error: Cloudinary upload failed
Solution:
1. Verify CLOUDINARY_URL is correct
2. Check Cloudinary account is active
3. Verify file size is under 5MB
```

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
Solution: 
- Linux/Mac: lsof -ti:5000 | xargs kill -9
- Windows: netstat -ano | findstr :5000 and taskkill /PID <PID>
```

---

## Support & Next Steps

### For Version 2.0 (Future Enhancements)
- Payment gateway integration (Stripe/Razorpay)
- Email notifications
- Product reviews and ratings
- Inventory management
- Multi-language support
- Mobile app
- Advanced analytics
- SMS notifications

### Resources
- [Prisma Documentation](https://www.prisma.io/docs/)
- [Express.js Guide](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite Documentation](https://vitejs.dev/)

---

## License

This project is for educational purposes. Modify and distribute as needed.

**Questions?** Create an issue or contact the development team.

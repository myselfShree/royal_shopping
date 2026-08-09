import 'dotenv/config'
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import healthRoutes from './routes/healthRoutes.js';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import customerRoutes from './routes/customerRoutes.js';
import settingsRoutes from './routes/settingsRoutes.js';
import couponRoutes from './routes/couponRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import { testPrismaConnection } from './prismaClient.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow all requesting origins dynamically for full access
      return callback(null, origin || true)
    },
    credentials: true,
  }),
)
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => res.json({ status: 'ok', message: 'Royal Shopping API is running' }))
app.use('/api', healthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/coupons', couponRoutes);
app.use('/api/categories', categoryRoutes);

// Try Prisma/Postgres connection
testPrismaConnection().then((res) => {
  if (res.ok) console.log('Postgres/Prisma check: OK')
  else console.log('Postgres/Prisma check:', res.reason)
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

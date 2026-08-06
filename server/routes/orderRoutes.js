import express from 'express'
import { authenticate, authorize } from '../middleware/authMiddleware.js'
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
  getUserOrders,
} from '../controllers/orderController.js'

const router = express.Router()

// Public routes
router.post('/', createOrder) // Create order (with or without auth)
router.get('/:id', getOrderById) // Get order by ID

// Protected routes - admin only
router.get('/', authenticate, authorize('admin'), getOrders) // Get all orders
router.put('/:id', authenticate, authorize('admin'), updateOrderStatus) // Update order status
router.delete('/:id', authenticate, authorize('admin'), deleteOrder) // Delete order

// Protected routes - user
router.get('/user/my-orders', authenticate, getUserOrders) // Get user's orders

export default router

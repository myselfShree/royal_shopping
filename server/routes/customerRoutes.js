import express from 'express'
import { authenticate, authorize } from '../middleware/authMiddleware.js'
import {
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  getCustomerStats,
} from '../controllers/customerController.js'

const router = express.Router()

// All routes require admin authentication
router.use(authenticate, authorize('admin'))

router.get('/', getAllCustomers) // Get all customers
router.get('/stats', getCustomerStats) // Get customer stats
router.get('/:id', getCustomerById) // Get customer by ID
router.put('/:id', updateCustomer) // Update customer

export default router

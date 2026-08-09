import express from 'express'
import { authenticate, authorize } from '../middleware/authMiddleware.js'
import { getCategories, createCategory, updateCategory, deleteCategory } from '../controllers/categoryController.js'

const router = express.Router()

router.get('/', getCategories)
router.post('/', authenticate, authorize('admin'), createCategory)
router.put('/:id', authenticate, authorize('admin'), updateCategory)
router.delete('/:id', authenticate, authorize('admin'), deleteCategory)

export default router

import express from 'express'
import multer from 'multer'
import { authenticate, authorize } from '../middleware/authMiddleware.js'
import {
  seedProducts,
  getProducts,
  getProductById,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js'

const router = express.Router()

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } })

router.get('/slug/:slug', getProductBySlug)
router.get('/:id', getProductById)
router.get('/', getProducts)
router.post('/', authenticate, authorize('admin'), upload.array('images', 6), createProduct)
router.put('/:id', authenticate, authorize('admin'), upload.array('images', 6), updateProduct)
router.delete('/:id', authenticate, authorize('admin'), deleteProduct)
router.post('/seed', authenticate, authorize('admin'), seedProducts)

export default router

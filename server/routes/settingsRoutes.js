import express from 'express'
import { authenticate, authorize } from '../middleware/authMiddleware.js'
import { getSettings, updateSettings } from '../controllers/settingsController.js'

const router = express.Router()

router.get('/', getSettings)
router.put('/', authenticate, authorize('admin'), updateSettings)

export default router

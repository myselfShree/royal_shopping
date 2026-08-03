import express from 'express';
import cookieParser from 'cookie-parser'
import { body, validationResult } from 'express-validator'
import {
	loginUser,
	registerUser,
	logoutUser,
	refreshToken,
	me,
} from '../controllers/authController.js';
import { authenticate } from '../middleware/authMiddleware.js'

const router = express.Router();

router.use(cookieParser())

const handleValidation = (req, res, next) => {
	const errors = validationResult(req)
	if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })
	next()
}

router.post(
	'/register',
	body('name').isString().isLength({ min: 2 }),
	body('email').isEmail(),
	body('password').isLength({ min: 6 }),
	handleValidation,
	registerUser
)

router.post('/login', body('email').isEmail(), body('password').isLength({ min: 6 }), handleValidation, loginUser)
router.post('/logout', logoutUser)
router.post('/refresh', refreshToken)
router.get('/me', authenticate, me)

export default router;

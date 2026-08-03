import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import prisma from '../prismaClient.js'

const getJwtSecret = () => process.env.JWT_SECRET || 'change_this_secret'
const getAccessExpires = () => process.env.ACCESS_EXPIRES || '15m'
const getRefreshExpiresDays = () => parseInt(process.env.REFRESH_EXPIRES_DAYS || '30', 10)

const createAccessToken = (user) =>
  jwt.sign({ userId: user.id, role: user.role }, getJwtSecret(), { expiresIn: getAccessExpires() })

const createRefreshTokenRecord = async (userId) => {
  const refreshDays = getRefreshExpiresDays()
  const token = crypto.randomBytes(48).toString('hex')
  const expiresAt = new Date(Date.now() + refreshDays * 24 * 60 * 60 * 1000)
  await prisma.refreshToken.create({ data: { token, userId, expiresAt } })
  return token
}

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body
    if (!name || !email || !password) return res.status(400).json({ message: 'name, email, password required' })

    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) return res.status(400).json({ message: 'Email already registered' })

    const hashed = await bcrypt.hash(password, 10)
    // Always create regular registrations as role 'user'
    const user = await prisma.user.create({ data: { name, email, password: hashed, role: 'user' } })

    const accessToken = createAccessToken(user)
    const refreshToken = await createRefreshTokenRecord(user.id)

    res.cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'lax', maxAge: getRefreshExpiresDays() * 24 * 60 * 60 * 1000 })
    res.status(201).json({ user: { id: user.id, name: user.name, email: user.email, role: user.role }, accessToken })
  } catch (error) {
    res.status(500).json({ message: 'Unable to register', error: error.message })
  }
}

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) return res.status(400).json({ message: 'email and password required' })

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) return res.status(401).json({ message: 'Invalid credentials' })

    const ok = await bcrypt.compare(password, user.password)
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' })

    const accessToken = createAccessToken(user)
    const refreshToken = await createRefreshTokenRecord(user.id)

    res.cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'lax', maxAge: getRefreshExpiresDays() * 24 * 60 * 60 * 1000 })
    res.json({ user: { id: user.id, name: user.name, email: user.email, role: user.role }, accessToken })
  } catch (error) {
    res.status(500).json({ message: 'Unable to login', error: error.message })
  }
}

export const logoutUser = async (req, res) => {
  try {
    const token = req.cookies?.refreshToken
    if (token) await prisma.refreshToken.deleteMany({ where: { token } })
    res.clearCookie('refreshToken')
    res.json({ message: 'Logged out' })
  } catch (error) {
    res.status(500).json({ message: 'Unable to logout', error: error.message })
  }
}

export const refreshToken = async (req, res) => {
  try {
    const token = req.cookies?.refreshToken
    if (!token) return res.status(401).json({ message: 'No refresh token' })

    const record = await prisma.refreshToken.findUnique({ where: { token } })
    if (!record) return res.status(401).json({ message: 'Invalid refresh token' })
    if (new Date(record.expiresAt) < new Date()) return res.status(401).json({ message: 'Refresh token expired' })

    const user = await prisma.user.findUnique({ where: { id: record.userId } })
    if (!user) return res.status(401).json({ message: 'User not found' })

    // rotate refresh token
    await prisma.refreshToken.delete({ where: { id: record.id } })
    const newRefresh = await createRefreshTokenRecord(user.id)
    const accessToken = createAccessToken(user)

    res.cookie('refreshToken', newRefresh, { httpOnly: true, sameSite: 'lax', maxAge: getRefreshExpiresDays() * 24 * 60 * 60 * 1000 })
    res.json({ user: { id: user.id, name: user.name, email: user.email, role: user.role }, accessToken })
  } catch (error) {
    res.status(500).json({ message: 'Unable to refresh token', error: error.message })
  }
}

export const me = async (req, res) => {
  try {
    const userId = req.user?.userId
    if (!userId) return res.status(401).json({ message: 'Not authenticated' })
    const user = await prisma.user.findUnique({ where: { id: userId } })
    if (!user) return res.status(404).json({ message: 'User not found' })
    res.json({ id: user.id, name: user.name, email: user.email, role: user.role })
  } catch (error) {
    res.status(500).json({ message: 'Unable to fetch user', error: error.message })
  }
}

import jwt from 'jsonwebtoken'

const getJwtSecret = () => process.env.JWT_SECRET || 'change_this_secret'

export const authenticate = (req, res, next) => {
  try {
    const header = req.headers.authorization
    if (!header) return res.status(401).json({ message: 'Missing Authorization header' })

    const [, token] = header.split(/\s+/)
    if (!token || !/^Bearer$/i.test(header.split(/\s+/)[0])) {
      return res.status(401).json({ message: 'Invalid Authorization header' })
    }

    const decoded = jwt.verify(token, getJwtSecret())
    req.user = decoded
    next()
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' })
  }
}

export const authorize = (roles = []) => (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: 'Not authenticated' })
  if (typeof roles === 'string') roles = [roles]
  if (roles.length > 0 && !roles.includes(req.user.role)) return res.status(403).json({ message: 'Forbidden' })
  next()
}


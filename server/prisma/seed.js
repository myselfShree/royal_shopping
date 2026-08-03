import 'dotenv/config'
import bcrypt from 'bcryptjs'
import prisma from '../prismaClient.js'

async function createAdmin() {
  const name = 'Royal Shopping Admin'
  const email = 'admin@royalshopping.com'
  const password = 'Admin@123'
  try {
    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      console.log('Admin user already exists:', existing.email)
      return process.exit(0)
    }

    const hashed = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashed,
        role: 'admin',
      },
    })
    console.log('Created admin user:', user.email)
    process.exit(0)
  } catch (error) {
    console.error('Failed to create admin user:', error.message || error)
    process.exit(1)
  }
}

createAdmin()

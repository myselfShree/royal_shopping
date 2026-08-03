import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const testPrismaConnection = async () => {
  if (!process.env.DATABASE_URL) {
    console.log('DATABASE_URL not set; skipping Prisma connection test.')
    return { ok: false, reason: 'DATABASE_URL not set' }
  }
  try {
    await prisma.$connect()
    console.log('Prisma connected to PostgreSQL')
    await prisma.$disconnect()
    return { ok: true }
  } catch (error) {
    console.error('Prisma connection error:', error.message || error)
    return { ok: false, reason: error.message || String(error) }
  }
}

export default prisma

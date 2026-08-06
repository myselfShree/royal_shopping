import prisma from '../prismaClient.js'

export const getAllCustomers = async (req, res) => {
  try {
    const { search, limit = 50, offset = 0 } = req.query

    const where = search
      ? {
          OR: [
            { name: { contains: search, mode: 'insensitive' } },
            { email: { contains: search, mode: 'insensitive' } },
          ],
        }
      : {}

    const customers = await prisma.user.findMany({
      where: { ...where, role: 'user' },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        createdAt: true,
        _count: {
          select: { orders: true },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: parseInt(limit),
      skip: parseInt(offset),
    })

    const total = await prisma.user.count({
      where: { ...where, role: 'user' },
    })

    res.json({
      customers,
      pagination: {
        total,
        limit: parseInt(limit),
        offset: parseInt(offset),
        pages: Math.ceil(total / parseInt(limit)),
      },
    })
  } catch (error) {
    res.status(500).json({ message: 'Unable to fetch customers', error: error.message })
  }
}

export const getCustomerById = async (req, res) => {
  try {
    const { id } = req.params

    const customer = await prisma.user.findUnique({
      where: { id: parseInt(id) },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        orders: {
          include: {
            items: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    })

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' })
    }

    res.json(customer)
  } catch (error) {
    res.status(500).json({ message: 'Unable to fetch customer', error: error.message })
  }
}

export const updateCustomer = async (req, res) => {
  try {
    const { id } = req.params
    const { name, email, phone } = req.body

    const customer = await prisma.user.update({
      where: { id: parseInt(id) },
      data: {
        ...(name && { name }),
        ...(email && { email }),
        ...(phone && { phone }),
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        createdAt: true,
      },
    })

    res.json(customer)
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Customer not found' })
    }
    if (error.code === 'P2002') {
      return res.status(400).json({ message: 'Email already in use' })
    }
    res.status(500).json({ message: 'Unable to update customer', error: error.message })
  }
}

export const getCustomerStats = async (req, res) => {
  try {
    const totalCustomers = await prisma.user.count({ where: { role: 'user' } })
    const totalOrders = await prisma.order.count()
    const totalRevenue = await prisma.order.aggregate({
      _sum: { total: true },
    })

    res.json({
      totalCustomers,
      totalOrders,
      totalRevenue: totalRevenue._sum.total || 0,
    })
  } catch (error) {
    res.status(500).json({ message: 'Unable to fetch stats', error: error.message })
  }
}

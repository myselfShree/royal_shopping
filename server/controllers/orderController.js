import prisma from '../prismaClient.js'

export const createOrder = async (req, res) => {
  try {
    const { items, subtotal, shipping, total, shippingAddress, phone, email, paymentMethod, notes } = req.body
    const rawUserId = req.user?.userId || req.user?.id

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'Order must contain at least one item' })
    }

    if (!shippingAddress || !phone || !email) {
      return res.status(400).json({ message: 'Shipping address, phone, and email are required' })
    }

    const orderData = {
      subtotal: Number(subtotal),
      shipping: Number(shipping) || 0,
      total: Number(total),
      shippingAddress,
      phone,
      email,
      paymentMethod: paymentMethod || 'cod',
      notes: notes || null,
      status: 'pending',
      items: {
        create: items.map((item) => ({
          productId: Number(item.productId || item.id),
          quantity: Number(item.quantity) || 1,
          price: Number(item.price || item.discountPrice || 0),
          selectedColor: item.selectedColor || null,
          selectedSize: item.selectedSize || null,
        })),
      },
    }

    if (rawUserId && !Number.isNaN(Number(rawUserId))) {
      orderData.userId = Number(rawUserId)
    }

    const order = await prisma.order.create({
      data: orderData,
      include: {
        items: {
          include: {
            product: true,
          },
        },
        user: true,
      },
    })

    res.status(201).json(order)
  } catch (error) {
    console.error('Order creation error:', error)
    res.status(500).json({ message: 'Unable to create order', error: error.message })
  }
}

export const getOrders = async (req, res) => {
  try {
    const { status, limit = 50, offset = 0 } = req.query

    const where = status ? { status } : {}
    const orders = await prisma.order.findMany({
      where,
      include: {
        items: {
          include: {
            product: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: parseInt(limit),
      skip: parseInt(offset),
    })

    const total = await prisma.order.count({ where })

    res.json({
      orders,
      pagination: {
        total,
        limit: parseInt(limit),
        offset: parseInt(offset),
        pages: Math.ceil(total / parseInt(limit)),
      },
    })
  } catch (error) {
    res.status(500).json({ message: 'Unable to fetch orders', error: error.message })
  }
}

export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params

    const order = await prisma.order.findUnique({
      where: { id: parseInt(id) },
      include: {
        items: {
          include: {
            product: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    })

    if (!order) {
      return res.status(404).json({ message: 'Order not found' })
    }

    res.json(order)
  } catch (error) {
    res.status(500).json({ message: 'Unable to fetch order', error: error.message })
  }
}

export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params
    const { status } = req.body

    const validStatuses = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled']
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' })
    }

    const order = await prisma.order.update({
      where: { id: parseInt(id) },
      data: { status },
      include: {
        items: {
          include: {
            product: true,
          },
        },
        user: true,
      },
    })

    res.json(order)
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Order not found' })
    }
    res.status(500).json({ message: 'Unable to update order', error: error.message })
  }
}

export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params

    await prisma.order.delete({
      where: { id: parseInt(id) },
    })

    res.json({ message: 'Order deleted successfully' })
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Order not found' })
    }
    res.status(500).json({ message: 'Unable to delete order', error: error.message })
  }
}

export const getUserOrders = async (req, res) => {
  try {
    const userId = req.user?.id
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const orders = await prisma.order.findMany({
      where: { userId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    res.json(orders)
  } catch (error) {
    res.status(500).json({ message: 'Unable to fetch orders', error: error.message })
  }
}

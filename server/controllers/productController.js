import prisma from '../prismaClient.js'
import cloudinary from '../cloudinary.js'
import streamifier from 'streamifier'

const createSlug = (value) =>
  value
    .toString()
    .normalize('NFKD')
    .replace(/[^\w\s-]+/g, '')
    .trim()
    .toLowerCase()
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '')

const demoProducts = [
  {
    title: 'Velvet Evening Dress',
    description: 'Rich velvet, figure-flattering fit, and an elegant silhouette.',
    shortDescription: 'Premium evening dress with a luxe finish.',
    price: 4999,
    discountPrice: 3799,
    sku: 'RED-001',
    brand: 'Royal Luxe',
    category: 'Women’s Dresses',
    stock: 18,
    featured: true,
    bestSeller: true,
    newArrival: false,
    status: 'ACTIVE',
    images: ['https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&auto=format&fit=crop&q=80'],
    sizes: ['S', 'M', 'L'],
    colors: ['Black', 'Nude'],
    tags: ['evening', 'luxury', 'dress'],
  },
  {
    title: 'Luxe Tailored Jacket',
    description: 'Structured tailoring with a soft finish for polished styling.',
    shortDescription: 'Tailored jacket designed for modern silhouettes.',
    price: 3499,
    discountPrice: 2999,
    sku: 'LTJ-002',
    brand: 'Royal Luxe',
    category: 'Jackets',
    stock: 12,
    featured: false,
    bestSeller: true,
    newArrival: false,
    status: 'ACTIVE',
    images: ['https://images.unsplash.com/photo-1544441893-675973e31985?w=800&auto=format&fit=crop&q=80'],
    sizes: ['M', 'L', 'XL'],
    colors: ['Camel', 'Olive'],
    tags: ['jacket', 'tailored', 'formal'],
  },
  {
    title: 'Signature Knit Sweater',
    description: 'Cashmere-blend comfort with a modern, relaxed fit.',
    shortDescription: 'Soft knit sweater for elevated everyday wear.',
    price: 2599,
    discountPrice: 2099,
    sku: 'SKS-003',
    brand: 'Royal Basics',
    category: 'Sweaters',
    stock: 26,
    featured: false,
    bestSeller: false,
    newArrival: true,
    status: 'ACTIVE',
    images: ['https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&auto=format&fit=crop&q=80'],
    sizes: ['S', 'M', 'L'],
    colors: ['Grey', 'Ivory'],
    tags: ['knit', 'cozy', 'sweater'],
  },
]

const buildCategoryConnect = (category) => {
  if (!category) return undefined
  const name = category.toString().trim()
  return {
    connectOrCreate: {
      where: { name },
      create: { name, slug: createSlug(name) },
    },
  }
}

const parseArrayField = (val) => {
  if (Array.isArray(val)) return val
  if (!val) return []
  if (typeof val === 'string') {
    // try JSON parse
    try {
      const parsed = JSON.parse(val)
      if (Array.isArray(parsed)) return parsed
    } catch (e) {}
    // fallback to comma-separated
    return val.split(',').map((s) => s.trim()).filter(Boolean)
  }
  return []
}

export const seedProducts = async (req, res) => {
  try {
    const created = []
    for (const item of demoProducts) {
      const slug = createSlug(item.title)
      const product = await prisma.product.upsert({
        where: { slug },
        update: {
          ...item,
          slug,
          category: buildCategoryConnect(item.category),
        },
        create: {
          ...item,
          slug,
          category: buildCategoryConnect(item.category),
        },
      })
      created.push(product)
    }
    res.json({ message: 'Seeded products', count: created.length, products: created })
  } catch (error) {
    res.status(500).json({ message: 'Unable to seed products', error: error.message })
  }
}

export const getProducts = async (req, res) => {
  try {
    const {
      q,
      category,
      brand,
      status,
      minPrice,
      maxPrice,
      page = 1,
      limit = 12,
    } = req.query
    const where = { AND: [] }

    if (q) {
      where.AND.push({
        OR: [
          { title: { contains: q, mode: 'insensitive' } },
          { description: { contains: q, mode: 'insensitive' } },
          { shortDescription: { contains: q, mode: 'insensitive' } },
          { tags: { has: q } },
        ],
      })
    }

    if (brand) where.AND.push({ brand: { equals: brand, mode: 'insensitive' } })
    if (status) where.AND.push({ status: status.toUpperCase() })
    if (minPrice) where.AND.push({ price: { gte: Number(minPrice) } })
    if (maxPrice) where.AND.push({ price: { lte: Number(maxPrice) } })
    if (category) {
      const categoryId = Number(category)
      if (!Number.isNaN(categoryId)) {
        where.AND.push({ categoryId })
      } else {
        where.AND.push({ category: { name: { equals: category, mode: 'insensitive' } } })
      }
    }

    const pageNumber = Number(page) || 1
    const pageSize = Number(limit) || 12
    const skip = (pageNumber - 1) * pageSize

    let [total, products] = await Promise.all([
      prisma.product.count({ where }),
      prisma.product.findMany({
        where,
        include: { category: true },
        orderBy: [{ createdAt: 'desc' }],
        skip,
        take: pageSize,
      }),
    ])

    if (total === 0 && !q && !category && !brand) {
      for (const item of demoProducts) {
        const slug = createSlug(item.title)
        await prisma.product.upsert({
          where: { slug },
          update: {},
          create: {
            ...item,
            slug,
            category: buildCategoryConnect(item.category),
          },
        })
      }
      ;[total, products] = await Promise.all([
        prisma.product.count({ where }),
        prisma.product.findMany({
          where,
          include: { category: true },
          orderBy: [{ createdAt: 'desc' }],
          skip,
          take: pageSize,
        }),
      ])
    }

    res.json({
      products,
      meta: {
        total,
        page: pageNumber,
        limit: pageSize,
        totalPages: Math.ceil(total / pageSize),
      },
    })
  } catch (error) {
    res.status(500).json({ message: 'Unable to fetch products', error: error.message })
  }
}

export const getProductBySlug = async (req, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: { slug: req.params.slug },
      include: { category: true },
    })
    if (!product) return res.status(404).json({ message: 'Product not found' })
    res.json(product)
  } catch (error) {
    res.status(500).json({ message: 'Unable to fetch product', error: error.message })
  }
}

export const getProductById = async (req, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: Number(req.params.id) },
      include: { category: true },
    })
    if (!product) return res.status(404).json({ message: 'Product not found' })
    res.json(product)
  } catch (error) {
    res.status(500).json({ message: 'Unable to fetch product', error: error.message })
  }
}

export const createProduct = async (req, res) => {
  try {
    const payload = req.body
    const slug = payload.slug ? createSlug(payload.slug) : createSlug(payload.title)
    const data = {
      title: payload.title,
      slug,
      description: payload.description || null,
      shortDescription: payload.shortDescription || null,
      price: Number(payload.price),
      discountPrice: payload.discountPrice ? Number(payload.discountPrice) : null,
      stock: Number(payload.stock) || 0,
      sku: payload.sku || null,
      brand: payload.brand || null,
      featured: Boolean(payload.featured),
      bestSeller: Boolean(payload.bestSeller),
      newArrival: Boolean(payload.newArrival),
      status: payload.status || 'DRAFT',
      images: Array.isArray(payload.images) ? payload.images : payload.images ? payload.images ? [payload.images] : [] : [],
      imagePublicIds: [],
      sizes: parseArrayField(payload.sizes),
      colors: parseArrayField(payload.colors),
      tags: parseArrayField(payload.tags),
      category: buildCategoryConnect(payload.category),
    }
    // handle uploaded files (Cloudinary)
    if (req.files && req.files.length > 0) {
      const urls = []
      const publicIds = []
      for (const file of req.files) {
        if (!file.mimetype.startsWith('image/')) continue
        // upload via stream
        const uploadResult = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream({ folder: 'royal/products' }, (error, result) => {
            if (error) return reject(error)
            resolve(result)
          })
          streamifier.createReadStream(file.buffer).pipe(stream)
        })
        urls.push(uploadResult.secure_url)
        publicIds.push(uploadResult.public_id)
      }
      data.images = urls
      data.imagePublicIds = publicIds
    }

    const product = await prisma.product.create({ data })
    res.status(201).json(product)
  } catch (error) {
    res.status(500).json({ message: 'Unable to create product', error: error.message })
  }
}

export const updateProduct = async (req, res) => {
  try {
    const payload = req.body
    const slug = payload.slug ? createSlug(payload.slug) : createSlug(payload.title)
    const data = {
      title: payload.title,
      slug,
      description: payload.description || null,
      shortDescription: payload.shortDescription || null,
      price: Number(payload.price),
      discountPrice: payload.discountPrice ? Number(payload.discountPrice) : null,
      stock: Number(payload.stock) || 0,
      sku: payload.sku || null,
      brand: payload.brand || null,
      featured: Boolean(payload.featured),
      bestSeller: Boolean(payload.bestSeller),
      newArrival: Boolean(payload.newArrival),
      status: payload.status || 'DRAFT',
      images: Array.isArray(payload.images) ? payload.images : payload.images ? [payload.images] : [],
      sizes: parseArrayField(payload.sizes),
      colors: parseArrayField(payload.colors),
      tags: parseArrayField(payload.tags),
      category: buildCategoryConnect(payload.category),
    }
    // if new files uploaded, delete old images and upload replacements
    if (req.files && req.files.length > 0) {
      const existing = await prisma.product.findUnique({ where: { id: Number(req.params.id) } })
      if (existing && Array.isArray(existing.imagePublicIds)) {
        for (const pid of existing.imagePublicIds) {
          try { await cloudinary.uploader.destroy(pid) } catch (e) {}
        }
      }
      const urls = []
      const publicIds = []
      for (const file of req.files) {
        if (!file.mimetype.startsWith('image/')) continue
        const uploadResult = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream({ folder: 'royal/products' }, (error, result) => {
            if (error) return reject(error)
            resolve(result)
          })
          streamifier.createReadStream(file.buffer).pipe(stream)
        })
        urls.push(uploadResult.secure_url)
        publicIds.push(uploadResult.public_id)
      }
      data.images = urls
      data.imagePublicIds = publicIds
    }

    const product = await prisma.product.update({ where: { id: Number(req.params.id) }, data })
    res.json(product)
  } catch (error) {
    res.status(500).json({ message: 'Unable to update product', error: error.message })
  }
}

export const deleteProduct = async (req, res) => {
  try {
    const existing = await prisma.product.findUnique({ where: { id: Number(req.params.id) } })
    if (existing && Array.isArray(existing.imagePublicIds)) {
      for (const pid of existing.imagePublicIds) {
        try { await cloudinary.uploader.destroy(pid) } catch (e) {}
      }
    }
    await prisma.product.delete({ where: { id: Number(req.params.id) } })
    res.json({ message: 'Product deleted' })
  } catch (error) {
    res.status(500).json({ message: 'Unable to delete product', error: error.message })
  }
}

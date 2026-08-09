import prisma from '../prismaClient.js'

const defaultCategoryImages = {
  "Women’s Dresses": "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&auto=format&fit=crop&q=80",
  "Jackets": "https://images.unsplash.com/photo-1544441893-675973e31985?w=300&auto=format&fit=crop&q=80",
  "Sweaters": "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=300&auto=format&fit=crop&q=80",
  "Kurti": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=300&auto=format&fit=crop&q=80",
  "Shoes": "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=300&auto=format&fit=crop&q=80",
  "Accessories": "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=300&auto=format&fit=crop&q=80",
  "Decorative Items": "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=300&auto=format&fit=crop&q=80",
  "Kids Wear": "https://images.unsplash.com/photo-1519238263530-99afd11df2ea?w=300&auto=format&fit=crop&q=80"
}

const createSlug = (val) =>
  val
    .toString()
    .normalize('NFKD')
    .replace(/[^\w\s-]+/g, '')
    .trim()
    .toLowerCase()
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '')

export const getCategories = async (req, res) => {
  try {
    let categories = await prisma.category.findMany({
      include: {
        _count: { select: { products: true } },
      },
      orderBy: { name: 'asc' },
    })

    // Seed default categories if count is 0
    if (categories.length === 0) {
      for (const [name, imageUrl] of Object.entries(defaultCategoryImages)) {
        await prisma.category.create({
          data: { name, slug: createSlug(name), imageUrl },
        })
      }
      categories = await prisma.category.findMany({
        include: { _count: { select: { products: true } } },
        orderBy: { name: 'asc' },
      })
    }

    const formatted = categories.map((c) => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
      imageUrl: c.imageUrl || defaultCategoryImages[c.name] || 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=300&auto=format&fit=crop&q=80',
      productCount: c._count?.products || 0,
    }))

    res.json(formatted)
  } catch (error) {
    res.status(500).json({ message: 'Unable to fetch categories', error: error.message })
  }
}

export const createCategory = async (req, res) => {
  try {
    const { name, imageUrl } = req.body
    if (!name) return res.status(400).json({ message: 'Category name required' })

    const slug = createSlug(name)
    const category = await prisma.category.create({
      data: { name, slug, imageUrl: imageUrl || defaultCategoryImages[name] || null },
    })

    res.status(201).json(category)
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(400).json({ message: 'Category name already exists' })
    }
    res.status(500).json({ message: 'Unable to create category', error: error.message })
  }
}

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params
    const { name, imageUrl } = req.body

    const data = {}
    if (name) {
      data.name = name
      data.slug = createSlug(name)
    }
    if (imageUrl !== undefined) data.imageUrl = imageUrl

    const category = await prisma.category.update({
      where: { id: Number(id) },
      data,
    })

    res.json(category)
  } catch (error) {
    res.status(500).json({ message: 'Unable to update category', error: error.message })
  }
}

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params
    await prisma.category.delete({ where: { id: Number(id) } })
    res.json({ message: 'Category deleted' })
  } catch (error) {
    res.status(500).json({ message: 'Unable to delete category', error: error.message })
  }
}

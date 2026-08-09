import 'dotenv/config'
import bcrypt from 'bcryptjs'
import prisma from '../prismaClient.js'

async function seed() {
  const name = 'Royal Shopping Admin'
  const email = 'admin@royalshopping.com'
  const password = 'Admin@123'

  try {
    const existing = await prisma.user.findUnique({ where: { email } })
    if (!existing) {
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
    } else {
      console.log('Admin user already exists:', existing.email)
    }

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

    const createSlug = (val) =>
      val
        .toString()
        .normalize('NFKD')
        .replace(/[^\w\s-]+/g, '')
        .trim()
        .toLowerCase()
        .replace(/[\s_]+/g, '-')
        .replace(/^-+|-+$/g, '')

    for (const item of demoProducts) {
      const slug = createSlug(item.title)
      const categoryName = item.category
      await prisma.product.upsert({
        where: { slug },
        update: {
          images: item.images,
        },
        create: {
          ...item,
          slug,
          category: {
            connectOrCreate: {
              where: { name: categoryName },
              create: { name: categoryName, slug: createSlug(categoryName) },
            },
          },
        },
      })
    }
    console.log('Seeded demo products successfully.')
    process.exit(0)
  } catch (error) {
    console.error('Failed seeding database:', error.message || error)
    process.exit(1)
  }
}

seed()


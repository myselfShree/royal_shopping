import prisma from '../prismaClient.js'

const defaultSettings = {
  id: 1,
  siteName: 'Royal Shopping',
  tagline: 'Luxury essentials for every occasion.',
  logoUrl: '',
  heroTitle: 'Discover elevated style with Royal Shopping.',
  heroSubtitle: 'Elevate your wardrobe with timeless dresses, statement jackets, and carefully selected home accents designed for modern luxury.',
  heroImageUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&auto=format&fit=crop&q=80',
  heroCtaText: 'Shop now',
  whatsappNumber: '+919876543210',
  instagramUrl: 'https://instagram.com/royalshopping',
  facebookUrl: 'https://facebook.com/royalshopping',
  twitterUrl: 'https://twitter.com/royalshopping',
  pinterestUrl: 'https://pinterest.com/royalshopping',
  contactEmail: 'hello@royalshopping.com',
  contactPhone: '+91 98765 43210',
  contactAddress: '123 Royal Boulevard, Suite 400, Mumbai, India',
}

export const getSettings = async (req, res) => {
  try {
    let settings = await prisma.siteSettings.findUnique({ where: { id: 1 } })
    if (!settings) {
      settings = await prisma.siteSettings.create({ data: defaultSettings })
    }
    res.json(settings)
  } catch (error) {
    res.status(500).json({ message: 'Unable to fetch settings', error: error.message })
  }
}

export const updateSettings = async (req, res) => {
  try {
    const data = req.body
    const settings = await prisma.siteSettings.upsert({
      where: { id: 1 },
      update: data,
      create: { ...defaultSettings, ...data, id: 1 },
    })
    res.json(settings)
  } catch (error) {
    res.status(500).json({ message: 'Unable to update settings', error: error.message })
  }
}

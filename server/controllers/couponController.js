import prisma from '../prismaClient.js'

const defaultCoupons = [
  { code: 'ROYAL10', discount: 10, type: 'percentage', minSpend: 0, active: true },
  { code: 'WELCOME20', discount: 20, type: 'percentage', minSpend: 1000, active: true },
  { code: 'FLAT500', discount: 500, type: 'fixed', minSpend: 3000, active: true },
]

export const validateCoupon = async (req, res) => {
  try {
    const { code, subtotal = 0 } = req.body
    if (!code) return res.status(400).json({ message: 'Coupon code required' })

    const formattedCode = code.trim().toUpperCase()
    
    // ensure default coupons exist in DB
    let coupon = await prisma.coupon.findUnique({ where: { code: formattedCode } })
    if (!coupon) {
      const foundDefault = defaultCoupons.find((c) => c.code === formattedCode)
      if (foundDefault) {
        coupon = await prisma.coupon.create({ data: foundDefault })
      }
    }

    if (!coupon || !coupon.active) {
      return res.status(404).json({ message: 'Invalid or expired coupon code' })
    }

    if (coupon.minSpend && Number(subtotal) < coupon.minSpend) {
      return res.status(400).json({ message: `Minimum spend of ₹${coupon.minSpend} required for coupon ${formattedCode}` })
    }

    let discountAmount = 0
    if (coupon.type === 'percentage') {
      discountAmount = (Number(subtotal) * coupon.discount) / 100
    } else {
      discountAmount = coupon.discount
    }

    res.json({
      valid: true,
      code: coupon.code,
      discount: coupon.discount,
      type: coupon.type,
      discountAmount,
      message: `Coupon ${coupon.code} applied successfully!`,
    })
  } catch (error) {
    res.status(500).json({ message: 'Unable to validate coupon', error: error.message })
  }
}

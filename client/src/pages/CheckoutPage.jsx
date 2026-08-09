import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'

export default function CheckoutPage() {
  const navigate = useNavigate()
  const { items, subtotal, clearCart } = useCart()
  const { user } = useAuth()
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [couponCode, setCouponCode] = useState('')
  const [appliedCoupon, setAppliedCoupon] = useState(null)
  const [couponMsg, setCouponMsg] = useState({ text: '', type: '' })
  const [validatingCoupon, setValidatingCoupon] = useState(false)

  const [form, setForm] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: '',
    city: '',
    pincode: '',
    notes: '',
  })

  const discountAmount = useMemo(() => {
    if (!appliedCoupon) return 0
    if (appliedCoupon.type === 'percentage') {
      return (subtotal * appliedCoupon.discount) / 100
    }
    return Math.min(subtotal, appliedCoupon.discount)
  }, [appliedCoupon, subtotal])

  const shipping = useMemo(() => (subtotal > 0 ? 0 : 0), [subtotal])
  const total = Math.max(0, subtotal - discountAmount + shipping)

  const handleApplyCoupon = async (e) => {
    if (e) e.preventDefault()
    if (!couponCode.trim()) return
    setValidatingCoupon(true)
    setCouponMsg({ text: '', type: '' })

    try {
      const res = await api.post('/coupons/validate', { code: couponCode.trim(), subtotal })
      if (res.data && res.data.valid) {
        setAppliedCoupon(res.data)
        setCouponMsg({ text: res.data.message || `Coupon ${res.data.code} applied!`, type: 'success' })
      }
    } catch (err) {
      setAppliedCoupon(null)
      setCouponMsg({ text: err.response?.data?.message || 'Invalid coupon code', type: 'error' })
    } finally {
      setValidatingCoupon(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError('')

    try {
      if (!form.fullName || !form.email || !form.phone || !form.address || !form.city || !form.pincode) {
        throw new Error('Please fill in all required fields')
      }

      if (items.length === 0) {
        throw new Error('Your cart is empty')
      }

      const orderData = {
        items: items.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.discountPrice || item.price,
          selectedColor: item.selectedColor,
          selectedSize: item.selectedSize,
        })),
        subtotal,
        shipping,
        total,
        shippingAddress: `${form.address}, ${form.city}, ${form.pincode}`,
        phone: form.phone,
        email: form.email,
        paymentMethod: 'cod',
        notes: form.notes + (appliedCoupon ? ` (Applied Coupon: ${appliedCoupon.code})` : ''),
      }

      const res = await api.post('/orders', orderData)
      
      if (res.status === 201) {
        setSubmitted(true)
        clearCart()
        setTimeout(() => navigate('/'), 3000)
      }
    } catch (err) {
      setError(err.message || 'Unable to place order')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <div className="rounded-[24px] border border-stone-200 bg-white p-10 shadow-[0_20px_60px_-32px_rgba(17,17,17,0.35)]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-brand-primary">Order placed</p>
          <h1 className="mt-3 text-3xl font-semibold text-stone-950">Thank you for your order</h1>
          <p className="mt-4 text-sm leading-7 text-stone-600">Your order has been placed successfully. We'll send you a confirmation email shortly.</p>
          <p className="mt-2 text-sm text-stone-500">Payment method: Cash on Delivery</p>
          <Link to="/shop" className="mt-8 inline-flex rounded-full bg-stone-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-primary">
            Continue shopping
          </Link>
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <div className="rounded-[24px] border border-stone-200 bg-white p-10 shadow-[0_20px_60px_-32px_rgba(17,17,17,0.35)]">
          <h1 className="text-3xl font-semibold text-stone-950">Your cart is empty</h1>
          <p className="mt-4 text-sm leading-7 text-stone-600">Add items to your cart before checking out.</p>
          <Link to="/shop" className="mt-8 inline-flex rounded-full bg-stone-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-primary">
            Continue shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[24px] border border-stone-200 bg-white p-8 shadow-[0_20px_60px_-32px_rgba(17,17,17,0.35)]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-brand-primary">Checkout</p>
          <h1 className="mt-2 text-3xl font-semibold text-stone-950">Shipping details</h1>

          {error && (
            <div className="mt-4 rounded-[12px] bg-red-50 border border-red-200 p-4">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <input 
                required 
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                placeholder="Full name" 
                className="rounded-[14px] border border-stone-200 px-4 py-3 text-sm outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary" 
              />
              <input 
                required 
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email address" 
                className="rounded-[14px] border border-stone-200 px-4 py-3 text-sm outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary" 
              />
            </div>
            <input 
              required 
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone number" 
              className="w-full rounded-[14px] border border-stone-200 px-4 py-3 text-sm outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary" 
            />
            <input 
              required 
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Street address" 
              className="w-full rounded-[14px] border border-stone-200 px-4 py-3 text-sm outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary" 
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <input 
                required 
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="City" 
                className="rounded-[14px] border border-stone-200 px-4 py-3 text-sm outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary" 
              />
              <input 
                required 
                name="pincode"
                value={form.pincode}
                onChange={handleChange}
                placeholder="PIN code" 
                className="rounded-[14px] border border-stone-200 px-4 py-3 text-sm outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary" 
              />
            </div>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder="Special instructions (optional)"
              rows="3"
              className="w-full rounded-[14px] border border-stone-200 px-4 py-3 text-sm outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary resize-none"
            />

            <div className="rounded-[14px] bg-blue-50 border border-blue-200 p-4">
              <p className="text-sm font-medium text-blue-900">Payment Method</p>
              <p className="mt-2 text-sm text-blue-800">💳 Cash on Delivery - Pay when you receive your order</p>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full rounded-full bg-stone-950 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-brand-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Placing order...' : 'Place order'}
            </button>
          </form>
        </div>

        <div className="rounded-[24px] border border-stone-200 bg-white p-8 shadow-[0_20px_60px_-32px_rgba(17,17,17,0.35)]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-brand-primary">Summary</p>
          <h2 className="mt-2 text-2xl font-semibold text-stone-950">Your order</h2>

          <div className="mt-6 space-y-4">
            {items.map((item) => (
              <div key={`${item.id}-${item.selectedColor || ''}-${item.selectedSize || ''}`} className="flex items-center justify-between gap-4 rounded-[16px] border border-stone-200 p-3">
                <div>
                  <p className="text-sm font-semibold text-stone-900">{item.title}</p>
                  <p className="text-xs text-stone-500">Qty {item.quantity}</p>
                </div>
                <p className="text-sm font-semibold text-stone-900">₹{((item.discountPrice || item.price) * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>

          {/* Coupon Code Section */}
          <div className="mt-6 border-t border-stone-200 pt-4">
            <p className="text-xs font-semibold text-stone-700 mb-2">Have a Promo Code?</p>
            <div className="flex gap-2">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                placeholder="e.g. ROYAL10"
                className="w-full rounded-[12px] border border-stone-200 px-3 py-2 text-xs uppercase outline-none focus:border-brand-primary"
              />
              <button
                type="button"
                onClick={handleApplyCoupon}
                disabled={validatingCoupon}
                className="rounded-[12px] bg-brand-primary px-4 py-2 text-xs font-semibold text-white hover:bg-brand-primary/90 disabled:opacity-50"
              >
                {validatingCoupon ? '...' : 'Apply'}
              </button>
            </div>
            {couponMsg.text && (
              <p className={`mt-2 text-xs ${couponMsg.type === 'success' ? 'text-green-700' : 'text-red-600'}`}>
                {couponMsg.text}
              </p>
            )}
            <div className="mt-2 flex flex-wrap gap-1">
              <button type="button" onClick={() => { setCouponCode('ROYAL10'); handleApplyCoupon(); }} className="text-[10px] bg-stone-100 px-2 py-1 rounded text-stone-600 hover:bg-brand-primary hover:text-white">
                ROYAL10 (10% OFF)
              </button>
              <button type="button" onClick={() => { setCouponCode('WELCOME20'); handleApplyCoupon(); }} className="text-[10px] bg-stone-100 px-2 py-1 rounded text-stone-600 hover:bg-brand-primary hover:text-white">
                WELCOME20 (20% OFF)
              </button>
            </div>
          </div>

          <div className="mt-6 space-y-3 text-sm text-stone-600 border-t border-stone-200 pt-4">
            <div className="flex items-center justify-between">
              <span>Subtotal</span>
              <span className="font-medium text-stone-900">₹{subtotal.toFixed(2)}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex items-center justify-between text-green-700 font-medium">
                <span>Discount ({appliedCoupon?.code})</span>
                <span>-₹{discountAmount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex items-center justify-between">
              <span>Shipping</span>
              <span className="font-medium text-stone-900">₹{shipping.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between border-t border-stone-200 pt-3">
              <span>Total</span>
              <span className="font-semibold text-stone-950">₹{total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
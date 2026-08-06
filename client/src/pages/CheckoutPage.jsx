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

  const [form, setForm] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: '',
    city: '',
    pincode: '',
    notes: '',
  })

  const shipping = useMemo(() => (subtotal > 0 ? 0 : 0), [subtotal])
  const total = subtotal + shipping

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
        notes: form.notes,
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

          <div className="mt-6 space-y-3 text-sm text-stone-600">
            <div className="flex items-center justify-between">
              <span>Subtotal</span>
              <span className="font-medium text-stone-900">₹{subtotal.toFixed(2)}</span>
            </div>
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
              Place order
            </button>
          </form>
        </div>

        <div className="rounded-[24px] border border-stone-200 bg-white p-8 shadow-[0_20px_60px_-32px_rgba(17,17,17,0.35)]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-brand-primary">Summary</p>
          <h2 className="mt-2 text-2xl font-semibold text-stone-950">Your order</h2>

          <div className="mt-6 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between gap-4 rounded-[16px] border border-stone-200 p-3">
                <div>
                  <p className="text-sm font-semibold text-stone-900">{item.title}</p>
                  <p className="text-xs text-stone-500">Qty {item.quantity}</p>
                </div>
                <p className="text-sm font-semibold text-stone-900">₹{(item.discountPrice || item.price) * item.quantity}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-3 text-sm text-stone-600">
            <div className="flex items-center justify-between">
              <span>Subtotal</span>
              <span className="font-medium text-stone-900">₹{subtotal}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Shipping</span>
              <span className="font-medium text-stone-900">₹{shipping}</span>
            </div>
            <div className="flex items-center justify-between border-t border-stone-200 pt-3">
              <span>Total</span>
              <span className="font-semibold text-stone-950">₹{subtotal + shipping}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

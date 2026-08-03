import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart()
  const [submitted, setSubmitted] = useState(false)

  const shipping = useMemo(() => (subtotal > 0 ? 0 : 0), [subtotal])

  const handleSubmit = (event) => {
    event.preventDefault()
    setSubmitted(true)
    clearCart()
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <div className="rounded-[24px] border border-stone-200 bg-white p-10 shadow-[0_20px_60px_-32px_rgba(17,17,17,0.35)]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-brand-primary">Order placed</p>
          <h1 className="mt-3 text-3xl font-semibold text-stone-950">Thank you for your order</h1>
          <p className="mt-4 text-sm leading-7 text-stone-600">Your order is being prepared and a confirmation will be shared shortly.</p>
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

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <input required placeholder="Full name" className="rounded-[14px] border border-stone-200 px-4 py-3 text-sm outline-none" />
              <input required placeholder="Email address" className="rounded-[14px] border border-stone-200 px-4 py-3 text-sm outline-none" />
            </div>
            <input required placeholder="Phone number" className="w-full rounded-[14px] border border-stone-200 px-4 py-3 text-sm outline-none" />
            <input required placeholder="Address" className="w-full rounded-[14px] border border-stone-200 px-4 py-3 text-sm outline-none" />
            <div className="grid gap-4 sm:grid-cols-2">
              <input required placeholder="City" className="rounded-[14px] border border-stone-200 px-4 py-3 text-sm outline-none" />
              <input required placeholder="PIN code" className="rounded-[14px] border border-stone-200 px-4 py-3 text-sm outline-none" />
            </div>
            <button type="submit" className="w-full rounded-full bg-stone-950 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-brand-primary">
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

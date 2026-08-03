import { Link } from 'react-router-dom'
import { FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi'
import { useCart } from '../context/CartContext'

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, clearCart, subtotal } = useCart()

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <div className="rounded-[24px] border border-stone-200 bg-white p-10 shadow-[0_20px_60px_-32px_rgba(17,17,17,0.35)] sm:p-12">
          <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-brand-primary">Cart</p>
          <h1 className="mt-3 text-3xl font-semibold text-stone-950">Your bag is empty</h1>
          <p className="mt-4 text-sm leading-7 text-stone-600">Add a few curated pieces to begin your Royal Shopping experience.</p>
          <Link to="/shop" className="mt-8 inline-flex rounded-full bg-stone-950 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-brand-primary">
            Continue shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[24px] border border-stone-200 bg-white p-6 shadow-[0_20px_60px_-32px_rgba(17,17,17,0.35)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-brand-primary">Bag</p>
              <h1 className="mt-2 text-2xl font-semibold text-stone-950">Your selections</h1>
            </div>
            <button onClick={clearCart} className="text-sm font-medium text-stone-500 transition hover:text-brand-primary" aria-label="Clear cart">
              Clear bag
            </button>
          </div>

          <div className="mt-8 space-y-5">
            {items.map((item) => (
              <div key={`${item.id}-${item.selectedColor || ''}-${item.selectedSize || ''}`} className="flex flex-col gap-4 rounded-[20px] border border-stone-200 p-4 sm:flex-row sm:items-center">
                <img src={item.image} alt={item.title} className="h-24 w-full rounded-[16px] object-cover sm:w-24" />
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-lg font-semibold text-stone-950">{item.title}</h2>
                      <p className="mt-1 text-sm text-stone-500">{item.selectedColor || item.colors?.[0]} · {item.selectedSize || item.sizes?.[0]}</p>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="rounded-full p-2 text-stone-400 transition hover:bg-stone-100 hover:text-brand-primary">
                      <FiTrash2 size={16} />
                    </button>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3 rounded-full border border-stone-200 px-3 py-2">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="rounded-full p-1 text-stone-700 transition hover:bg-stone-100">
                        <FiMinus size={14} />
                      </button>
                      <span className="min-w-6 text-center text-sm font-semibold text-stone-900">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="rounded-full p-1 text-stone-700 transition hover:bg-stone-100">
                        <FiPlus size={14} />
                      </button>
                    </div>
                    <p className="text-lg font-semibold text-stone-950">₹{(item.discountPrice || item.price) * item.quantity}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[24px] border border-stone-200 bg-white p-6 shadow-[0_20px_60px_-32px_rgba(17,17,17,0.35)]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-brand-primary">Summary</p>
          <h2 className="mt-2 text-2xl font-semibold text-stone-950">Order totals</h2>

          <div className="mt-6 space-y-3 text-sm text-stone-600">
            <div className="flex items-center justify-between">
              <span>Subtotal</span>
              <span className="font-medium text-stone-900">₹{subtotal}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Shipping</span>
              <span className="font-medium text-stone-900">Free</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Estimated total</span>
              <span className="font-semibold text-stone-950">₹{subtotal}</span>
            </div>
          </div>

          <Link to="/checkout" className="mt-8 flex w-full justify-center rounded-full bg-stone-950 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-brand-primary">
            Proceed to checkout
          </Link>
          <Link to="/shop" className="mt-3 inline-flex text-sm font-medium text-brand-primary">
            Continue shopping
          </Link>
        </div>
      </div>
    </div>
  )
}

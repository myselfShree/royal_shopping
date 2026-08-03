import { Link } from 'react-router-dom'
import { FiHeart, FiShoppingBag, FiTrash2 } from 'react-icons/fi'
import { useCart } from '../context/CartContext'

export default function WishlistPage() {
  const { wishlistItems, addToCart, removeFromWishlist } = useCart()

  if (wishlistItems.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <div className="rounded-[24px] border border-stone-200 bg-white p-10 shadow-[0_20px_60px_-32px_rgba(17,17,17,0.35)]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-brand-primary">Wishlist</p>
          <h1 className="mt-3 text-3xl font-semibold text-stone-950">No saved pieces yet</h1>
          <p className="mt-4 text-sm leading-7 text-stone-600">Save products you love and move them to your bag whenever you’re ready.</p>
          <Link to="/shop" className="mt-8 inline-flex rounded-full bg-stone-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-primary">
            Browse products
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-[24px] border border-stone-200 bg-white p-8 shadow-[0_20px_60px_-32px_rgba(17,17,17,0.35)] sm:p-10">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-brand-primary">Wishlist</p>
            <h1 className="mt-2 text-3xl font-semibold text-stone-950">Your saved favorites</h1>
          </div>
          <div className="rounded-full bg-brand-accent/10 px-3 py-2 text-sm font-semibold text-brand-primary">
            {wishlistItems.length} saved
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {wishlistItems.map((item) => (
            <article key={item.id} className="overflow-hidden rounded-[20px] border border-stone-200 bg-stone-50">
              <img src={item.image} alt={item.title} className="h-48 w-full object-cover" />
              <div className="p-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-brand-primary">{item.category}</p>
                    <h2 className="mt-2 text-lg font-semibold text-stone-950">{item.title}</h2>
                  </div>
                  <button onClick={() => removeFromWishlist(item.id)} className="rounded-full p-2 text-stone-400 transition hover:bg-white hover:text-brand-primary">
                    <FiTrash2 size={16} />
                  </button>
                </div>
                <p className="mt-3 text-sm leading-7 text-stone-600">{item.description}</p>
                <div className="mt-5 flex items-center justify-between">
                  <p className="text-lg font-semibold text-stone-950">₹{item.discountPrice}</p>
                  <div className="flex items-center gap-2">
                    <button onClick={() => addToCart(item, 1)} className="rounded-full bg-stone-950 px-3 py-2 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-brand-primary">
                      <span className="flex items-center gap-2"><FiShoppingBag size={14} /> Add</span>
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}

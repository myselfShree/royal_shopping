import { Link, NavLink } from 'react-router-dom'
import { FiHeart, FiMenu, FiSearch, FiShoppingBag } from 'react-icons/fi'
import { useAuth } from '../../context/AuthContext'
import { useCart } from '../../context/CartContext'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Shop', href: '/shop' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const auth = useAuth()
  const user = auth?.user
  const cart = useCart()
  const totalItems = cart?.totalItems || 0

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200/80 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-primary text-base font-semibold text-white shadow-[0_10px_30px_-15px_rgba(139,0,0,0.6)]">
            R
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-brand-accent">Royal</p>
            <p className="text-base font-semibold text-stone-900">Shopping</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `text-sm font-medium transition ${isActive ? 'text-brand-primary' : 'text-stone-600 hover:text-brand-primary'}`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <button className="hidden rounded-full border border-stone-200 p-2.5 text-stone-700 transition hover:border-brand-primary hover:text-brand-primary sm:block">
            <FiSearch size={17} />
          </button>
          <Link to="/wishlist" className="rounded-full border border-stone-200 p-2.5 text-stone-700 transition hover:border-brand-primary hover:text-brand-primary">
            <FiHeart size={17} />
          </Link>
          <Link to="/cart" className="relative rounded-full border border-stone-200 p-2.5 text-stone-700 transition hover:border-brand-primary hover:text-brand-primary">
            <FiShoppingBag size={17} />
            {totalItems > 0 ? <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-primary text-[10px] font-semibold text-white">{totalItems}</span> : null}
          </Link>
          {user ? (
            <div className="flex items-center gap-2">
              <Link to="/profile" className="rounded-full border border-stone-200 px-3 py-2 text-sm font-medium text-stone-700 transition hover:border-brand-primary hover:text-brand-primary">
                {user.name.split(' ')[0]}
              </Link>
              {user.role === 'admin' ? (
                <Link to="/admin" className="rounded-full bg-brand-primary px-3 py-2 text-sm font-medium text-white transition hover:bg-brand-primary/90">
                  Admin
                </Link>
              ) : null}
            </div>
          ) : (
            <Link to="/login" className="rounded-full border border-stone-200 px-3 py-2 text-sm font-medium text-stone-700 transition hover:border-brand-primary hover:text-brand-primary">
              Sign in
            </Link>
          )}
          <button className="rounded-full border border-stone-200 p-2.5 text-stone-700 transition hover:border-brand-primary hover:text-brand-primary md:hidden">
            <FiMenu size={17} />
          </button>
        </div>
      </div>
    </header>
  )
}

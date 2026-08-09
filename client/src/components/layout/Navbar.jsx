import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FiHeart, FiMenu, FiSearch, FiShoppingBag, FiX, FiPackage, FiUser } from 'react-icons/fi'
import { useAuth } from '../../context/AuthContext'
import { useCart } from '../../context/CartContext'
import { useSettings } from '../../context/SettingsContext'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Shop', href: '/shop' },
  { name: 'My Orders', href: '/my-orders' },
  { name: 'About', href: '/about' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const auth = useAuth()
  const user = auth?.user
  const cart = useCart()
  const totalItems = cart?.totalItems || 0
  const { settings } = useSettings()

  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200/80 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          {settings.logoUrl ? (
            <img src={settings.logoUrl} alt={settings.siteName || 'Logo'} className="h-10 w-auto object-contain" />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-primary text-base font-semibold text-white shadow-[0_10px_30px_-15px_rgba(139,0,0,0.6)]">
              {(settings.siteName || 'Royal')[0]}
            </div>
          )}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-brand-accent">
              {(settings.siteName || 'Royal Shopping').split(' ')[0]}
            </p>
            <p className="text-base font-semibold text-stone-900 leading-tight">
              {(settings.siteName || 'Royal Shopping').split(' ').slice(1).join(' ') || 'Shopping'}
            </p>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-7 md:flex">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `text-sm font-medium transition ${isActive ? 'text-brand-primary font-semibold' : 'text-stone-600 hover:text-brand-primary'}`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Header Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link to="/shop" className="rounded-full border border-stone-200 p-2.5 text-stone-700 transition hover:border-brand-primary hover:text-brand-primary">
            <FiSearch size={17} />
          </Link>
          <Link to="/wishlist" className="rounded-full border border-stone-200 p-2.5 text-stone-700 transition hover:border-brand-primary hover:text-brand-primary">
            <FiHeart size={17} />
          </Link>
          <Link to="/cart" className="relative rounded-full border border-stone-200 p-2.5 text-stone-700 transition hover:border-brand-primary hover:text-brand-primary">
            <FiShoppingBag size={17} />
            {totalItems > 0 ? (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-primary text-[10px] font-semibold text-white">
                {totalItems}
              </span>
            ) : null}
          </Link>

          {user ? (
            <div className="hidden md:flex items-center gap-2">
              <Link to="/profile" className="rounded-full border border-stone-200 px-3.5 py-2 text-sm font-medium text-stone-700 transition hover:border-brand-primary hover:text-brand-primary">
                {user.name.split(' ')[0]}
              </Link>
              {user.role === 'admin' ? (
                <Link to="/admin" className="rounded-full bg-brand-primary px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-brand-primary/90">
                  Admin Panel
                </Link>
              ) : null}
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Link to="/login" className="rounded-full border border-stone-200 px-4 py-2 text-sm font-medium text-stone-700 transition hover:border-brand-primary hover:text-brand-primary">
                Sign in
              </Link>
            </div>
          )}

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
            className="rounded-full border border-stone-200 p-2.5 text-stone-700 transition hover:border-brand-primary hover:text-brand-primary md:hidden"
            aria-label="Toggle menu"
          >
            {mobileDrawerOpen ? <FiX size={18} /> : <FiMenu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileDrawerOpen && (
        <div className="fixed inset-x-0 top-[61px] z-50 border-b border-stone-200 bg-white p-6 shadow-xl md:hidden">
          <nav className="flex flex-col space-y-4">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                onClick={() => setMobileDrawerOpen(false)}
                className={({ isActive }) =>
                  `text-base font-semibold transition ${isActive ? 'text-brand-primary' : 'text-stone-800'}`
                }
              >
                {item.name}
              </NavLink>
            ))}
            <hr className="border-stone-100" />
            <Link to="/help" onClick={() => setMobileDrawerOpen(false)} className="text-sm text-stone-600">
              Help Center & FAQ
            </Link>
            <Link to="/returns" onClick={() => setMobileDrawerOpen(false)} className="text-sm text-stone-600">
              7-Day Returns Policy
            </Link>

            {user ? (
              <div className="pt-2 flex items-center justify-between border-t border-stone-100">
                <span className="text-sm font-semibold text-stone-900">Signed in as {user.name}</span>
                {user.role === 'admin' && (
                  <Link to="/admin" onClick={() => setMobileDrawerOpen(false)} className="rounded-full bg-brand-primary px-3.5 py-1.5 text-xs font-semibold text-white">
                    Admin Panel
                  </Link>
                )}
              </div>
            ) : (
              <div className="pt-2">
                <Link
                  to="/login"
                  onClick={() => setMobileDrawerOpen(false)}
                  className="block w-full rounded-full bg-brand-primary py-3 text-center text-sm font-semibold text-white"
                >
                  Sign In / Create Account
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}

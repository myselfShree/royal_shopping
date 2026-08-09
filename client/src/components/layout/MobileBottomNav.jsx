import { NavLink } from 'react-router-dom'
import { FiHome, FiShoppingBag, FiPackage, FiHeart, FiUser } from 'react-icons/fi'
import { useCart } from '../../context/CartContext'

export default function MobileBottomNav() {
  const cart = useCart()
  const cartCount = cart?.totalItems || 0

  const navItems = [
    { label: 'Home', path: '/', icon: FiHome },
    { label: 'Shop', path: '/shop', icon: FiShoppingBag },
    { label: 'My Orders', path: '/my-orders', icon: FiPackage },
    { label: 'Wishlist', path: '/wishlist', icon: FiHeart },
    { label: 'Profile', path: '/profile', icon: FiUser },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-stone-200 bg-white/95 backdrop-blur-lg md:hidden">
      <div className="flex h-16 items-center justify-around px-2">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) =>
                `relative flex flex-col items-center justify-center py-1 transition ${
                  isActive ? 'text-brand-primary font-semibold' : 'text-stone-500 hover:text-stone-900'
                }`
              }
            >
              <div className="relative">
                <Icon size={20} />
                {item.label === 'Shop' && cartCount > 0 ? (
                  <span className="absolute -right-2 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand-primary text-[9px] font-bold text-white">
                    {cartCount}
                  </span>
                ) : null}
              </div>
              <span className="mt-1 text-[10px]">{item.label}</span>
            </NavLink>
          )
        })}
      </div>
    </nav>
  )
}

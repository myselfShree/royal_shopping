import { Link, useLocation } from 'react-router-dom'

const navItems = [
  { path: '/admin', label: 'Dashboard' },
  { path: '/admin/products', label: 'Products' },
  { path: '/admin/categories', label: 'Categories' },
  { path: '/admin/orders', label: 'Orders' },
  { path: '/admin/customers', label: 'Customers' },
  { path: '/admin/settings', label: 'Settings' },
]

export default function AdminLayout({ children }) {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      <div className="mx-auto flex min-h-screen max-w-[1480px] gap-6 px-4 py-6 xl:px-8">
        <aside className="hidden w-72 shrink-0 rounded-[28px] border border-stone-200 bg-white p-6 shadow-[0_10px_30px_-24px_rgba(17,17,17,0.35)] xl:block">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brand-primary">Admin panel</p>
            <h2 className="mt-3 text-2xl font-semibold text-stone-950">Royal Shopping</h2>
            <p className="mt-2 text-sm text-stone-600">Manage products, orders, customers, and settings.</p>
          </div>

          <nav className="mt-8 space-y-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block rounded-[18px] px-4 py-3 text-sm font-medium transition ${
                    isActive ? 'bg-brand-primary text-white' : 'text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </aside>

        <div className="flex-1">
          <div className="mb-6 rounded-[28px] border border-stone-200 bg-white p-6 shadow-[0_10px_30px_-24px_rgba(17,17,17,0.35)]">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brand-primary">Admin workspace</p>
                <h1 className="mt-2 text-3xl font-semibold text-stone-950">Manage your store</h1>
              </div>
              <div className="rounded-full bg-stone-100 px-4 py-2 text-sm font-semibold text-stone-700">Admin access</div>
            </div>
          </div>

          {children}
        </div>
      </div>
    </div>
  )
}

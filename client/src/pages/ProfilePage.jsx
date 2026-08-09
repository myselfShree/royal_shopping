import { Link } from 'react-router-dom'
import { FiPackage, FiHeart, FiMapPin, FiLogOut, FiShield } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'

export default function ProfilePage() {
  const { user, logout } = useAuth()

  if (!user) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center">
        <h2 className="text-2xl font-semibold text-stone-900">Please sign in</h2>
        <p className="mt-2 text-sm text-stone-600">You need an account to view your profile and track orders.</p>
        <Link to="/login" className="mt-6 inline-block rounded-full bg-brand-primary px-6 py-3 text-sm font-semibold text-white hover:bg-brand-primary/90">
          Sign In
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-[24px] border border-stone-200 bg-white p-8 shadow-[0_20px_60px_-32px_rgba(17,17,17,0.35)] sm:p-10">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-brand-primary">My Account</p>
            <h1 className="mt-2 text-3xl font-semibold text-stone-950">{user.name}</h1>
            <p className="mt-2 text-sm text-stone-600">Manage your saved details, orders, and preferences from one place.</p>
          </div>
          <div className="flex items-center gap-3">
            {user.role === 'admin' && (
              <Link to="/admin" className="rounded-full bg-stone-950 px-4 py-2 text-xs font-semibold text-white hover:bg-brand-primary">
                <FiShield className="inline mr-1" /> Admin Panel
              </Link>
            )}
            <button onClick={logout} className="rounded-full border border-stone-200 px-4 py-2 text-sm font-semibold text-stone-700 transition hover:border-red-500 hover:text-red-600">
              <FiLogOut className="inline mr-1" /> Logout
            </button>
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {/* User Details */}
          <div className="rounded-[18px] border border-stone-200 bg-stone-50 p-6">
            <h2 className="text-lg font-semibold text-stone-950">Profile Details</h2>
            <div className="mt-4 space-y-3 text-sm text-stone-700">
              <p><span className="font-medium text-stone-900">Email:</span> {user.email}</p>
              <p><span className="font-medium text-stone-900">Phone:</span> {user.phone || 'Not provided'}</p>
              <p><span className="font-medium text-stone-900">Account Type:</span> <span className="capitalize">{user.role}</span></p>
            </div>
          </div>

          {/* Quick Shortcuts */}
          <div className="rounded-[18px] border border-stone-200 bg-stone-50 p-6">
            <h2 className="text-lg font-semibold text-stone-950">Quick Shortcuts</h2>
            <div className="mt-4 space-y-3">
              <Link to="/my-orders" className="flex items-center justify-between rounded-[12px] bg-white p-3 border border-stone-200 hover:border-brand-primary text-sm font-semibold text-stone-900 transition">
                <span className="flex items-center gap-2"><FiPackage className="text-brand-primary" /> View My Orders</span>
                <span>→</span>
              </Link>
              <Link to="/wishlist" className="flex items-center justify-between rounded-[12px] bg-white p-3 border border-stone-200 hover:border-brand-primary text-sm font-semibold text-stone-900 transition">
                <span className="flex items-center gap-2"><FiHeart className="text-brand-primary" /> Saved Wishlist</span>
                <span>→</span>
              </Link>
              <Link to="/track-order" className="flex items-center justify-between rounded-[12px] bg-white p-3 border border-stone-200 hover:border-brand-primary text-sm font-semibold text-stone-900 transition">
                <span className="flex items-center gap-2"><FiMapPin className="text-brand-primary" /> Track Order Status</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

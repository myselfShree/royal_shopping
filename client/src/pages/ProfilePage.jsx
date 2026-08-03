import { useAuth } from '../context/AuthContext'

export default function ProfilePage() {
  const { user, logout } = useAuth()

  if (!user) {
    return <div className="px-4 py-20 text-center text-sm text-stone-600">Please sign in to view your profile.</div>
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-[24px] border border-stone-200 bg-white p-8 shadow-[0_20px_60px_-32px_rgba(17,17,17,0.35)] sm:p-10">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-brand-primary">My account</p>
            <h1 className="mt-2 text-3xl font-semibold text-stone-950">{user.name}</h1>
            <p className="mt-3 text-sm leading-7 text-stone-600">Manage your saved details, orders, and preferences from one place.</p>
          </div>
          <button onClick={logout} className="rounded-full border border-stone-200 px-4 py-2 text-sm font-semibold text-stone-700 transition hover:border-brand-primary hover:text-brand-primary">
            Logout
          </button>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-[18px] border border-stone-200 bg-stone-50 p-6 transition hover:border-brand-primary/40">
            <h2 className="text-lg font-semibold text-stone-950">Profile details</h2>
            <div className="mt-4 space-y-3 text-sm text-stone-600">
              <p><span className="font-medium text-stone-900">Email:</span> {user.email}</p>
              <p><span className="font-medium text-stone-900">Phone:</span> {user.phone || 'Not provided'}</p>
              <p><span className="font-medium text-stone-900">Role:</span> {user.role}</p>
            </div>
          </div>
          <div className="rounded-[18px] border border-stone-200 bg-stone-50 p-6 transition hover:border-brand-primary/40">
            <h2 className="text-lg font-semibold text-stone-950">Quick links</h2>
            <ul className="mt-4 space-y-3 text-sm text-stone-600">
              <li>• Wishlist</li>
              <li>• Orders</li>
              <li>• Addresses</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

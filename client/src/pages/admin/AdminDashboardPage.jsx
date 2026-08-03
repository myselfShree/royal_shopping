import { FiBox, FiDollarSign, FiPackage, FiUsers } from 'react-icons/fi'
import AdminLayout from '../../layouts/AdminLayout'

const stats = [
  { title: 'Total Products', value: '128', icon: FiBox, accent: 'bg-brand-primary/10 text-brand-primary' },
  { title: 'Total Customers', value: '3.2k', icon: FiUsers, accent: 'bg-stone-100 text-stone-700' },
  { title: 'Total Orders', value: '892', icon: FiPackage, accent: 'bg-brand-accent/10 text-brand-primary' },
  { title: 'Revenue', value: '₹24.8L', icon: FiDollarSign, accent: 'bg-stone-100 text-stone-700' },
]

const recentOrders = [
  { id: '#1024', customer: 'Aarav', total: '₹4,999', status: 'Confirmed' },
  { id: '#1025', customer: 'Meera', total: '₹3,299', status: 'Packed' },
  { id: '#1026', customer: 'Riya', total: '₹8,999', status: 'Shipped' },
]

export default function AdminDashboardPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-brand-primary">Overview</p>
          <h1 className="mt-2 text-3xl font-semibold text-stone-950">Admin dashboard</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-stone-600">Keep an eye on stock, orders, customer behavior, and revenue in one place.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <div key={stat.title} className="rounded-[18px] border border-stone-200 bg-white p-5 shadow-[0_10px_30px_-24px_rgba(17,17,17,0.35)]">
                <div className={`flex h-11 w-11 items-center justify-center rounded-full ${stat.accent}`}>
                  <Icon size={18} />
                </div>
                <p className="mt-4 text-sm text-stone-600">{stat.title}</p>
                <p className="mt-2 text-2xl font-semibold text-stone-950">{stat.value}</p>
              </div>
            )
          })}
        </div>

        <div className="rounded-[24px] border border-stone-200 bg-white p-6 shadow-[0_10px_30px_-24px_rgba(17,17,17,0.35)]">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-stone-950">Recent orders</h2>
              <p className="mt-2 text-sm text-stone-600">Latest customer orders requiring attention.</p>
            </div>
          </div>

          <div className="mt-6 overflow-hidden rounded-[16px] border border-stone-200">
            <table className="min-w-full divide-y divide-stone-200 text-sm">
              <thead className="bg-stone-50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-stone-700">Order ID</th>
                  <th className="px-4 py-3 text-left font-semibold text-stone-700">Customer</th>
                  <th className="px-4 py-3 text-left font-semibold text-stone-700">Total</th>
                  <th className="px-4 py-3 text-left font-semibold text-stone-700">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 bg-white">
                {recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="px-4 py-3 font-medium text-stone-900">{order.id}</td>
                    <td className="px-4 py-3 text-stone-600">{order.customer}</td>
                    <td className="px-4 py-3 text-stone-600">{order.total}</td>
                    <td className="px-4 py-3">
                      <span className="rounded-full bg-brand-accent/10 px-3 py-1 text-xs font-semibold text-brand-primary">{order.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

import { useEffect, useState } from 'react'
import { FiBox, FiDollarSign, FiPackage, FiUsers, FiArrowRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import AdminLayout from '../../layouts/AdminLayout'
import api from '../../services/api'

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    productsCount: 3,
    customersCount: 0,
    ordersCount: 0,
    totalRevenue: 0,
  })
  const [recentOrders, setRecentOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true)
      try {
        const [prodRes, custRes, orderRes] = await Promise.allSettled([
          api.get('/products?limit=1'),
          api.get('/customers'),
          api.get('/orders?limit=5'),
        ])

        const prodTotal = prodRes.status === 'fulfilled' ? (prodRes.value.data?.meta?.total || 3) : 3
        const custData = custRes.status === 'fulfilled' ? (custRes.value.data?.customers || []) : []
        const orderData = orderRes.status === 'fulfilled' ? (orderRes.value.data?.orders || []) : []

        const revenue = orderData.reduce((acc, curr) => acc + (curr.total || 0), 0)

        setStats({
          productsCount: prodTotal,
          customersCount: custData.length,
          ordersCount: orderData.length,
          totalRevenue: revenue,
        })
        setRecentOrders(orderData)
      } catch (err) {
        // ignore
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  const statCards = [
    { title: 'Total Products', value: stats.productsCount, icon: FiBox, accent: 'bg-brand-primary/10 text-brand-primary' },
    { title: 'Total Customers', value: stats.customersCount, icon: FiUsers, accent: 'bg-stone-100 text-stone-700' },
    { title: 'Total Orders', value: stats.ordersCount, icon: FiPackage, accent: 'bg-brand-accent/10 text-brand-primary' },
    { title: 'Total Revenue', value: `₹${stats.totalRevenue.toFixed(2)}`, icon: FiDollarSign, accent: 'bg-stone-100 text-stone-700' },
  ]

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-brand-primary">Overview</p>
          <h1 className="mt-2 text-3xl font-semibold text-stone-950">Admin dashboard</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-stone-600">Keep an eye on stock, orders, customer behavior, and revenue in one place.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {statCards.map((stat) => {
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
            <Link to="/admin/orders" className="flex items-center gap-1 text-sm font-semibold text-brand-primary hover:underline">
              View all orders <FiArrowRight />
            </Link>
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
                {recentOrders.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-4 py-6 text-center text-stone-500">
                      No recent orders yet.
                    </td>
                  </tr>
                ) : (
                  recentOrders.map((order) => (
                    <tr key={order.id}>
                      <td className="px-4 py-3 font-medium text-stone-900">#{order.id}</td>
                      <td className="px-4 py-3 text-stone-600">{order.user?.name || order.email || 'Guest'}</td>
                      <td className="px-4 py-3 text-stone-600">₹{order.total?.toFixed(2)}</td>
                      <td className="px-4 py-3">
                        <span className="rounded-full bg-brand-accent/10 px-3 py-1 text-xs font-semibold text-brand-primary capitalize">
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

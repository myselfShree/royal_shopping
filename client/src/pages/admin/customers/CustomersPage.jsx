import { useEffect, useState } from 'react'
import { FiSearch, FiMail, FiPhone, FiUser } from 'react-icons/fi'
import AdminLayout from '../../../layouts/AdminLayout'
import api from '../../../services/api'

export default function CustomersPage() {
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [feedback, setFeedback] = useState({ message: '', type: 'success' })

  useEffect(() => {
    loadCustomers()
  }, [])

  const loadCustomers = async () => {
    setLoading(true)
    try {
      const res = await api.get('/customers')
      setCustomers(res.data?.customers || (Array.isArray(res.data) ? res.data : []))
    } catch (error) {
      console.error('Failed to load customers:', error)
      setCustomers([])
    } finally {
      setLoading(false)
    }
  }

  const filteredCustomers = customers.filter((customer) =>
    customer.name?.toLowerCase().includes(search.toLowerCase()) ||
    customer.email?.toLowerCase().includes(search.toLowerCase())
  )

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center py-20">
          <p className="text-stone-600">Loading customers...</p>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-brand-primary">Management</p>
          <h1 className="mt-2 text-3xl font-semibold text-stone-950">Customers</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-stone-600">View all registered customers, their order history, and contact information.</p>
        </div>

        {feedback.message && (
          <div className={`rounded-[12px] border p-4 ${feedback.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'}`}>
            <p className="text-sm font-medium">{feedback.message}</p>
          </div>
        )}

        <div className="rounded-[16px] border border-stone-200 bg-white p-4 shadow-[0_10px_30px_-24px_rgba(17,17,17,0.35)]">
          <div className="flex items-center gap-3 rounded-[12px] border border-stone-200 px-4 py-3">
            <FiSearch className="text-stone-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or email..."
              className="w-full bg-transparent text-sm outline-none text-stone-900 placeholder:text-stone-400"
            />
          </div>
        </div>

        {filteredCustomers.length === 0 ? (
          <div className="rounded-[20px] border border-stone-200 bg-stone-50 p-10 text-center">
            <p className="text-stone-600">No customers found</p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredCustomers.map((customer) => (
              <div key={customer.id} className="rounded-[16px] border border-stone-200 bg-white p-5 shadow-[0_10px_30px_-24px_rgba(17,17,17,0.35)] transition hover:shadow-[0_20px_60px_-32px_rgba(17,17,17,0.35)]">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-primary/10">
                  <FiUser className="text-brand-primary" size={20} />
                </div>

                <div className="mt-4">
                  <h3 className="text-lg font-semibold text-stone-950">{customer.name}</h3>
                  <p className="mt-1 text-xs font-medium text-stone-500 uppercase tracking-wider">
                    {customer.role === 'admin' ? 'Admin User' : 'Customer'}
                  </p>
                </div>

                <div className="mt-4 space-y-3 border-t border-stone-200 pt-4">
                  <div className="flex items-center gap-3">
                    <FiMail size={14} className="text-stone-400" />
                    <a href={`mailto:${customer.email}`} className="text-sm text-brand-primary hover:underline">
                      {customer.email}
                    </a>
                  </div>

                  {customer.phone && (
                    <div className="flex items-center gap-3">
                      <FiPhone size={14} className="text-stone-400" />
                      <a href={`tel:${customer.phone}`} className="text-sm text-stone-700 hover:text-brand-primary">
                        {customer.phone}
                      </a>
                    </div>
                  )}
                </div>

                <div className="mt-4 rounded-[12px] bg-stone-50 p-3 text-center">
                  <p className="text-xs font-medium text-stone-500 uppercase">Joined</p>
                  <p className="mt-1 text-sm font-semibold text-stone-900">
                    {new Date(customer.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="rounded-[16px] border border-stone-200 bg-white p-6 shadow-[0_10px_30px_-24px_rgba(17,17,17,0.35)]">
          <h2 className="text-lg font-semibold text-stone-950">Statistics</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <div className="rounded-[12px] bg-stone-50 p-4">
              <p className="text-sm text-stone-600">Total Customers</p>
              <p className="mt-2 text-2xl font-bold text-stone-950">{customers.length}</p>
            </div>
            <div className="rounded-[12px] bg-stone-50 p-4">
              <p className="text-sm text-stone-600">Active Users</p>
              <p className="mt-2 text-2xl font-bold text-stone-950">{customers.filter((c) => c.role === 'user').length}</p>
            </div>
            <div className="rounded-[12px] bg-stone-50 p-4">
              <p className="text-sm text-stone-600">Admin Users</p>
              <p className="mt-2 text-2xl font-bold text-stone-950">{customers.filter((c) => c.role === 'admin').length}</p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

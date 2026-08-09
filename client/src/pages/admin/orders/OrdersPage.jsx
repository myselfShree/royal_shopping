import { useEffect, useState } from 'react'
import { FiCheck, FiTruck, FiPackage, FiX, FiEdit2, FiChevronDown } from 'react-icons/fi'
import AdminLayout from '../../../layouts/AdminLayout'
import api from '../../../services/api'

export default function OrdersPage() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [expandedOrder, setExpandedOrder] = useState(null)
  const [feedback, setFeedback] = useState({ message: '', type: 'success' })

  useEffect(() => {
    loadOrders()
  }, [])

  const loadOrders = async () => {
    setLoading(true)
    try {
      const res = await api.get('/orders')
      setOrders(res.data?.orders || (Array.isArray(res.data) ? res.data : []))
    } catch (error) {
      console.error('Failed to load orders:', error)
      setOrders([])
    } finally {
      setLoading(false)
    }
  }

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await api.put(`/orders/${orderId}`, { status: newStatus })
      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      )
      setFeedback({ message: 'Order status updated', type: 'success' })
      setTimeout(() => setFeedback({ message: '', type: '' }), 3000)
    } catch (error) {
      setFeedback({ message: 'Failed to update order', type: 'error' })
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200'
      case 'confirmed':
        return 'bg-blue-50 text-blue-700 border-blue-200'
      case 'shipped':
        return 'bg-purple-50 text-purple-700 border-purple-200'
      case 'delivered':
        return 'bg-green-50 text-green-700 border-green-200'
      case 'cancelled':
        return 'bg-red-50 text-red-700 border-red-200'
      default:
        return 'bg-stone-50 text-stone-700 border-stone-200'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <FiPackage size={16} />
      case 'confirmed':
        return <FiCheck size={16} />
      case 'shipped':
        return <FiTruck size={16} />
      case 'delivered':
        return <FiCheck size={16} />
      case 'cancelled':
        return <FiX size={16} />
      default:
        return null
    }
  }

  const filteredOrders = filter === 'all' ? orders : orders.filter((o) => o.status === filter)

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center py-20">
          <p className="text-stone-600">Loading orders...</p>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-brand-primary">Management</p>
          <h1 className="mt-2 text-3xl font-semibold text-stone-950">Orders</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-stone-600">Track and manage all customer orders, updates statuses, and view order details.</p>
        </div>

        {feedback.message && (
          <div className={`rounded-[12px] border p-4 ${feedback.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'}`}>
            <p className="text-sm font-medium">{feedback.message}</p>
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          {['all', 'pending', 'confirmed', 'shipped', 'delivered', 'cancelled'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                filter === status
                  ? 'bg-brand-primary text-white'
                  : 'border border-stone-200 text-stone-700 hover:border-brand-primary'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        {filteredOrders.length === 0 ? (
          <div className="rounded-[20px] border border-stone-200 bg-stone-50 p-10 text-center">
            <p className="text-stone-600">No orders found</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredOrders.map((order) => (
              <div key={order.id} className="rounded-[16px] border border-stone-200 bg-white shadow-[0_10px_30px_-24px_rgba(17,17,17,0.35)]">
                <div
                  onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                  className="flex cursor-pointer items-center justify-between gap-4 p-5 transition hover:bg-stone-50"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <p className="font-semibold text-stone-950">Order #{order.id}</p>
                      <span className={`rounded-full border px-3 py-1 text-xs font-medium flex items-center gap-1 ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                    <div className="mt-2 grid grid-cols-2 gap-4 text-sm text-stone-600 md:grid-cols-4">
                      <div>
                        <p className="text-xs font-medium text-stone-500">Customer</p>
                        <p>{order.user?.name || 'Guest'}</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-stone-500">Email</p>
                        <p>{order.email}</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-stone-500">Total</p>
                        <p className="font-semibold">₹{order.total?.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-stone-500">Date</p>
                        <p>{new Date(order.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                  <FiChevronDown
                    size={20}
                    className={`text-stone-400 transition ${expandedOrder === order.id ? 'rotate-180' : ''}`}
                  />
                </div>

                {expandedOrder === order.id && (
                  <div className="border-t border-stone-200 px-5 py-5 space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <p className="text-sm font-semibold text-stone-700">Shipping Address</p>
                        <p className="mt-2 text-sm text-stone-600">{order.shippingAddress}</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-stone-700">Contact</p>
                        <p className="mt-2 text-sm text-stone-600">{order.phone}</p>
                      </div>
                    </div>

                    {order.notes && (
                      <div>
                        <p className="text-sm font-semibold text-stone-700">Order Notes</p>
                        <p className="mt-2 text-sm text-stone-600">{order.notes}</p>
                      </div>
                    )}

                    <div>
                      <p className="text-sm font-semibold text-stone-700 mb-3">Order Items</p>
                      <div className="space-y-2 rounded-[12px] bg-stone-50 p-3">
                        {order.items?.map((item, idx) => (
                          <div key={idx} className="flex justify-between text-sm">
                            <div>
                              <p className="font-medium text-stone-900">{item.product?.title}</p>
                              <p className="text-xs text-stone-600">Qty: {item.quantity}</p>
                            </div>
                            <p className="font-medium text-stone-900">₹{(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="border-t border-stone-200 pt-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm text-stone-600">
                          <p>Subtotal:</p>
                          <p>₹{order.subtotal?.toFixed(2)}</p>
                        </div>
                        <div className="flex justify-between text-sm text-stone-600">
                          <p>Shipping:</p>
                          <p>₹{(order.shipping || 0).toFixed(2)}</p>
                        </div>
                        <div className="flex justify-between text-lg font-semibold text-stone-950">
                          <p>Total:</p>
                          <p>₹{order.total?.toFixed(2)}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-stone-700">Update Status</p>
                      <div className="flex flex-wrap gap-2">
                        {['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'].map((status) => (
                          <button
                            key={status}
                            onClick={() => updateOrderStatus(order.id, status)}
                            disabled={order.status === status}
                            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                              order.status === status
                                ? 'bg-stone-100 text-stone-400 cursor-not-allowed'
                                : 'border border-stone-200 text-stone-700 hover:border-brand-primary hover:text-brand-primary'
                            }`}
                          >
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  )
}

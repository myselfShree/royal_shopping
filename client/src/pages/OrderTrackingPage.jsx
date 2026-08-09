import { useState } from 'react'
import { FiSearch, FiPackage, FiTruck, FiCheckCircle, FiClock } from 'react-icons/fi'
import api from '../services/api'

export default function OrderTrackingPage() {
  const [orderId, setOrderId] = useState('')
  const [loading, setLoading] = useState(false)
  const [order, setOrder] = useState(null)
  const [error, setError] = useState('')

  const handleTrack = async (e) => {
    e.preventDefault()
    if (!orderId.trim()) return
    setLoading(true)
    setError('')
    setOrder(null)

    try {
      // try integer id lookup
      const res = await api.get(`/orders/${orderId.trim()}`)
      if (res.data) {
        setOrder(res.data)
      } else {
        setError('Order not found. Please check Order ID.')
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Order not found. Enter a valid integer Order ID (e.g. 1).')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-[24px] border border-stone-200 bg-white p-8 shadow-[0_20px_60px_-32px_rgba(17,17,17,0.35)] sm:p-12">
        <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-brand-primary">Live Order Status</p>
        <h1 className="mt-3 text-4xl font-semibold text-stone-950 sm:text-5xl">Track Your Package</h1>
        <p className="mt-4 max-w-2xl text-base leading-8 text-stone-600">
          Enter your Order ID (e.g., 1) to view real-time shipment updates.
        </p>

        {/* Tracking Input */}
        <form onSubmit={handleTrack} className="mt-8 flex w-full max-w-xl items-center gap-3 rounded-full border border-stone-200 p-2 shadow-sm focus-within:border-brand-primary">
          <input
            required
            type="text"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            placeholder="Enter Order ID (e.g. 1)"
            className="w-full border-none bg-transparent px-4 py-2 text-sm outline-none"
          />
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-full bg-stone-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-primary disabled:opacity-50"
          >
            <FiSearch /> {loading ? 'Tracking...' : 'Track'}
          </button>
        </form>

        {error ? (
          <div className="mt-6 rounded-[12px] bg-red-50 border border-red-200 p-4 text-sm text-red-800 max-w-xl">
            {error}
          </div>
        ) : null}

        {/* Track Result Display */}
        {order ? (
          <div className="mt-10 rounded-[20px] border border-stone-200 bg-stone-50 p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-6">
              <div>
                <p className="text-xs uppercase tracking-wider text-stone-500">Order ID: #{order.id}</p>
                <h3 className="mt-1 text-2xl font-semibold text-stone-950">Status: <span className="capitalize text-brand-primary">{order.status}</span></h3>
                <p className="mt-1 text-xs text-stone-500">Placed on: {new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-stone-500">Total Amount</p>
                <p className="text-2xl font-semibold text-stone-950">₹{order.total?.toFixed(2)}</p>
              </div>
            </div>

            {/* Timeline */}
            <div className="mt-8 grid gap-4 sm:grid-cols-4">
              <div className="flex items-center gap-3 rounded-[12px] bg-white p-4 border border-stone-200">
                <FiCheckCircle className="text-green-600" size={20} />
                <div>
                  <p className="text-xs font-semibold text-stone-900">Order Placed</p>
                  <p className="text-[10px] text-stone-500">Confirmed</p>
                </div>
              </div>

              <div className={`flex items-center gap-3 rounded-[12px] bg-white p-4 border ${order.status !== 'pending' ? 'border-stone-200' : 'border-brand-primary'}`}>
                <FiPackage className="text-brand-primary" size={20} />
                <div>
                  <p className="text-xs font-semibold text-stone-900">Processing</p>
                  <p className="text-[10px] text-stone-500">In Quality Check</p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-[12px] bg-white p-4 border border-stone-200">
                <FiTruck className="text-stone-400" size={20} />
                <div>
                  <p className="text-xs font-semibold text-stone-900">Out for Delivery</p>
                  <p className="text-[10px] text-stone-500">Express Courier</p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-[12px] bg-white p-4 border border-stone-200">
                <FiClock className="text-stone-400" size={20} />
                <div>
                  <p className="text-xs font-semibold text-stone-900">Delivered</p>
                  <p className="text-[10px] text-stone-500">Estimated in 3 days</p>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="mt-8 border-t border-stone-200 pt-6">
              <h4 className="font-semibold text-stone-900 mb-4">Package Contents</h4>
              <div className="space-y-3">
                {order.items?.map((item) => (
                  <div key={item.id} className="flex items-center justify-between rounded-[12px] bg-white p-3 border border-stone-200">
                    <div>
                      <p className="text-sm font-semibold text-stone-900">{item.product?.title || `Product #${item.productId}`}</p>
                      <p className="text-xs text-stone-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-semibold text-stone-900">₹{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}

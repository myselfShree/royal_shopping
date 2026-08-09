import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiPackage, FiTruck, FiCheckCircle, FiClock, FiArrowRight } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'

export default function MyOrdersPage() {
  const { user } = useAuth()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchMyOrders()
  }, [])

  const fetchMyOrders = async () => {
    setLoading(true)
    try {
      const res = await api.get('/orders')
      const allOrders = res.data?.orders || (Array.isArray(res.data) ? res.data : [])
      setOrders(allOrders)
    } catch (err) {
      setError('Unable to fetch your orders. Please log in or check back later.')
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered':
        return <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800"><FiCheckCircle /> Delivered</span>
      case 'shipped':
        return <span className="inline-flex items-center gap-1 rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-800"><FiTruck /> Shipped</span>
      case 'confirmed':
        return <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800"><FiPackage /> Confirmed</span>
      default:
        return <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800"><FiClock /> Processing</span>
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="rounded-[24px] border border-stone-200 bg-white p-6 shadow-[0_20px_60px_-32px_rgba(17,17,17,0.35)] sm:p-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-brand-primary">Order History</p>
            <h1 className="mt-2 text-3xl font-semibold text-stone-950 sm:text-4xl">My Orders</h1>
            <p className="mt-2 text-sm text-stone-600">Track current purchases and view order invoices.</p>
          </div>
          <Link to="/shop" className="inline-flex items-center gap-2 rounded-full bg-stone-950 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-primary">
            Continue Shopping <FiArrowRight />
          </Link>
        </div>

        {loading ? (
          <div className="py-16 text-center text-sm text-stone-500">Loading your orders...</div>
        ) : error ? (
          <div className="mt-6 rounded-[16px] bg-red-50 p-6 text-center text-sm text-red-800">{error}</div>
        ) : orders.length === 0 ? (
          <div className="mt-8 rounded-[20px] bg-stone-50 p-12 text-center">
            <FiPackage size={48} className="mx-auto text-stone-400" />
            <h3 className="mt-4 text-xl font-semibold text-stone-900">No orders placed yet</h3>
            <p className="mt-2 text-sm text-stone-600">Discover our collection and make your first order.</p>
            <Link to="/shop" className="mt-6 inline-block rounded-full bg-brand-primary px-6 py-3 text-sm font-semibold text-white hover:bg-brand-primary/90">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="mt-8 space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="overflow-hidden rounded-[20px] border border-stone-200 bg-white shadow-sm transition hover:shadow-md">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-stone-50 p-5 border-b border-stone-200">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-stone-950 text-base">Order #{order.id}</span>
                      {getStatusBadge(order.status)}
                    </div>
                    <p className="mt-1 text-xs text-stone-500">Placed on: {new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="text-xs text-stone-500">Total Amount</p>
                      <p className="text-lg font-semibold text-stone-950">₹{order.total?.toFixed(2)}</p>
                    </div>
                    <Link to={`/track-order?id=${order.id}`} className="rounded-full border border-stone-300 bg-white px-4 py-2 text-xs font-semibold text-stone-800 hover:border-brand-primary hover:text-brand-primary">
                      Track Order
                    </Link>
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  {order.items?.map((item) => (
                    <div key={item.id} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-lg bg-stone-100 flex items-center justify-center overflow-hidden border border-stone-200">
                          {item.product?.images?.[0] ? (
                            <img src={item.product.images[0]} alt={item.product.title} className="h-full w-full object-cover" />
                          ) : (
                            <FiPackage className="text-stone-400" />
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-stone-900">{item.product?.title || `Product #${item.productId}`}</p>
                          <p className="text-xs text-stone-500">Qty: {item.quantity} {item.selectedSize ? `• Size: ${item.selectedSize}` : ''}</p>
                        </div>
                      </div>
                      <p className="font-semibold text-stone-900">₹{(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-stone-50 px-5 py-3 border-t border-stone-100 flex flex-wrap justify-between text-xs text-stone-600">
                  <span>Shipping Address: {order.shippingAddress}</span>
                  <span>Payment: COD</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

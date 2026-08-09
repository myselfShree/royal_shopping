import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FiArrowLeft, FiHeart, FiMinus, FiPlus } from 'react-icons/fi'
import { useCart } from '../context/CartContext'
import api from '../services/api'

export default function ProductDetailPage() {
  const { id } = useParams()
  const { addToCart, addToWishlist } = useCart()
  const [product, setProduct] = useState(null)
  const [selectedColor, setSelectedColor] = useState('')
  const [selectedSize, setSelectedSize] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get(`/products/${id}`)
        setProduct(res.data)
      } catch (e) {
        setProduct(null)
      }
    }
    load()
  }, [id])

  useEffect(() => {
    if (product) {
      setSelectedColor((product.colors || [])[0])
      setSelectedSize((product.sizes || [])[0])
      setQuantity(1)
    }
  }, [product])

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center">
        <p className="text-lg font-semibold text-stone-900">Product not found.</p>
        <Link to="/shop" className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-brand-primary">
          <FiArrowLeft /> Back to shop
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <Link to="/shop" className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-stone-600 transition hover:text-brand-primary">
        <FiArrowLeft /> Back to collection
      </Link>

      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="overflow-hidden rounded-[28px] border border-stone-200 bg-white shadow-[0_20px_60px_-32px_rgba(17,17,17,0.35)]">
          <img src={(product.images && product.images[0]) || product.image || '/placeholder.png'} alt={product.title} className="h-[480px] w-full object-cover" />
        </div>

        <div className="rounded-[28px] border border-stone-200 bg-white p-8 shadow-[0_20px_60px_-32px_rgba(17,17,17,0.35)]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-brand-primary">
            {typeof product.category === 'object' ? (product.category?.name || '') : (product.category || '')}
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-stone-950">{product.title}</h1>
          <p className="mt-4 text-sm leading-7 text-stone-600">{product.description}</p>

          <div className="mt-6 flex items-end gap-4">
            <div>
              <p className="text-3xl font-semibold text-stone-950">₹{product.discountPrice}</p>
              <p className="text-sm text-stone-500 line-through">₹{product.price}</p>
            </div>
            <div className="rounded-full bg-brand-accent/10 px-3 py-1 text-sm font-semibold text-brand-primary">★ {product.rating}</div>
          </div>

          <div className="mt-8">
            <p className="text-sm font-semibold text-stone-800">Color</p>
            <div className="mt-3 flex flex-wrap gap-3">
              {(Array.isArray(product.colors) ? product.colors : []).map((color) => (
                <button key={color} onClick={() => setSelectedColor(color)} className={`rounded-full border px-4 py-2 text-sm font-medium transition ${selectedColor === color ? 'border-brand-primary bg-brand-primary text-white' : 'border-stone-200 text-stone-700'}`}>
                  {color}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <p className="text-sm font-semibold text-stone-800">Size</p>
            <div className="mt-3 flex flex-wrap gap-3">
              {(Array.isArray(product.sizes) ? product.sizes : []).map((size) => (
                <button key={size} onClick={() => setSelectedSize(size)} className={`rounded-full border px-4 py-2 text-sm font-medium transition ${selectedSize === size ? 'border-brand-primary bg-brand-primary text-white' : 'border-stone-200 text-stone-700'}`}>
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-3 rounded-full border border-stone-200 px-3 py-2">
              <button onClick={() => setQuantity((current) => Math.max(1, current - 1))} className="rounded-full p-1 text-stone-700 transition hover:bg-stone-100">
                <FiMinus size={15} />
              </button>
              <span className="min-w-6 text-center text-sm font-semibold text-stone-900">{quantity}</span>
              <button onClick={() => setQuantity((current) => current + 1)} className="rounded-full p-1 text-stone-700 transition hover:bg-stone-100">
                <FiPlus size={15} />
              </button>
            </div>

            <button onClick={() => addToCart({ ...product, selectedColor, selectedSize }, quantity)} className="rounded-full bg-stone-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-primary">
              Add to cart
            </button>

            <button onClick={() => { setIsWishlisted(true); addToWishlist(product) }} className={`flex items-center gap-2 rounded-full border px-4 py-3 text-sm font-medium transition ${isWishlisted ? 'border-brand-primary bg-brand-primary/10 text-brand-primary' : 'border-stone-200 text-stone-700'}`}>
              <FiHeart /> {isWishlisted ? 'Saved' : 'Save'}
            </button>
          </div>

          <div className="mt-8 rounded-[20px] border border-stone-200 bg-stone-50 p-4 text-sm text-stone-600">
            <p className="font-semibold text-stone-900">Why you’ll love it</p>
            <ul className="mt-3 space-y-2">
              <li>• Premium fabric with a refined drape.</li>
              <li>• Designed for elevated everyday dressing.</li>
              <li>• Easy to style with both casual and formal pieces.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

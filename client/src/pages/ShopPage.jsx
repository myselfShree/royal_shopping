import { useMemo, useState, useEffect } from 'react'
import { FiSearch } from 'react-icons/fi'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import api from '../services/api'

export default function ShopPage() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [selectedSubcategory, setSelectedSubcategory] = useState('All')
  const [selectedColor, setSelectedColor] = useState('All')
  const [selectedSize, setSelectedSize] = useState('All')
  const [sortBy, setSortBy] = useState('featured')
  const { addToCart } = useCart()
  const navigate = useNavigate()

  const [products, setProducts] = useState([])
  const categories = useMemo(
    () => ['All', ...new Set(products.map((p) => (p.category?.name || p.category)).filter(Boolean))],
    [products],
  )
  const subcategories = useMemo(
    () => ['All', ...new Set(products.map((p) => p.subcategory).filter(Boolean))],
    [products],
  )
  const colors = useMemo(
    () => ['All', ...new Set(products.flatMap((p) => p.colors || []))],
    [products],
  )
  const sizes = useMemo(
    () => ['All', ...new Set(products.flatMap((p) => p.sizes || []))],
    [products],
  )

  const filteredProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const matchesQuery = product.title.toLowerCase().includes(query.toLowerCase())
      const matchesCategory = category === 'All' || (product.category?.name || product.category) === category
      const matchesSubcategory = selectedSubcategory === 'All' || product.subcategory === selectedSubcategory
      const matchesColor = selectedColor === 'All' || (product.colors || []).includes(selectedColor)
      const matchesSize = selectedSize === 'All' || (product.sizes || []).includes(selectedSize)
      return matchesQuery && matchesCategory && matchesSubcategory && matchesColor && matchesSize
    })

    return [...filtered].sort((a, b) => {
      if (sortBy === 'price-asc') return a.discountPrice - b.discountPrice
      if (sortBy === 'price-desc') return b.discountPrice - a.discountPrice
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0)
      return Number(b.featured) - Number(a.featured)
    })
  }, [products, category, query, selectedColor, selectedSize, selectedSubcategory, sortBy])

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get('/products')
        setProducts(res.data.products || [])
      } catch (e) {
        // ignore
      }
    }
    load()
  }, [])

  const handleBuyNow = (product) => {
    addToCart(product, 1)
    navigate('/cart')
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-[24px] border border-stone-200 bg-white p-8 shadow-[0_20px_60px_-32px_rgba(17,17,17,0.35)]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-brand-primary">Shop</p>
            <h1 className="mt-2 text-3xl font-semibold text-stone-950">Discover the edit</h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-stone-600">Curated essentials with premium quality and effortless styling.</p>
          </div>
          <div className="flex w-full max-w-xl items-center gap-3 rounded-full border border-stone-200 px-4 py-3">
            <FiSearch className="text-stone-500" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search products" className="w-full border-none bg-transparent text-sm outline-none" />
          </div>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_1fr_1fr_1fr]">
          <div>
            <label className="mb-2 block text-sm font-medium text-stone-700">Category</label>
            <select value={category} onChange={(event) => setCategory(event.target.value)} className="w-full rounded-[12px] border border-stone-200 px-3 py-3 text-sm outline-none">
              {categories.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-stone-700">Color</label>
            <select value={selectedColor} onChange={(event) => setSelectedColor(event.target.value)} className="w-full rounded-[12px] border border-stone-200 px-3 py-3 text-sm outline-none">
              {colors.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-stone-700">Size</label>
            <select value={selectedSize} onChange={(event) => setSelectedSize(event.target.value)} className="w-full rounded-[12px] border border-stone-200 px-3 py-3 text-sm outline-none">
              {sizes.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-stone-700">Sort by</label>
            <select value={sortBy} onChange={(event) => setSortBy(event.target.value)} className="w-full rounded-[12px] border border-stone-200 px-3 py-3 text-sm outline-none">
              <option value="featured">Featured</option>
              <option value="price-asc">Price low to high</option>
              <option value="price-desc">Price high to low</option>
              <option value="rating">Top rated</option>
            </select>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {subcategories.map((item) => (
            <button key={item} onClick={() => setSelectedSubcategory(item)} className={`rounded-full px-3 py-2 text-sm font-medium transition ${selectedSubcategory === item ? 'bg-brand-primary text-white' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'}`}>
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredProducts.map((product) => (
          <article key={product.id} className="overflow-hidden rounded-[20px] border border-stone-200 bg-white shadow-[0_10px_30px_-24px_rgba(17,17,17,0.35)]">
            <img src={(product.images && product.images[0]) || '/placeholder.png'} alt={product.title} className="h-56 w-full object-cover" />
            <div className="p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-brand-primary">
                    {typeof product.category === 'object' ? (product.category?.name || '') : (product.category || '')}
                  </p>
                  <h2 className="mt-2 text-xl font-semibold text-stone-950">{product.title}</h2>
                </div>
                <div className="rounded-full bg-brand-accent/10 px-3 py-1 text-sm font-semibold text-brand-primary">★ {product.rating}</div>
              </div>
              <div className="mt-3 inline-flex rounded-full bg-stone-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-stone-600">
                {product.subcategory}
              </div>
              <p className="mt-4 text-sm leading-7 text-stone-600">{product.description}</p>
              <div className="mt-5 flex items-center justify-between gap-3">
                <div>
                  <p className="text-lg font-semibold text-stone-950">₹{product.discountPrice}</p>
                  <p className="text-sm text-stone-500 line-through">₹{product.price}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Link to={`/shop/${product.id}`} className="rounded-full border border-stone-200 px-3 py-2 text-sm font-medium text-stone-700 transition hover:border-brand-primary hover:text-brand-primary">
                    View
                  </Link>
                  <button onClick={() => handleBuyNow(product)} className="rounded-full bg-stone-950 px-3 py-2 text-sm font-medium text-white transition hover:bg-brand-primary">
                    Buy now
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

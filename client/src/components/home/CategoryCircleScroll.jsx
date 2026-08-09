import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../../services/api'

const fallbackCategories = [
  { id: 1, name: 'Kurti', imageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=300&auto=format&fit=crop&q=80' },
  { id: 2, name: 'Jackets', imageUrl: 'https://images.unsplash.com/photo-1544441893-675973e31985?w=300&auto=format&fit=crop&q=80' },
  { id: 3, name: 'Women’s Dresses', imageUrl: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&auto=format&fit=crop&q=80' },
  { id: 4, name: 'Shoes', imageUrl: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=300&auto=format&fit=crop&q=80' },
  { id: 5, name: 'Sweaters', imageUrl: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=300&auto=format&fit=crop&q=80' },
  { id: 6, name: 'Accessories', imageUrl: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=300&auto=format&fit=crop&q=80' },
  { id: 7, name: 'Kids Wear', imageUrl: 'https://images.unsplash.com/photo-1519238263530-99afd11df2ea?w=300&auto=format&fit=crop&q=80' },
  { id: 8, name: 'Decorative Items', imageUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=300&auto=format&fit=crop&q=80' },
]

export default function CategoryCircleScroll() {
  const navigate = useNavigate()
  const [categories, setCategories] = useState(fallbackCategories)

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const res = await api.get('/categories')
      if (Array.isArray(res.data) && res.data.length > 0) {
        setCategories(res.data)
      }
    } catch (err) {
      // fallback loaded
    }
  }

  return (
    <section className="py-6 border-b border-stone-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-stone-900 tracking-tight">Shop By Category</h2>
          <Link to="/shop" className="text-xs font-semibold text-brand-primary hover:underline">
            View All →
          </Link>
        </div>

        {/* Myntra Horizontal Circle Scroll */}
        <div className="no-scrollbar flex items-center gap-5 overflow-x-auto pb-2 scroll-smooth">
          {categories.map((cat) => (
            <button
              key={cat.id || cat.name}
              onClick={() => navigate(`/shop?category=${encodeURIComponent(cat.name)}`)}
              className="group flex flex-col items-center flex-shrink-0 cursor-pointer text-center outline-none focus:outline-none"
            >
              <div className="relative h-20 w-20 sm:h-24 sm:w-24 rounded-full p-1 border-2 border-transparent group-hover:border-brand-primary transition duration-300 shadow-sm overflow-hidden bg-stone-100">
                <img
                  src={cat.imageUrl}
                  alt={cat.name}
                  className="h-full w-full rounded-full object-cover transition duration-300 group-hover:scale-110"
                />
              </div>
              <span className="mt-2 text-xs font-medium text-stone-800 group-hover:text-brand-primary truncate max-w-[85px]">
                {cat.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

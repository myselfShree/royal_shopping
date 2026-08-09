import { useState } from 'react'
import { FiClock, FiUser, FiArrowRight } from 'react-icons/fi'

const articles = [
  {
    id: 1,
    category: 'Style Edit',
    title: 'The Art of Layering: Transitioning Your Wardrobe Across Seasons',
    snippet: 'Discover the secret to effortless year-round styling with structured blazers, silk knits, and tailored trousers.',
    content: `Layering is the cornerstone of a versatile wardrobe. By focusing on complementary textures—such as cashmere against structured linen—you can effortlessly adapt your favorite pieces for any climate.

Key Takeaways:
1. Start with lightweight base layers like silk camis or cotton knits.
2. Introduce mid-layer tailoring, such as lightweight blazers.
3. Finish with high-contrast accessories to tie the look together.`,
    author: 'Elena Vance',
    readTime: '4 min read',
    date: 'August 5, 2026',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 2,
    category: 'Craftsmanship',
    title: 'Behind the Seams: Sustainable Velvet & Artisan Weaving Techniques',
    snippet: 'Explore how our master weavers craft rich velvet fabrics using eco-conscious dyes and zero-waste patterns.',
    content: `At Royal Shopping, sustainability is not an afterthought—it is woven into every thread. Our artisan partners in Jaipur combine heritage handloom techniques with non-toxic, botanical dye processes.

Every garment is designed to last a lifetime rather than a single season.`,
    author: 'Marcus Sterling',
    readTime: '6 min read',
    date: 'July 28, 2026',
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 3,
    category: 'Home Decor',
    title: 'Curating Luxury Spaces: Minimalist Accessories for Elevated Living',
    snippet: 'Transform your home with sculptural ceramic vases, warm amber lighting, and handcrafted marble accents.',
    content: `Your living space should feel like a sanctuary. Introducing curated home accents—like handcrafted ceramic vessels or minimalist brass lighting—instantly brings warmth and quiet luxury to any room.`,
    author: 'Sophia Chen',
    readTime: '5 min read',
    date: 'July 15, 2026',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&auto=format&fit=crop&q=80',
  },
]

export default function BlogPage() {
  const [selectedArticle, setSelectedArticle] = useState(null)
  const [activeCategory, setActiveCategory] = useState('All')

  const categories = ['All', 'Style Edit', 'Craftsmanship', 'Home Decor']

  const filteredArticles = articles.filter(
    (item) => activeCategory === 'All' || item.category === activeCategory
  )

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="rounded-[24px] border border-stone-200 bg-white p-8 shadow-[0_20px_60px_-32px_rgba(17,17,17,0.35)] sm:p-12">
        <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-brand-primary">The Royal Journal</p>
        <h1 className="mt-3 text-4xl font-semibold text-stone-950 sm:text-5xl">Stories, Style & Craftsmanship</h1>
        <p className="mt-4 max-w-2xl text-base leading-8 text-stone-600">
          In-depth guides, trend edits, and behind-the-scenes glimpses into modern luxury design.
        </p>

        {/* Category Pills */}
        <div className="mt-8 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${activeCategory === cat ? 'bg-brand-primary text-white' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredArticles.map((article) => (
          <article key={article.id} className="group overflow-hidden rounded-[20px] border border-stone-200 bg-white shadow-sm transition hover:shadow-md">
            <div className="h-56 overflow-hidden">
              <img src={article.image} alt={article.title} className="h-full w-full object-cover transition duration-300 group-hover:scale-105" />
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between text-xs text-stone-500">
                <span className="font-semibold uppercase tracking-wider text-brand-primary">{article.category}</span>
                <span>{article.date}</span>
              </div>
              <h2 className="mt-3 text-xl font-semibold text-stone-950 group-hover:text-brand-primary transition">
                {article.title}
              </h2>
              <p className="mt-3 text-sm leading-6 text-stone-600">{article.snippet}</p>

              <div className="mt-6 flex items-center justify-between border-t border-stone-100 pt-4 text-xs text-stone-500">
                <span className="flex items-center gap-1"><FiUser /> {article.author}</span>
                <button
                  onClick={() => setSelectedArticle(article)}
                  className="flex items-center gap-1 font-semibold text-brand-primary hover:underline"
                >
                  Read article <FiArrowRight />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Article Modal */}
      {selectedArticle ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/60 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[24px] bg-white p-8 shadow-2xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-primary">{selectedArticle.category}</span>
              <button onClick={() => setSelectedArticle(null)} className="text-stone-400 hover:text-stone-900">✕</button>
            </div>
            <h2 className="mt-3 text-2xl font-semibold text-stone-950 sm:text-3xl">{selectedArticle.title}</h2>
            <div className="mt-3 flex items-center gap-4 text-xs text-stone-500">
              <span>By {selectedArticle.author}</span>
              <span>•</span>
              <span>{selectedArticle.date}</span>
              <span>•</span>
              <span className="flex items-center gap-1"><FiClock /> {selectedArticle.readTime}</span>
            </div>

            <img src={selectedArticle.image} alt={selectedArticle.title} className="mt-6 h-64 w-full rounded-[16px] object-cover" />

            <div className="mt-6 whitespace-pre-line text-sm leading-7 text-stone-700">
              {selectedArticle.content}
            </div>

            <div className="mt-8 pt-4 border-t border-stone-200 flex justify-end">
              <button onClick={() => setSelectedArticle(null)} className="rounded-full bg-stone-900 px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-primary">
                Close article
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

import HeroSection from '../components/home/HeroSection'
import CategoryCircleScroll from '../components/home/CategoryCircleScroll'
import SectionHeading from '../components/common/SectionHeading'
import CategoryCard from '../components/home/CategoryCard'
import ProductCard from '../components/home/ProductCard'
import PageSection from '../components/common/PageSection'

const categories = [
  { title: 'Women’s Dresses', subtitle: 'Modern silhouettes in soft structure.', imageClass: 'bg-[linear-gradient(135deg,#f5efe6_0%,#e6d8c5_100%)]' },
  { title: 'Jackets', subtitle: 'Refined layers for elevated dressing.', imageClass: 'bg-[linear-gradient(135deg,#f2eadf_0%,#d7c2a6_100%)]' },
  { title: 'Decorative Items', subtitle: 'Statement accents for the home.', imageClass: 'bg-[linear-gradient(135deg,#efe8df_0%,#cdb79b_100%)]' },
  { title: 'Kids Wear', subtitle: 'Playful essentials with calm comfort.', imageClass: 'bg-[linear-gradient(135deg,#f7f2e9_0%,#d8cdb8_100%)]' },
]

const products = [
  { name: 'Velvet Evening Dress', price: '₹4,999', tag: 'New in', accentClass: 'bg-[linear-gradient(135deg,#f5efe6_0%,#b8926a_100%)]' },
  { name: 'Luxe Tailored Jacket', price: '₹3,499', tag: 'Best seller', accentClass: 'bg-[linear-gradient(135deg,#efece6_0%,#8f7b63_100%)]' },
  { name: 'Signature Accent Lamp', price: '₹2,199', tag: 'Editor’s pick', accentClass: 'bg-[linear-gradient(135deg,#f5efe7_0%,#c8b59d_100%)]' },
]

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <CategoryCircleScroll />

      <PageSection>
        <SectionHeading
          eyebrow="Featured categories"
          title="Curated for the season"
          copy="A carefully edited selection of apparel and home accents with timeless appeal."
          actionLabel="Shop all"
        />
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard key={category.title} {...category} />
          ))}
        </div>
      </PageSection>

      <PageSection className="pt-0 pb-20">
        <SectionHeading
          eyebrow="Trending now"
          title="Popular picks this week"
          copy="Every piece chosen to feel polished, modern, and effortless."
          actionLabel="Explore shop"
        />
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.name} {...product} />
          ))}
        </div>
      </PageSection>
    </div>
  )
}

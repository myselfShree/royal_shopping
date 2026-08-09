import { Link } from 'react-router-dom'
import { FiAward, FiHeart, FiFeather } from 'react-icons/fi'

export default function OurStoryPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-[24px] border border-stone-200 bg-white p-8 shadow-[0_20px_60px_-32px_rgba(17,17,17,0.35)] sm:p-12">
        <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-brand-primary">Our Heritage</p>
        <h1 className="mt-3 text-4xl font-semibold text-stone-950 sm:text-5xl">Crafting Timeless Elegance</h1>
        <p className="mt-4 max-w-2xl text-base leading-8 text-stone-600">
          Founded on the principle that luxury lies in subtlety, Royal Shopping curates refined apparel and home accessories designed for modern living.
        </p>

        <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="space-y-4 text-sm leading-7 text-stone-700">
            <p>
              Every garment in our collection tells a story of craftsmanship. From hand-selected silk and velvet to custom-tailored blazers, we collaborate with master weavers and ethical ateliers across India and Europe.
            </p>
            <p>
              We believe in conscious luxury: small batch productions, sustainable fabrics, and timeless silhouettes that transcend fleeting trends.
            </p>
          </div>
          <div className="overflow-hidden rounded-[20px]">
            <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&auto=format&fit=crop&q=80" alt="Atelier Craftsmanship" className="h-72 w-full object-cover" />
          </div>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          <div className="rounded-[16px] border border-stone-200 bg-stone-50 p-6 text-center">
            <FiFeather size={32} className="mx-auto text-brand-primary" />
            <h3 className="mt-3 font-semibold text-stone-950 text-lg">Pure Fabrics</h3>
            <p className="mt-2 text-xs text-stone-600">100% natural wool, silk, and organic cottons.</p>
          </div>
          <div className="rounded-[16px] border border-stone-200 bg-stone-50 p-6 text-center">
            <FiHeart size={32} className="mx-auto text-brand-primary" />
            <h3 className="mt-3 font-semibold text-stone-950 text-lg">Ethical Production</h3>
            <p className="mt-2 text-xs text-stone-600">Fair wages and zero-waste pattern cutting.</p>
          </div>
          <div className="rounded-[16px] border border-stone-200 bg-stone-50 p-6 text-center">
            <FiAward size={32} className="mx-auto text-brand-primary" />
            <h3 className="mt-3 font-semibold text-stone-950 text-lg">Signature Finish</h3>
            <p className="mt-2 text-xs text-stone-600">Hand-finished hem lines and custom brass hardware.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

import { FiHeart, FiShoppingBag } from 'react-icons/fi'

export default function ProductCard({ name, price, tag, accentClass }) {
  return (
    <article className="group overflow-hidden rounded-[18px] border border-stone-200 bg-white shadow-[0_10px_30px_-24px_rgba(17,17,17,0.35)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_24px_60px_-30px_rgba(17,17,17,0.4)]">
      <div className={`relative h-60 ${accentClass}`}>
        <button className="absolute right-4 top-4 rounded-full border border-white/70 bg-white/90 p-2 text-stone-700 transition hover:-translate-y-0.5 hover:text-brand-primary" aria-label={`Save ${name}`}>
          <FiHeart size={16} />
        </button>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-brand-primary">{tag}</p>
            <h3 className="mt-2 text-lg font-semibold tracking-[-0.01em] text-stone-950">{name}</h3>
          </div>
          <span className="text-sm font-semibold text-stone-900">{price}</span>
        </div>
        <div className="mt-5 flex items-center justify-between">
          <span className="text-sm text-stone-500">Limited edition</span>
          <button className="inline-flex items-center gap-2 rounded-full border border-stone-200 px-3 py-2 text-sm font-medium text-stone-700 transition hover:-translate-y-0.5 hover:border-brand-primary hover:text-brand-primary">
            <FiShoppingBag size={14} /> Add
          </button>
        </div>
      </div>
    </article>
  )
}

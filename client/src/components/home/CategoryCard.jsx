export default function CategoryCard({ title, subtitle, imageClass }) {
  return (
    <article className="group overflow-hidden rounded-[18px] border border-stone-200 bg-white shadow-[0_10px_30px_-24px_rgba(17,17,17,0.35)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_24px_60px_-30px_rgba(17,17,17,0.4)]">
      <div className={`h-48 ${imageClass}`} />
      <div className="p-5">
        <h3 className="text-lg font-semibold tracking-[-0.01em] text-stone-950">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-stone-600">{subtitle}</p>
      </div>
    </article>
  )
}

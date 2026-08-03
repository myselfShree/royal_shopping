import { Link } from 'react-router-dom'

export default function SectionHeading({ eyebrow, title, copy, actionLabel, actionHref = '/shop' }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-brand-primary">{eyebrow}</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-[-0.02em] text-stone-950 sm:text-3xl">{title}</h2>
        {copy ? <p className="mt-3 text-sm leading-7 text-stone-600">{copy}</p> : null}
      </div>
      {actionLabel ? (
        <Link to={actionHref} className="text-sm font-semibold text-stone-700 transition hover:text-brand-primary">
          {actionLabel}
        </Link>
      ) : null}
    </div>
  )
}

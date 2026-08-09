import { Link } from 'react-router-dom'
import { FiRefreshCw, FiPackage, FiCheck, FiArrowRight } from 'react-icons/fi'

export default function ReturnsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-[24px] border border-stone-200 bg-white p-8 shadow-[0_20px_60px_-32px_rgba(17,17,17,0.35)] sm:p-12">
        <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-brand-primary">Hassle-Free Policy</p>
        <h1 className="mt-3 text-4xl font-semibold text-stone-950 sm:text-5xl">Returns & Exchange Policy</h1>
        <p className="mt-4 max-w-2xl text-base leading-8 text-stone-600">
          We want you to love everything you order from Royal Shopping. If a fit isn't right, enjoy our 7-day complimentary return policy.
        </p>

        {/* 3 Step Return Guide */}
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="rounded-[20px] border border-stone-200 bg-stone-50 p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-primary text-white font-semibold">1</div>
            <h3 className="mt-4 font-semibold text-stone-950 text-lg">Request Return</h3>
            <p className="mt-2 text-sm leading-6 text-stone-600">Contact support or submit a return request within 7 days of delivery.</p>
          </div>

          <div className="rounded-[20px] border border-stone-200 bg-stone-50 p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-primary text-white font-semibold">2</div>
            <h3 className="mt-4 font-semibold text-stone-950 text-lg">Doorstep Pickup</h3>
            <p className="mt-2 text-sm leading-6 text-stone-600">Our courier partner will pick up the item from your doorstep at zero cost.</p>
          </div>

          <div className="rounded-[20px] border border-stone-200 bg-stone-50 p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-primary text-white font-semibold">3</div>
            <h3 className="mt-4 font-semibold text-stone-950 text-lg">Instant Refund</h3>
            <p className="mt-2 text-sm leading-6 text-stone-600">Upon quality check, your refund will be processed back to your original payment method.</p>
          </div>
        </div>

        <div className="mt-12 rounded-[20px] bg-stone-950 p-8 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-semibold">Need to start a return now?</h3>
            <p className="mt-1 text-sm text-stone-300">Have your Order ID ready and reach out to our customer care team.</p>
          </div>
          <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-brand-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-primary/90">
            Contact Support <FiArrowRight />
          </Link>
        </div>
      </div>
    </div>
  )
}

import { FiFileText, FiDownload } from 'react-icons/fi'

const pressReleases = [
  { id: 1, outlet: 'Vogue India', title: 'Royal Shopping Unveils Autumn Luxe Collection with Sustainable Velvet', date: 'August 2026' },
  { id: 2, outlet: 'Harper’s Bazaar', title: 'The Rise of Quiet Luxury in E-Commerce', date: 'June 2026' },
  { id: 3, outlet: 'Architectural Digest', title: 'Curated Living: Minimalist Home Accents for Modern Spaces', date: 'May 2026' },
]

export default function PressPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-[24px] border border-stone-200 bg-white p-8 shadow-[0_20px_60px_-32px_rgba(17,17,17,0.35)] sm:p-12">
        <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-brand-primary">Media & News</p>
        <h1 className="mt-3 text-4xl font-semibold text-stone-950 sm:text-5xl">Press & Features</h1>
        <p className="mt-4 max-w-2xl text-base leading-8 text-stone-600">
          Discover latest press coverage, brand announcements, and download our official media kit.
        </p>

        <div className="mt-10 space-y-4">
          {pressReleases.map((item) => (
            <div key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-[16px] border border-stone-200 p-6">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-brand-primary">{item.outlet}</span>
                <h3 className="mt-1 text-lg font-semibold text-stone-900">{item.title}</h3>
                <p className="mt-1 text-xs text-stone-500">{item.date}</p>
              </div>
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-stone-900 hover:text-brand-primary">
                <FiFileText /> Read Article
              </span>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-[20px] bg-stone-50 p-8 border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-lg font-semibold text-stone-950">Press Enquiries & Media Kit</h3>
            <p className="mt-1 text-sm text-stone-600">For media requests or high-res brand assets, email press@royalshopping.com</p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-full bg-stone-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-primary">
            <FiDownload /> Download Brand Kit
          </button>
        </div>
      </div>
    </div>
  )
}

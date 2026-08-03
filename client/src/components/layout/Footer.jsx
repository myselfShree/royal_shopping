import { Link } from 'react-router-dom'
import { FiMail, FiPhone } from 'react-icons/fi'

const footerColumns = [
  {
    title: 'Customer Care',
    links: ['Help Center', 'Track Order', 'Returns & Refunds', 'Size Guide'],
  },
  {
    title: 'About Royal',
    links: ['Our Story', 'Careers', 'Press', 'Blog'],
  },
  {
    title: 'Follow Us',
    links: ['Instagram', 'Pinterest', 'YouTube'],
  },
]

export default function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-stone-950 text-stone-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.25fr_0.7fr_0.7fr_0.7fr] lg:px-8">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-brand-accent">Royal Shopping</p>
          <h3 className="mt-3 text-2xl font-semibold text-white">Luxury essentials for every occasion.</h3>
          <p className="mt-4 max-w-md text-sm leading-7 text-stone-400">
            Discover elegant fashion, curated home decor, and signature accessories crafted to elevate your everyday style.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <span className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-2">
              <FiPhone size={16} /> +91 98765 43210
            </span>
            <span className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-2">
              <FiMail size={16} /> hello@royalshopping.com
            </span>
          </div>
        </div>

        {footerColumns.map((column) => (
          <div key={column.title}>
            <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-white">{column.title}</h4>
            <ul className="mt-4 space-y-3 text-sm text-stone-400">
              {column.links.map((link) => (
                <li key={link}>
                  <Link to="/" className="transition hover:text-white">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10 px-4 py-6 text-center text-sm text-stone-500 sm:px-6 lg:px-8">
        © 2026 Royal Shopping. All rights reserved.
      </div>
    </footer>
  )
}

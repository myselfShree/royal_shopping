import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiMail, FiPhone, FiCheckCircle } from 'react-icons/fi'
import { FaInstagram, FaFacebook, FaTwitter, FaPinterest, FaWhatsapp } from 'react-icons/fa'
import { useSettings } from '../../context/SettingsContext'

export default function Footer() {
  const { settings } = useSettings()
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (!newsletterEmail.trim()) return
    setSubscribed(true)
    setTimeout(() => {
      setSubscribed(false)
      setNewsletterEmail('')
    }, 4000)
  }

  const cleanWhatsapp = (settings.whatsappNumber || '+919876543210').replace(/[^\d]/g, '')

  return (
    <footer className="border-t border-stone-200 bg-stone-950 text-stone-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.25fr_0.75fr_0.75fr_0.75fr] lg:px-8">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-brand-accent">
            {settings.siteName || 'Royal Shopping'}
          </p>
          <h3 className="mt-3 text-2xl font-semibold text-white">
            {settings.tagline || 'Luxury essentials for every occasion.'}
          </h3>
          <p className="mt-4 max-w-md text-sm leading-7 text-stone-400">
            Discover elegant fashion, curated home decor, and signature accessories crafted to elevate your everyday style.
          </p>

          {/* Newsletter Box */}
          <div className="mt-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-stone-300 mb-2">Subscribe for exclusive edits</p>
            {subscribed ? (
              <div className="flex items-center gap-2 rounded-full bg-green-900/40 border border-green-700/60 px-4 py-2.5 text-xs text-green-300">
                <FiCheckCircle size={16} /> Thank you for subscribing!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex max-w-md gap-2">
                <input
                  required
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs text-white placeholder-stone-500 outline-none focus:border-brand-primary"
                />
                <button type="submit" className="rounded-full bg-brand-primary px-4 py-2 text-xs font-semibold text-white transition hover:bg-brand-primary/90">
                  Subscribe
                </button>
              </form>
            )}
          </div>

          <div className="mt-6 flex flex-wrap gap-3 text-xs">
            <a href={`tel:${settings.contactPhone || '+919876543210'}`} className="flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-2 hover:bg-white/20 transition">
              <FiPhone size={14} /> {settings.contactPhone || '+91 98765 43210'}
            </a>
            <a href={`mailto:${settings.contactEmail || 'hello@royalshopping.com'}`} className="flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-2 hover:bg-white/20 transition">
              <FiMail size={14} /> {settings.contactEmail || 'hello@royalshopping.com'}
            </a>
          </div>
        </div>

        {/* Customer Care */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-white">Customer Care</h4>
          <ul className="mt-4 space-y-3 text-sm text-stone-400">
            <li><Link to="/help" className="transition hover:text-white">Help Center & FAQ</Link></li>
            <li><Link to="/track-order" className="transition hover:text-white">Track Order</Link></li>
            <li><Link to="/returns" className="transition hover:text-white">Returns & Refunds</Link></li>
            <li><Link to="/size-guide" className="transition hover:text-white">Size Guide</Link></li>
          </ul>
        </div>

        {/* About Royal */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-white">About Royal</h4>
          <ul className="mt-4 space-y-3 text-sm text-stone-400">
            <li><Link to="/our-story" className="transition hover:text-white">Our Story</Link></li>
            <li><Link to="/careers" className="transition hover:text-white">Careers</Link></li>
            <li><Link to="/press" className="transition hover:text-white">Press & Media</Link></li>
            <li><Link to="/blog" className="transition hover:text-white">The Royal Journal (Blog)</Link></li>
          </ul>
        </div>

        {/* Social Accounts */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-white">Follow & Connect</h4>
          <ul className="mt-4 space-y-3 text-sm text-stone-400">
            {settings.instagramUrl ? (
              <li>
                <a href={settings.instagramUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 transition hover:text-white">
                  <FaInstagram /> Instagram
                </a>
              </li>
            ) : (
              <li><a href="https://instagram.com" target="_blank" rel="noreferrer" className="flex items-center gap-2 transition hover:text-white"><FaInstagram /> Instagram</a></li>
            )}
            {settings.facebookUrl ? (
              <li>
                <a href={settings.facebookUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 transition hover:text-white">
                  <FaFacebook /> Facebook
                </a>
              </li>
            ) : (
              <li><a href="https://facebook.com" target="_blank" rel="noreferrer" className="flex items-center gap-2 transition hover:text-white"><FaFacebook /> Facebook</a></li>
            )}
            {settings.twitterUrl ? (
              <li>
                <a href={settings.twitterUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 transition hover:text-white">
                  <FaTwitter /> Twitter / X
                </a>
              </li>
            ) : (
              <li><a href="https://twitter.com" target="_blank" rel="noreferrer" className="flex items-center gap-2 transition hover:text-white"><FaTwitter /> Twitter</a></li>
            )}
            <li>
              <a href={`https://wa.me/${cleanWhatsapp}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-green-400 hover:text-green-300 transition font-medium">
                <FaWhatsapp /> WhatsApp Support
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-6 text-center text-sm text-stone-500 sm:px-6 lg:px-8">
        © 2026 {settings.siteName || 'Royal Shopping'}. All rights reserved.
      </div>
    </footer>
  )
}

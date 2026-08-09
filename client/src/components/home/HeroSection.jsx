import { motion } from 'framer-motion'
import { FiArrowRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { useSettings } from '../../context/SettingsContext'

export default function HeroSection() {
  const { settings } = useSettings()

  const heroTitle = settings.heroTitle || 'Discover elevated style with Royal Shopping.'
  const heroSubtitle = settings.heroSubtitle || 'Elevate your wardrobe with timeless dresses, statement jackets, and carefully selected home accents designed for modern luxury.'
  const heroCtaText = settings.heroCtaText || 'Shop now'
  const heroImageUrl = settings.heroImageUrl || 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&auto=format&fit=crop&q=80'

  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(212,175,55,0.18),_transparent_36%)] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <p className="mb-4 inline-flex rounded-full border border-brand-accent/30 bg-brand-accent/10 px-4 py-2 text-sm font-medium text-brand-primary">
            Premium fashion • Curated essentials • New season arrivals
          </p>
          <h1 className="text-4xl font-semibold leading-tight text-stone-950 sm:text-5xl lg:text-6xl">
            {heroTitle}
          </h1>
          <p className="mt-6 text-lg leading-8 text-stone-600">
            {heroSubtitle}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/shop" className="inline-flex items-center gap-2 rounded-full bg-brand-primary px-6 py-3 font-medium text-white transition hover:bg-brand-primary/90">
              {heroCtaText} <FiArrowRight />
            </Link>
            <Link to="/about" className="rounded-full border border-stone-300 px-6 py-3 font-medium text-stone-700 transition hover:border-brand-primary hover:text-brand-primary">
              Explore the story
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-[0_40px_80px_-30px_rgba(17,17,17,0.2)]"
        >
          <div className="relative h-96 w-full">
            <img src={heroImageUrl} alt="Hero Banner" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent p-8 flex flex-col justify-end text-white">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-accent">Featured edit</p>
              <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">Autumn Luxe Collection</h2>
              <p className="mt-2 text-sm text-stone-200">Rich tones, soft tailoring, and refined texture.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

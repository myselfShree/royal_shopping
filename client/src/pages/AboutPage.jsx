import { Link } from 'react-router-dom'
import PageSection from '../components/common/PageSection'
import SectionHeading from '../components/common/SectionHeading'

export default function AboutPage() {
  return (
    <div>
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="rounded-[28px] border border-stone-200 bg-white p-10 shadow-[0_20px_60px_-32px_rgba(17,17,17,0.35)] sm:p-12">
          <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-brand-primary">Our Story</p>
          <h1 className="mt-3 text-4xl font-semibold text-stone-950">About Royal Shopping</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-stone-600">
            Royal Shopping is a curated online marketplace dedicated to bringing timeless elegance and contemporary style to your home and wardrobe. 
            Since our inception, we've been committed to sourcing premium products that balance quality, design, and affordability.
          </p>
        </div>
      </div>

      <PageSection>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="rounded-[20px] border border-stone-200 bg-stone-50 p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-primary text-white">
              <span className="text-xl font-semibold">🎯</span>
            </div>
            <h2 className="mt-4 text-xl font-semibold text-stone-950">Our Mission</h2>
            <p className="mt-3 text-sm leading-6 text-stone-600">
              To provide an exceptional shopping experience by offering carefully curated, high-quality products that reflect modern elegance and timeless appeal.
            </p>
          </div>

          <div className="rounded-[20px] border border-stone-200 bg-stone-50 p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-primary text-white">
              <span className="text-xl font-semibold">✨</span>
            </div>
            <h2 className="mt-4 text-xl font-semibold text-stone-950">Our Values</h2>
            <p className="mt-3 text-sm leading-6 text-stone-600">
              Quality, integrity, and customer satisfaction drive everything we do. We believe in transparent practices and sustainable choices.
            </p>
          </div>

          <div className="rounded-[20px] border border-stone-200 bg-stone-50 p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-primary text-white">
              <span className="text-xl font-semibold">🌟</span>
            </div>
            <h2 className="mt-4 text-xl font-semibold text-stone-950">Our Promise</h2>
            <p className="mt-3 text-sm leading-6 text-stone-600">
              Every product is handpicked to ensure it meets our standards. We stand behind our selections with excellent customer service and support.
            </p>
          </div>
        </div>
      </PageSection>

      <PageSection className="bg-stone-50">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-semibold text-stone-950">Why Choose Royal Shopping?</h2>
            <ul className="mt-6 space-y-4">
              <li className="flex gap-3">
                <span className="text-brand-primary">✓</span>
                <div>
                  <p className="font-semibold text-stone-950">Curated Selection</p>
                  <p className="text-sm text-stone-600">Hand-picked products that reflect quality and style.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-brand-primary">✓</span>
                <div>
                  <p className="font-semibold text-stone-950">Secure Payments</p>
                  <p className="text-sm text-stone-600">Safe and encrypted payment processing for peace of mind.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-brand-primary">✓</span>
                <div>
                  <p className="font-semibold text-stone-950">Fast Delivery</p>
                  <p className="text-sm text-stone-600">Quick and reliable shipping to your doorstep.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-brand-primary">✓</span>
                <div>
                  <p className="font-semibold text-stone-950">Easy Returns</p>
                  <p className="text-sm text-stone-600">Hassle-free return policy for your satisfaction.</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="rounded-[28px] border border-stone-200 bg-gradient-to-br from-brand-primary/5 to-brand-accent/5 p-10">
            <h3 className="text-2xl font-semibold text-stone-950">Get in Touch</h3>
            <p className="mt-3 text-stone-600">Have questions about our products or services? We'd love to hear from you.</p>
            <Link to="/contact" className="mt-6 inline-flex rounded-full bg-brand-primary px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-brand-primary/90">
              Contact Us
            </Link>
          </div>
        </div>
      </PageSection>

      <PageSection>
        <SectionHeading
          eyebrow="Thank you"
          title="We appreciate your support"
          copy="Join thousands of customers who trust Royal Shopping for quality and style. Start exploring our collection today."
        />
        <div className="mt-8 text-center">
          <Link to="/shop" className="inline-flex rounded-full bg-stone-950 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-brand-primary">
            Continue Shopping
          </Link>
        </div>
      </PageSection>
    </div>
  )
}

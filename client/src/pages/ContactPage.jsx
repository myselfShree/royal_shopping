import { useState } from 'react'
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi'
import PageSection from '../components/common/PageSection'

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // For now, we'll just show a success message
      // In production, you'd send this to your backend
      console.log('Contact form submitted:', form)
      setSubmitted(true)
      setForm({ name: '', email: '', phone: '', subject: '', message: '' })
      setTimeout(() => setSubmitted(false), 5000)
    } catch (err) {
      setError('Unable to send message. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="rounded-[28px] border border-stone-200 bg-white p-10 shadow-[0_20px_60px_-32px_rgba(17,17,17,0.35)] sm:p-12">
          <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-brand-primary">Get in touch</p>
          <h1 className="mt-3 text-4xl font-semibold text-stone-950">Contact Us</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-600">
            We're here to help and answer any questions you might have. Reach out to us and we'll get back to you as soon as possible.
          </p>
        </div>
      </div>

      <PageSection>
        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-6">
            <div className="rounded-[20px] border border-stone-200 bg-stone-50 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-primary text-white">
                <FiPhone size={20} />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-stone-950">Phone</h3>
              <p className="mt-2 text-sm text-stone-600">+91 (800) 123-4567</p>
              <p className="text-sm text-stone-500">Monday to Friday, 9am to 6pm IST</p>
            </div>

            <div className="rounded-[20px] border border-stone-200 bg-stone-50 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-primary text-white">
                <FiMail size={20} />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-stone-950">Email</h3>
              <p className="mt-2 text-sm text-stone-600">support@royalshopping.com</p>
              <p className="text-sm text-stone-500">We'll respond within 24 hours</p>
            </div>

            <div className="rounded-[20px] border border-stone-200 bg-stone-50 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-primary text-white">
                <FiMapPin size={20} />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-stone-950">Location</h3>
              <p className="mt-2 text-sm text-stone-600">123 Shopping Street,</p>
              <p className="text-sm text-stone-600">New Delhi, India 110001</p>
            </div>
          </div>

          <div className="rounded-[24px] border border-stone-200 bg-white p-8 shadow-[0_20px_60px_-32px_rgba(17,17,17,0.35)]">
            <h2 className="text-2xl font-semibold text-stone-950">Send us a message</h2>

            {submitted && (
              <div className="mt-4 rounded-[12px] bg-green-50 border border-green-200 p-4">
                <p className="text-sm font-medium text-green-800">Thank you! We've received your message and will get back to you soon.</p>
              </div>
            )}

            {error && (
              <div className="mt-4 rounded-[12px] bg-red-50 border border-red-200 p-4">
                <p className="text-sm font-medium text-red-800">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Your full name"
                  className="w-full rounded-[12px] border border-stone-200 px-4 py-3 text-sm outline-none transition focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                    className="w-full rounded-[12px] border border-stone-200 px-4 py-3 text-sm outline-none transition focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Your phone number"
                    className="w-full rounded-[12px] border border-stone-200 px-4 py-3 text-sm outline-none transition focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  required
                  placeholder="What is this about?"
                  className="w-full rounded-[12px] border border-stone-200 px-4 py-3 text-sm outline-none transition focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  placeholder="Tell us more..."
                  rows="5"
                  className="w-full rounded-[12px] border border-stone-200 px-4 py-3 text-sm outline-none transition focus:border-brand-primary focus:ring-1 focus:ring-brand-primary resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-brand-primary px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-brand-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </PageSection>
    </div>
  )
}

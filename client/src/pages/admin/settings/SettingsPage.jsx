import { useState, useEffect } from 'react'
import { FiSave, FiRefreshCw, FiImage, FiGlobe, FiMessageSquare } from 'react-icons/fi'
import AdminLayout from '../../../layouts/AdminLayout'
import { useSettings } from '../../../context/SettingsContext'

export default function SettingsPage() {
  const { settings: globalSettings, updateSettingsState } = useSettings()
  const [form, setForm] = useState(globalSettings)
  const [activeTab, setActiveTab] = useState('brand')
  const [feedback, setFeedback] = useState({ message: '', type: 'success' })
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (globalSettings) {
      setForm(globalSettings)
    }
  }, [globalSettings])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setIsSaving(true)
    setFeedback({ message: '', type: '' })
    try {
      await updateSettingsState(form)
      setFeedback({ message: 'Brand & store settings updated live across website!', type: 'success' })
      setTimeout(() => setFeedback({ message: '', type: '' }), 4000)
    } catch (error) {
      setFeedback({ message: error.message || 'Failed to update settings', type: 'error' })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-brand-primary">Brand & Store Customization</p>
          <h1 className="mt-2 text-3xl font-semibold text-stone-950">Settings & Appearance</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-stone-600">
            Customize your brand logo, hero banner titles, WhatsApp number, and social media links.
          </p>
        </div>

        {feedback.message && (
          <div className={`rounded-[12px] border p-4 ${feedback.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'}`}>
            <p className="text-sm font-medium">{feedback.message}</p>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex border-b border-stone-200">
          <button
            type="button"
            onClick={() => setActiveTab('brand')}
            className={`flex items-center gap-2 border-b-2 px-6 py-3 text-sm font-semibold transition ${activeTab === 'brand' ? 'border-brand-primary text-brand-primary' : 'border-transparent text-stone-500 hover:text-stone-900'}`}
          >
            <FiGlobe size={16} /> Brand & Logo
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('banner')}
            className={`flex items-center gap-2 border-b-2 px-6 py-3 text-sm font-semibold transition ${activeTab === 'banner' ? 'border-brand-primary text-brand-primary' : 'border-transparent text-stone-500 hover:text-stone-900'}`}
          >
            <FiImage size={16} /> Hero Banner
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('social')}
            className={`flex items-center gap-2 border-b-2 px-6 py-3 text-sm font-semibold transition ${activeTab === 'social' ? 'border-brand-primary text-brand-primary' : 'border-transparent text-stone-500 hover:text-stone-900'}`}
          >
            <FiMessageSquare size={16} /> WhatsApp & Social Media
          </button>
        </div>

        <form onSubmit={handleSave} className="rounded-[20px] border border-stone-200 bg-white p-8 shadow-[0_20px_60px_-32px_rgba(17,17,17,0.35)]">
          {/* TAB 1: Brand & Logo */}
          {activeTab === 'brand' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-stone-950">Brand Identity</h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Store Name</label>
                  <input
                    type="text"
                    name="siteName"
                    value={form.siteName || ''}
                    onChange={handleChange}
                    className="w-full rounded-[12px] border border-stone-200 px-4 py-3 text-sm outline-none transition focus:border-brand-primary"
                    placeholder="e.g. Royal Shopping"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Brand Tagline</label>
                  <input
                    type="text"
                    name="tagline"
                    value={form.tagline || ''}
                    onChange={handleChange}
                    className="w-full rounded-[12px] border border-stone-200 px-4 py-3 text-sm outline-none transition focus:border-brand-primary"
                    placeholder="e.g. Luxury essentials for every occasion."
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-stone-700 mb-2">Brand Logo Image URL</label>
                  <input
                    type="text"
                    name="logoUrl"
                    value={form.logoUrl || ''}
                    onChange={handleChange}
                    className="w-full rounded-[12px] border border-stone-200 px-4 py-3 text-sm outline-none transition focus:border-brand-primary"
                    placeholder="https://example.com/logo.png (leave blank for text logo)"
                  />
                  {form.logoUrl ? (
                    <div className="mt-3 flex items-center gap-3">
                      <span className="text-xs text-stone-500">Preview:</span>
                      <img src={form.logoUrl} alt="Logo Preview" className="h-10 object-contain rounded border border-stone-200 bg-stone-50 p-1" />
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Hero Banner */}
          {activeTab === 'banner' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-stone-950">Homepage Hero Banner</h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-stone-700 mb-2">Banner Headline Title</label>
                  <input
                    type="text"
                    name="heroTitle"
                    value={form.heroTitle || ''}
                    onChange={handleChange}
                    className="w-full rounded-[12px] border border-stone-200 px-4 py-3 text-sm outline-none transition focus:border-brand-primary"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-stone-700 mb-2">Banner Subtitle</label>
                  <textarea
                    name="heroSubtitle"
                    value={form.heroSubtitle || ''}
                    onChange={handleChange}
                    rows="3"
                    className="w-full rounded-[12px] border border-stone-200 px-4 py-3 text-sm outline-none transition focus:border-brand-primary resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Background Banner Image URL</label>
                  <input
                    type="text"
                    name="heroImageUrl"
                    value={form.heroImageUrl || ''}
                    onChange={handleChange}
                    className="w-full rounded-[12px] border border-stone-200 px-4 py-3 text-sm outline-none transition focus:border-brand-primary"
                    placeholder="https://images.unsplash.com/..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">CTA Button Text</label>
                  <input
                    type="text"
                    name="heroCtaText"
                    value={form.heroCtaText || ''}
                    onChange={handleChange}
                    className="w-full rounded-[12px] border border-stone-200 px-4 py-3 text-sm outline-none transition focus:border-brand-primary"
                    placeholder="Shop now"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Social & WhatsApp */}
          {activeTab === 'social' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-stone-950">WhatsApp & Social Media Accounts</h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">WhatsApp Contact Number</label>
                  <input
                    type="text"
                    name="whatsappNumber"
                    value={form.whatsappNumber || ''}
                    onChange={handleChange}
                    className="w-full rounded-[12px] border border-stone-200 px-4 py-3 text-sm outline-none transition focus:border-brand-primary"
                    placeholder="+91 98765 43210"
                  />
                  <p className="mt-1 text-xs text-stone-500">Powers the floating WhatsApp button on all pages.</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Instagram URL</label>
                  <input
                    type="text"
                    name="instagramUrl"
                    value={form.instagramUrl || ''}
                    onChange={handleChange}
                    className="w-full rounded-[12px] border border-stone-200 px-4 py-3 text-sm outline-none transition focus:border-brand-primary"
                    placeholder="https://instagram.com/yourhandle"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Facebook URL</label>
                  <input
                    type="text"
                    name="facebookUrl"
                    value={form.facebookUrl || ''}
                    onChange={handleChange}
                    className="w-full rounded-[12px] border border-stone-200 px-4 py-3 text-sm outline-none transition focus:border-brand-primary"
                    placeholder="https://facebook.com/yourpage"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Twitter / X URL</label>
                  <input
                    type="text"
                    name="twitterUrl"
                    value={form.twitterUrl || ''}
                    onChange={handleChange}
                    className="w-full rounded-[12px] border border-stone-200 px-4 py-3 text-sm outline-none transition focus:border-brand-primary"
                    placeholder="https://twitter.com/yourhandle"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Support Email</label>
                  <input
                    type="email"
                    name="contactEmail"
                    value={form.contactEmail || ''}
                    onChange={handleChange}
                    className="w-full rounded-[12px] border border-stone-200 px-4 py-3 text-sm outline-none transition focus:border-brand-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Support Phone</label>
                  <input
                    type="tel"
                    name="contactPhone"
                    value={form.contactPhone || ''}
                    onChange={handleChange}
                    className="w-full rounded-[12px] border border-stone-200 px-4 py-3 text-sm outline-none transition focus:border-brand-primary"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-stone-700 mb-2">Store Address</label>
                  <textarea
                    name="contactAddress"
                    value={form.contactAddress || ''}
                    onChange={handleChange}
                    rows="2"
                    className="w-full rounded-[12px] border border-stone-200 px-4 py-3 text-sm outline-none transition focus:border-brand-primary resize-none"
                  />
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 border-t border-stone-200 pt-6 flex items-center gap-4">
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center gap-2 rounded-full bg-brand-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-primary/90 disabled:opacity-50"
            >
              <FiSave size={16} />
              {isSaving ? 'Saving Changes...' : 'Save Settings Live'}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  )
}

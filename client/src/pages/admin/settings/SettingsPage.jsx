import { useState } from 'react'
import { FiSave, FiRefreshCw } from 'react-icons/fi'
import AdminLayout from '../../../layouts/AdminLayout'

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    storeName: 'Royal Shopping',
    storeEmail: 'support@royalshopping.com',
    storePhone: '+91 (800) 123-4567',
    storeAddress: '123 Shopping Street, New Delhi, India 110001',
    currency: 'INR',
    shippingCost: '0',
    taxRate: '0',
    maintenanceMode: false,
  })

  const [feedback, setFeedback] = useState({ message: '', type: 'success' })
  const [isSaving, setIsSaving] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setSettings((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      // In a real app, you'd save to backend
      console.log('Settings saved:', settings)
      setFeedback({ message: 'Settings saved successfully', type: 'success' })
      setTimeout(() => setFeedback({ message: '', type: '' }), 3000)
    } catch (error) {
      setFeedback({ message: 'Failed to save settings', type: 'error' })
    } finally {
      setIsSaving(false)
    }
  }

  const handleReset = () => {
    setSettings({
      storeName: 'Royal Shopping',
      storeEmail: 'support@royalshopping.com',
      storePhone: '+91 (800) 123-4567',
      storeAddress: '123 Shopping Street, New Delhi, India 110001',
      currency: 'INR',
      shippingCost: '0',
      taxRate: '0',
      maintenanceMode: false,
    })
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-brand-primary">Configuration</p>
          <h1 className="mt-2 text-3xl font-semibold text-stone-950">Settings</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-stone-600">Manage store configuration, shipping, taxes, and general settings.</p>
        </div>

        {feedback.message && (
          <div className={`rounded-[12px] border p-4 ${feedback.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'}`}>
            <p className="text-sm font-medium">{feedback.message}</p>
          </div>
        )}

        <div className="rounded-[20px] border border-stone-200 bg-white p-8 shadow-[0_20px_60px_-32px_rgba(17,17,17,0.35)]">
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-stone-950">Store Information</h2>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Store Name</label>
                  <input
                    type="text"
                    name="storeName"
                    value={settings.storeName}
                    onChange={handleChange}
                    className="w-full rounded-[12px] border border-stone-200 px-4 py-3 text-sm outline-none transition focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Email</label>
                  <input
                    type="email"
                    name="storeEmail"
                    value={settings.storeEmail}
                    onChange={handleChange}
                    className="w-full rounded-[12px] border border-stone-200 px-4 py-3 text-sm outline-none transition focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    name="storePhone"
                    value={settings.storePhone}
                    onChange={handleChange}
                    className="w-full rounded-[12px] border border-stone-200 px-4 py-3 text-sm outline-none transition focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Currency</label>
                  <select
                    name="currency"
                    value={settings.currency}
                    onChange={handleChange}
                    className="w-full rounded-[12px] border border-stone-200 px-4 py-3 text-sm outline-none transition focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
                  >
                    <option value="INR">Indian Rupee (₹)</option>
                    <option value="USD">US Dollar ($)</option>
                    <option value="EUR">Euro (€)</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-stone-700 mb-2">Store Address</label>
                  <textarea
                    name="storeAddress"
                    value={settings.storeAddress}
                    onChange={handleChange}
                    rows="3"
                    className="w-full rounded-[12px] border border-stone-200 px-4 py-3 text-sm outline-none transition focus:border-brand-primary focus:ring-1 focus:ring-brand-primary resize-none"
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-stone-200 pt-6">
              <h2 className="text-xl font-semibold text-stone-950">Shipping & Taxes</h2>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Shipping Cost (₹)</label>
                  <input
                    type="number"
                    name="shippingCost"
                    value={settings.shippingCost}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    className="w-full rounded-[12px] border border-stone-200 px-4 py-3 text-sm outline-none transition focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Tax Rate (%)</label>
                  <input
                    type="number"
                    name="taxRate"
                    value={settings.taxRate}
                    onChange={handleChange}
                    min="0"
                    max="100"
                    step="0.01"
                    className="w-full rounded-[12px] border border-stone-200 px-4 py-3 text-sm outline-none transition focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-stone-200 pt-6">
              <h2 className="text-xl font-semibold text-stone-950">Store Status</h2>
              <div className="mt-6 flex items-center gap-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="maintenanceMode"
                    checked={settings.maintenanceMode}
                    onChange={handleChange}
                    className="w-4 h-4 rounded border-stone-300 text-brand-primary"
                  />
                  <span className="text-sm font-medium text-stone-700">Enable Maintenance Mode</span>
                </label>
                {settings.maintenanceMode && (
                  <p className="text-xs text-stone-500">Store will show "Coming Soon" to customers</p>
                )}
              </div>
            </div>

            <div className="border-t border-stone-200 pt-6 flex flex-wrap gap-3">
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="inline-flex items-center gap-2 rounded-full bg-brand-primary px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-brand-primary/90 disabled:opacity-50"
              >
                <FiSave size={16} />
                {isSaving ? 'Saving...' : 'Save Settings'}
              </button>
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-2 rounded-full border border-stone-200 px-6 py-3 text-sm font-semibold text-stone-700 transition hover:border-brand-primary hover:text-brand-primary"
              >
                <FiRefreshCw size={16} />
                Reset
              </button>
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-[16px] border border-stone-200 bg-white p-6">
            <h3 className="font-semibold text-stone-950">Database</h3>
            <p className="mt-2 text-sm text-stone-600">PostgreSQL connected</p>
            <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1">
              <span className="h-2 w-2 rounded-full bg-green-600"></span>
              <span className="text-xs font-medium text-green-700">Healthy</span>
            </div>
          </div>

          <div className="rounded-[16px] border border-stone-200 bg-white p-6">
            <h3 className="font-semibold text-stone-950">API Server</h3>
            <p className="mt-2 text-sm text-stone-600">Node.js/Express</p>
            <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1">
              <span className="h-2 w-2 rounded-full bg-green-600"></span>
              <span className="text-xs font-medium text-green-700">Running</span>
            </div>
          </div>

          <div className="rounded-[16px] border border-stone-200 bg-white p-6">
            <h3 className="font-semibold text-stone-950">Frontend</h3>
            <p className="mt-2 text-sm text-stone-600">React + Vite</p>
            <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1">
              <span className="h-2 w-2 rounded-full bg-green-600"></span>
              <span className="text-xs font-medium text-green-700">Active</span>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

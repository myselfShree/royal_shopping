import { createContext, useContext, useEffect, useState } from 'react'
import api from '../services/api'

const defaultSettings = {
  siteName: 'Royal Shopping',
  tagline: 'Luxury essentials for every occasion.',
  logoUrl: '',
  heroTitle: 'Discover elevated style with Royal Shopping.',
  heroSubtitle: 'Elevate your wardrobe with timeless dresses, statement jackets, and carefully selected home accents designed for modern luxury.',
  heroImageUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&auto=format&fit=crop&q=80',
  heroCtaText: 'Shop now',
  whatsappNumber: '+919876543210',
  instagramUrl: 'https://instagram.com/royalshopping',
  facebookUrl: 'https://facebook.com/royalshopping',
  twitterUrl: 'https://twitter.com/royalshopping',
  pinterestUrl: 'https://pinterest.com/royalshopping',
  contactEmail: 'hello@royalshopping.com',
  contactPhone: '+91 98765 43210',
  contactAddress: '123 Royal Boulevard, Suite 400, Mumbai, India',
}

const SettingsContext = createContext(defaultSettings)

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(defaultSettings)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.get('/settings')
        if (res.data) {
          setSettings((prev) => ({ ...prev, ...res.data }))
        }
      } catch (err) {
        // use defaults
      } finally {
        setLoading(false)
      }
    }
    fetchSettings()
  }, [])

  const updateSettingsState = async (newSettings) => {
    const res = await api.put('/settings', newSettings)
    if (res.data) {
      setSettings((prev) => ({ ...prev, ...res.data }))
    }
    return res.data
  }

  return (
    <SettingsContext.Provider value={{ settings, updateSettingsState, loading }}>
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings() {
  return useContext(SettingsContext)
}

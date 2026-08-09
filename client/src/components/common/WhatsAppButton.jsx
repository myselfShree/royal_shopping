import { useSettings } from '../../context/SettingsContext'
import { FaWhatsapp } from 'react-icons/fa'

export default function WhatsAppButton() {
  const { settings } = useSettings()
  const rawNumber = settings.whatsappNumber || '+919876543210'
  const cleanNumber = rawNumber.replace(/[^\d+]/g, '')
  const whatsappUrl = `https://wa.me/${cleanNumber.replace('+', '')}?text=${encodeURIComponent('Hello Royal Shopping! I have a query about your collection.')}`

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-full bg-[#25D366] px-4 py-3 text-white shadow-[0_10px_25px_-5px_rgba(37,211,102,0.5)] transition duration-300 hover:-translate-y-1 hover:bg-[#20bd5a] hover:shadow-[0_15px_30px_-5px_rgba(37,211,102,0.7)]"
    >
      <FaWhatsapp size={22} className="animate-bounce" />
      <span className="text-xs font-semibold tracking-wide">Chat with us</span>
    </a>
  )
}

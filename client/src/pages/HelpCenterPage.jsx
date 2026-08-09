import { useState } from 'react'
import { FiChevronDown, FiHelpCircle, FiTruck, FiRefreshCw, FiShield, FiPhone, FiMail } from 'react-icons/fi'

const faqs = [
  {
    category: 'Orders & Shipping',
    icon: FiTruck,
    items: [
      { q: 'How long does shipping take?', a: 'Standard shipping takes 3-5 business days across India. Express 2-day delivery is available at checkout.' },
      { q: 'Can I track my order live?', a: 'Yes! Visit our /track-order page and enter your Order ID or registered email to view real-time shipment status.' },
      { q: 'Do you offer Cash on Delivery (COD)?', a: 'Yes, COD is available for all domestic orders across India with zero additional fees.' },
    ],
  },
  {
    category: 'Returns & Refunds',
    icon: FiRefreshCw,
    items: [
      { q: 'What is your return policy?', a: 'We offer a 15-day hassle-free return and exchange policy on all unworn items with original tags intact.' },
      { q: 'How quickly are refunds processed?', a: 'Refunds are initiated within 48 hours of return quality check and credited back to your original payment method or bank account.' },
    ],
  },
  {
    category: 'Payment & Security',
    icon: FiShield,
    items: [
      { q: 'Which payment methods do you accept?', a: 'We accept Credit/Debit Cards, UPI (Google Pay, PhonePe, Paytm), Net Banking, and Cash on Delivery.' },
      { q: 'Is my payment information secure?', a: 'All transactions are encrypted with 256-bit SSL security through RBI-compliant payment gateways.' },
    ],
  },
]

export default function HelpCenterPage() {
  const [openIndex, setOpenIndex] = useState(null)

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-[24px] border border-stone-200 bg-white p-8 shadow-[0_20px_60px_-32px_rgba(17,17,17,0.35)] sm:p-12">
        <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-brand-primary">Support & FAQs</p>
        <h1 className="mt-3 text-4xl font-semibold text-stone-950 sm:text-5xl">How can we help you?</h1>
        <p className="mt-4 max-w-2xl text-base leading-8 text-stone-600">
          Find instant answers to questions about your orders, shipping, returns, sizing, and payment methods.
        </p>

        {/* Contact Quick Cards */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-[16px] border border-stone-200 bg-stone-50 p-6">
            <FiPhone size={24} className="text-brand-primary" />
            <h3 className="mt-3 font-semibold text-stone-900">Phone Support</h3>
            <p className="mt-1 text-xs text-stone-600">Mon-Sat, 9am - 7pm IST</p>
            <p className="mt-3 font-semibold text-stone-900 text-sm">+91 98765 43210</p>
          </div>

          <div className="rounded-[16px] border border-stone-200 bg-stone-50 p-6">
            <FiMail size={24} className="text-brand-primary" />
            <h3 className="mt-3 font-semibold text-stone-900">Email Us</h3>
            <p className="mt-1 text-xs text-stone-600">We respond within 24 hours</p>
            <p className="mt-3 font-semibold text-stone-900 text-sm">hello@royalshopping.com</p>
          </div>

          <div className="rounded-[16px] border border-stone-200 bg-stone-50 p-6 sm:col-span-2 lg:col-span-1">
            <FiHelpCircle size={24} className="text-brand-primary" />
            <h3 className="mt-3 font-semibold text-stone-900">WhatsApp Assistance</h3>
            <p className="mt-1 text-xs text-stone-600">Instant chat support</p>
            <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="mt-3 inline-block font-semibold text-brand-primary text-sm hover:underline">
              Start WhatsApp Chat →
            </a>
          </div>
        </div>
      </div>

      {/* FAQ Sections */}
      <div className="mt-12 space-y-8">
        {faqs.map((section, sIdx) => {
          const Icon = section.icon
          return (
            <div key={section.category} className="rounded-[20px] border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex items-center gap-3 border-b border-stone-100 pb-4">
                <Icon size={20} className="text-brand-primary" />
                <h2 className="text-xl font-semibold text-stone-950">{section.category}</h2>
              </div>

              <div className="mt-4 divide-y divide-stone-100">
                {section.items.map((item, iIdx) => {
                  const globalIdx = `${sIdx}-${iIdx}`
                  const isOpen = openIndex === globalIdx
                  return (
                    <div key={item.q} className="py-4">
                      <button
                        onClick={() => toggleAccordion(globalIdx)}
                        className="flex w-full items-center justify-between text-left font-medium text-stone-900 hover:text-brand-primary"
                      >
                        <span className="text-base">{item.q}</span>
                        <FiChevronDown size={18} className={`transition duration-200 ${isOpen ? 'rotate-180 text-brand-primary' : 'text-stone-400'}`} />
                      </button>
                      {isOpen ? (
                        <p className="mt-3 text-sm leading-7 text-stone-600">{item.a}</p>
                      ) : null}
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

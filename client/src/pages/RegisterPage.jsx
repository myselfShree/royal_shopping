import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiMail, FiLock, FiPhone, FiUser } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'

export default function RegisterPage() {
  const navigate = useNavigate()
  const { register } = useAuth()
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '' })
  const [error, setError] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    try {
      await register(form)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Unable to create your account right now.')
    }
  }

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-6xl items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
      <div className="w-full max-w-md rounded-[24px] border border-stone-200 bg-white p-8 shadow-[0_20px_60px_-32px_rgba(17,17,17,0.35)] sm:p-10">
        <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-brand-primary">Create account</p>
        <h1 className="mt-3 text-3xl font-semibold text-stone-950">Join Royal Shopping</h1>
        <p className="mt-3 text-sm leading-7 text-stone-600">Create your account to shop faster and save favorites.</p>

        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="mb-2 block text-sm font-medium text-stone-700" htmlFor="name">Full name</label>
            <div className="flex items-center gap-3 rounded-[12px] border border-stone-200 px-4 py-3 transition focus-within:border-brand-primary">
              <FiUser className="text-stone-400" />
              <input id="name" type="text" required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} className="w-full bg-transparent text-sm text-stone-900 placeholder:text-stone-400" placeholder="Your name" />
            </div>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-stone-700" htmlFor="email">Email</label>
            <div className="flex items-center gap-3 rounded-[12px] border border-stone-200 px-4 py-3 transition focus-within:border-brand-primary">
              <FiMail className="text-stone-400" />
              <input id="email" type="email" required value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} className="w-full bg-transparent text-sm text-stone-900 placeholder:text-stone-400" placeholder="you@example.com" />
            </div>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-stone-700" htmlFor="phone">Phone</label>
            <div className="flex items-center gap-3 rounded-[12px] border border-stone-200 px-4 py-3 transition focus-within:border-brand-primary">
              <FiPhone className="text-stone-400" />
              <input id="phone" type="tel" value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} className="w-full bg-transparent text-sm text-stone-900 placeholder:text-stone-400" placeholder="Phone number" />
            </div>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-stone-700" htmlFor="password">Password</label>
            <div className="flex items-center gap-3 rounded-[12px] border border-stone-200 px-4 py-3 transition focus-within:border-brand-primary">
              <FiLock className="text-stone-400" />
              <input id="password" type="password" required value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} className="w-full bg-transparent text-sm text-stone-900 placeholder:text-stone-400" placeholder="Create password" />
            </div>
          </div>
          {error ? <p className="text-sm text-brand-primary">{error}</p> : null}
          <button className="w-full rounded-full bg-brand-primary px-4 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-brand-primary/90">
            Create account
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-stone-600">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-brand-primary">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}

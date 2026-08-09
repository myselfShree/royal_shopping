import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function AdminLoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    try {
      const result = await login({ ...form, email: form.email.toLowerCase() })
      if (result.user.role === 'admin') {
        navigate('/admin')
      } else {
        setError('This account does not have admin privileges.')
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Unable to access the admin panel right now.')
    }
  }

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-4xl items-center justify-center px-4 py-16">
      <div className="w-full max-w-md rounded-[24px] border border-stone-200 bg-white p-8 shadow-[0_20px_60px_-32px_rgba(17,17,17,0.35)]">
        <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-brand-primary">Admin access</p>
        <h1 className="mt-3 text-3xl font-semibold text-stone-950">Sign in as admin</h1>
        <p className="mt-3 text-sm leading-7 text-stone-600">Sign in with your admin credentials to access the store dashboard.</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-stone-700">Email</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
              className="w-full rounded-[12px] border border-stone-200 px-4 py-3 text-sm outline-none transition focus:border-brand-primary"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-stone-700">Password</label>
            <input
              type="password"
              required
              value={form.password}
              onChange={(event) => setForm({ ...form, password: event.target.value })}
              className="w-full rounded-[12px] border border-stone-200 px-4 py-3 text-sm outline-none transition focus:border-brand-primary"
            />
          </div>
          {error ? <p className="text-sm text-brand-primary">{error}</p> : null}
          <button className="w-full rounded-full bg-brand-primary px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-primary/90">
            Enter admin panel
          </button>
        </form>
      </div>
    </div>
  )
}

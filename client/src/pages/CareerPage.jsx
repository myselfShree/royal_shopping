import { useState } from 'react'
import { FiBriefcase, FiMapPin, FiClock, FiCheckCircle } from 'react-icons/fi'

const positions = [
  { id: 1, title: 'Lead Fashion Designer', department: 'Design & Atelier', location: 'Mumbai, India', type: 'Full-time', experience: '5+ years' },
  { id: 2, title: 'E-Commerce Operations Specialist', department: 'Operations', location: 'New Delhi, India', type: 'Full-time', experience: '2+ years' },
  { id: 3, title: 'Senior Digital Marketing Manager', department: 'Marketing', location: 'Remote / Mumbai', type: 'Full-time', experience: '4+ years' },
  { id: 4, title: 'Senior Full-Stack Engineer', department: 'Engineering', location: 'Remote', type: 'Full-time', experience: '3+ years' },
]

export default function CareerPage() {
  const [selectedJob, setSelectedJob] = useState(null)
  const [applied, setApplied] = useState(false)
  const [applicantForm, setApplicantForm] = useState({ name: '', email: '', portfolio: '', notes: '' })

  const handleApplySubmit = (e) => {
    e.preventDefault()
    setApplied(true)
    setTimeout(() => {
      setApplied(false)
      setSelectedJob(null)
      setApplicantForm({ name: '', email: '', portfolio: '', notes: '' })
    }, 3000)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="rounded-[24px] border border-stone-200 bg-white p-8 shadow-[0_20px_60px_-32px_rgba(17,17,17,0.35)] sm:p-12">
        <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-brand-primary">Join Royal Shopping</p>
        <h1 className="mt-3 text-4xl font-semibold text-stone-950 sm:text-5xl">Build the future of luxury retail</h1>
        <p className="mt-4 max-w-2xl text-base leading-8 text-stone-600">
          We are a team of designers, creators, and technologists passionate about crafting modern luxury experiences. Explore our open roles below.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-[16px] border border-stone-200 bg-stone-50 p-5">
            <h3 className="font-semibold text-stone-900">Creative Freedom</h3>
            <p className="mt-2 text-xs text-stone-600">Encouraging fresh ideas and bold experimentation.</p>
          </div>
          <div className="rounded-[16px] border border-stone-200 bg-stone-50 p-5">
            <h3 className="font-semibold text-stone-900">Work-Life Balance</h3>
            <p className="mt-2 text-xs text-stone-600">Flexible hours, remote options, and paid time off.</p>
          </div>
          <div className="rounded-[16px] border border-stone-200 bg-stone-50 p-5">
            <h3 className="font-semibold text-stone-900">Growth & Learning</h3>
            <p className="mt-2 text-xs text-stone-600">Annual wellness stipend and learning budgets.</p>
          </div>
        </div>
      </div>

      {/* Open Positions List */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-stone-950">Open Positions</h2>
        <div className="mt-6 space-y-4">
          {positions.map((job) => (
            <div key={job.id} className="flex flex-col gap-4 rounded-[20px] border border-stone-200 bg-white p-6 shadow-sm transition hover:border-brand-primary sm:flex-row sm:items-center sm:justify-between">
              <div>
                <span className="inline-block rounded-full bg-brand-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-primary">
                  {job.department}
                </span>
                <h3 className="mt-2 text-xl font-semibold text-stone-900">{job.title}</h3>
                <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-stone-500">
                  <span className="flex items-center gap-1"><FiMapPin /> {job.location}</span>
                  <span className="flex items-center gap-1"><FiClock /> {job.type}</span>
                  <span className="flex items-center gap-1"><FiBriefcase /> {job.experience}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedJob(job)}
                className="inline-flex items-center justify-center rounded-full bg-stone-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-primary"
              >
                Apply now
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Apply Modal */}
      {selectedJob ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-[24px] bg-white p-8 shadow-2xl">
            {applied ? (
              <div className="py-8 text-center">
                <FiCheckCircle size={48} className="mx-auto text-green-600" />
                <h3 className="mt-4 text-2xl font-semibold text-stone-900">Application Submitted!</h3>
                <p className="mt-2 text-sm text-stone-600">Thank you for applying to {selectedJob.title}. Our HR team will get back to you shortly.</p>
              </div>
            ) : (
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-brand-primary">{selectedJob.department}</span>
                    <h3 className="mt-1 text-2xl font-semibold text-stone-950">Apply for {selectedJob.title}</h3>
                  </div>
                  <button onClick={() => setSelectedJob(null)} className="text-stone-400 hover:text-stone-900">✕</button>
                </div>

                <form onSubmit={handleApplySubmit} className="mt-6 space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-stone-700">Full Name</label>
                    <input
                      required
                      type="text"
                      value={applicantForm.name}
                      onChange={(e) => setApplicantForm({ ...applicantForm, name: e.target.value })}
                      className="mt-1 w-full rounded-[12px] border border-stone-200 px-4 py-2.5 text-sm outline-none focus:border-brand-primary"
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-stone-700">Email Address</label>
                    <input
                      required
                      type="email"
                      value={applicantForm.email}
                      onChange={(e) => setApplicantForm({ ...applicantForm, email: e.target.value })}
                      className="mt-1 w-full rounded-[12px] border border-stone-200 px-4 py-2.5 text-sm outline-none focus:border-brand-primary"
                      placeholder="jane@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-stone-700">LinkedIn / Portfolio Link</label>
                    <input
                      type="url"
                      value={applicantForm.portfolio}
                      onChange={(e) => setApplicantForm({ ...applicantForm, portfolio: e.target.value })}
                      className="mt-1 w-full rounded-[12px] border border-stone-200 px-4 py-2.5 text-sm outline-none focus:border-brand-primary"
                      placeholder="https://linkedin.com/in/username"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-stone-700">Cover Note</label>
                    <textarea
                      rows="3"
                      value={applicantForm.notes}
                      onChange={(e) => setApplicantForm({ ...applicantForm, notes: e.target.value })}
                      className="mt-1 w-full rounded-[12px] border border-stone-200 px-4 py-2.5 text-sm outline-none focus:border-brand-primary resize-none"
                      placeholder="Tell us briefly why you're a great fit..."
                    />
                  </div>

                  <div className="pt-4 flex gap-3">
                    <button type="submit" className="w-full rounded-full bg-brand-primary px-5 py-3 text-sm font-semibold text-white hover:bg-brand-primary/90">
                      Submit Application
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  )
}

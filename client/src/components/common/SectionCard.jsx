export default function SectionCard({ children, className = '' }) {
  return (
    <div className={`rounded-[24px] border border-stone-200 bg-white shadow-[0_20px_60px_-32px_rgba(17,17,17,0.35)] ${className}`.trim()}>
      {children}
    </div>
  )
}

export default function PageSection({ children, className = '' }) {
  return (
    <section className={`mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 ${className}`.trim()}>
      {children}
    </section>
  )
}

import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <span className="text-4xl">🔍</span>
      <h1 className="font-display text-3xl">Page not found</h1>
      <p className="text-sm text-cream/50">This page doesn't exist, or the link may be broken.</p>
      <Link to="/" className="text-rose">
        ← Back to Dearmine
      </Link>
    </div>
  )
}

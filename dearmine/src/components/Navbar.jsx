import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <header className="relative z-20">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
        <Link to="/" className="flex items-center gap-2 font-display text-lg text-cream">
          Dearmine <span className="text-rose">❤</span>
        </Link>
        <Link
          to="/my-surprises"
          className="text-sm text-cream/60 transition-colors hover:text-gold"
        >
          My surprises
        </Link>
      </nav>
    </header>
  )
}

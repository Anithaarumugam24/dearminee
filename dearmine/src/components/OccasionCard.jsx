import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function OccasionCard({ occasion, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.05, 0.4) }}
    >
      <Link
        to={`/create/${occasion.id}`}
        className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-ink-soft/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-transparent"
        style={{ '--card-accent': occasion.accent }}
      >
        <span
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(120px 120px at 20% 0%, ${occasion.accent}33, transparent)`,
          }}
        />
        <span
          className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ boxShadow: `inset 0 0 0 1.5px ${occasion.accent}88` }}
        />
        <div className="relative z-10">
          <span className="text-4xl leading-none">{occasion.emoji}</span>
          <h3 className="mt-4 font-display text-xl text-cream">{occasion.label}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-cream/60">{occasion.blurb}</p>
        </div>
        <div
          className="relative z-10 mt-6 inline-flex items-center gap-1.5 text-sm font-medium"
          style={{ color: occasion.accent }}
        >
          Create surprise
          <span className="transition-transform duration-300 group-hover:translate-x-1">›</span>
        </div>
      </Link>
    </motion.div>
  )
}

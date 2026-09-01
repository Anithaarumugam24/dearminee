import { motion } from 'framer-motion'

export default function PhotoGallery({ photos, className = '' }) {
  if (!photos?.length) return null
  return (
    <div className={`grid grid-cols-2 gap-3 sm:grid-cols-3 ${className}`}>
      {photos.map((src, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 16, rotate: i % 2 === 0 ? -2 : 2 }}
          whileInView={{ opacity: 1, y: 0, rotate: i % 2 === 0 ? -1.5 : 1.5 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: i * 0.08 }}
          whileHover={{ rotate: 0, scale: 1.03 }}
          className="aspect-[4/5] overflow-hidden rounded-2xl border shadow-lg"
          style={{ borderColor: 'color-mix(in srgb, var(--surprise-accent) 40%, transparent)' }}
        >
          <img src={src} alt="" className="h-full w-full object-cover" />
        </motion.div>
      ))}
    </div>
  )
}

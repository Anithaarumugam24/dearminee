import { useMemo } from 'react'
import { motion } from 'framer-motion'

export default function FloatingHearts({ count = 12 }) {
  const hearts = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 6,
        duration: 8 + Math.random() * 8,
        size: 10 + Math.random() * 18,
        opacity: 0.15 + Math.random() * 0.35,
      })),
    [count]
  )

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {hearts.map((h) => (
        <motion.span
          key={h.id}
          initial={{ y: '110%', opacity: 0 }}
          animate={{ y: '-20%', opacity: [0, h.opacity, h.opacity, 0] }}
          transition={{
            duration: h.duration,
            delay: h.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{ left: `${h.left}%`, fontSize: h.size, position: 'absolute' }}
          className="text-[var(--surprise-accent,#E8536F)]"
        >
          ❤
        </motion.span>
      ))}
    </div>
  )
}

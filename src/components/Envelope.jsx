import { useState } from 'react'
import { motion } from 'framer-motion'

export default function Envelope({ label = 'Tap to open', onOpen, children }) {
  const [open, setOpen] = useState(false)

  function handleOpen() {
    if (open) return
    setOpen(true)
    onOpen?.()
  }

  return (
    <div className="flex w-full flex-col items-center">
      {!open ? (
        <motion.button
          onClick={handleOpen}
          whileHover={{ y: -4 }}
          whileTap={{ scale: 0.97 }}
          className="group relative flex flex-col items-center gap-6"
          aria-label="Open envelope"
        >
          <div className="relative h-40 w-56 sm:h-48 sm:w-64">
            <div
              className="absolute inset-0 rounded-md shadow-2xl"
              style={{ background: 'color-mix(in srgb, var(--surprise-accent) 18%, #fff8f2)' }}
            />
            <svg viewBox="0 0 200 130" className="absolute inset-0 h-full w-full">
              <polygon points="0,0 100,70 200,0" fill="color-mix(in srgb, var(--surprise-accent) 55%, #fff)" />
              <polygon points="0,130 100,70 200,130" fill="color-mix(in srgb, var(--surprise-accent) 30%, #fff)" />
            </svg>
            <motion.span
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.6, repeat: Infinity }}
              className="absolute left-1/2 top-[58%] -translate-x-1/2 -translate-y-1/2 text-3xl"
            >
              💌
            </motion.span>
          </div>
          <p className="font-display text-xl">{label}</p>
        </motion.button>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-lg rounded-2xl border p-7 shadow-2xl sm:p-10"
          style={{
            background: 'color-mix(in srgb, var(--surprise-bg-2) 60%, #fff5ec 10%)',
            borderColor: 'color-mix(in srgb, var(--surprise-accent) 35%, transparent)',
          }}
        >
          {children}
        </motion.div>
      )}
    </div>
  )
}

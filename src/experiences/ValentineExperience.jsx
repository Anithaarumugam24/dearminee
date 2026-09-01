import { motion } from 'framer-motion'
import PhotoGallery from '@/components/PhotoGallery'

const ROSES = ['🌹', '🌹', '🌹', '🌹', '🌹']

export default function ValentineExperience({ data }) {
  return (
    <div className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center gap-8 px-6 py-16 text-center">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex gap-2 text-3xl"
      >
        {ROSES.map((r, i) => (
          <motion.span
            key={i}
            animate={{ rotate: [0, -6, 6, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.15 }}
          >
            {r}
          </motion.span>
        ))}
      </motion.div>

      <div>
        <p className="text-sm uppercase tracking-widest text-[var(--surprise-accent-2)]">
          Happy Valentine's Day
        </p>
        <h1 className="mt-3 font-display text-4xl sm:text-5xl">
          {data.recipientName || 'To you'}, will you be my valentine?
        </h1>
      </div>

      {data.photos?.length > 0 && <PhotoGallery photos={data.photos} className="mt-2 w-full" />}

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="max-w-md rounded-2xl border p-6"
        style={{ borderColor: 'color-mix(in srgb, var(--surprise-accent) 40%, transparent)' }}
      >
        <p className="whitespace-pre-line text-lg leading-relaxed opacity-90">
          {data.message || 'You are my favourite love story.'}
        </p>
        <p className="mt-3 text-sm italic opacity-60">— {data.senderName || 'Your valentine'}</p>
      </motion.div>
    </div>
  )
}

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import PhotoGallery from '@/components/PhotoGallery'
import { heartsBurst } from '@/utils/confetti'

export default function JustBecauseExperience({ data }) {
  const [revealed, setRevealed] = useState(false)

  return (
    <div className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center gap-8 px-6 py-16 text-center">
      <AnimatePresence mode="wait">
        {!revealed ? (
          <motion.button
            key="tap"
            onClick={() => {
              setRevealed(true)
              heartsBurst()
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-center gap-6"
          >
            <motion.span
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 1.4, repeat: Infinity }}
              className="text-7xl"
            >
              💖
            </motion.span>
            <p className="font-display text-2xl">Tap the heart</p>
          </motion.button>
        ) : (
          <motion.div
            key="message"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-5"
          >
            <h1 className="font-display text-4xl sm:text-5xl">
              {data.recipientName || 'You'}, you're special.
            </h1>
            <p className="max-w-md whitespace-pre-line text-lg leading-relaxed opacity-90">
              {data.message || "No reason, just wanted you to know you're on my mind."}
            </p>
            <p className="text-sm italic opacity-60">— {data.senderName || 'Someone who thinks so'}</p>
            {data.photos?.length > 0 && <PhotoGallery photos={data.photos} className="mt-4 w-full" />}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

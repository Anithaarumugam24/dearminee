import { useEffect } from 'react'
import { motion } from 'framer-motion'
import PhotoGallery from '@/components/PhotoGallery'
import Button from '@/components/Button'
import { burstConfetti, sideCannons } from '@/utils/confetti'

export default function CongratulationsExperience({ data }) {
  useEffect(() => {
    const t = setTimeout(() => burstConfetti({ particleCount: 120, spread: 90 }), 300)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center gap-8 px-6 py-16 text-center">
      <motion.span
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 220, damping: 12 }}
        className="text-6xl"
      >
        🎉
      </motion.span>
      <h1 className="font-display text-4xl sm:text-5xl">
        Congratulations, {data.recipientName || 'you'}!
      </h1>

      {data.photos?.length > 0 && <PhotoGallery photos={data.photos} className="w-full" />}

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-md rounded-2xl border p-6"
        style={{ borderColor: 'color-mix(in srgb, var(--surprise-accent) 40%, transparent)' }}
      >
        <p className="whitespace-pre-line text-lg leading-relaxed opacity-90">
          {data.message || "You did it! So proud of everything you've achieved."}
        </p>
        <p className="mt-3 text-sm italic opacity-60">— {data.senderName || 'Someone proud of you'}</p>
      </motion.div>

      <Button variant="gold" onClick={() => sideCannons()}>
        Celebrate again 🎊
      </Button>
    </div>
  )
}

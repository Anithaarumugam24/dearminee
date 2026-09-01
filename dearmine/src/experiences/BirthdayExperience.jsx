import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import PhotoGallery from '@/components/PhotoGallery'
import Button from '@/components/Button'
import { burstConfetti, sideCannons } from '@/utils/confetti'

const STAGES = ['gift', 'balloons', 'cake', 'photos', 'message']

export default function BirthdayExperience({ data }) {
  const [stage, setStage] = useState(0)
  const [candlesLit, setCandlesLit] = useState(true)

  const current = STAGES[stage]

  function next() {
    if (stage < STAGES.length - 1) setStage(stage + 1)
  }

  function blowCandles() {
    if (!candlesLit) return
    setCandlesLit(false)
    sideCannons()
    setTimeout(() => setStage(stage + 1), 900)
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-6 py-16 text-center">
      <AnimatePresence mode="wait">
        {current === 'gift' && (
          <motion.div
            key="gift"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85, y: -20 }}
            className="flex flex-col items-center gap-6"
          >
            <p className="text-sm uppercase tracking-widest text-[var(--surprise-accent-2)]">
              A surprise for {data.recipientName || 'you'}
            </p>
            <motion.button
              onClick={next}
              whileHover={{ y: -6, rotate: -2 }}
              whileTap={{ scale: 0.92 }}
              className="text-8xl"
              aria-label="Open gift"
            >
              🎁
            </motion.button>
            <p className="font-display text-2xl">Tap the gift to open it</p>
          </motion.div>
        )}

        {current === 'balloons' && (
          <motion.div
            key="balloons"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center gap-8"
          >
            <div className="relative flex h-40 items-end justify-center gap-4">
              {['🎈', '🎈', '🎈', '🎈', '🎈'].map((b, i) => (
                <motion.span
                  key={i}
                  className="text-6xl"
                  initial={{ y: 200, opacity: 0 }}
                  animate={{ y: [200, -10, 0], opacity: 1 }}
                  transition={{ delay: i * 0.12, duration: 0.9, ease: 'easeOut' }}
                  style={{
                    filter: `hue-rotate(${i * 40}deg)`,
                  }}
                >
                  {b}
                </motion.span>
              ))}
            </div>
            <h2 className="font-display text-3xl">Happy Birthday!</h2>
            <Button onClick={next}>See the cake 🎂</Button>
          </motion.div>
        )}

        {current === 'cake' && (
          <motion.div
            key="cake"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center gap-6"
          >
            <div className="relative text-8xl">
              🎂
              <AnimatePresence>
                {candlesLit && (
                  <motion.span
                    exit={{ opacity: 0, scale: 0 }}
                    className="absolute -top-3 left-1/2 -translate-x-1/2 text-3xl"
                  >
                    🕯️
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
            <p className="font-display text-2xl">
              {candlesLit ? 'Make a wish and blow the candles' : 'Yay! 🎉'}
            </p>
            {candlesLit && (
              <Button onClick={blowCandles} variant="gold">
                Blow the candles
              </Button>
            )}
          </motion.div>
        )}

        {current === 'photos' && (
          <motion.div
            key="photos"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex w-full flex-col items-center gap-6"
          >
            <h2 className="font-display text-2xl">Some of our favourite moments</h2>
            {data.photos?.length ? (
              <PhotoGallery photos={data.photos} className="w-full" />
            ) : (
              <p className="text-sm opacity-60">No photos added</p>
            )}
            <Button onClick={next} variant="gold">
              Continue
            </Button>
          </motion.div>
        )}

        {current === 'message' && (
          <motion.div
            key="message"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onAnimationComplete={() => burstConfetti()}
            className="flex flex-col items-center gap-4"
          >
            <span className="text-5xl">🎉</span>
            <h2 className="font-display text-3xl">
              Happy Birthday, {data.recipientName || 'love'}!
            </h2>
            <p className="max-w-md whitespace-pre-line text-lg leading-relaxed opacity-90">
              {data.message || 'Wishing you the most wonderful year ahead.'}
            </p>
            <p className="mt-2 text-sm italic opacity-60">— {data.senderName || 'Someone who loves you'}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

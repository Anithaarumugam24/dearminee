import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import PhotoGallery from '@/components/PhotoGallery'
import { heartsBurst, burstConfetti } from '@/utils/confetti'

const TAUNTS = [
  'Are you sure? 🥺',
  'Think again 😭',
  'Nice try 😂',
  "You can't catch me!",
  'Come on, say yes 🥹',
  'Really? 👀',
]

export default function ProposalExperience({ data }) {
  const [accepted, setAccepted] = useState(false)
  const [noPos, setNoPos] = useState(null)
  const [taunt, setTaunt] = useState('')
  const [attempts, setAttempts] = useState(0)
  const arenaRef = useRef(null)

  function dodge() {
    const arena = arenaRef.current
    if (!arena) return
    const bounds = arena.getBoundingClientRect()
    const maxX = Math.max(bounds.width - 140, 40)
    const maxY = Math.max(bounds.height - 60, 40)
    setNoPos({
      x: Math.random() * maxX - maxX / 2,
      y: Math.random() * maxY - maxY / 2,
    })
    setTaunt(TAUNTS[attempts % TAUNTS.length])
    setAttempts((a) => a + 1)
  }

  function acceptYes() {
    setAccepted(true)
    heartsBurst()
    setTimeout(() => burstConfetti({ spread: 100, particleCount: 140 }), 250)
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-6 py-16 text-center">
      <AnimatePresence mode="wait">
        {!accepted ? (
          <motion.div
            key="ask"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex w-full flex-col items-center gap-10"
          >
            <div>
              <p className="text-sm uppercase tracking-widest text-[var(--surprise-accent-2)]">
                {data.senderName || 'Someone'} asks {data.recipientName || 'you'}
              </p>
              <h1 className="mt-3 font-display text-4xl sm:text-5xl">Will you be mine? ❤️</h1>
            </div>

            <div ref={arenaRef} className="relative h-48 w-full max-w-sm">
              <motion.button
                onClick={acceptYes}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="absolute left-1/2 top-1/2 -translate-x-[calc(50%+70px)] -translate-y-1/2 rounded-full bg-[var(--surprise-accent)] px-8 py-3.5 font-semibold text-ink shadow-lg"
              >
                YES ❤️
              </motion.button>

              <motion.button
                animate={noPos ? { x: noPos.x, y: noPos.y } : {}}
                transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                onMouseEnter={dodge}
                onClick={dodge}
                onTouchStart={(e) => {
                  e.preventDefault()
                  dodge()
                }}
                className="absolute left-1/2 top-1/2 -translate-x-[calc(50%-70px)] -translate-y-1/2 rounded-full border border-white/25 bg-white/5 px-8 py-3.5 font-semibold"
              >
                NO 😏
              </motion.button>
            </div>

            <AnimatePresence>
              {taunt && (
                <motion.p
                  key={taunt + attempts}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-lg font-medium text-[var(--surprise-accent-2)]"
                >
                  {taunt}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            key="yes"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-5"
          >
            <span className="text-6xl">💖</span>
            <h2 className="font-display text-4xl">She/He said YES!</h2>
            <p className="max-w-md whitespace-pre-line text-lg leading-relaxed opacity-90">
              {data.message || 'Forever starts today. I love you.'}
            </p>
            <p className="text-sm italic opacity-60">— {data.senderName || 'Yours, always'}</p>
            {data.photos?.length > 0 && <PhotoGallery photos={data.photos} className="mt-6 w-full" />}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

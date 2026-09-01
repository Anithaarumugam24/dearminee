import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Button from './Button'

export default function ShareModal({ open, onClose, url, recipientName, occasionLabel }) {
  const [copied, setCopied] = useState(false)

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback: select-and-copy isn't available headlessly; surface manually.
      window.prompt('Copy this link:', url)
    }
  }

  const shareText = `I made a ${occasionLabel} surprise for ${recipientName || 'you'} on Dearmine ❤️`

  function whatsappShare() {
    const text = encodeURIComponent(`${shareText}\n${url}`)
    window.open(`https://wa.me/?text=${text}`, '_blank', 'noopener,noreferrer')
  }

  async function nativeShare() {
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Dearmine ❤️', text: shareText, url })
      } catch {
        /* user cancelled */
      }
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ type: 'spring', damping: 24, stiffness: 260 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-t-3xl border border-white/10 bg-ink-soft p-6 sm:rounded-3xl"
          >
            <h3 className="font-display text-2xl text-cream">Your surprise is ready 🎁</h3>
            <p className="mt-1 text-sm text-cream/60">Share this link with {recipientName || 'them'}.</p>

            <div className="mt-5 flex items-center gap-2 rounded-xl border border-white/10 bg-black/20 p-2 pl-4">
              <span className="flex-1 truncate text-sm text-cream/80">{url}</span>
              <Button variant="gold" onClick={copyLink} className="!px-4 !py-2 text-sm shrink-0">
                {copied ? 'Copied ✓' : 'Copy'}
              </Button>
            </div>

            <div className="mt-4 flex gap-3">
              <Button variant="primary" onClick={whatsappShare} className="flex-1">
                WhatsApp
              </Button>
              {typeof navigator !== 'undefined' && navigator.share && (
                <Button variant="subtle" onClick={nativeShare} className="flex-1">
                  Share…
                </Button>
              )}
            </div>

            <button
              onClick={onClose}
              className="mt-5 w-full text-center text-sm text-cream/40 hover:text-cream/70"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

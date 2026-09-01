import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { compressImage } from '@/utils/image'

const MAX_PHOTOS = 6

export default function PhotoUploader({ photos, onChange }) {
  const inputRef = useRef(null)
  const [error, setError] = useState('')

  async function handleFiles(fileList) {
    setError('')
    const files = Array.from(fileList).slice(0, MAX_PHOTOS - photos.length)
    try {
      const compressed = await Promise.all(files.map((f) => compressImage(f)))
      onChange([...photos, ...compressed])
    } catch {
      setError("Couldn't add that photo. Try a different image.")
    }
  }

  function removeAt(index) {
    onChange(photos.filter((_, i) => i !== index))
  }

  return (
    <div>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
        <AnimatePresence initial={false}>
          {photos.map((src, i) => (
            <motion.div
              key={src.slice(-24) + i}
              layout
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              className="group relative aspect-square overflow-hidden rounded-xl border border-white/10"
            >
              <img src={src} alt="" className="h-full w-full object-cover" />
              <button
                type="button"
                onClick={() => removeAt(i)}
                aria-label="Remove photo"
                className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-ink/80 text-xs text-cream opacity-0 transition-opacity group-hover:opacity-100"
              >
                ✕
              </button>
            </motion.div>
          ))}
        </AnimatePresence>

        {photos.length < MAX_PHOTOS && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="flex aspect-square flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-white/20 text-cream/50 transition-colors hover:border-gold hover:text-gold"
          >
            <span className="text-2xl leading-none">+</span>
            <span className="text-[11px]">Add photo</span>
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => e.target.files && handleFiles(e.target.files)}
      />
      {error && <p className="mt-2 text-xs text-rose">{error}</p>}
      <p className="mt-2 text-xs text-cream/40">Up to {MAX_PHOTOS} photos · auto-resized so your link stays shareable</p>
    </div>
  )
}

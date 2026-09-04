import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { uploadToCloudinary, cloudinaryConfigured } from '@/utils/cloudinary'

const MAX_PHOTOS = 6

export default function PhotoUploader({ photos, onChange }) {
  const inputRef = useRef(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleFiles(fileList) {
    setError('')

    if (!cloudinaryConfigured) {
      setError('Photo upload is not configured. Please try again later.')
      return
    }

    const files = Array.from(fileList).slice(
      0,
      MAX_PHOTOS - photos.length
    )

    if (!files.length) return

    const invalidFile = files.find(
      (file) => !file.type.startsWith('image/')
    )

    if (invalidFile) {
      setError('Please choose image files only.')
      return
    }

    setLoading(true)

    try {
      // Upload photos to Cloudinary
      const uploadedUrls = await Promise.all(
        files.map((file) => uploadToCloudinary(file))
      )

      // Save ONLY Cloudinary URLs
      onChange([...photos, ...uploadedUrls])
    } catch (error) {
      console.error('Photo upload error:', error)
      setError("Couldn't upload the photo. Please try again.")
    } finally {
      setLoading(false)
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
              key={src + i}
              layout
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              className="group relative aspect-square overflow-hidden rounded-xl border border-white/10"
            >
              <img
                src={src}
                alt=""
                className="h-full w-full object-cover"
              />

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
            disabled={loading}
            className="flex aspect-square flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-white/20 text-cream/50 transition-colors hover:border-gold hover:text-gold disabled:opacity-50"
          >
            <span className="text-2xl leading-none">
              {loading ? '…' : '+'}
            </span>

            <span className="text-[11px]">
              {loading ? 'Uploading' : 'Add photo'}
            </span>
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => {
          if (e.target.files) {
            handleFiles(e.target.files)
          }

          e.target.value = ''
        }}
      />

      {error && (
        <p className="mt-2 text-xs text-rose">
          {error}
        </p>
      )}

      <p className="mt-2 text-xs text-cream/40">
        Up to {MAX_PHOTOS} photos · uploaded securely so everyone can see them
      </p>
    </div>
  )
}
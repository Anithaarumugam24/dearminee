import { useRef, useState } from 'react'
import { uploadToCloudinary, cloudinaryConfigured } from '@/utils/cloudinary'

const MAX_AUDIO_MB = 10

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = () => reject(new Error('read-failed'))
    reader.readAsDataURL(file)
  })
}

export default function MusicUploader({ fileName, onChange }) {
  const inputRef = useRef(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleFile(file) {
    if (!file) return
    setError('')

    if (!file.type.startsWith('audio/')) {
      setError('Please choose an audio file.')
      return
    }
    if (file.size > MAX_AUDIO_MB * 1024 * 1024) {
      setError(`That song is too large. Please choose one under ${MAX_AUDIO_MB}MB.`)
      return
    }

    setLoading(true)
    try {
      if (cloudinaryConfigured) {
        const url = await uploadToCloudinary(file)
        onChange(url, file.name)
      } else {
        const dataUrl = await fileToDataUrl(file)
        onChange(dataUrl, file.name)
      }
    } catch {
      setError("Couldn't add that song. Please try a different file.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={loading}
        className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-cream/80 hover:border-gold hover:text-gold disabled:opacity-50"
      >
        {loading ? 'Adding song…' : fileName ? 'Change song' : '+ Add a song (optional)'}
      </button>
      {fileName && !loading && (
        <>
          <span className="max-w-[10rem] truncate text-xs text-cream/50">{fileName}</span>
          <button
            type="button"
            onClick={() => onChange('', '')}
            className="text-xs text-cream/40 hover:text-rose"
          >
            Remove
          </button>
        </>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="audio/*"
        className="hidden"
        onChange={(e) => {
          handleFile(e.target.files?.[0])
          e.target.value = ''
        }}
      />
      {error ? (
        <p className="w-full text-xs text-rose">{error}</p>
      ) : (
        <p className="w-full text-xs text-cream/40">
          Max {MAX_AUDIO_MB}MB
          {cloudinaryConfigured
            ? ' · will play for whoever opens the link'
            : ' · plays only on the device that created the surprise'}
        </p>
      )}
    </div>
  )
}

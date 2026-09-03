import { useEffect, useMemo, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import SurpriseShell from '@/components/SurpriseShell'
import ShareModal from '@/components/ShareModal'
import { getSurprise } from '@/utils/storage'
import { decodeSurpriseFromLink, encodeSurpriseForLink } from '@/utils/shareCode'
import { getOccasion } from '@/data/occasions'
import { getExperience } from '@/experiences'

export default function SurprisePage() {
  const { slug } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const [shareOpen, setShareOpen] = useState(false)

  const code = searchParams.get('d')

  const surprise = useMemo(() => {
    const fromLink = code ? decodeSurpriseFromLink(code) : null
    const fromDevice = getSurprise(slug)

    if (fromLink && fromDevice) {
      return { ...fromLink, ...fromDevice, slug }
    }
    if (fromLink) return { ...fromLink, slug }
    if (fromDevice) return fromDevice
    return null
  }, [code, slug])

  useEffect(() => {
    if (searchParams.get('new') === '1' && surprise) {
      setShareOpen(true)
      searchParams.delete('new')
      setSearchParams(searchParams, { replace: true })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [surprise])

  if (!surprise) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
        <span className="text-4xl">💔</span>
        <h1 className="font-display text-2xl">This surprise couldn't be found</h1>
        <p className="max-w-sm text-sm text-cream/50">
          The link may be broken or incomplete. Ask them to resend it, or create your own.
        </p>
        <Link to="/" className="text-rose">
          Create your own surprise →
        </Link>
      </div>
    )
  }

  const occasion = getOccasion(surprise.occasionId)
  const Experience = getExperience(surprise.occasionId)

   const shareCode = code || encodeSurpriseForLink(surprise).code
  const shareUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}${window.location.pathname}?d=${encodeURIComponent(shareCode)}`
      : ''

  return (
    <SurpriseShell themeId={surprise.theme} musicSrc={surprise.musicSrc} musicName={surprise.musicName}>
      <button
        onClick={() => setShareOpen(true)}
        className="fixed right-4 top-4 z-40 rounded-full border border-white/20 bg-black/30 px-4 py-2 text-xs font-medium backdrop-blur-md"
        style={{ color: 'var(--surprise-text)' }}
      >
        Share ↗
      </button>

      <Experience data={{ ...surprise, occasion: surprise.occasionId }} />

      <div className="pb-16 pt-4 text-center">
        <Link
          to="/"
          className="text-xs opacity-50 transition-opacity hover:opacity-90"
          style={{ color: 'var(--surprise-text)' }}
        >
          Made with Dearmine ❤ — create your own
        </Link>
      </div>

      <ShareModal
        open={shareOpen}
        onClose={() => setShareOpen(false)}
        url={shareUrl}
        recipientName={surprise.recipientName}
        occasionLabel={occasion?.label || 'surprise'}
      />
    </SurpriseShell>
  )
}

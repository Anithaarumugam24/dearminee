import Envelope from '@/components/Envelope'
import PhotoGallery from '@/components/PhotoGallery'
import { formatDate } from '@/utils/date'

export default function SorryExperience({ data }) {
  return (
    <div className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center gap-8 px-6 py-16 text-center">
      <p className="text-sm uppercase tracking-widest text-[var(--surprise-accent-2)]">
        For {data.recipientName || 'you'}
      </p>
      <Envelope label="Tap to open the letter">
        <p className="text-left font-display text-2xl">Dear {data.recipientName || 'you'},</p>
        <p className="mt-4 whitespace-pre-line text-left text-base leading-relaxed opacity-90">
          {data.message ||
            "I'm truly sorry. I know I hurt you, and that was never my intention. You mean so much to me, and I hope you can forgive me."}
        </p>
        <p className="mt-6 text-left text-sm italic opacity-60">
          — {data.senderName || 'Someone who cares'}
          {data.date && `, ${formatDate(data.date)}`}
        </p>
      </Envelope>
      {data.photos?.length > 0 && <PhotoGallery photos={data.photos} className="mt-4" />}
    </div>
  )
}

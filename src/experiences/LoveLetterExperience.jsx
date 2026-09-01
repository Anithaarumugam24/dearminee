import { useState } from 'react'
import Envelope from '@/components/Envelope'
import Typewriter from '@/components/Typewriter'
import PhotoGallery from '@/components/PhotoGallery'

export default function LoveLetterExperience({ data }) {
  const [opened, setOpened] = useState(false)

  return (
    <div className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center gap-8 px-6 py-16 text-center">
      <p className="text-sm uppercase tracking-widest text-[var(--surprise-accent-2)]">
        A love letter for {data.recipientName || 'you'}
      </p>
      <Envelope label="Tap to read" onOpen={() => setOpened(true)}>
        <p className="text-left font-display text-2xl">My dearest {data.recipientName || 'love'},</p>
        <div className="mt-4 text-left text-base leading-relaxed opacity-90">
          {opened && (
            <Typewriter
              text={
                data.message ||
                'Every moment with you feels like a page from my favourite story. I just wanted you to know how much you mean to me.'
              }
            />
          )}
        </div>
        <p className="mt-6 text-left text-sm italic opacity-60">— {data.senderName || 'Yours, always'}</p>
      </Envelope>
      {data.photos?.length > 0 && <PhotoGallery photos={data.photos} className="mt-4" />}
    </div>
  )
}

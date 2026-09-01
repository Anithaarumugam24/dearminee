import { motion } from 'framer-motion'
import PhotoGallery from '@/components/PhotoGallery'

export default function FriendshipExperience({ data }) {
  return (
    <div className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center gap-8 px-6 py-16 text-center">
      <motion.span
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200 }}
        className="text-6xl"
      >
        🤗
      </motion.span>
      <div>
        <p className="text-sm uppercase tracking-widest text-[var(--surprise-accent-2)]">
          For my favourite person
        </p>
        <h1 className="mt-3 font-display text-4xl sm:text-5xl">
          Hey {data.recipientName || 'friend'}!
        </h1>
      </div>

      {data.photos?.length > 0 && <PhotoGallery photos={data.photos} className="w-full" />}

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-md rounded-2xl border p-6"
        style={{ borderColor: 'color-mix(in srgb, var(--surprise-accent) 40%, transparent)' }}
      >
        <p className="whitespace-pre-line text-lg leading-relaxed opacity-90">
          {data.message || "Not everyone gets a friend like you. I'm lucky it's me."}
        </p>
        <p className="mt-3 text-sm italic opacity-60">— {data.senderName || 'Your friend'}</p>
      </motion.div>
    </div>
  )
}

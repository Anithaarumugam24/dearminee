import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import PhotoGallery from '@/components/PhotoGallery'
import { daysSince, formatDate, yearsAndDays } from '@/utils/date'

function CountUp({ target }) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    let frame
    const duration = 1200
    const start = performance.now()
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1)
      setValue(Math.round(progress * target))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [target])
  return <>{value.toLocaleString()}</>
}

export default function AnniversaryExperience({ data }) {
  const days = daysSince(data.date)
  const { years, rest } = yearsAndDays(days)

  const milestones = [
    { label: 'Where it began', detail: formatDate(data.date) || 'The day it all started' },
    ...(data.photos || []).map((src, i) => ({ label: `Memory ${i + 1}`, photo: src })),
    { label: 'Today', detail: `${days.toLocaleString()} days and counting` },
  ]

  return (
    <div className="mx-auto min-h-screen max-w-2xl px-6 py-16">
      <div className="flex flex-col items-center text-center">
        <p className="text-sm uppercase tracking-widest text-[var(--surprise-accent-2)]">
          {data.senderName || 'Us'} &amp; {data.recipientName || 'You'}
        </p>
        <h1 className="mt-3 font-display text-4xl sm:text-5xl">
          <CountUp target={days} /> days together
        </h1>
        <p className="mt-2 text-sm opacity-70">
          {years > 0 ? `That's ${years} year${years > 1 ? 's' : ''} and ${rest} days` : 'Every one of them worth it'}
        </p>
      </div>

      <div className="relative mx-auto mt-16 max-w-md">
        <div
          className="absolute left-4 top-0 h-full w-px sm:left-1/2"
          style={{ background: 'color-mix(in srgb, var(--surprise-accent) 45%, transparent)' }}
        />
        <div className="flex flex-col gap-10">
          {milestones.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5 }}
              className="relative pl-12 sm:pl-0 sm:even:text-right sm:even:pr-[52%] sm:odd:pl-[52%]"
            >
              <span
                className="absolute left-2.5 top-1 h-3 w-3 rounded-full sm:left-1/2 sm:-translate-x-1/2"
                style={{ background: 'var(--surprise-accent)' }}
              />
              <h3 className="font-display text-lg">{m.label}</h3>
              {m.detail && <p className="text-sm opacity-70">{m.detail}</p>}
              {m.photo && (
                <img
                  src={m.photo}
                  alt=""
                  className="mt-2 h-32 w-full rounded-xl object-cover sm:ml-auto sm:max-w-[220px]"
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mx-auto mt-16 max-w-md text-center"
      >
        <p className="whitespace-pre-line text-lg leading-relaxed opacity-90">
          {data.message || 'Here\u2019s to many more years together.'}
        </p>
        <p className="mt-3 text-sm italic opacity-60">— {data.senderName || 'Yours always'}</p>
      </motion.div>

      {data.photos?.length > 0 && (
        <PhotoGallery photos={data.photos} className="mx-auto mt-12 max-w-lg" />
      )}
    </div>
  )
}

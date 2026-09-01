import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Button from '@/components/Button'
import { listSurpriseSlugs, getSurprise, deleteSurprise } from '@/utils/storage'
import { getOccasion } from '@/data/occasions'

export default function MySurprises() {
  const [surprises, setSurprises] = useState([])

  function load() {
    const items = listSurpriseSlugs()
      .map((slug) => getSurprise(slug))
      .filter(Boolean)
    setSurprises(items)
  }

  useEffect(() => {
    load()
  }, [])

  function handleDelete(slug) {
    deleteSurprise(slug)
    load()
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-4xl px-5 pb-24 pt-6 sm:px-8">
        <h1 className="font-display text-3xl sm:text-4xl">Your surprises</h1>
        <p className="mt-2 text-sm text-cream/50">
          Saved on this device only. Clearing your browser data will remove them.
        </p>

        {surprises.length === 0 ? (
          <div className="mt-14 flex flex-col items-center gap-4 rounded-3xl border border-white/10 bg-white/5 py-16 text-center">
            <span className="text-4xl">💌</span>
            <p className="text-cream/60">You haven't created a surprise yet.</p>
            <Link to="/">
              <Button variant="gold">Create your first surprise</Button>
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {surprises.map((s, i) => {
              const occasion = getOccasion(s.occasionId)
              return (
                <motion.div
                  key={s.slug}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-ink-soft/60 p-5"
                >
                  <div className="min-w-0">
                    <p className="truncate font-display text-lg">
                      {occasion?.emoji} {s.recipientName || 'Untitled'}
                    </p>
                    <p className="text-xs text-cream/45">
                      {occasion?.label} · /{s.slug}
                    </p>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <Link
                      to={`/s/${s.slug}`}
                      className="rounded-full border border-white/15 px-3.5 py-1.5 text-xs text-cream/70 hover:border-gold hover:text-gold"
                    >
                      Open
                    </Link>
                    <button
                      onClick={() => handleDelete(s.slug)}
                      className="rounded-full border border-white/10 px-3.5 py-1.5 text-xs text-cream/40 hover:border-rose hover:text-rose"
                    >
                      Delete
                    </button>
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}

import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import OccasionCard from '@/components/OccasionCard'
import FloatingHearts from '@/components/FloatingHearts'
import { OCCASIONS } from '@/data/occasions'

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[560px]"
        style={{
          background:
            'radial-gradient(80% 60% at 50% 0%, rgba(232,83,111,0.16), transparent 70%)',
        }}
      />
      <FloatingHearts count={8} />

      <Navbar />

      <main className="relative z-10 mx-auto max-w-6xl px-5 pb-20 pt-10 sm:px-8 sm:pt-16">
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-cream/60">
            A little corner of the internet, made for two
          </span>
          <h1 className="mt-6 font-display text-5xl leading-[1.05] text-balance sm:text-6xl">
            Dearmine <span className="text-rose">❤</span>
          </h1>
          <p className="mt-5 text-lg text-cream/70 sm:text-xl">
            Turn your feelings into a beautiful memory.
          </p>
          <p className="mt-3 text-sm text-cream/45">
            Pick a moment below, add your own words and photos, and get a private link made just for them.
          </p>
        </motion.section>

        <section className="mt-16 grid grid-cols-1 gap-4 sm:mt-20 sm:grid-cols-2 lg:grid-cols-3">
          {OCCASIONS.map((occasion, i) => (
            <OccasionCard key={occasion.id} occasion={occasion} index={i} />
          ))}
        </section>
      </main>

      <Footer />
    </div>
  )
}

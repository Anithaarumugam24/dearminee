import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Button from '@/components/Button'
import ThemeSelector from '@/components/ThemeSelector'
import PhotoUploader from '@/components/PhotoUploader'
import MusicUploader from '@/components/MusicUploader'
import SurpriseShell from '@/components/SurpriseShell'
import { getOccasion, OCCASIONS } from '@/data/occasions'
import { getExperience } from '@/experiences'
import { generateSlug } from '@/utils/id'
import { saveSurprise, getDraft, saveDraft } from '@/utils/storage'
import { supabase } from '@/lib/supabase'

const EMPTY_FORM = {
  recipientName: '',
  senderName: '',
  message: '',
  date: '',
  photos: [],
  theme: 'romantic',
  musicSrc: '',
  musicName: '',
}

export default function CreateSurprise() {
  const { occasionId } = useParams()
  const navigate = useNavigate()
  const occasion = getOccasion(occasionId)

  const [form, setForm] = useState(EMPTY_FORM)
  const [mobileTab, setMobileTab] = useState('edit')

  useEffect(() => {
    const draft = getDraft()

    if (draft && draft.occasionId === occasionId) {
      setForm({ ...EMPTY_FORM, ...draft.form })
    } else {
      setForm(EMPTY_FORM)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [occasionId])

  useEffect(() => {
    saveDraft({ occasionId, form })
  }, [occasionId, form])

  const Experience = useMemo(
    () => getExperience(occasionId),
    [occasionId]
  )

  if (!occasion) {
    return (
      <div className="mx-auto max-w-md px-6 py-24 text-center">
        <p className="font-display text-2xl">
          We couldn't find that occasion.
        </p>

        <Link
          to="/"
          className="mt-4 inline-block text-rose"
        >
          ← Back home
        </Link>
      </div>
    )
  }

  function update(field, value) {
    setForm((f) => ({
      ...f,
      [field]: value,
    }))
  }

  async function handleCreate(e) {
    e.preventDefault()

    const slug = generateSlug()

    const surprise = {
      ...form,
      occasionId,
      slug,
      createdAt: Date.now(),
    }

    try {
      // Save locally so "My surprises" still works
      // on the creator's device.
      try {
        saveSurprise(slug, surprise)
      } catch {
        console.warn('Could not save surprise locally')
      }

      // Save the surprise to Supabase
      const { error } = await supabase
        .from('surprises')
        .insert({
          data: surprise,
        })

      if (error) {
        console.error('Supabase save error:', error)

        window.alert(
          'Could not save your surprise. Please try again.'
        )

        return
      }

      // Open the clean surprise URL
      navigate(`/s/${slug}?new=1`)
    } catch (error) {
      console.error('Create surprise error:', error)

      window.alert(
        'Something went wrong. Please try again.'
      )
    }
  }

  const previewData = {
    ...form,
    occasion: occasionId,
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="mx-auto max-w-6xl px-5 pb-24 sm:px-8">
        <div className="mb-8">
          <Link
            to="/"
            className="text-sm text-cream/50 hover:text-cream/80"
          >
            ← Choose a different occasion
          </Link>

          <div className="mt-3 flex items-center gap-3">
            <span className="text-3xl">
              {occasion.emoji}
            </span>

            <h1 className="font-display text-3xl sm:text-4xl">
              {occasion.label} surprise
            </h1>
          </div>
        </div>

        {/* Mobile tabs */}
        <div className="mb-5 flex gap-2 rounded-full border border-white/10 bg-white/5 p-1 lg:hidden">
          {['edit', 'preview'].map((tab) => (
            <button
              key={tab}
              onClick={() => setMobileTab(tab)}
              className={`flex-1 rounded-full py-2 text-sm font-medium capitalize transition-colors ${
                mobileTab === tab
                  ? 'bg-rose text-ink'
                  : 'text-cream/60'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1fr]">
          <motion.form
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleCreate}
            className={`${
              mobileTab === 'edit'
                ? 'block'
                : 'hidden'
            } space-y-6 lg:block`}
          >
            <Field label="Recipient's name">
              <input
                required
                value={form.recipientName}
                onChange={(e) =>
                  update(
                    'recipientName',
                    e.target.value
                  )
                }
                placeholder="e.g. Anitha"
                className="input"
              />
            </Field>

            <Field label="Your name">
              <input
                value={form.senderName}
                onChange={(e) =>
                  update(
                    'senderName',
                    e.target.value
                  )
                }
                placeholder="e.g. Vijay"
                className="input"
              />
            </Field>

            <Field label="Your message">
              <textarea
                rows={4}
                value={form.message}
                onChange={(e) =>
                  update(
                    'message',
                    e.target.value
                  )
                }
                placeholder={
                  occasion.messagePlaceholder
                }
                className="input resize-none"
              />
            </Field>

            <Field
              label={
                occasionId === 'anniversary'
                  ? 'Date it all began'
                  : 'Date (optional)'
              }
            >
              <input
                type="date"
                value={form.date}
                onChange={(e) =>
                  update(
                    'date',
                    e.target.value
                  )
                }
                className="input"
              />
            </Field>

            <Field label="Photos">
              <PhotoUploader
                photos={form.photos}
                onChange={(photos) =>
                  update('photos', photos)
                }
              />
            </Field>

            <Field label="Theme">
              <ThemeSelector
                value={form.theme}
                onChange={(theme) =>
                  update('theme', theme)
                }
              />
            </Field>

            <Field label="Music">
              <MusicUploader
                fileName={form.musicName}
                onChange={(src, name) =>
                  setForm((f) => ({
                    ...f,
                    musicSrc: src,
                    musicName: name,
                  }))
                }
              />
            </Field>

            <Button
              type="submit"
              className="w-full sm:w-auto"
            >
              Create surprise page ✨
            </Button>
          </motion.form>

          <div
            className={`${
              mobileTab === 'preview'
                ? 'block'
                : 'hidden'
            } lg:block`}
          >
            <div className="sticky top-6">
              <p className="mb-3 text-xs uppercase tracking-widest text-cream/40">
                Live preview
              </p>

              <div className="mx-auto h-[640px] max-w-sm overflow-y-auto rounded-[2rem] border border-white/15 shadow-2xl scrollbar-none">
                <SurpriseShell
                  themeId={form.theme}
                  musicSrc={form.musicSrc}
                  musicName={form.musicName}
                >
                  <Experience data={previewData} />
                </SurpriseShell>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <p className="mb-3 text-xs uppercase tracking-widest text-cream/40">
            Other occasions
          </p>

          <div className="flex flex-wrap gap-2">
            {OCCASIONS
              .filter((o) => o.id !== occasionId)
              .map((o) => (
                <Link
                  key={o.id}
                  to={`/create/${o.id}`}
                  className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-sm text-cream/60 hover:border-gold hover:text-gold"
                >
                  {o.emoji} {o.label}
                </Link>
              ))}
          </div>
        </div>
      </main>
    </div>
  )
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-cream/70">
        {label}
      </span>

      {children}
    </label>
  )
}
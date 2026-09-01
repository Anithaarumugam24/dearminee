import { getTheme } from '@/data/themes'
import FloatingHearts from './FloatingHearts'
import MusicPlayer from './MusicPlayer'

export default function SurpriseShell({ themeId, musicSrc, musicName, hearts = true, children }) {
  const theme = getTheme(themeId)

  return (
    <div
      className="grain relative min-h-screen overflow-hidden"
      style={{
        ...theme.vars,
        background: `radial-gradient(120% 90% at 50% -10%, var(--surprise-bg-2), var(--surprise-bg-1) 60%)`,
        color: 'var(--surprise-text)',
      }}
    >
      {hearts && <FloatingHearts />}
      <div className="relative z-10">{children}</div>
      {musicSrc && (
        <div className="fixed bottom-5 left-1/2 z-40 -translate-x-1/2">
          <MusicPlayer src={musicSrc} title={musicName || 'Their song'} />
        </div>
      )}
    </div>
  )
}

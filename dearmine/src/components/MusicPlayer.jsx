import { useEffect, useRef, useState } from 'react'

/**
 * Plays a user-supplied audio data URL. Never autoplays with sound —
 * playback only ever starts from an explicit tap on the play button.
 */
export default function MusicPlayer({ src, title = 'Their song', floating = false }) {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const onEnd = () => setPlaying(false)
    audio.addEventListener('ended', onEnd)
    return () => audio.removeEventListener('ended', onEnd)
  }, [])

  if (!src) return null

  function toggle() {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      audio.play().catch(() => {})
      setPlaying(true)
    }
  }

  function toggleMute() {
    const audio = audioRef.current
    if (!audio) return
    audio.muted = !audio.muted
    setMuted(audio.muted)
  }

  return (
    <div
      className={`flex items-center gap-3 rounded-full border border-white/15 bg-black/30 px-4 py-2.5 backdrop-blur-md ${
        floating ? 'fixed bottom-5 left-1/2 z-40 -translate-x-1/2' : ''
      }`}
    >
      <audio ref={audioRef} src={src} loop />
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? 'Pause music' : 'Play music'}
        className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--surprise-accent,#E8536F)] text-ink"
      >
        {playing ? '❚❚' : '▶'}
      </button>
      <span className="max-w-[9rem] truncate text-xs text-cream/70">{title}</span>
      <button
        type="button"
        onClick={toggleMute}
        aria-label={muted ? 'Unmute' : 'Mute'}
        className="text-cream/60 hover:text-cream"
      >
        {muted ? '🔇' : '🔊'}
      </button>
    </div>
  )
}

import { THEMES } from '@/data/themes'

export default function ThemeSelector({ value, onChange }) {
  return (
    <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
      {THEMES.map((theme) => {
        const active = value === theme.id
        return (
          <button
            type="button"
            key={theme.id}
            onClick={() => onChange(theme.id)}
            className={`group flex flex-col items-center gap-2 rounded-2xl border p-3 transition-all ${
              active ? 'border-gold bg-white/5' : 'border-white/10 hover:border-white/25'
            }`}
          >
            <span
              className="h-9 w-full rounded-lg"
              style={{
                background: `linear-gradient(135deg, ${theme.swatch[0]} 0%, ${theme.swatch[1]} 55%, ${theme.swatch[2]} 100%)`,
              }}
            />
            <span className={`text-xs font-medium ${active ? 'text-gold' : 'text-cream/70'}`}>
              {theme.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}

// Themes control the palette + background treatment of a surprise page.
// Each theme exposes CSS custom-property values so experience components
// can stay theme-agnostic and just read var(--surprise-*).
export const THEMES = [
  {
    id: 'romantic',
    label: 'Romantic',
    swatch: ['#3D1638', '#E8536F', '#F6EDE7'],
    vars: {
      '--surprise-bg-1': '#2C0E2A',
      '--surprise-bg-2': '#4A1942',
      '--surprise-accent': '#E8536F',
      '--surprise-accent-2': '#D8A657',
      '--surprise-text': '#FBEAE6',
    },
  },
  {
    id: 'cute',
    label: 'Cute',
    swatch: ['#FFD9E6', '#FF8FAE', '#5A2A3D'],
    vars: {
      '--surprise-bg-1': '#3A1826',
      '--surprise-bg-2': '#5A2A3D',
      '--surprise-accent': '#FF8FAE',
      '--surprise-accent-2': '#FFD9E6',
      '--surprise-text': '#FFF3F7',
    },
  },
  {
    id: 'rose',
    label: 'Rose',
    swatch: ['#420E17', '#D6335A', '#F7D9C4'],
    vars: {
      '--surprise-bg-1': '#2A0A10',
      '--surprise-bg-2': '#420E17',
      '--surprise-accent': '#D6335A',
      '--surprise-accent-2': '#F7D9C4',
      '--surprise-text': '#FBEAE6',
    },
  },
  {
    id: 'midnight',
    label: 'Midnight',
    swatch: ['#050810', '#3556B0', '#B9C4E8'],
    vars: {
      '--surprise-bg-1': '#04060C',
      '--surprise-bg-2': '#0E1730',
      '--surprise-accent': '#5C7FD6',
      '--surprise-accent-2': '#B9C4E8',
      '--surprise-text': '#E7EBFA',
    },
  },
  {
    id: 'elegant',
    label: 'Elegant',
    swatch: ['#14090F', '#D8A657', '#F6EDE7'],
    vars: {
      '--surprise-bg-1': '#100810',
      '--surprise-bg-2': '#1E1017',
      '--surprise-accent': '#D8A657',
      '--surprise-accent-2': '#EBCE9A',
      '--surprise-text': '#F6EDE7',
    },
  },
  {
    id: 'colorful',
    label: 'Colorful',
    swatch: ['#3A1848', '#FF7A59', '#FFD166'],
    vars: {
      '--surprise-bg-1': '#2B1240',
      '--surprise-bg-2': '#4B1F63',
      '--surprise-accent': '#FF7A59',
      '--surprise-accent-2': '#FFD166',
      '--surprise-text': '#FFF6EC',
    },
  },
  {
    id: 'dark-love',
    label: 'Dark Love',
    swatch: ['#0A0508', '#8C1F3B', '#6B6B78'],
    vars: {
      '--surprise-bg-1': '#070405',
      '--surprise-bg-2': '#1A0810',
      '--surprise-accent': '#8C1F3B',
      '--surprise-accent-2': '#8A8A99',
      '--surprise-text': '#EDE7EA',
    },
  },
]

export function getTheme(id) {
  return THEMES.find((t) => t.id === id) || THEMES[0]
}

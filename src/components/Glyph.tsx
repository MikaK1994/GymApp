import type { GlyphName } from '../types/types'

type GlyphProps = {
  name: GlyphName
  size?: number
}

function Glyph({ name, size = 18 }: GlyphProps) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true as const,
  }

  switch (name) {
    case 'home':
      return <svg {...common}><path d="m3 10 9-7 9 7M5 9v12h14V9M9 21v-7h6v7" /></svg>
    case 'search':
      return <svg {...common}><circle cx="11" cy="11" r="7" /><path d="m16 16 4 4" /></svg>
    case 'chart':
      return <svg {...common}><path d="M5 20v-7m7 7V4m7 16v-10" /></svg>
    case 'calendar':
      return <svg {...common}><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M7 3v4m10-4v4M3 10h18" /></svg>
    case 'dumbbell':
      return <svg {...common}><path d="M6.5 6.5v11m11-11v11M4 9v6m16-6v6M6.5 12h11M2.5 10v4m19-4v4" /></svg>
    case 'target':
      return <svg {...common}><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1" /></svg>
    case 'clock':
      return <svg {...common}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
    case 'sliders':
      return <svg {...common}><path d="M4 21v-7m0-4V3m8 18v-9m0-4V3m8 18v-5m0-4V3M2 14h4m4-6h4m4 4h4" /></svg>
    case 'bell':
      return <svg {...common}><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9m-8 12h4" /></svg>
    case 'close':
      return <svg {...common}><path d="m18 6-12 12M6 6l12 12" /></svg>
    case 'chevron':
      return <svg {...common}><path d="m9 18 6-6-6-6" /></svg>
    case 'share':
      return <svg {...common}><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><path d="m8.7 10.7 6.6-4.4m-6.6 7 6.6 4.1" /></svg>
    case 'plus':
      return <svg {...common}><path d="M12 5v14m-7-7h14" /></svg>
    case 'minus':
      return <svg {...common}><path d="M5 12h14" /></svg>
    case 'check':
      return <svg {...common}><path d="m5 12 4 4L19 6" /></svg>
    case 'trash':
      return <svg {...common}><path d="M3 6h18m-2 0-.8 14H5.8L5 6m4 0V4h6v2m-5 4v6m4-6v6" /></svg>
  }
}

export default Glyph
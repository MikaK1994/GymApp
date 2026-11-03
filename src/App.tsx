import { useState } from 'react'
import './App.css'

type Screen = 'home' | 'movements' | 'session' | 'summary'
type Filter = 'Kaikki' | 'Ylävartalo' | 'Alavartalo'
type GlyphName = 'home' | 'search' | 'chart' | 'calendar' | 'dumbbell' | 'target' | 'clock' | 'sliders' | 'bell' | 'close' | 'chevron' | 'share'

const movements = [
  { name: 'Pystypunnerrus', category: 'Ylävartalo', duration: '12 min', icon: 'dumbbell' as const },
  { name: 'Kyykky', category: 'Alavartalo', duration: '18 min', icon: 'dumbbell' as const },
  { name: '1RM-laskuri', category: '', duration: 'Punnerrus • Kyykky • Kulmasoutu', icon: 'target' as const },
  { name: 'Nopeusajastin', category: '', duration: '2 min / sarja', icon: 'clock' as const },
]

function Glyph({ name, size = 18 }: { name: GlyphName; size?: number }) {
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
  }
}

function App() {
  const [screen, setScreen] = useState<Screen>('home')
  const [filter, setFilter] = useState<Filter>('Kaikki')
  const [query, setQuery] = useState('')
  const [selectedMovement, setSelectedMovement] = useState('Pystypunnerrus')
  const [weight, setWeight] = useState(22.5)
  const [reps, setReps] = useState(8)
  const [savedSets, setSavedSets] = useState(0)

  const visibleMovements = movements.filter((movement) => {
    const matchesFilter = filter === 'Kaikki' || movement.category === filter
    return matchesFilter && movement.name.toLocaleLowerCase('fi').includes(query.toLocaleLowerCase('fi'))
  })

  function startWorkout() {
    setSavedSets(0)
    setWeight(22.5)
    setReps(8)
    setScreen('session')
  }

  function changeScreen(nextScreen: Screen) {
    setScreen(nextScreen)
    if (nextScreen === 'session') setSavedSets(0)
  }

  function formatWeight(value: number) {
    return `${Number.isInteger(value) ? value : value.toFixed(1).replace('.', ',')} kg`
  }

  return (
    <main className="app-shell">
      <div className={`page page--${screen}`}>
        {screen === 'home' && (
          <>
            <header className="page-header page-header--home">
              <div><p className="eyebrow">Tänään</p><h1>GymApp</h1></div>
              <button className="icon-button" aria-label="Ilmoitukset"><Glyph name="bell" /></button>
            </header>

            <button className="next-workout" onClick={startWorkout}>
              <span className="eyebrow">Seuraava treeni</span>
              <strong>Rintalihas</strong>
              <span className="muted">3 sarjaa&nbsp; • &nbsp;12 min</span>
            </button>

            <div className="stat-row stat-row--home">
              <div className="stat-tile"><span className="eyebrow">Paino</span><strong>22,5 kg</strong></div>
              <div className="stat-tile"><span className="eyebrow">Toistot</span><strong>8 / 12</strong></div>
            </div>

            <section className="recent-section">
              <div className="section-heading"><h2>Viimeaikaiset</h2><button className="text-button" onClick={() => changeScreen('summary')}>Kaikki</button></div>
              <button className="recent-item" onClick={startWorkout}>
                <span className="item-icon"><Glyph name="dumbbell" /></span>
                <span className="item-copy"><strong>Pystypunnerrus</strong><small>12 min&nbsp; • &nbsp;3 sarjaa</small></span>
                <strong className="item-value">22,5 kg</strong>
              </button>
              <button className="recent-item" onClick={() => { setSelectedMovement('Kyykky'); setScreen('session') }}>
                <span className="item-icon"><Glyph name="dumbbell" /></span>
                <span className="item-copy"><strong>Kyykky</strong><small>18 min&nbsp; • &nbsp;4 sarjaa</small></span>
                <strong className="item-value">60 kg</strong>
              </button>
            </section>

            <button className="button button--outline home-cta" onClick={() => changeScreen('movements')}>Valitse liikkeet</button>
          </>
        )}

        {screen === 'movements' && (
          <>
            <header className="page-header page-header--list">
              <div><p className="eyebrow">Valitse liike</p><h1>Liikkeet</h1></div>
              <button className="icon-button" aria-label="Suodata liikkeitä"><Glyph name="sliders" /></button>
            </header>

            <label className="search-box">
              <Glyph name="search" />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Hae liikettä" />
            </label>

            <div className="filter-row" role="group" aria-label="Liikeryhmä">
              {(['Kaikki', 'Ylävartalo', 'Alavartalo'] as const).map((option) => (
                <button key={option} className={`filter-chip${filter === option ? ' is-active' : ''}`} onClick={() => setFilter(option)}>{option}</button>
              ))}
            </div>

            <div className="movement-list">
              {visibleMovements.map((movement) => (
                <button key={movement.name} className={`movement-item${selectedMovement === movement.name ? ' is-selected' : ''}`} onClick={() => setSelectedMovement(movement.name)}>
                  <span className="item-icon"><Glyph name={movement.icon} /></span>
                  <span className="item-copy"><strong>{movement.name}</strong><small>{movement.category ? `${movement.category} • ${movement.duration}` : movement.duration}</small></span>
                  <Glyph name="chevron" />
                </button>
              ))}
              {visibleMovements.length === 0 && <p className="empty-state">Liikkeitä ei löytynyt.</p>}
            </div>

            <button className="button button--filled list-cta" onClick={startWorkout}>Aloita treeni</button>
          </>
        )}

        {screen === 'session' && (
          <>
            <header className="page-header page-header--session">
              <div><p className="eyebrow">Kirjaus</p><h1>{selectedMovement}</h1></div>
              <button className="icon-button" aria-label="Sulje treeni" onClick={() => changeScreen('home')}><Glyph name="close" /></button>
            </header>

            <div className="session-stats">
              <div className="session-card"><span className="eyebrow">Paino</span><strong className="session-number">{formatWeight(weight)}</strong><small>1RM-arvio 85 kg</small></div>
              <div className="session-card"><span className="eyebrow">Toistot</span><strong className="session-number">{reps} / 12</strong><small>Tavoite 12 toistoa</small></div>
            </div>

            <div className="session-actions">
              <button className="button button--filled" onClick={() => setWeight((value) => Math.max(0, value - 2.5))}>Vähennä 2,5 kg</button>
              <button className="button button--filled" onClick={() => setWeight((value) => value + 2.5)}>Lisää 2,5 kg</button>
              <button className="button button--filled" onClick={() => setReps((value) => value + 1)}>Lisää toisto</button>
              <button className="button button--primary" onClick={() => setSavedSets((value) => value + 1)}>Tallenna sarja{savedSets > 0 ? ` (${savedSets})` : ''}</button>
              <button className="button button--outline" onClick={() => changeScreen('summary')}>Lopeta treeni</button>
            </div>
          </>
        )}

        {screen === 'summary' && (
          <>
            <header className="page-header page-header--summary">
              <div><p className="eyebrow">Valmis</p><h1>Yhteenveto</h1></div>
              <button className="icon-button" aria-label="Jaa yhteenveto"><Glyph name="share" /></button>
            </header>

            <div className="summary-workout"><span className="eyebrow">Tänään</span><strong>Rintalihas</strong><span className="muted">3 sarjaa&nbsp; • &nbsp;12 min&nbsp; • &nbsp;22,5 kg</span></div>

            <div className="summary-stats">
              <div className="stat-tile"><span className="eyebrow">Paino</span><strong>22,5 kg</strong></div>
              <div className="stat-tile"><span className="eyebrow">Toistot</span><strong>8 / 12</strong></div>
              <div className="stat-tile"><span className="eyebrow">Kesto</span><strong>12 min</strong></div>
              <div className="stat-tile"><span className="eyebrow">1RM</span><strong>85 kg</strong></div>
            </div>

            <section className="summary-history">
              <div className="section-heading"><h2>Viimeiset tulokset</h2><button className="text-button" onClick={() => changeScreen('movements')}>Kaikki</button></div>
              <div className="history-item"><span className="item-icon"><Glyph name="calendar" /></span><span className="item-copy"><strong>12.3.</strong><small>22,5 kg • 8 / 12</small></span><strong className="item-value">85 kg</strong></div>
              <div className="history-item"><span className="item-icon"><Glyph name="calendar" /></span><span className="item-copy"><strong>5.3.</strong><small>20 kg • 10 / 12</small></span><strong className="item-value">78 kg</strong></div>
            </section>

            <div className="summary-actions">
              <button className="button button--primary" onClick={() => changeScreen('home')}>Tallenna treeni</button>
              <button className="button button--outline" onClick={() => { setSelectedMovement('Pystypunnerrus'); setWeight(22.5); setReps(8); startWorkout() }}>Uusi treeni</button>
            </div>
          </>
        )}
      </div>

      <nav className="bottom-nav" aria-label="Päänavigaatio">
        <button className={screen === 'home' ? 'is-active' : ''} onClick={() => changeScreen('home')}><Glyph name="home" /><span>Etusivu</span></button>
        <button className={screen === 'movements' ? 'is-active' : ''} onClick={() => changeScreen('movements')}><Glyph name="search" /><span>Liikkeet</span></button>
        <button className={screen === 'session' || screen === 'summary' ? 'is-active' : ''} onClick={() => changeScreen('summary')}><Glyph name="chart" /><span>Kehitys</span></button>
        <button onClick={() => changeScreen('movements')}><Glyph name="calendar" /><span>Suunnitelma</span></button>
      </nav>
    </main>
  )
}

export default App



import Glyph from '../components/Glyph'

type HomeScreenProps = {
  onStartWorkout: () => void
  onStartMovement: (movementName: string) => void
  onShowSummary: () => void
  onOpenMovements: () => void
}

function HomeScreen({ onStartWorkout, onStartMovement, onShowSummary, onOpenMovements }: HomeScreenProps) {
  return (
    <>
      <header className="page-header page-header--home">
        <div><p className="eyebrow">Tänään</p><h1>GymApp</h1></div>
        <button className="icon-button" aria-label="Ilmoitukset"><Glyph name="bell" /></button>
      </header>

      <button className="next-workout" onClick={onStartWorkout}>
        <span className="eyebrow">Seuraava treeni</span>
        <strong>Rintalihas</strong>
        <span className="muted">3 sarjaa&nbsp; • &nbsp;12 min</span>
      </button>

      <div className="stat-row stat-row--home">
        <div className="stat-tile"><span className="eyebrow">Paino</span><strong>22,5 kg</strong></div>
        <div className="stat-tile"><span className="eyebrow">Toistot</span><strong>8 / 12</strong></div>
      </div>

      <section className="recent-section">
        <div className="section-heading"><h2>Viimeaikaiset</h2><button className="text-button" onClick={onShowSummary}>Kaikki</button></div>
        <button className="recent-item" onClick={() => onStartMovement('Pystypunnerrus')}>
          <span className="item-icon"><Glyph name="dumbbell" /></span>
          <span className="item-copy"><strong>Pystypunnerrus</strong><small>12 min&nbsp; • &nbsp;3 sarjaa</small></span>
          <strong className="item-value">22,5 kg</strong>
        </button>
        <button className="recent-item" onClick={() => onStartMovement('Kyykky')}>
          <span className="item-icon"><Glyph name="dumbbell" /></span>
          <span className="item-copy"><strong>Kyykky</strong><small>18 min&nbsp; • &nbsp;4 sarjaa</small></span>
          <strong className="item-value">60 kg</strong>
        </button>
      </section>

      <button className="button button--outline home-cta" onClick={onOpenMovements}>Valitse liikkeet</button>
    </>
  )
}

export default HomeScreen
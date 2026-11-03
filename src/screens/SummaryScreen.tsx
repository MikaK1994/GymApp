import Glyph from '../components/Glyph'

type SummaryScreenProps = {
  onShowMovements: () => void
  onSaveWorkout: () => void
  onNewWorkout: () => void
}

function SummaryScreen({ onShowMovements, onSaveWorkout, onNewWorkout }: SummaryScreenProps) {
  return (
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
        <div className="section-heading"><h2>Viimeiset tulokset</h2><button className="text-button" onClick={onShowMovements}>Kaikki</button></div>
        <div className="history-item"><span className="item-icon"><Glyph name="calendar" /></span><span className="item-copy"><strong>12.3.</strong><small>22,5 kg • 8 / 12</small></span><strong className="item-value">85 kg</strong></div>
        <div className="history-item"><span className="item-icon"><Glyph name="calendar" /></span><span className="item-copy"><strong>5.3.</strong><small>20 kg • 10 / 12</small></span><strong className="item-value">78 kg</strong></div>
      </section>

      <div className="summary-actions">
        <button className="button button--primary" onClick={onSaveWorkout}>Tallenna treeni</button>
        <button className="button button--outline" onClick={onNewWorkout}>Uusi treeni</button>
      </div>
    </>
  )
}

export default SummaryScreen
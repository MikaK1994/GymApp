import Glyph from '../components/Glyph'

type SessionScreenProps = {
  movementName: string
  weight: number
  reps: number
  savedSets: number
  onClose: () => void
  onDecreaseWeight: () => void
  onIncreaseWeight: () => void
  onIncreaseReps: () => void
  onSaveSet: () => void
  onEndWorkout: () => void
}

function formatWeight(value: number) {
  return `${Number.isInteger(value) ? value : value.toFixed(1).replace('.', ',')} kg`
}

function SessionScreen({ movementName, weight, reps, savedSets, onClose, onDecreaseWeight, onIncreaseWeight, onIncreaseReps, onSaveSet, onEndWorkout }: SessionScreenProps) {
  return (
    <>
      <header className="page-header page-header--session">
        <div><p className="eyebrow">Kirjaus</p><h1>{movementName}</h1></div>
        <button className="icon-button" aria-label="Sulje treeni" onClick={onClose}><Glyph name="close" /></button>
      </header>

      <div className="session-stats">
        <div className="session-card"><span className="eyebrow">Paino</span><strong className="session-number">{formatWeight(weight)}</strong><small>1RM-arvio 85 kg</small></div>
        <div className="session-card"><span className="eyebrow">Toistot</span><strong className="session-number">{reps} / 12</strong><small>Tavoite 12 toistoa</small></div>
      </div>

      <div className="session-actions">
        <button className="button button--filled" onClick={onDecreaseWeight}>Vähennä 2,5 kg</button>
        <button className="button button--filled" onClick={onIncreaseWeight}>Lisää 2,5 kg</button>
        <button className="button button--filled" onClick={onIncreaseReps}>Lisää toisto</button>
        <button className="button button--primary" onClick={onSaveSet}>Tallenna sarja{savedSets > 0 ? ` (${savedSets})` : ''}</button>
        <button className="button button--outline" onClick={onEndWorkout}>Lopeta treeni</button>
      </div>
    </>
  )
}

export default SessionScreen
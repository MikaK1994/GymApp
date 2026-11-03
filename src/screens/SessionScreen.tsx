import Glyph from '../components/Glyph'

type SessionScreenProps = {
  movementName: string
  weight: number
  reps: number
  savedSets: number
  hasNextMovement: boolean
  onWeightChange: (weight: number) => void
  onRepsChange: (reps: number) => void
  onClose: () => void
  onDecreaseWeight: () => void
  onIncreaseWeight: () => void
  onIncreaseReps: () => void
  onSaveSet: () => void
  onNextMovement: () => void
  onEndWorkout: () => void
}

function SessionScreen({ movementName, weight, reps, savedSets, hasNextMovement, onWeightChange, onRepsChange, onClose, onDecreaseWeight, onIncreaseWeight, onIncreaseReps, onSaveSet, onNextMovement, onEndWorkout }: SessionScreenProps) {
  return (
    <>
      <header className="page-header page-header--session">
        <div><p className="eyebrow">Kirjaus</p><h1>{movementName}</h1></div>
        <button className="icon-button" aria-label="Sulje treeni" onClick={onClose}><Glyph name="close" /></button>
      </header>

      <div className="session-stats">
        <label className="session-card"><span className="eyebrow">Paino (kg)</span><input className="session-number" type="number" min="0" step="0.5" value={weight} aria-label="Paino kilogrammoina" onChange={(event) => onWeightChange(Number(event.currentTarget.value))} /></label>
        <label className="session-card"><span className="eyebrow">Toistot</span><input className="session-number" type="number" min="0" step="1" value={reps} aria-label="Toistojen määrä" onChange={(event) => onRepsChange(Number(event.currentTarget.value))} /></label>
      </div>

      <div className="session-actions">
        <button className="button button--filled" onClick={onDecreaseWeight}>Vähennä 2,5 kg</button>
        <button className="button button--filled" onClick={onIncreaseWeight}>Lisää 2,5 kg</button>
        <button className="button button--filled" onClick={onIncreaseReps}>Lisää toisto</button>
        <button className="button button--primary" onClick={onSaveSet}>Tallenna sarja{savedSets > 0 ? ` (${savedSets})` : ''}</button>
        {hasNextMovement && <button className="button button--filled" onClick={onNextMovement}>Seuraava liike</button>}
        <button className="button button--outline" onClick={onEndWorkout}>Lopeta treeni</button>
      </div>
    </>
  )
}

export default SessionScreen
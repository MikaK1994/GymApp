import Glyph from '../components/Glyph'
import { useState } from 'react'

type SessionScreenProps = {
  movementName: string
  weight: number | ''
  reps: number | ''
  savedSets: number
  error: string
  hasNextMovement: boolean
  onWeightChange: (weight: number | '') => void
  onRepsChange: (reps: number | '') => void
  onClose: () => void
  onDecreaseWeight: () => void
  onIncreaseWeight: () => void
  onDecreaseReps: () => void
  onIncreaseReps: () => void
  onSaveSet: () => boolean
  onNextMovement: () => void
  onEndWorkout: () => void
}

function SessionScreen({ movementName, weight, reps, savedSets, error, hasNextMovement, onWeightChange, onRepsChange, onClose, onDecreaseWeight, onIncreaseWeight, onDecreaseReps, onIncreaseReps, onSaveSet, onNextMovement, onEndWorkout }: SessionScreenProps) {
  const [savedConfirmation, setSavedConfirmation] = useState(false)

  function handleSaveSet() {
    if (onSaveSet()) {
      setSavedConfirmation(true)
      window.setTimeout(() => setSavedConfirmation(false), 1800)
    }
  }

  return (
    <>
      <header className="page-header page-header--session">
        <div><p className="eyebrow">Kirjaus</p><h1>{movementName}</h1></div>
        <button className="icon-button" aria-label="Sulje treeni" onClick={onClose}><Glyph name="close" /></button>
      </header>

      <div className="session-stats">
        <div className="session-card">
          <label className="eyebrow" htmlFor="session-weight">Paino (kg)</label>
          <div className="session-value-row">
            <input id="session-weight" className="session-number" type="number" min="0" step="1" value={weight} aria-label="Paino kilogrammoina" onChange={(event) => onWeightChange(event.currentTarget.value === '' ? '' : Number(event.currentTarget.value))} />
            <button className="stepper-button" type="button" aria-label="Vähennä painoa yhdellä" onClick={onDecreaseWeight}><Glyph name="minus" /></button>
            <button className="stepper-button" type="button" aria-label="Lisää painoa yhdellä" onClick={onIncreaseWeight}><Glyph name="plus" /></button>
          </div>
        </div>
        <div className="session-card">
          <label className="eyebrow" htmlFor="session-reps">Toistot</label>
          <div className="session-value-row">
            <input id="session-reps" className="session-number" type="number" min="0" step="1" value={reps} aria-label="Toistojen määrä" onChange={(event) => onRepsChange(event.currentTarget.value === '' ? '' : Number(event.currentTarget.value))} />
            <button className="stepper-button" type="button" aria-label="Vähennä toistoja yhdellä" onClick={onDecreaseReps}><Glyph name="minus" /></button>
            <button className="stepper-button" type="button" aria-label="Lisää toistoja yhdellä" onClick={onIncreaseReps}><Glyph name="plus" /></button>
          </div>
        </div>
      </div>

      {error && <p className="session-error" role="alert">{error}</p>}

      <div className="session-actions">
        <button className="button button--primary" onClick={handleSaveSet}>Tallenna sarja{savedSets > 0 ? ` (${savedSets})` : ''}</button>
        {savedConfirmation && <p className="save-confirmation" role="status"><Glyph name="check" />Sarja tallennettu</p>}
        {hasNextMovement && <button className="button button--filled" onClick={onNextMovement}>Seuraava liike</button>}
        <button className="button button--outline" onClick={onEndWorkout}>Lopeta treeni</button>
      </div>
    </>
  )
}

export default SessionScreen
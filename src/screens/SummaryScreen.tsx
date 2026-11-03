import Glyph from '../components/Glyph'
import type { CompletedExercise } from '../types'

type SummaryScreenProps = {
  exercises: CompletedExercise[]
  onShowMovements: () => void
  onSaveWorkout: () => void
  onNewWorkout: () => void
}

function formatWeight(value: number) {
  return `${Number.isInteger(value) ? value : value.toFixed(1).replace('.', ',')} kg`
}

function SummaryScreen({ exercises, onShowMovements, onSaveWorkout, onNewWorkout }: SummaryScreenProps) {
  return (
    <>
      <header className="page-header page-header--summary">
        <div><p className="eyebrow">Valmis</p><h1>Yhteenveto</h1></div>
        <button className="icon-button" aria-label="Jaa yhteenveto"><Glyph name="share" /></button>
      </header>

      <section className="summary-exercises">
        <div className="section-heading"><h2>Suoritetut liikkeet</h2><button className="text-button" onClick={onShowMovements}>Liikkeet</button></div>
        {exercises.map((exercise) => (
          <article className="summary-exercise" key={exercise.name}>
            <div className="summary-exercise-heading">
              <strong>{exercise.name}</strong>
              <span>{exercise.sets.length} {exercise.sets.length === 1 ? 'sarja' : 'sarjaa'}</span>
            </div>
            <div className="summary-set-list">
              {exercise.sets.map((set, index) => (
                <div className="summary-set" key={`${exercise.name}-${index}`}>
                  <span>Sarja {index + 1}</span>
                  <strong>{formatWeight(set.weight)} × {set.reps} toistoa</strong>
                </div>
              ))}
            </div>
          </article>
        ))}
        {exercises.length === 0 && <p className="empty-state">Tässä treenissä ei tallennettu sarjoja.</p>}
      </section>

      <div className="summary-actions">
        <button className="button button--primary" onClick={onSaveWorkout}>Tallenna treeni</button>
        <button className="button button--outline" onClick={onNewWorkout}>Uusi treeni</button>
      </div>
    </>
  )
}

export default SummaryScreen
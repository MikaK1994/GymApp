import { useState } from 'react'
import Glyph from '../components/Glyph'
import type { WorkoutRecord } from '../types'

type HomeScreenProps = {
  recentWorkouts: WorkoutRecord[]
  onOpenMovements: () => void
}

function formatWeight(value: number) {
  return `${Number.isInteger(value) ? value : value.toFixed(1).replace('.', ',')} kg`
}

function formatWorkoutDate(value: string) {
  return new Intl.DateTimeFormat('fi-FI', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(value))
}

function HomeScreen({ recentWorkouts, onOpenMovements }: HomeScreenProps) {
  const [expandedWorkoutId, setExpandedWorkoutId] = useState<string | null>(null)

  return (
    <>
      <header className="page-header page-header--home">
        <div><h1 className="home-logo">GymApp</h1><p className="home-greeting">Welcome Back</p></div>
        <button className="icon-button" aria-label="Ilmoitukset"><Glyph name="bell" /></button>
      </header>

      {recentWorkouts.length > 0 && (
        <section className="recent-section">
          <div className="section-heading"><h2>Viimeaikaiset</h2></div>
          <div className="recent-workout-list">
            {recentWorkouts.map((workout) => {
              const isExpanded = expandedWorkoutId === workout.id
              return (
                <article className="recent-workout" key={workout.id}>
                  <button
                    className="recent-workout-trigger"
                    type="button"
                    aria-expanded={isExpanded}
                    onClick={() => setExpandedWorkoutId(isExpanded ? null : workout.id)}
                  >
                    <strong>{formatWorkoutDate(workout.completedAt)}</strong>
                    <Glyph name="chevron" />
                  </button>
                  {isExpanded && (
                    <div className="recent-workout-details">
                      {workout.exercises.map((exercise) => (
                        <div className="recent-exercise" key={exercise.name}>
                          <strong>{exercise.name}</strong>
                          {exercise.sets.map((set, index) => (
                            <span className="recent-set" key={`${exercise.name}-${index}`}>
                              Sarja {index + 1}: {formatWeight(set.weight)} × {set.reps} toistoa
                            </span>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                </article>
              )
            })}
          </div>
        </section>
      )}

      <button className="button button--outline home-cta" onClick={onOpenMovements}>Valitse liikkeet</button>
    </>
  )
}

export default HomeScreen
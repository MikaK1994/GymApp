import { useEffect, useState } from 'react'
import './App.css'
import Glyph from './components/Glyph'
import movements from './data/movements'
import HomeScreen from './screens/HomeScreen'
import MovementScreen from './screens/MovementScreen'
import MovementGuidesScreen from './screens/MovementGuidesScreen'
import SessionScreen from './screens/SessionScreen'
import StatisticsScreen from './screens/StatisticsScreen'
import SummaryScreen from './screens/SummaryScreen'
import type { CategoryStat, CompletedExercise, Filter, MovementCategory, Screen, WorkoutRecord } from './types/types'
import { movementCategories } from './data/movements'

const workoutStorageKey = 'gymapp-recent-workouts'

function App() {
  const [screen, setScreen] = useState<Screen>('home')
  const [workoutStatus, setWorkoutStatus] = useState<'idle' | 'active' | 'completed'>('idle')
  const [filter, setFilter] = useState<Filter>('Kaikki')
  const [query, setQuery] = useState('')
  const [selectedMovements, setSelectedMovements] = useState<string[]>([])
  const [workoutMovements, setWorkoutMovements] = useState<string[]>([])
  const [currentMovementIndex, setCurrentMovementIndex] = useState(0)
  const [completedExercises, setCompletedExercises] = useState<CompletedExercise[]>([])
  const [recentWorkouts, setRecentWorkouts] = useState<WorkoutRecord[]>(() => {
    try {
      const savedWorkouts = window.localStorage.getItem(workoutStorageKey)
      return savedWorkouts ? JSON.parse(savedWorkouts) as WorkoutRecord[] : []
    } catch {
      return []
    }
  })
  const [weight, setWeight] = useState<number | ''>(20)
  const [reps, setReps] = useState<number | ''>(5)
  const [savedSets, setSavedSets] = useState(0)
  const [sessionError, setSessionError] = useState('')
  const [highlightedWorkoutId, setHighlightedWorkoutId] = useState<string | null>(null)
  const currentMovement = workoutMovements[currentMovementIndex] ?? 'Pystypunnerrus'

  const visibleMovements = movements.filter((movement) => {
    const matchesFilter = filter === 'Kaikki' || movement.category === filter
    return matchesFilter && movement.name.toLocaleLowerCase('fi').includes(query.toLocaleLowerCase('fi'))
  })

  const categoryCounts = movementCategories.reduce<Record<MovementCategory, number>>((counts, category) => {
    counts[category] = 0
    return counts
  }, {} as Record<MovementCategory, number>)

  recentWorkouts.forEach((workout) => {
    workout.exercises.forEach((exercise) => {
      const category = movements.find((movement) => movement.name === exercise.name)?.category
      if (category) categoryCounts[category] += exercise.sets.length
    })
  })

  const categoryStats: CategoryStat[] = movementCategories.map((category) => ({
    category,
    count: categoryCounts[category],
  }))

  function startWorkout(movementNames: string[] = ['Pystypunnerrus']) {
    setWorkoutStatus('active')
    setWorkoutMovements(movementNames)
    setCurrentMovementIndex(0)
    setCompletedExercises([])
    setSavedSets(0)
    setWeight(20)
    setReps(5)
    setSessionError('')
    setScreen('session')
  }

  function toggleMovement(movementName: string) {
    setSelectedMovements((selected) => selected.includes(movementName)
      ? selected.filter((name) => name !== movementName)
      : [...selected, movementName])
  }

  function saveSet() {
    if (!validateSession()) return false
    const completedSet = { weight: Number(weight), reps: Number(reps) }
    setCompletedExercises((completed) => {
      const exercise = completed.find((item) => item.name === currentMovement)
      if (!exercise) return [...completed, { name: currentMovement, sets: [completedSet] }]
      return completed.map((item) => item.name === currentMovement
        ? { ...item, sets: [...item.sets, completedSet] }
        : item)
    })
    setSavedSets((count) => count + 1)
    return true
  }

  function nextMovement() {
    if (!validateSession()) return
    setCurrentMovementIndex((index) => index + 1)
    setSavedSets(0)
    setWeight(20)
    setReps(5)
  }

  function validateSession() {
    if (weight === '' || Number(weight) <= 0) {
      setSessionError('Anna painolle nollaa suurempi arvo.')
      return false
    }
    if (reps === '' || Number(reps) <= 0) {
      setSessionError('Anna toistoille nollaa suurempi arvo.')
      return false
    }
    setSessionError('')
    return true
  }

  function finishWorkout() {
    if (!validateSession()) return
    setSelectedMovements([])
    setWorkoutStatus('completed')
    changeScreen('summary')
  }

  function saveWorkout() {
    if (completedExercises.length > 0) {
      const completedAt = new Date().toISOString()
      const workout: WorkoutRecord = {
        id: completedAt,
        completedAt,
        exercises: completedExercises,
      }
      setRecentWorkouts((recent) => [workout, ...recent].slice(0, 30))
      setHighlightedWorkoutId(workout.id)
    }
    setSelectedMovements([])
    setWorkoutStatus('idle')
    changeScreen('home')
  }

  function deleteSet(exerciseName: string, setIndex: number) {
    setCompletedExercises((exercises) => exercises.flatMap((exercise) => {
      if (exercise.name !== exerciseName) return [exercise]
      const sets = exercise.sets.filter((_, index) => index !== setIndex)
      return sets.length > 0 ? [{ ...exercise, sets }] : []
    }))
  }

  function changeScreen(nextScreen: Screen) {
    setScreen(nextScreen)
    if (nextScreen === 'session') setSavedSets(0)
  }

  useEffect(() => {
    window.localStorage.setItem(workoutStorageKey, JSON.stringify(recentWorkouts))
  }, [recentWorkouts])

  return (
    <main className="app-shell">
      <div className={`page page--${screen}`}>
        {screen === 'home' && (
          <HomeScreen
            recentWorkouts={recentWorkouts}
            highlightedWorkoutId={highlightedWorkoutId}
            onOpenMovements={() => changeScreen('movements')}
            onOpenGuides={() => changeScreen('guides')}
          />
        )}

        {screen === 'movements' && (
          <MovementScreen
            filter={filter}
            query={query}
            selectedMovements={selectedMovements}
            movements={visibleMovements}
            onFilterChange={setFilter}
            onQueryChange={setQuery}
            onMovementToggle={toggleMovement}
            onStartWorkout={() => startWorkout(selectedMovements)}
          />
        )}

        {screen === 'session' && (
          <SessionScreen
            movementName={currentMovement}
            weight={weight}
            reps={reps}
            savedSets={savedSets}
            error={sessionError}
            hasNextMovement={currentMovementIndex < workoutMovements.length - 1}
            onWeightChange={(value) => { setWeight(value); setSessionError('') }}
            onRepsChange={(value) => { setReps(value); setSessionError('') }}
            onClose={() => changeScreen('home')}
            onDecreaseWeight={() => setWeight((value) => value === '' ? '' : Math.max(0, value - 1))}
            onIncreaseWeight={() => setWeight((value) => value === '' ? 1 : value + 1)}
            onDecreaseReps={() => setReps((value) => value === '' ? '' : Math.max(0, value - 1))}
            onIncreaseReps={() => setReps((value) => value === '' ? 1 : value + 1)}
            onSaveSet={saveSet}
            onNextMovement={nextMovement}
            onEndWorkout={finishWorkout}
          />
        )}

        {screen === 'summary' && (
          <SummaryScreen
            exercises={completedExercises}
            onShowMovements={() => changeScreen('movements')}
            onDeleteSet={deleteSet}
            onSaveWorkout={saveWorkout}
            onNewWorkout={() => startWorkout()}
          />
        )}

        {screen === 'statistics' && <StatisticsScreen stats={categoryStats} />}
        {screen === 'guides' && <MovementGuidesScreen />}
      </div>

      <nav className="bottom-nav" aria-label="Päänavigaatio">
        <button className={screen === 'home' ? 'is-active' : ''} onClick={() => changeScreen('home')}><Glyph name="home" /><span>Etusivu</span></button>
        <button className={screen === 'movements' ? 'is-active' : ''} onClick={() => changeScreen('movements')}><Glyph name="search" /><span>Liikkeet</span></button>
        <button className={screen === 'session' ? 'is-active' : ''} disabled={workoutStatus !== 'active'} onClick={() => changeScreen('session')}><Glyph name="dumbbell" /><span>Treeni</span></button>
        <button className={screen === 'summary' ? 'is-active' : ''} disabled={workoutStatus === 'idle'} onClick={() => changeScreen('summary')}><Glyph name="chart" /><span>Yhteenveto</span></button>
        <button className={screen === 'statistics' ? 'is-active' : ''} onClick={() => changeScreen('statistics')}><Glyph name="chart" /><span>Tilastot</span></button>
        <button className={screen === 'guides' ? 'is-active' : ''} onClick={() => changeScreen('guides')}><Glyph name="book" /><span>Ohjeet</span></button>
      </nav>
    </main>
  )
}

export default App



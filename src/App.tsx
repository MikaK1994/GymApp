import { useEffect, useState } from 'react'
import './App.css'
import Glyph from './components/Glyph'
import movements from './data/movements'
import HomeScreen from './screens/HomeScreen'
import MovementScreen from './screens/MovementScreen'
import SessionScreen from './screens/SessionScreen'
import SummaryScreen from './screens/SummaryScreen'
import type { CompletedExercise, Filter, Screen, WorkoutRecord } from './types'

const workoutStorageKey = 'gymapp-recent-workouts'

function App() {
  const [screen, setScreen] = useState<Screen>('home')
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
  const [weight, setWeight] = useState(22.5)
  const [reps, setReps] = useState(8)
  const [savedSets, setSavedSets] = useState(0)
  const currentMovement = workoutMovements[currentMovementIndex] ?? 'Pystypunnerrus'

  const visibleMovements = movements.filter((movement) => {
    const matchesFilter = filter === 'Kaikki' || movement.category === filter
    return matchesFilter && movement.name.toLocaleLowerCase('fi').includes(query.toLocaleLowerCase('fi'))
  })

  function startWorkout(movementNames: string[] = ['Pystypunnerrus']) {
    setWorkoutMovements(movementNames)
    setCurrentMovementIndex(0)
    setCompletedExercises([])
    setSavedSets(0)
    setWeight(22.5)
    setReps(8)
    setScreen('session')
  }

  function toggleMovement(movementName: string) {
    setSelectedMovements((selected) => selected.includes(movementName)
      ? selected.filter((name) => name !== movementName)
      : [...selected, movementName])
  }

  function saveSet() {
    const completedSet = { weight, reps }
    setCompletedExercises((completed) => {
      const exercise = completed.find((item) => item.name === currentMovement)
      if (!exercise) return [...completed, { name: currentMovement, sets: [completedSet] }]
      return completed.map((item) => item.name === currentMovement
        ? { ...item, sets: [...item.sets, completedSet] }
        : item)
    })
    setSavedSets((count) => count + 1)
  }

  function nextMovement() {
    setCurrentMovementIndex((index) => index + 1)
    setSavedSets(0)
    setWeight(22.5)
    setReps(8)
  }

  function finishWorkout() {
    if (completedExercises.length > 0) {
      const workout: WorkoutRecord = {
        id: new Date().toISOString(),
        completedAt: new Date().toISOString(),
        exercises: completedExercises,
      }
      setRecentWorkouts((recent) => [workout, ...recent].slice(0, 30))
    }
    changeScreen('summary')
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
            onOpenMovements={() => changeScreen('movements')}
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
            hasNextMovement={currentMovementIndex < workoutMovements.length - 1}
            onWeightChange={setWeight}
            onRepsChange={setReps}
            onClose={() => changeScreen('home')}
            onDecreaseWeight={() => setWeight((value) => Math.max(0, value - 2.5))}
            onIncreaseWeight={() => setWeight((value) => value + 2.5)}
            onIncreaseReps={() => setReps((value) => value + 1)}
            onSaveSet={saveSet}
            onNextMovement={nextMovement}
            onEndWorkout={finishWorkout}
          />
        )}

        {screen === 'summary' && (
          <SummaryScreen
            exercises={completedExercises}
            onShowMovements={() => changeScreen('movements')}
            onSaveWorkout={() => changeScreen('home')}
            onNewWorkout={() => startWorkout()}
          />
        )}
      </div>

      <nav className="bottom-nav" aria-label="Päänavigaatio">
        <button className={screen === 'home' ? 'is-active' : ''} onClick={() => changeScreen('home')}><Glyph name="home" /><span>Etusivu</span></button>
        <button className={screen === 'movements' ? 'is-active' : ''} onClick={() => changeScreen('movements')}><Glyph name="search" /><span>Liikkeet</span></button>
        <button className={screen === 'session' ? 'is-active' : ''} onClick={() => screen === 'session' ? undefined : startWorkout(selectedMovements.length > 0 ? selectedMovements : ['Pystypunnerrus'])}><Glyph name="dumbbell" /><span>Treeni</span></button>
        <button className={screen === 'summary' ? 'is-active' : ''} onClick={() => changeScreen('summary')}><Glyph name="chart" /><span>Yhteenveto</span></button>
        <button onClick={() => changeScreen('movements')}><Glyph name="calendar" /><span>Suunnitelma</span></button>
      </nav>
    </main>
  )
}

export default App



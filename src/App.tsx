import { useState } from 'react'
import './App.css'
import Glyph from './components/Glyph'
import movements from './data/movements'
import HomeScreen from './screens/HomeScreen'
import MovementScreen from './screens/MovementScreen'
import SessionScreen from './screens/SessionScreen'
import SummaryScreen from './screens/SummaryScreen'
import type { Filter, Screen } from './types'

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

  function startWorkout(movementName = 'Pystypunnerrus') {
    setSelectedMovement(movementName)
    setSavedSets(0)
    setWeight(22.5)
    setReps(8)
    setScreen('session')
  }

  function changeScreen(nextScreen: Screen) {
    setScreen(nextScreen)
    if (nextScreen === 'session') setSavedSets(0)
  }

  return (
    <main className="app-shell">
      <div className={`page page--${screen}`}>
        {screen === 'home' && (
          <HomeScreen
            onStartWorkout={startWorkout}
            onStartMovement={startWorkout}
            onShowSummary={() => changeScreen('summary')}
            onOpenMovements={() => changeScreen('movements')}
          />
        )}

        {screen === 'movements' && (
          <MovementScreen
            filter={filter}
            query={query}
            selectedMovement={selectedMovement}
            movements={visibleMovements}
            onFilterChange={setFilter}
            onQueryChange={setQuery}
            onMovementSelect={setSelectedMovement}
            onStartWorkout={() => startWorkout(selectedMovement)}
          />
        )}

        {screen === 'session' && (
          <SessionScreen
            movementName={selectedMovement}
            weight={weight}
            reps={reps}
            savedSets={savedSets}
            onClose={() => changeScreen('home')}
            onDecreaseWeight={() => setWeight((value) => Math.max(0, value - 2.5))}
            onIncreaseWeight={() => setWeight((value) => value + 2.5)}
            onIncreaseReps={() => setReps((value) => value + 1)}
            onSaveSet={() => setSavedSets((value) => value + 1)}
            onEndWorkout={() => changeScreen('summary')}
          />
        )}

        {screen === 'summary' && (
          <SummaryScreen
            onShowMovements={() => changeScreen('movements')}
            onSaveWorkout={() => changeScreen('home')}
            onNewWorkout={() => startWorkout('Pystypunnerrus')}
          />
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



import Glyph from '../components/Glyph'
import type { Filter, Movement } from '../types'

type MovementScreenProps = {
  filter: Filter
  query: string
  selectedMovements: string[]
  movements: Movement[]
  onFilterChange: (filter: Filter) => void
  onQueryChange: (query: string) => void
  onMovementToggle: (movementName: string) => void
  onStartWorkout: () => void
}

function MovementScreen({ filter, query, selectedMovements, movements, onFilterChange, onQueryChange, onMovementToggle, onStartWorkout }: MovementScreenProps) {
  return (
    <>
      <header className="page-header page-header--list">
        <div><p className="eyebrow">Valitse liike</p><h1>Liikkeet</h1></div>
        <button className="icon-button" aria-label="Suodata liikkeitä"><Glyph name="sliders" /></button>
      </header>

      <label className="search-box">
        <Glyph name="search" />
        <input value={query} onChange={(event) => onQueryChange(event.target.value)} placeholder="Hae liikettä" />
      </label>

      <div className="filter-row" role="group" aria-label="Liikeryhmä">
        {(['Kaikki', 'Ylävartalo', 'Alavartalo'] as const).map((option) => (
          <button key={option} className={`filter-chip${filter === option ? ' is-active' : ''}`} onClick={() => onFilterChange(option)}>{option}</button>
        ))}
      </div>

      <div className="movement-list">
        {movements.map((movement) => {
          const isSelected = selectedMovements.includes(movement.name)
          return (
            <button
              key={movement.name}
              type="button"
              aria-pressed={isSelected}
              className={`movement-item${isSelected ? ' is-selected' : ''}`}
              onClick={() => onMovementToggle(movement.name)}
            >
              <span className="item-icon"><Glyph name={movement.icon} /></span>
              <span className="item-copy"><strong>{movement.name}</strong><small>{[movement.category, movement.duration].filter(Boolean).join(' • ')}</small></span>
              <Glyph name="chevron" />
            </button>
          )
        })}
        {movements.length === 0 && <p className="empty-state">Liikkeitä ei löytynyt.</p>}
      </div>

      <button className="button button--filled list-cta" disabled={selectedMovements.length === 0} onClick={onStartWorkout}>
        Aloita treeni{selectedMovements.length > 0 ? ` (${selectedMovements.length})` : ''}
      </button>
    </>
  )
}

export default MovementScreen
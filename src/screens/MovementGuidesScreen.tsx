import { useState } from 'react'
import Glyph from '../components/Glyph'
import { movementCategories } from '../data/movements'
import movements from '../data/movements'
import type { Filter } from '../types/types'

function MovementGuidesScreen() {
  const [filter, setFilter] = useState<Filter>('Kaikki')
  const [query, setQuery] = useState('')
  const [expandedMovement, setExpandedMovement] = useState<string | null>(null)

  const visibleMovements = movements.filter((movement) => {
    const matchesFilter = filter === 'Kaikki' || movement.category === filter
    return matchesFilter && movement.name.toLocaleLowerCase('fi').includes(query.toLocaleLowerCase('fi'))
  })

  return (
    <>
      <header className="page-header page-header--list">
        <div><p className="eyebrow">Liikkeiden suoritusohjeet</p><h1>Ohjeet</h1></div>
      </header>

      <label className="search-box">
        <Glyph name="search" />
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Hae liikettä" />
      </label>

      <div className="filter-row" role="group" aria-label="Ohjeiden lihasryhmä">
        {(['Kaikki', ...movementCategories] as const).map((category) => (
          <button key={category} className={`filter-chip${filter === category ? ' is-active' : ''}`} onClick={() => setFilter(category)}>{category}</button>
        ))}
      </div>

      <div className="guide-list">
        {visibleMovements.map((movement) => {
          const isExpanded = expandedMovement === movement.name
          return (
            <article className={`guide-item${isExpanded ? ' is-expanded' : ''}`} key={movement.name}>
              <button
                className="guide-trigger"
                type="button"
                aria-expanded={isExpanded}
                onClick={() => setExpandedMovement(isExpanded ? null : movement.name)}
              >
                <span className="guide-image">
                  {movement.imageSrc ? <img src={movement.imageSrc} alt={`Ohje: ${movement.name}`} loading="lazy" /> : <span className="guide-image-placeholder"><Glyph name={movement.icon} size={30} /><small>Kuva</small></span>}
                </span>
                <span className="guide-title"><strong>{movement.name}</strong><small>{movement.category}</small></span>
                <Glyph name="chevron" />
              </button>
              {isExpanded && (
                <div className="guide-instructions">
                  <h2>Suoritus</h2>
                  {movement.imageSrc && <img className="guide-detail-image" src={movement.imageSrc} alt={`Suorituskuva: ${movement.name}`} loading="lazy" />}
                  <ol>
                    {movement.instructions.map((instruction) => <li key={instruction}>{instruction}</li>)}
                  </ol>
                </div>
              )}
            </article>
          )
        })}
        {visibleMovements.length === 0 && <p className="empty-state">Liikkeitä ei löytynyt.</p>}
      </div>
    </>
  )
}

export default MovementGuidesScreen
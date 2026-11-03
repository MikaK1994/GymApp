import type { CategoryStat, MovementCategory } from '../types'

type StatisticsScreenProps = {
  stats: CategoryStat[]
}

const categoryColors: Record<MovementCategory, string> = {
  Rinta: '#67e8a5',
  Selkä: '#60a5fa',
  Jalat: '#fbbf24',
  Olkapäät: '#fb7185',
  Kädet: '#c4b5fd',
}

function StatisticsScreen({ stats }: StatisticsScreenProps) {
  const total = stats.reduce((sum, stat) => sum + stat.count, 0)
  let currentAngle = 0
  const slices = stats.filter((stat) => stat.count > 0).map((stat) => {
    const startAngle = currentAngle
    currentAngle += (stat.count / total) * 360
    return `${categoryColors[stat.category]} ${startAngle}deg ${currentAngle}deg`
  })
  const chartBackground = total > 0
    ? `conic-gradient(${slices.join(', ')})`
    : 'conic-gradient(#374151 0deg 360deg)'

  return (
    <>
      <header className="page-header page-header--list">
        <div><p className="eyebrow">Harjoittelun jakauma</p><h1>Tilastot</h1></div>
      </header>

      <section className="statistics-section">
        <div className="section-heading"><h2>Sarjojen jakauma</h2></div>
        <p className="statistics-caption">Kunkin lihasryhmän osuus tallennetuista sarjoista</p>

        {total > 0 ? (
          <div className="statistics-chart" role="img" aria-label={`Ympyräkaavio ${total} tallennetusta sarjasta lihasryhmittäin`} style={{ background: chartBackground }} />
        ) : (
          <div className="statistics-chart statistics-chart--empty" role="img" aria-label="Ei tallennettuja sarjoja" />
        )}

        <div className="statistics-legend">
          {stats.map((stat) => (
            <div className="statistics-legend-row" key={stat.category}>
              <span className="statistics-legend-label"><span className="statistics-swatch" style={{ backgroundColor: categoryColors[stat.category] }} />{stat.category}</span>
              <span className="statistics-legend-value">{total > 0 ? Math.round((stat.count / total) * 100) : 0}% <small>({stat.count})</small></span>
            </div>
          ))}
        </div>
        {total === 0 && <p className="empty-state">Tilastoja näytetään, kun olet tallentanut treenisettejä.</p>}
      </section>
    </>
  )
}

export default StatisticsScreen
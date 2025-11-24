function getCategoryClass(category) {
  if (!category) return 'aqi-badge neutral';
  const lower = category.toLowerCase();
  if (lower.includes('good')) return 'aqi-badge good';
  if (lower.includes('moderate')) return 'aqi-badge moderate';
  if (lower.includes('unhealthy for sensitive')) return 'aqi-badge usg';
  if (lower.includes('unhealthy')) return 'aqi-badge unhealthy';
  if (lower.includes('very unhealthy')) return 'aqi-badge very-unhealthy';
  if (lower.includes('hazardous')) return 'aqi-badge hazardous';
  return 'aqi-badge neutral';
}

function CitySummaryCard({ city, aqi, category, dominantPollutant, fromCache, time }) {
  return (
    <section className="card summary-card">
      <div className="summary-header">
        <h2>{city}</h2>
        <span className={getCategoryClass(category)}>{category}</span>
      </div>
      <div className="summary-body">
        <div className="aqi-value">
          <span className="aqi-label">AQI</span>
          <span className="aqi-number">{aqi ?? '--'}</span>
        </div>
        <div className="summary-meta">
          <p><strong>Dominant pollutant:</strong> {dominantPollutant || 'N/A'}</p>
          <p><strong>Last updated:</strong> {time || 'N/A'}</p>
          {fromCache && <p className="cache-tag">Served from cache</p>}
        </div>
      </div>
    </section>
  );
}

export default CitySummaryCard;

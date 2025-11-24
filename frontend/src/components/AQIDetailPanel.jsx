function AQIDetailPanel({ breakdown = {}, geo = [], attribution = [] }) {
  const entries = Object.entries(breakdown).filter(([_, v]) => v != null);

  return (
    <section className="card detail-card">
      <h3>Detailed breakdown</h3>

      {entries.length === 0 && <p>No pollutant breakdown available.</p>}

      {entries.length > 0 && (
        <table className="breakdown-table">
          <thead>
            <tr>
              <th>Pollutant</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {entries.map(([key, value]) => (
              <tr key={key}>
                <td>{key.toUpperCase()}</td>
                <td>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="detail-extra">
        {geo.length === 2 && (
          <p>
            <strong>Location:</strong> {geo[0].toFixed ? geo[0].toFixed(2) : geo[0]},
            {' '}
            {geo[1].toFixed ? geo[1].toFixed(2) : geo[1]}
          </p>
        )}
        {attribution.length > 0 && (
          <p>
            <strong>Sources:</strong> {attribution.join(', ')}
          </p>
        )}
      </div>
    </section>
  );
}

export default AQIDetailPanel;

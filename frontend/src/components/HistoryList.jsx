function HistoryList({ items, onItemClick }) {
  if (!items.length) return null;

  return (
    <section className="card history-card">
      <h3>Recent searches</h3>
      <ul>
        {items.map((item) => (
          <li key={item.city}>
            <button
              type="button"
              onClick={() => onItemClick(item.city)}
              className="history-item"
            >
              <span>{item.city}</span>
              <span className="history-meta">
                AQI {item.aqi} · {item.category}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default HistoryList;

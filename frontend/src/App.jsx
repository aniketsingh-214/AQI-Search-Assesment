import { useState } from 'react';
import Layout from './components/Layout';
import SearchBar from './components/SearchBar';
import CitySummaryCard from './components/CitySummaryCard';
import AQIDetailPanel from './components/AQIDetailPanel';
import HistoryList from './components/HistoryList';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorBanner from './components/ErrorBanner';
import { useAqiSearch } from './hooks/useAqiSearch';

function App() {
  const [history, setHistory] = useState([]);
  const { data, isLoading, error, search } = useAqiSearch();

  const handleSearch = async (city) => {
    const result = await search(city);
    if (result) {
      setHistory((prev) => [
        { city: result.city, aqi: result.aqi, category: result.category, time: result.time },
        ...prev.filter((item) => item.city !== result.city).slice(0, 4)
      ]);
    }
  };

  return (
    <Layout>
      <header className="app-header">
        <h1>AQI City Search</h1>
        <p>Search air quality by city and explore detailed metrics.</p>
      </header>

      <SearchBar onSearch={handleSearch} />

      {isLoading && <LoadingSpinner />}

      {error && <ErrorBanner message={error} />}

      {data && !isLoading && (
        <div className="results-grid">
          <CitySummaryCard
            city={data.city}
            aqi={data.aqi}
            category={data.category}
            dominantPollutant={data.dominantPollutant}
            fromCache={data.fromCache}
            time={data.time}
          />
          <AQIDetailPanel breakdown={data.breakdown} geo={data.geo} attribution={data.attribution} />
        </div>
      )}

      <HistoryList items={history} onItemClick={(city) => handleSearch(city)} />
    </Layout>
  );
}

export default App;

import { useState } from 'react';
import { fetchCityAqi } from '../services/aqiApi';

export function useAqiSearch() {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const search = async (city) => {
    if (!city) return null;
    setLoading(true);
    setError('');
    try {
      const result = await fetchCityAqi(city);
      setData(result);
      return result;
    } catch (err) {
      const msg =
        err.response?.data?.error ||
        err.message ||
        'Something went wrong';
      setError(msg);
      setData(null);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { data, isLoading, error, search };
}

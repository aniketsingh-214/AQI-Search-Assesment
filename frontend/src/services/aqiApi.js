import apiClient from './apiClient';

export async function fetchCityAqi(city) {
  const response = await apiClient.get('/api/aqi', {
    params: { city }
  });
  return response.data;
}

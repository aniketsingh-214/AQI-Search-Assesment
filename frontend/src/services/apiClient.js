import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000', // adjust for prod
  timeout: 8000
});

export default apiClient;

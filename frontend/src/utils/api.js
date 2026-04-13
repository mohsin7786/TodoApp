import axios from 'axios';

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api' });

// Request cache for GET requests
const requestCache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;

  // Cache GET requests
  if (config.method === 'get' && config.cache !== false) {
    const cacheKey = `${config.baseURL}${config.url}`;
    const cached = requestCache.get(cacheKey);

    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      config.adapter = () => Promise.resolve(cached.response);
    }
  }

  return config;
});

api.interceptors.response.use(
  (res) => {
    // Cache successful GET responses
    if (res.config.method === 'get' && res.config.cache !== false) {
      const cacheKey = `${res.config.baseURL}${res.config.url}`;
      requestCache.set(cacheKey, {
        response: res,
        timestamp: Date.now(),
      });
    }
    return res;
  },
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('token');
      sessionStorage.removeItem('token');
      if (window.location.pathname !== '/login') window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

export default api;

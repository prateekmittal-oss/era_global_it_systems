import axios from 'axios';

/**
 * Production (Vercel): always use same-origin /api (serverless)
 * Local: Vite proxy /api → localhost:5000, or VITE_API_URL override
 */
const baseURL = import.meta.env.PROD
  ? '/api'
  : import.meta.env.VITE_API_URL || '/api';

const API = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
});

API.interceptors.response.use(
  (res) => res,
  (error) => {
    const message =
      error.response?.data?.message || error.message || 'Something went wrong';
    return Promise.reject(new Error(message));
  }
);

export default API;

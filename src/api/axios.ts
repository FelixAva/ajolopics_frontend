import axios from 'axios';
import { useAuthStore } from '../features/auth/store/useAuthStore';
import { router } from '../app/router';

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const api  = axios.create({
  baseURL: `${API_BASE_URL}`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

api.interceptors.request.use(
  (config) => {
    // Read token from >ustand
    const token = useAuthStore.getState().token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    };

    return config;
  },
  (error) => Promise.reject(error)
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Logout procces from >ustand
      useAuthStore.getState().logout();

      // Redirect to auth - without hard reload
      router.navigate({ to: '/auth' });
    }

    return Promise.reject(error);
  }
)

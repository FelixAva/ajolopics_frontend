import axios from 'axios';
import { useAuthStore } from '@/features/auth';
import { showAjolopicsToast } from '@/components/ui/Alerts';
import i18n from '@/app/i18n';

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
      const hadSession = !!useAuthStore.getState().token;

      // Logout procces from zustand
      useAuthStore.getState().logout();

      if (hadSession) {
        showAjolopicsToast('error', i18n.t('toast:sessionExpired'));
      }
    }

    return Promise.reject(error);
  }
)

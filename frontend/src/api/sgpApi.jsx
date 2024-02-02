import axios from 'axios';
import { useAuthStore } from '../stores/Auth/authStore';

const sgpApi = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

sgpApi.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  
  return config;
});

export { sgpApi };
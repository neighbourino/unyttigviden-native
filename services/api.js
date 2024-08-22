import axios from 'axios';
import store from './store';
import { clearToken } from './authSlice';

const api = axios.create({
  baseURL: 'http://192.168.68.107:8000/api/v1',
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth ? state.auth.token : null; // Safely access state.auth
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Login function
export const login = async (credentials) => {
  const response = await api.post('/login', credentials);
  return response.data;
};

// Logout function
export const logout = async () => {
  await api.post('/logout');
  store.dispatch(clearToken());
};

// Forgot password function
export const forgotPassword = async (email) => {
  const response = await api.post('/forgot-password', { email });
  return response.data;
};

// Get user function
export const getUser = async () => {
  const response = await api.get('/user');
  return response.data;
};

// Get facts function
export const getFacts = async () => {
  const response = await api.get('/facts');
  return response.data;
};

export default api;

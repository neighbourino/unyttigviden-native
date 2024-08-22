import axios from 'axios';
import store from '../services/store';
import { clearToken } from '../services/authSlice';

const api = axios.create({
  baseURL: 'http://192.168.68.107:8000/api/v1',
  withCredentials: true,
});

// Interceptor to add the token to the Authorization header
// Interceptor to add the token to the Authorization header
api.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.token;  // Access the token from the Redux store
    console.log('token', token);
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
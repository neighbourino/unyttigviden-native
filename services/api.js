import axios from "axios";
import store from "./store";
import { clearToken } from "./authSlice";

const api = axios.create({
  baseURL: "https://xd5zpvtomj.sharedwithexpose.com/api/v1",
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.reducer.auth ? state.reducer.auth.token : null; // Safely access state.auth
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
  const response = await api.post("/login", credentials);
  return response.data;
};

// Logout function
export const logout = async () => {
  await api.post("/logout");
  store.dispatch(clearToken());
};

// Forgot password function
export const forgotPassword = async (email) => {
  const response = await api.post("/forgot-password", { email });
  return response.data;
};

// Get user function
export const getUser = async () => {
  const response = await api.get("/user");
  return response.data;
};

export const getFacts = async (filters = {}) => {
  const response = await api.get('/facts', {
    params: {
      'filter[category_id]': filters.selectedCategories,
    },
  });
  return response.data;
};

// Get categories function
export const getCategories = async () => {
  const response = await api.get("/categories");
  return response.data;
};

// Get category detail function
export const getCategoryDetail = async (categoryId) => {
  const response = await api.get(`/categories/${categoryId}`);
  return response.data;
};

export default api;

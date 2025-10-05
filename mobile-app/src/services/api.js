import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Base URL - Update this to your Django server URL
const BASE_URL = 'http://10.0.2.2:8000'; // For Android emulator
// const BASE_URL = 'http://192.168.1.100:8000'; // For physical device (replace with your IP)

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// Response interceptor to handle errors
api.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
      // You can dispatch a logout action here
    }
    return Promise.reject(error);
  },
);

// API endpoints
export const authAPI = {
  login: (phoneNumber, password) =>
    api.post('/api/auth/login/', {
      username: phoneNumber,
      password: password,
    }),
  
  register: userData =>
    api.post('/api/auth/register/', userData),
  
  logout: () => api.post('/api/auth/logout/'),
};

export const userAPI = {
  getProfile: () => api.get('/api/user/profile/'),
  updateProfile: data => api.put('/api/user/profile/', data),
  getDashboard: () => api.get('/api/user/dashboard/'),
};

export const workoutAPI = {
  getWorkouts: () => api.get('/api/workouts/'),
  createWorkout: data => api.post('/api/workouts/', data),
  updateWorkout: (id, data) => api.put(`/api/workouts/${id}/`, data),
  deleteWorkout: id => api.delete(`/api/workouts/${id}/`),
  markComplete: id => api.patch(`/api/workouts/${id}/complete/`),
};

export const mealAPI = {
  getMeals: () => api.get('/api/meals/'),
  createMeal: data => api.post('/api/meals/', data),
  updateMeal: (id, data) => api.put(`/api/meals/${id}/`, data),
  deleteMeal: id => api.delete(`/api/meals/${id}/`),
  markConsumed: id => api.patch(`/api/meals/${id}/consume/`),
};

export const chatAPI = {
  sendMessage: message => api.post('/api/chat/', {message}),
  getChatHistory: () => api.get('/api/chat/history/'),
};

export const progressAPI = {
  getProgress: () => api.get('/api/progress/'),
  updateProgress: data => api.post('/api/progress/', data),
  getGoals: () => api.get('/api/goals/'),
  createGoal: data => api.post('/api/goals/', data),
  updateGoal: (id, data) => api.put(`/api/goals/${id}/`, data),
};

export {api};

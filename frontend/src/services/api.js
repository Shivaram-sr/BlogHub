// services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth APIs
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getMe: () => api.get('/auth/me'),
};

// Blog APIs
export const blogAPI = {
  getAllBlogs: () => api.get('/blogs'),
  getBlogById: (id) => api.get(`/blogs/${id}`),
  createBlog: (blogData) => api.post('/blogs', blogData),
  updateBlog: (id, blogData) => api.put(`/blogs/${id}`, blogData),
  deleteBlog: (id) => api.delete(`/blogs/${id}`),
  getMyBlogs: () => api.get('/blogs/user/my-blogs'),
  likeBlog: (id) => api.put(`/blogs/${id}/like`),
};

// User APIs
export const userAPI = {
  getUserProfile: (id) => api.get(`/users/${id}`),
  updateProfile: (profileData) => api.put('/users/profile', profileData),
  followUser: (id) => api.put(`/users/${id}/follow`),
};

export default api;
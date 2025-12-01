import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api/v1'; 

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  login: (credentials) => api.post('/user/login', credentials),  
  signup: (userData) => api.post('/user/signup', userData),      
};

export const employeeAPI = {
  getAll: () => api.get('/emp/employees'),                       
  getById: (id) => api.get(`/emp/employees/${id}`),
  create: (employeeData) => api.post('/emp/employees', employeeData),
  update: (id, employeeData) => api.put(`/emp/employees/${id}`, employeeData),
  delete: (id) => api.delete('/emp/employees', { params: { eid: id } }),
  search: (criteria) => api.get('/emp/employees/search', { params: criteria }),
};

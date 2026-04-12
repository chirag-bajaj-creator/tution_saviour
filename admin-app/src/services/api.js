import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('admin_token')
      localStorage.removeItem('admin_user')
      window.location.href = '/auth'
    }
    return Promise.reject(error)
  }
)

export const adminApi = {
  // Auth
  login: (email, password) => api.post('/api/auth/login', { email, password }),

  // Teachers
  getTeachers: () => api.get('/api/admin/teachers'),
  updateTeacher: (id, data) => api.put(`/api/admin/teachers/${id}`, data),

  // Dashboard
  getDashboardStats: () => api.get('/api/admin/stats'),

  // Students
  getStudents: () => api.get('/api/students'),

  // Reports
  getReports: () => api.get('/api/admin/reports'),
}

export default adminApi

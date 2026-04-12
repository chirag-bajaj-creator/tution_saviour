import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

const api = axios.create({
  baseURL: API_BASE,
})

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('parentToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const parentAPI = {
  login: (email, password) => api.post('/parent/login', { email, password }),
  getProfile: () => api.get('/parent/profile'),
  getChild: () => api.get('/parent/child'),
  getFeeStatus: () => api.get('/parent/fees'),
  getAttendance: () => api.get('/parent/attendance'),
  getPerformance: () => api.get('/parent/performance'),
  getSummary: () => api.get('/parent/summary'),
}

export default api

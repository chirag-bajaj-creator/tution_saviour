import axios from 'axios'
import { requireAuthEvent } from '../hooks/useAuth'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5001/api'

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

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('parentToken')
      localStorage.removeItem('parentId')
      localStorage.removeItem('childId')
      window.dispatchEvent(new Event(requireAuthEvent))
    }
    return Promise.reject(error)
  },
)

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

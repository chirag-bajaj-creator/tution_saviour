import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001'

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  console.log(`📤 API Request: ${config.method.toUpperCase()} ${config.url}`, config.data)
  return config
})

api.interceptors.response.use(
  (response) => {
    console.log(`📥 API Response: ${response.status}`, response.data)
    return response
  },
  (error) => {
    console.error(`❌ API Error: ${error.response?.status || 'Network Error'}`)
    console.error('Error response:', error.response?.data)
    console.error('Error message:', error.message)
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/auth'
    }
    return Promise.reject(error)
  }
)

export const tutorApi = {
  // Auth
  signup: (email, password, name, phone) =>
    api.post('/api/auth/signup', { email, password, name, phone }),
  login: (email, password) =>
    api.post('/api/auth/login', { email, password }),

  // Students
  getStudents: () => api.get('/api/students'),
  addStudent: (data) => api.post('/api/students', data),
  updateStudent: (id, data) => api.put(`/api/students/${id}`, data),
  deleteStudent: (id) => api.delete(`/api/students/${id}`),

  // Batches
  getBatches: () => api.get('/api/batches'),
  addBatch: (data) => api.post('/api/batches', data),

  // Attendance
  markAttendance: (data) => api.post('/api/attendance', data),
  getAttendance: (params) => api.get('/api/attendance', { params }),

  // Fees
  getFees: () => api.get('/api/fees'),
  addFee: (data) => api.post('/api/fees', data),
  updateFee: (id, data) => api.put(`/api/fees/${id}`, data),

  // Performance
  addPerformance: (data) => api.post('/api/performance', data),
  getPerformance: (params) => api.get('/api/performance', { params }),

  // Reports
  getReport: (studentId) => api.get(`/api/reports/${studentId}`),

  // Dashboard
  getDashboardStats: () => api.get('/api/dashboard/stats'),

  // Reports
  getReport: (studentId) => api.get(`/api/reports/${studentId}`),
}

export default tutorApi

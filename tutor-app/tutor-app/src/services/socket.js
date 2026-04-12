import io from 'socket.io-client'

const SOCKET_URL = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5001'

const socket = io(SOCKET_URL, {
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: 5
})

socket.on('connect', () => {
  console.log('✅ Connected to WebSocket')
})

socket.on('disconnect', () => {
  console.log('⚠️ Disconnected from WebSocket')
})

socket.on('attendance:updated', (data) => {
  console.log('📡 Attendance updated:', data)
  window.dispatchEvent(new Event('attendance-updated'))
})

socket.on('performance:updated', (data) => {
  console.log('📡 Performance updated:', data)
  window.dispatchEvent(new Event('performance-updated'))
})

socket.on('fee:updated', (data) => {
  console.log('📡 Fee updated:', data)
  window.dispatchEvent(new Event('fee-updated'))
})

export default socket
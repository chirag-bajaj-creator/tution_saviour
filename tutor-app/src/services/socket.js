import { io } from 'socket.io-client'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001'
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || API_URL.replace(/\/api\/?$/, '') || undefined

const socket = io(SOCKET_URL, {
  autoConnect: false,
  reconnectionAttempts: 3,
  transports: ['polling', 'websocket'],
})

let activeRealtimeSubscriptions = 0

export const subscribeToRealtime = (eventName, handler) => {
  if (!socket.connected) {
    socket.connect()
  }

  activeRealtimeSubscriptions += 1
  socket.on(eventName, handler)

  return () => {
    socket.off(eventName, handler)
    activeRealtimeSubscriptions = Math.max(0, activeRealtimeSubscriptions - 1)

    if (activeRealtimeSubscriptions === 0) {
      socket.disconnect()
    }
  }
}

export default socket

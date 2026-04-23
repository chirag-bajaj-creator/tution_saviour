import { io } from 'socket.io-client'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5001/api'
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || API_BASE.replace(/\/api\/?$/, '') || undefined

const socket = io(SOCKET_URL, {
  autoConnect: false,
  reconnectionAttempts: 3,
  transports: ['polling', 'websocket'],
})

let activeSubscriptions = 0

export const subscribeToRealtime = (eventNames, handler) => {
  const events = Array.isArray(eventNames) ? eventNames : [eventNames]

  if (!socket.connected) {
    socket.connect()
  }

  activeSubscriptions += 1
  events.forEach((eventName) => socket.on(eventName, handler))

  return () => {
    events.forEach((eventName) => socket.off(eventName, handler))
    activeSubscriptions = Math.max(0, activeSubscriptions - 1)

    if (activeSubscriptions === 0) {
      socket.disconnect()
    }
  }
}

export default socket

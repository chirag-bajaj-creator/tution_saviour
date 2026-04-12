import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  return user ? children : <Navigate to="/auth" />
}

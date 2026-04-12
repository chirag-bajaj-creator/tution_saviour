import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth()

  if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>
  if (!isAuthenticated) return <Navigate to="/auth" replace />

  return children
}

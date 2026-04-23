import { useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading, openLoginModal } = useAuth()

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      openLoginModal()
    }
  }, [isAuthenticated, loading, openLoginModal])

  if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>
  if (!isAuthenticated) {
    return (
      <div className="flex h-screen items-center justify-center bg-pageBg px-6 text-center">
        <div>
          <h2 className="text-2xl font-semibold text-primaryText">Login Required</h2>
          <p className="mt-3 text-secondaryText">Use the popup to sign in and continue to this page.</p>
        </div>
      </div>
    )
  }

  return children
}

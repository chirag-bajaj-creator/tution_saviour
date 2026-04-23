import { useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'

export const ProtectedRoute = ({ children }) => {
  const { user, loading, openLoginModal } = useAuth()

  useEffect(() => {
    if (!loading && !user) {
      openLoginModal()
    }
  }, [user, loading, openLoginModal])

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center px-6 text-center">
        <div>
          <h2 className="text-2xl font-semibold text-primaryText">Admin Login Required</h2>
          <p className="mt-3 text-secondaryText">Use the popup to sign in and continue to the admin area.</p>
        </div>
      </div>
    )
  }

  return children
}

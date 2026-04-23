import { useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading, openLoginModal } = useAuth()

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      openLoginModal()
    }
  }, [loading, isAuthenticated, openLoginModal])

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6 text-center">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Login Required</h2>
          <p className="mt-3 text-slate-600">Use the popup to sign in and continue to your child&apos;s dashboard.</p>
        </div>
      </div>
    )
  }

  return children
}

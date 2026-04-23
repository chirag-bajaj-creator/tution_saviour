import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export const Auth = () => {
  const navigate = useNavigate()
  const { isAuthenticated, openLoginModal } = useAuth()

  useEffect(() => {
    if (!isAuthenticated) {
      openLoginModal()
    }
    navigate(isAuthenticated ? '/dashboard' : '/', { replace: true })
  }, [isAuthenticated, navigate, openLoginModal])

  return null
}

import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export const Auth = () => {
  const navigate = useNavigate()
  const { user, openLoginModal } = useAuth()

  useEffect(() => {
    if (!user) {
      openLoginModal()
    }

    navigate(user ? '/dashboard' : '/', { replace: true })
  }, [user, navigate, openLoginModal])

  return null
}

import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import api from '../services/api'

export default function ParentAuth() {
  const navigate = useNavigate()
  const { isAuthenticated, openLoginModal } = useAuth()

  useEffect(() => {
    if (!isAuthenticated) {
      openLoginModal()
      navigate('/', { replace: true })
      return
    }

    const resolveParentRoute = async () => {
      try {
        await api.get('/parent/summary')
        navigate('/summary', { replace: true })
      } catch (err) {
        if (err.response?.status === 403) {
          navigate('/setup', { replace: true })
          return
        }

        navigate('/', { replace: true })
      }
    }

    resolveParentRoute()
  }, [isAuthenticated, navigate, openLoginModal])

  return null
}

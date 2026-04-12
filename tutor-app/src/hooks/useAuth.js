import { useState, useEffect, useCallback } from 'react'

export const useAuth = () => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    const storedUser = localStorage.getItem('user')
    if (storedToken && storedUser) {
      try {
        setToken(storedToken)
        setUser(JSON.parse(storedUser))
      } catch (e) {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
      }
    }
    setLoading(false)
  }, [])

  const login = useCallback((token, userData) => {
    console.log('🔐 useAuth.login called:', { token: token?.substring(0, 20) + '...', userData })
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(userData))
    setToken(token)
    setUser(userData)
    console.log('✅ useAuth.login completed - token and user stored')
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setToken(null)
    setUser(null)
  }, [])

  const isAuthenticated = !!token && !!user

  return { user, token, loading, login, logout, isAuthenticated }
}

import { createContext, createElement, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'

const AuthContext = createContext(null)

const AUTH_REQUIRED_EVENT = 'auth:required'

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [loading, setLoading] = useState(true)
  const [authModal, setAuthModal] = useState({ open: false, mode: 'login' })
  const triggerRef = useRef(null)

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    const storedUser = localStorage.getItem('user')

    if (storedToken && storedUser) {
      try {
        setToken(storedToken)
        setUser(JSON.parse(storedUser))
      } catch (error) {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
      }
    }

    setLoading(false)
  }, [])

  useEffect(() => {
    const handleAuthRequired = () => {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      setToken(null)
      setUser(null)
      setAuthModal({ open: true, mode: 'login' })
    }

    window.addEventListener(AUTH_REQUIRED_EVENT, handleAuthRequired)

    return () => {
      window.removeEventListener(AUTH_REQUIRED_EVENT, handleAuthRequired)
    }
  }, [])

  const restoreFocusToTrigger = useCallback(() => {
    if (triggerRef.current && typeof triggerRef.current.focus === 'function') {
      window.setTimeout(() => {
        triggerRef.current?.focus()
      }, 0)
    }
  }, [])

  const login = useCallback((nextToken, userData) => {
    localStorage.setItem('token', nextToken)
    localStorage.setItem('user', JSON.stringify(userData))
    setToken(nextToken)
    setUser(userData)
    setAuthModal((current) => ({ ...current, open: false }))
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setToken(null)
    setUser(null)
    setAuthModal({ open: false, mode: 'login' })
    restoreFocusToTrigger()
  }, [restoreFocusToTrigger])

  const openLoginModal = useCallback((triggerElement = null, mode = 'login') => {
    triggerRef.current = triggerElement
    setAuthModal({ open: true, mode })
  }, [])

  const openLogoutModal = useCallback((triggerElement = null) => {
    triggerRef.current = triggerElement
    setAuthModal({ open: true, mode: 'logout' })
  }, [])

  const closeAuthModal = useCallback(() => {
    setAuthModal((current) => ({ ...current, open: false }))
    restoreFocusToTrigger()
  }, [restoreFocusToTrigger])

  const value = useMemo(
    () => ({
      user,
      token,
      loading,
      login,
      logout,
      isAuthenticated: !!token && !!user,
      authModal,
      openLoginModal,
      openLogoutModal,
      closeAuthModal,
    }),
    [user, token, loading, authModal, login, logout, openLoginModal, openLogoutModal, closeAuthModal],
  )

  return createElement(AuthContext.Provider, { value }, children)
}

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}

export const requireAuthEvent = AUTH_REQUIRED_EVENT

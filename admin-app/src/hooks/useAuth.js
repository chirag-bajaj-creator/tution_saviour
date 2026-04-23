import { createContext, createElement, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'

const AuthContext = createContext(null)

const AUTH_REQUIRED_EVENT = 'admin-auth:required'

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [authModal, setAuthModal] = useState({ open: false, mode: 'login' })
  const triggerRef = useRef(null)

  useEffect(() => {
    const token = localStorage.getItem('admin_token')
    const adminUser = localStorage.getItem('admin_user')

    if (token && adminUser) {
      try {
        setUser(JSON.parse(adminUser))
      } catch (error) {
        localStorage.removeItem('admin_token')
        localStorage.removeItem('admin_user')
      }
    }

    setLoading(false)
  }, [])

  useEffect(() => {
    const handleAuthRequired = () => {
      localStorage.removeItem('admin_token')
      localStorage.removeItem('admin_user')
      setUser(null)
      setAuthModal({ open: true, mode: 'login' })
    }

    window.addEventListener(AUTH_REQUIRED_EVENT, handleAuthRequired)

    return () => {
      window.removeEventListener(AUTH_REQUIRED_EVENT, handleAuthRequired)
    }
  }, [])

  const restoreFocus = useCallback(() => {
    if (triggerRef.current && typeof triggerRef.current.focus === 'function') {
      window.setTimeout(() => {
        triggerRef.current?.focus()
      }, 0)
    }
  }, [])

  const login = useCallback((token, adminUser) => {
    localStorage.setItem('admin_token', token)
    localStorage.setItem('admin_user', JSON.stringify(adminUser))
    setUser(adminUser)
    setAuthModal({ open: false, mode: 'login' })
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('admin_token')
    localStorage.removeItem('admin_user')
    setUser(null)
    setAuthModal({ open: false, mode: 'login' })
    restoreFocus()
  }, [restoreFocus])

  const openLoginModal = useCallback((triggerElement = null) => {
    triggerRef.current = triggerElement
    setAuthModal({ open: true, mode: 'login' })
  }, [])

  const openLogoutModal = useCallback((triggerElement = null) => {
    triggerRef.current = triggerElement
    setAuthModal({ open: true, mode: 'logout' })
  }, [])

  const closeAuthModal = useCallback(() => {
    setAuthModal((current) => ({ ...current, open: false }))
    restoreFocus()
  }, [restoreFocus])

  const value = useMemo(
    () => ({
      user,
      loading,
      login,
      logout,
      authModal,
      isAuthenticated: !!user,
      openLoginModal,
      openLogoutModal,
      closeAuthModal,
    }),
    [user, loading, login, logout, authModal, openLoginModal, openLogoutModal, closeAuthModal],
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

import { createContext, createElement, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'

const AuthContext = createContext(null)

const AUTH_REQUIRED_EVENT = 'parent-auth:required'

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('parentToken'))
  const [parentId, setParentId] = useState(localStorage.getItem('parentId'))
  const [loading, setLoading] = useState(true)
  const [authModal, setAuthModal] = useState({ open: false, mode: 'login' })
  const triggerRef = useRef(null)

  useEffect(() => {
    setToken(localStorage.getItem('parentToken'))
    setParentId(localStorage.getItem('parentId'))
    setLoading(false)
  }, [])

  useEffect(() => {
    const handleAuthRequired = () => {
      localStorage.removeItem('parentToken')
      localStorage.removeItem('parentId')
      localStorage.removeItem('childId')
      setToken(null)
      setParentId(null)
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

  const login = useCallback((nextToken, userData = null) => {
    localStorage.setItem('parentToken', nextToken)

    const nextParentId = userData?.id || userData?._id || localStorage.getItem('parentId')
    if (nextParentId) {
      localStorage.setItem('parentId', nextParentId)
      setParentId(nextParentId)
    }

    setToken(nextToken)
    setAuthModal({ open: false, mode: 'login' })
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('parentToken')
    localStorage.removeItem('parentId')
    localStorage.removeItem('childId')
    setToken(null)
    setParentId(null)
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
      token,
      parentId,
      loading,
      isAuthenticated: !!token,
      authModal,
      login,
      logout,
      openLoginModal,
      openLogoutModal,
      closeAuthModal,
    }),
    [token, parentId, loading, authModal, login, logout, openLoginModal, openLogoutModal, closeAuthModal],
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

import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import tutorApi from '../services/api'
import { useAuth } from '../hooks/useAuth'

export const AuthModal = () => {
  const navigate = useNavigate()
  const { authModal, closeAuthModal, login, logout, user } = useAuth()
  const [isSignup, setIsSignup] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const dialogRef = useRef(null)
  const primaryInputRef = useRef(null)

  const isOpen = authModal.open
  const isLogoutMode = authModal.mode === 'logout'

  useEffect(() => {
    if (!isOpen) {
      setError('')
      setLoading(false)
      setIsSignup(false)
      setEmail('')
      setPassword('')
      setName('')
      setPhone('')
      return
    }

    window.setTimeout(() => {
      primaryInputRef.current?.focus()
    }, 0)
  }, [isOpen, authModal.mode])

  useEffect(() => {
    if (!isOpen) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && !loading) {
        closeAuthModal()
        return
      }

      if (event.key !== 'Tab' || !dialogRef.current) return

      const focusableElements = dialogRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      )

      if (focusableElements.length === 0) return

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault()
        lastElement.focus()
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault()
        firstElement.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, loading, closeAuthModal])

  if (!isOpen) return null

  const resetError = () => setError('')

  const handleBackdropClick = (event) => {
    if (loading) return
    if (event.target === event.currentTarget) {
      closeAuthModal()
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    resetError()
    setLoading(true)

    try {
      const response = isSignup
        ? await tutorApi.signup(email, password, name, phone)
        : await tutorApi.login(email, password)

      login(response.data.token, response.data.user)
      navigate('/dashboard', { replace: true })
    } catch (err) {
      setError(err.response?.data?.error || 'Unable to complete authentication')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    setLoading(true)
    logout()
    setLoading(false)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 px-4 py-6"
      onClick={handleBackdropClick}
      role="presentation"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
        className="w-full max-w-md rounded-2xl bg-white shadow-2xl"
      >
        {isLogoutMode ? (
          <div className="p-6 sm:p-7">
            <h2 id="auth-modal-title" className="text-2xl font-bold text-primaryText">
              Confirm Logout
            </h2>
            <p className="mt-3 text-sm leading-6 text-secondaryText">
              You are signed in as {user?.email || 'this account'}. Logging out will end the current session.
            </p>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={closeAuthModal}
                disabled={loading}
                className="flex-1 rounded-lg border border-sectionBg px-4 py-2.5 font-medium text-primaryText transition hover:bg-sectionBg disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleLogout}
                disabled={loading}
                className="flex-1 rounded-lg bg-danger px-4 py-2.5 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? 'Logging out...' : 'Logout'}
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6 sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 id="auth-modal-title" className="text-2xl font-bold text-primaryText">
                  {isSignup ? 'Create Account' : 'Login'}
                </h2>
                <p className="mt-2 text-sm text-secondaryText">
                  {isSignup ? 'Sign up without leaving the current screen.' : 'Sign in to continue where you left off.'}
                </p>
              </div>
              <button
                type="button"
                onClick={closeAuthModal}
                disabled={loading}
                className="rounded-lg px-3 py-2 text-sm font-medium text-secondaryText transition hover:bg-sectionBg disabled:cursor-not-allowed disabled:opacity-50"
              >
                Close
              </button>
            </div>

            {error ? (
              <div className="mt-5 rounded-lg border border-danger bg-red-50 px-4 py-3 text-sm text-danger">
                {error}
              </div>
            ) : null}

            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              {isSignup ? (
                <>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-primaryText">Name</label>
                    <input
                      ref={primaryInputRef}
                      type="text"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      className="w-full rounded-lg border border-sectionBg px-4 py-2.5 focus:border-primary focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-primaryText">Phone</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                      className="w-full rounded-lg border border-sectionBg px-4 py-2.5 focus:border-primary focus:outline-none"
                      required
                    />
                  </div>
                </>
              ) : (
                <div>
                  <label className="mb-1 block text-sm font-medium text-primaryText">Email</label>
                  <input
                    ref={primaryInputRef}
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="w-full rounded-lg border border-sectionBg px-4 py-2.5 focus:border-primary focus:outline-none"
                    required
                  />
                </div>
              )}

              {isSignup ? (
                <div>
                  <label className="mb-1 block text-sm font-medium text-primaryText">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="w-full rounded-lg border border-sectionBg px-4 py-2.5 focus:border-primary focus:outline-none"
                    required
                  />
                </div>
              ) : null}

              <div>
                <label className="mb-1 block text-sm font-medium text-primaryText">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full rounded-lg border border-sectionBg px-4 py-2.5 focus:border-primary focus:outline-none"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-primary px-4 py-2.5 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? 'Please wait...' : isSignup ? 'Sign Up' : 'Login'}
              </button>
            </form>

            <div className="mt-5 text-center text-sm text-secondaryText">
              {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button
                type="button"
                onClick={() => {
                  resetError()
                  setIsSignup((current) => !current)
                }}
                disabled={loading}
                className="font-semibold text-primary transition hover:text-secondary disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSignup ? 'Login' : 'Sign Up'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

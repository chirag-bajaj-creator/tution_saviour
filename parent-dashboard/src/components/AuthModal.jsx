import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogIn, UserPlus } from 'lucide-react'
import api from '../services/api'
import { useAuth } from '../hooks/useAuth'

export default function AuthModal() {
  const navigate = useNavigate()
  const { authModal, closeAuthModal, login, logout } = useAuth()
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const dialogRef = useRef(null)
  const primaryInputRef = useRef(null)

  const isOpen = authModal.open
  const isLogoutMode = authModal.mode === 'logout'

  useEffect(() => {
    if (!isOpen) {
      setIsSignUp(false)
      setEmail('')
      setPassword('')
      setName('')
      setPhone('')
      setLoading(false)
      setError('')
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

      const focusable = dialogRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      )

      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, loading, closeAuthModal])

  if (!isOpen) return null

  const handleBackdropClick = (event) => {
    if (loading) return
    if (event.target === event.currentTarget) {
      closeAuthModal()
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setLoading(true)

    try {
      const endpoint = isSignUp ? '/auth/signup' : '/auth/login'
      const payload = isSignUp
        ? { email, password, name, phone, role: 'parent' }
        : { email, password }

      const { data } = await api.post(endpoint, payload)

      if (data.token) {
        if (data.user?.role && data.user.role !== 'parent') {
          setError('This is not a parent account. Please sign in with a parent account or create one here.')
          return
        }

        login(data.token, data.user)

        if (isSignUp) {
          navigate('/setup')
          return
        }

        try {
          await api.get('/parent/summary')
          navigate('/summary')
        } catch (err) {
          if (err.response?.status === 403) {
            navigate('/setup')
            return
          }

          throw err
        }
      }
    } catch (err) {
      setError(err.response?.data?.error || (isSignUp ? 'Registration failed' : 'Login failed'))
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
        aria-labelledby="parent-auth-modal-title"
        className="w-full max-w-md rounded-2xl bg-white shadow-2xl"
      >
        {isLogoutMode ? (
          <div className="p-6 sm:p-7">
            <h2 id="parent-auth-modal-title" className="text-2xl font-bold text-slate-900">
              Confirm Logout
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Logging out will end the current parent session and return you to public access.
            </p>
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={closeAuthModal}
                disabled={loading}
                className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 font-medium text-slate-900 transition hover:bg-slate-100 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleLogout}
                disabled={loading}
                className="flex-1 rounded-xl bg-red-600 px-4 py-2.5 font-semibold text-white transition hover:bg-red-700 disabled:opacity-50"
              >
                {loading ? 'Logging out...' : 'Logout'}
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6 sm:p-7">
            <div className="flex items-center justify-center mb-6">
              <div className="rounded-full bg-blue-50 p-3">
                {isSignUp ? <UserPlus className="text-primary" size={28} /> : <LogIn className="text-primary" size={28} />}
              </div>
            </div>

            <h2 id="parent-auth-modal-title" className="text-3xl font-bold text-center text-slate-900 mb-2">
              {isSignUp ? 'Create Account' : 'Parent Login'}
            </h2>
            <p className="text-center text-slate-600 mb-6">
              {isSignUp ? "Sign up to view your child's reports" : "Access your child's reports"}
            </p>

            {error ? (
              <div className="mb-4 rounded-xl border border-red-300 bg-red-100 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            ) : null}

            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp ? (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">Full Name</label>
                    <input
                      ref={primaryInputRef}
                      type="text"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      required
                      className="w-full rounded-xl border border-slate-200 px-4 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">Phone</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                      required
                      className="w-full rounded-xl border border-slate-200 px-4 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Your phone number"
                    />
                  </div>
                </>
              ) : (
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Email</label>
                  <input
                    ref={primaryInputRef}
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                    className="w-full rounded-xl border border-slate-200 px-4 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="your@email.com"
                  />
                </div>
              )}

              {isSignUp ? (
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                    className="w-full rounded-xl border border-slate-200 px-4 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="your@email.com"
                  />
                </div>
              ) : null}

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  className="w-full rounded-xl border border-slate-200 px-4 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Password"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-gradient-main py-2 font-bold text-white transition hover:opacity-90 disabled:opacity-50 shadow-sm"
              >
                {loading ? (isSignUp ? 'Creating account...' : 'Logging in...') : (isSignUp ? 'Sign Up' : 'Login')}
              </button>
            </form>

            <div className="mt-6 text-center border-t border-slate-200 pt-4">
              <p className="text-sm text-slate-600">
                {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                <button
                  type="button"
                  onClick={() => {
                    setIsSignUp((current) => !current)
                    setError('')
                    setEmail('')
                    setPassword('')
                    setName('')
                    setPhone('')
                  }}
                  disabled={loading}
                  className="ml-1 font-semibold text-primary hover:underline disabled:opacity-50"
                >
                  {isSignUp ? 'Login' : 'Sign Up'}
                </button>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

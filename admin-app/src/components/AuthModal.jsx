import { useEffect, useRef, useState } from 'react'
import { Lock, Mail, UserPlus, User } from 'lucide-react'
import adminApi from '../services/api'
import { useAuth } from '../hooks/useAuth'

export const AuthModal = () => {
  const { authModal, closeAuthModal, login, logout, user } = useAuth()
  const [isSignup, setIsSignup] = useState(false)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const dialogRef = useRef(null)
  const primaryInputRef = useRef(null)

  const isOpen = authModal.open
  const isLogoutMode = authModal.mode === 'logout'

  useEffect(() => {
    if (!isOpen) {
      setIsSignup(false)
      setName('')
      setPhone('')
      setEmail('')
      setPassword('')
      setError('')
      setLoading(false)
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
      const res = isSignup
        ? await adminApi.signup(email, password, name, phone)
        : await adminApi.login(email, password)

      if (res.data.user.role !== 'admin') {
        setError('Access denied. Admin credentials required.')
        setLoading(false)
        return
      }

      login(res.data.token, res.data.user)
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed')
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
        aria-labelledby="admin-auth-modal-title"
        className="w-full max-w-md rounded-2xl bg-white shadow-2xl"
      >
        {isLogoutMode ? (
          <div className="p-6 sm:p-7">
            <h2 id="admin-auth-modal-title" className="text-2xl font-bold text-primaryText">
              Confirm Logout
            </h2>
            <p className="mt-3 text-sm leading-6 text-secondaryText">
              You are signed in as {user?.email || 'this admin account'}. Logging out will end the current session.
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
                className="flex-1 rounded-lg bg-red-600 px-4 py-2.5 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? 'Logging out...' : 'Logout'}
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6 sm:p-7">
            <div className="mb-8 text-center">
              <div className="mb-4 inline-block rounded-full bg-indigo-100 p-3">
                {isSignup ? (
                  <UserPlus className="text-indigo-600" size={32} />
                ) : (
                  <Lock className="text-indigo-600" size={32} />
                )}
              </div>
              <h2 id="admin-auth-modal-title" className="text-3xl font-bold text-primaryText">
                {isSignup ? 'Admin Register' : 'Admin Login'}
              </h2>
              <p className="mt-2 text-secondaryText">
                {isSignup ? 'Create a new admin account from the popup.' : 'Secure access to admin dashboard'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {isSignup ? (
                <>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-primaryText">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 text-secondaryText" size={20} />
                      <input
                        ref={primaryInputRef}
                        type="text"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        placeholder="Admin name"
                        className="w-full rounded-lg border border-sectionBg py-3 pl-10 pr-4 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-primaryText">Phone Number</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                      placeholder="Phone number"
                      className="w-full rounded-lg border border-sectionBg py-3 px-4 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                      required
                    />
                  </div>
                </>
              ) : null}

              <div>
                <label className="mb-2 block text-sm font-medium text-primaryText">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 text-secondaryText" size={20} />
                  <input
                    ref={isSignup ? null : primaryInputRef}
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="admin@tutorapp.com"
                    className="w-full rounded-lg border border-sectionBg py-3 pl-10 pr-4 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-primaryText">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 text-secondaryText" size={20} />
                  <input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Password"
                    className="w-full rounded-lg border border-sectionBg py-3 pl-10 pr-4 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                    required
                  />
                </div>
              </div>

              {error ? (
                <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                  <p className="text-sm font-medium text-red-600">{error}</p>
                </div>
              ) : null}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-gradient-to-r from-indigo-600 to-blue-600 py-3 font-semibold text-white transition hover:from-indigo-700 hover:to-blue-700 disabled:opacity-50"
              >
                {loading ? (isSignup ? 'Creating account...' : 'Logging in...') : (isSignup ? 'Create Admin Account' : 'Admin Login')}
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-secondaryText">
              {isSignup ? 'Already have an admin account?' : 'Need a new admin account?'}{' '}
              <button
                type="button"
                onClick={() => {
                  setError('')
                  setIsSignup((current) => !current)
                }}
                disabled={loading}
                className="font-semibold text-indigo-600 transition hover:text-indigo-700 disabled:opacity-50"
              >
                {isSignup ? 'Login' : 'Register'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

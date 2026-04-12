import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import tutorApi from '../services/api'

export const Auth = () => {
  const [isSignup, setIsSignup] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (isSignup) {
        console.log('🚀 Signup attempt:', { email, name, phone })
        const res = await tutorApi.signup(email, password, name, phone)
        console.log('✅ Signup response:', res.data)
        login(res.data.token, res.data.user)
      } else {
        console.log('🚀 Login attempt:', { email })
        const res = await tutorApi.login(email, password)
        console.log('✅ Login response:', res.data)
        login(res.data.token, res.data.user)
      }
      console.log('🎯 Navigating to dashboard')
      navigate('/dashboard')
    } catch (err) {
      console.error('❌ Auth error:', err)
      console.error('Response status:', err.response?.status)
      console.error('Response data:', err.response?.data)
      console.error('Error message:', err.message)
      setError(err.response?.data?.error || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-pageBg px-4">
      <div className="bg-cardBg rounded-lg shadow-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-primaryText mb-2 text-center">
          {isSignup ? 'Create Account' : 'Login'}
        </h1>
        <p className="text-secondaryText text-center mb-6">
          {isSignup ? 'Sign up to get started' : 'Welcome back'}
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-danger rounded-lg text-danger text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignup && (
            <>
              <div>
                <label className="block text-sm font-medium text-primaryText mb-1">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-sectionBg rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
                  required={isSignup}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-primaryText mb-1">Phone</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full border border-sectionBg rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
                  required={isSignup}
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-primaryText mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-sectionBg rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primaryText mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-sectionBg rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-2 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? 'Loading...' : isSignup ? 'Sign Up' : 'Login'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-secondaryText">
            {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              onClick={() => setIsSignup(!isSignup)}
              className="text-primary font-semibold hover:text-secondary"
            >
              {isSignup ? 'Login' : 'Sign Up'}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

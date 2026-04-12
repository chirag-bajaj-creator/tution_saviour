import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { LogIn, UserPlus } from 'lucide-react'
import api from '../services/api'

export default function ParentAuth() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      let endpoint = isSignUp ? '/auth/signup' : '/auth/login'
      let payload = isSignUp
        ? { email, password, name, phone, role: 'parent' }
        : { email, password }

      const { data } = await api.post(endpoint, payload)
      
      if (data.token) {
        localStorage.setItem('parentToken', data.token)
        localStorage.setItem('parentId', data.user?.id)
        // Redirect to setup for new signups, summary for logins
        navigate(isSignUp ? '/setup' : '/summary')
      }
    } catch (err) {
      setError(err.response?.data?.error || (isSignUp ? 'Registration failed' : 'Login failed'))
      console.error('Auth error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-main flex items-center justify-center px-6">
      <div className="bg-white rounded-xl shadow-sm p-8 w-full max-w-md">
        <div className="flex items-center justify-center mb-6">
          <div className="bg-blue-50 p-3 rounded-full">
            {isSignUp ? (
              <UserPlus className="text-primary" size={28} />
            ) : (
              <LogIn className="text-primary" size={28} />
            )}
          </div>
        </div>

        <h1 className="text-3xl font-bold text-center text-slate-900 mb-2">
          {isSignUp ? 'Create Account' : 'Parent Login'}
        </h1>
        <p className="text-slate-600 text-center mb-6">
          {isSignUp ? 'Sign up to view your child\'s reports' : 'Access your child\'s reports'}
        </p>

        {error && (
          <div className="bg-red-100 border border-red-600 text-red-600 px-4 py-3 rounded-xl mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <>
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required={isSignUp}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Phone</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required={isSignUp}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Your phone number"
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-slate-200 rounded-xl px-4 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-slate-200 rounded-xl px-4 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-main text-white font-bold py-2 rounded-xl hover:opacity-90 transition disabled:opacity-50 shadow-sm"
          >
            {loading ? (isSignUp ? 'Creating account...' : 'Logging in...') : (isSignUp ? 'Sign Up' : 'Login')}
          </button>
        </form>

        <div className="mt-6 text-center border-t border-slate-200 pt-4">
          <p className="text-slate-600 text-sm">
            {isSignUp ? 'Already have an account?' : 'Don\'t have an account?'}
            <button
              onClick={() => {
                setIsSignUp(!isSignUp)
                setError('')
                setEmail('')
                setPassword('')
                setName('')
                setPhone('')
              }}
              className="text-primary hover:underline font-semibold ml-1"
            >
              {isSignUp ? 'Login' : 'Sign Up'}
            </button>
          </p>
        </div>

        <div className="mt-4 text-center">
          <Link to="/" className="text-primary hover:underline text-sm font-medium">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
